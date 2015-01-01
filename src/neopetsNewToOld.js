console.log("neopetsNewToOld");
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

oldNeopetsChrome.ChangeAllImages = function(image){
	//will cycle through all the actual img tags
	for (var i = 0; i < $("img").length; i++){
		var image = $($("img")[i]);
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
	}
}