console.log("Neopets Collection Helper");

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

oldNeopetsChrome.TryChangeImage = function(image, colour, species, new_ids){
	if (oldNeopetsChrome.ChangeImage(image, '/' + new_ids[0] + '/', species + '_' + colour + '_baby.gif')) 
		return true;
	if (oldNeopetsChrome.ChangeImage(image, '/' + new_ids[1] + '/', species + '_' + colour + '_baby.gif')) 
		return true;
}

oldNeopetsChrome.ChangechangeImage = function(colour, image){
	return function(new_ids, species){
		if (oldNeopetsChrome.ChangeImage(image, '/' + new_ids[0] + '/', species + '_' + colour + '_baby.gif')) 
			return true;
		if (oldNeopetsChrome.ChangeImage(image, '/' + new_ids[1] + '/', species + '_' + colour + '_baby.gif')) 
			return true;
	}
}

oldNeopetsChrome.ChangeImageByManualID = function(image){
	//manually added pets (clothing oddity, or misc
	var changeImage = oldNeopetsChrome.ChangechangeImage("alien", image);
	if (changeImage(['w5zb4rd8', 'lwmzv8gf'], 'aisha')) return true;
	
	var changeImage = oldNeopetsChrome.ChangechangeImage("apple", image);
	if (changeImage(['j22vqmgn', 'x2t6vt3t'], 'chia')) return true;
	
	var changeImage = oldNeopetsChrome.ChangechangeImage("asparagus", image);
	if (changeImage(['s6twjtxq', 'sh89f8sl'], 'chia')) return true;
	
	var changeImage = oldNeopetsChrome.ChangechangeImage("aubergine", image);
	if (changeImage(['cqs3rk2j', 'fcl8wf6t'], 'chia')) return true;
	
	var changeImage = oldNeopetsChrome.ChangechangeImage("avocado", image);
	if (changeImage(['dx4r9b5k', 'c2jzlm58'], 'chia')) return true;
	
	var changeImage = oldNeopetsChrome.ChangechangeImage("blueberry", image);
	if (changeImage(['4wzfb367', 'h9592f97'], 'chia')) return true;
	
	var changeImage = oldNeopetsChrome.ChangechangeImage("carrot", image);
	if (changeImage(['3ckzmjtk', '6fg9cnv9'], 'chia')) return true;
	
	var changeImage = oldNeopetsChrome.ChangechangeImage("chokato", image);
	if (changeImage(['v53kfvs6', 'hddwh3h8'], 'chia')) return true;
	if (changeImage(['l2gtdvh5', 'sn2bs92v'], 'kiko')) return true;
}