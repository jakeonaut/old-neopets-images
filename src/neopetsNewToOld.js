console.log("neopetsNewToOld");

oldNeopetsChrome.ChangeAllImages = function(image){
	oldNeopetsChrome.RainbowPoolScript();
	if (oldNeopetsChrome.disable_pet_customization){
		oldNeopetsChrome.QuickRefCustomizationScript();
	}
	//will cycle through all the actual img tags
	for (var i = 0; i < $("img").length; i++){
		var image = $($("img")[i]);
		//check to see if original_src has already been set
		//(rainbow pool script has its own error handler and stuff)
		if ($(image).attr('original_src') === undefined){
			$(image).attr('original_src', $(image).attr('src'));
			//Just in case my image switch thing fails (i.e. for a pet color/species combo that never existed before
			$(image)[0].onerror=(function(){
				this.onerror = "";
				$(this).attr('src', $(this).attr('original_src'));
			});
		}
		//Exchange all img with a species/color/gender id
		if (image.attr('src').indexOf("pets.neopets.com/cp/") >= 0){
			oldNeopetsChrome.ChangeImageByID(image);
		}
		//Exchange all img with the actual pet name in the url
		else if (image.attr('src').indexOf("pets.neopets.com/cpn/") >= 0){
			//make an ajax call to find out the redirected img src
			$.ajax({
				type: "GET",
				url: "http://cakeandturtles.nfshost.com/getRedirect.php",
				data: {url: image.attr('src')},
				local_image: image,
				//upon success
				//change img tag's src to be the redirected img src
				//and proceed as usual
				success: function(final_url){
					$(this.local_image).attr('src', final_url);
					oldNeopetsChrome.ChangeImageByID(this.local_image);
				}
			});
		}
		//For quickref toggle images, the pet image is set as the background image, not the src :(
		else if (image.css('background-image').indexOf('pets.neopets.com/cp/') >= 0){
			var bg_img_url = $(image).css("background-image");
			if (bg_img_url.indexOf("url('") >= 0)
				bg_img_url = bg_img_url.substring(5, bg_img_url.length-2);
			$(image).attr('src', bg_img_url);
			oldNeopetsChrome.ChangeImageByID(image);
			$(image).css('background-image', "url('"+$(image).attr('src')+"')");
			$(image).css('background-size', $(image).width()+"px "+$(image).height()+"px");
			$(image).attr('src', $(image).attr('original_src'));
		}
	}
}

oldNeopetsChrome.ChangeImage = function(image, new_img_id, old_img_postfix){
	var old_img_url = "http://images.neopets.com/pets/";
	var change = false;
	//HAPPY
	if ($(image).attr('src').indexOf(new_img_id+"1/") >= 0){
		old_img_url += "happy/";
		change = true;
	}
	//SAD
	else if ($(image).attr('src').indexOf(new_img_id+"2/") >= 0){
		old_img_url += "sad/";
		change = true;
	}
	//ANGRY
	else if ($(image).attr('src').indexOf(new_img_id+"3/") >= 0){
		old_img_url += "angry/";
		change = true;
	}
	//ILL
	else if ($(image).attr('src').indexOf(new_img_id+"4/") >= 0){
		old_img_url += "beaten/";
		change = true;
	}
	
	if (!change) return false;
	old_img_url += old_img_postfix;
	$(image).attr('src', old_img_url);
	return true;
}

oldNeopetsChrome.RainbowPoolScript = function(){
	try{		
		set_pet_img = function(url, color_name) {
			var pet_img = document.getElementById('rp_pet_img');
			pet_img.src = url;
			if (oldNeopetsChrome.ChangeImageByID($(pet_img))){
				$(pet_img).width(200);
				$(pet_img).height(200);
				$(pet_img).css('padding', '50px');
			}
			//If the "old" pet image doesn't exist, revert to original src
			pet_img.onerror=(function(){
				this.onerror = function(){};
				$(this).attr('src', url);
				$(pet_img).width(300);
				$(pet_img).height(300);
				$(pet_img).css('padding', '0px');
			});

			var pet_title = document.getElementById('rp_pet_title');
			pet_title.innerHTML = color_name;
		}
		$("#rp_pet_img").attr('original_src', $('#rp_pet_img').attr('src'));
		set_pet_img($('#rp_pet_img').attr('src'), $("#rp_pet_title").html().toLowerCase());
	}catch(err){
	}
}

oldNeopetsChrome.QuickRefCustomizationScript = function(){
	for (var i = 0; i < $("div").length; i++){
		var div = $($('div')[i]);
		if ($(div).hasClass('pet_image')){
			var bg_img_url = $(div).css("background-image");
			if (bg_img_url.indexOf("url('") >= 0)
				bg_img_url = bg_img_url.substring(5, bg_img_url.length-2);
			var image = $(document.createElement('img'));
			$(image).attr('src', bg_img_url);
			if (oldNeopetsChrome.ChangeImageByID(image)){
				$(div).attr('original_src', $(div).css('background-image'));
				$(div).css('background-image', "url('"+$(image).attr('src')+"')");
				//Need to handle the case for incorrect background-images
				$(image)[0].onerror = function(tdiv){
					$(tdiv).css('background-image', $(tdiv).attr('original_src'));
					$(tdiv).css('background-size', '');
					$(tdiv).css('background-position', '');
					$(tdiv).css('background-repeat', '');
				}.bind($(image), div);
			
				var size = $(div).css('width');
				size = size.substring(0, size.length-1);
				size = parseInt(size);
				size -= 50;
				$(div).css('background-size', size+"px "+size+"px");
				$(div).css('background-position', '25px 25px');
				$(div).css('background-repeat', 'no-repeat');
			}
		}
	}
	
	$("[id=CustomNeopetView]").css('display', 'none');
}