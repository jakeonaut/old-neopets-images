console.log("neopetsNewToOld");

oldNeopetsChrome.ChangeAllImages = function(image){
	oldNeopetsChrome.RainbowPoolScript();
	oldNeopetsChrome.AdoptPageScript();
	if (oldNeopetsChrome.disable_pet_customization){
		oldNeopetsChrome.QuickRefCustomizationScript();
		oldNeopetsChrome.PetLookupScript();
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
		if (image.attr('src').indexOf("pets.neopets.com/cp/") >= 0 && image.attr('already_changed') === undefined){
			oldNeopetsChrome.ChangeImageByID(image);
		}
		//Exchange all img with the actual pet name in the url
		else if (image.attr('src').indexOf("pets.neopets.com/cpn/") >= 0 && image.attr('already_changed') === undefined){
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
					final_url = "http://pets.neopets.com" + final_url;
					$(this.local_image).attr('src', final_url);
					oldNeopetsChrome.ChangeImageByID(this.local_image);
					$(this.local_image)[0].onerror = function(){
						this.onerror = "";
						$(this).attr('src', $(this).attr('original_src'));
					}
				}
			});
		}
		//For quickref toggle images, the pet image is set as the background image, not the src :(
		else if (image.css('background-image').indexOf('pets.neopets.com/cp/') >= 0 && image.attr('already_changed') === undefined){
			var bg_img_url = $(image).css("background-image");
			$(image).attr('original_src', $(image).attr('src'));
			if (bg_img_url.indexOf("url('") >= 0)
				bg_img_url = bg_img_url.substring(5, bg_img_url.length-2);
			var bg_image = $(document.createElement('img'));
			$(bg_image).attr('src', bg_img_url);
			oldNeopetsChrome.ChangeImageByID(bg_image);
			$(image).css('background-image', "url('"+$(bg_image).attr('src')+"')");
			$(image).css('background-size', $(image).width()+"px "+$(image).height()+"px");
			$(image)[0].onerror = function(){
				this.onerror = "";
				$(this).css('background-image', $(this).attr('original_src'));
				$(this).css('background-size', '');
			}
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
	var url = window.location.href;
	if (url.indexOf("www.neopets.com/pool") < 0) return;
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
		console.log(err);
	}
}

oldNeopetsChrome.QuickRefCustomizationScript = function(){
	var url = window.location.href;
	if (url.indexOf("http://www.neopets.com/quickref.phtml") < 0) return;

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
					this.onerror = "";
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

oldNeopetsChrome.PetLookupScript = function(){
	var url = window.location.href;
	if (url.indexOf("http://www.neopets.com/petlookup.phtml") < 0) return;
	
	var pet_name = url.substring('http://www.neopets.com/petlookup.phtml?pet='.length);
	var image = $(document.createElement('img'));
	$(image).attr('src', "http://pets.neopets.com/cpn/"+pet_name+"/1/2.png");
	$(image).attr('original_src', $(image).attr('src'));
	$.ajax({
		type: "GET",
		url: "http://cakeandturtles.nfshost.com/getRedirect.php",
		data: {url: image.attr('src')},
		local_image: image,
		//upon success
		//change img tag's src to be the redirected img src
		//and proceed as usual
		success: function(final_url){
			final_url = "http://pets.neopets.com" + final_url;
			$(this.local_image).attr('src', final_url);
			if (oldNeopetsChrome.ChangeImageByID(image)){
				$(image).width(200);
				$(image).height(200);
				$(image).css('padding', '50px');
				var custom_neopet_view = $("#CustomNeopetView");
				$("#CustomNeopetView").replaceWith(image);
				
				$(image)[0].onerror = function(){
					this.onerror = "";
					$(image).attr('src', $(image).attr('original_src'));
					$(image).width(300);
					$(image).height(300);
					$(image).css('padding', '0px');
					$(image).replaceWith(custom_neopet_view);
				}
			}
		}
	});
}