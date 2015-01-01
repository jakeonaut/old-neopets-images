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
	for (var i = 0; i < $("img").length; i++){
		var image = $($("img")[i]);
		if (image.attr('src').indexOf("pets.neopets.com/cp/") >= 0){
			oldNeopetsChrome.ChangeImageByID(image);
		}
	}
}