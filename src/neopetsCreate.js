oldNeopetsChrome.CreateNeopetScript = function(){
	var url = window.location.href;
	if (url.indexOf("http://www.neopets.com/reg/page4.phtml") < 0) return;
	
	//change this iframe just to an image??
	var image = $(document.createElement("img"));
	//selected_pet and selected_pet_colour are both variables from their create pet script
	image.attr('src', "http://images.neopets.com/pets/"+selected_pet+"_"+selected_pet_colour+"_baby.gif");
	image.width($("#pet_pic").width()).height($("#pet_pic").height());
	$(image).attr('already_change', true);
	$(image).attr('original_src', ':)');
	$(image).attr('dont_use', false);
	
	//replace the pet_pic!!!
	var pet_pic = $("#pet_pic");
	$(pet_pic).replaceWith(image);
	$(image)[0].onerror = function(){
		this.onerror = "";
		$(image).replaceWith(pet_pic);
		$(image).attr('dont_use', true);
	}
	$(image).attr("id", "pet_pic_new");
	
	//change images of thumbnail
	$('.pet_thumb').attr('already_changed', true);
	for (var i = 0; i < $('.pet_thumb').length; i++){
		var thumb = $($('.pet_thumb')[i]);
		$(thumb).attr('original_bgimage', $(thumb).css("background-image"));
		var pet_species = $(thumb).attr('id');
		
		$(thumb).css('background-image', "url('"+"http://images.neopets.com/pets/"+pet_species+"_"+selected_pet_colour+"_baby.gif"+"')");
		$(thumb).css('background-size', $(thumb).width()+"px " + $(thumb).height()+"px");
		$(thumb).css("opacity", "0.5");
		$(thumb).attr('dont_change', false);
		
		var thumb_image = $(document.createElement('img'));
		thumb_image.attr('src', "http://images.neopets.com/pets/"+pet_species+"_"+selected_pet_colour+"_baby.gif");
		$(thumb_image)[0].onerror = function(tthumb){
			this.onerror = "";
			$(tthumb).css('background-image', $(tthumb).attr('original_bgimage'));
			$(tthumb).css('background-size', '');
			$(tthumb).css("opacity", "1");
			$(tthumb).attr('dont_change', true);
		}.bind($(thumb_image)[0], $(thumb));
	}
	
/////////////////////////////////////////REPLACE IMAGE CLICK SCRIPT
	imageClick = function(pet){

		prev_selected_pet=selected_pet;

	  // pick a random pet if no pet name passed
	  if (pet==null){
		var max_num=species_arr.length;
		var r=Math.floor(Math.random()*max_num);
		pet=species_arr[r];
	  }
	  selected_pet=pet.toLowerCase();
	  document.getElementById('pet_title').innerHTML=getTransPet(pet);

	  closePetInfo();

		var gender = (document.getElementById('gender').selectedIndex==0) ? 'm' : 'f';

		// these are preloaded into memory
		for(i=0;i<species_arr.length;i++){
			species=species_arr[i].toLowerCase();
		if (species==selected_pet){
				// grey highlight 50x50 pet 
				if ($("#"+selected_pet).attr('dont_change') === true){
					document.getElementById(selected_pet).style.backgroundImage='url('+img_grey_arr[i].src+')';
				}else{
					$("#"+selected_pet).css("opacity", "1");
				}
				
				$("#pet_pic_new").attr('src', "http://images.neopets.com/pets/"+selected_pet+"_"+selected_pet_colour+"_baby.gif");
				$("#pet_pic_new")[0].onerror = function(){
					this.onerror = "";
					$("#pet_pic_new").replaceWith(pet_pic);
					$("#pet_pic_new").attr('dont_use', true);
					document.getElementById('pet_pic').src='getpetpic.phtml?selected_pet_colour='+selected_pet_colour+'&selected_pet='+selected_pet+'&gender='+gender;
				}
			}else if (species==prev_selected_pet){
				// 50x50 line pet
				if ($("#"+species).attr('dont_change') === true){
					document.getElementById(species).style.backgroundImage="url("+img_line_arr[i].src+")";
				}else{
					$("#"+species).css("opacity", "0.5");
				}
		}
		}

	  for(var i=0;i<box_id_arr.length;i++){
			//document.getElementById(box_id_arr[i]).style.border='1px solid black';
		}
		//selected_pet_colour='line';

		// update stats
		var img_multiple = 3.6;
		document.getElementById("move_bar_0").width = 91 - (4 + base_move[0] + move_arr[selected_pet]) * img_multiple;
		document.getElementById("attack_bar_0").width = 91 - (base_attack[0] + attack_arr[selected_pet]) * img_multiple;
		document.getElementById("defence_bar_0").width = 91 - (base_defence[0] + defence_arr[selected_pet]) * img_multiple;
		document.getElementById("move_bar_1").width = 91 - (base_move[1] + move_arr[selected_pet]) * img_multiple;
		document.getElementById("attack_bar_1").width = 91 - (4 + base_attack[1] + attack_arr[selected_pet]) * img_multiple;
		document.getElementById("defence_bar_1").width = 91 - (base_defence[1] + defence_arr[selected_pet]) * img_multiple;
		document.getElementById("move_bar_2").width = 91 - (base_move[2] + move_arr[selected_pet]) * img_multiple;
		document.getElementById("attack_bar_2").width = 91 - (base_attack[2] + attack_arr[selected_pet]) * img_multiple;
		document.getElementById("defence_bar_2").width = 91 - (4 + base_defence[2] + defence_arr[selected_pet]) * img_multiple;

	}
	
/////////////////////////////////////////REPLACE THE SET BOX COLOR SCRIPT
	setBoxColor = function(box_id){
		document.getElementById("red_under").style.backgroundColor = "#ffffff";
		document.getElementById("blue_under").style.backgroundColor = "#ffffff";
		document.getElementById("green_under").style.backgroundColor = "#ffffff";
		document.getElementById("yellow_under").style.backgroundColor = "#ffffff";

	  for(i=0;i<box_id_arr.length;i++){
		if (box_id_arr[i]==box_id){
		  if (box_id=='red_box'){
			selected_pet_colour='red';
		//			document.getElementById(box_id_arr[i]).style.border='3px solid gray';
		document.getElementById("colour").innerHTML = "<tt154470>Red</tt154470>";
		document.getElementById("red_under").style.backgroundColor = "#999999";
		  }else if (box_id=='blue_box'){
			selected_pet_colour='blue';
		document.getElementById("colour").innerHTML = "<tt154471>Blue</tt154471>";
		//			document.getElementById(box_id_arr[i]).style.border='3px solid gray';
		document.getElementById("blue_under").style.backgroundColor = "#999999";
		  }else if (box_id=='green_box'){
			selected_pet_colour='green';
		document.getElementById("colour").innerHTML = "<tt154472>Green</tt154472>";
		//			document.getElementById(box_id_arr[i]).style.border='3px solid gray';
		document.getElementById("green_under").style.backgroundColor = "#999999";
		  }else if (box_id=='yellow_box'){
			selected_pet_colour='yellow';
		document.getElementById("colour").innerHTML = "<tt154473>Yellow</tt154473>";
		//			document.getElementById(box_id_arr[i]).style.border='3px solid gray';
		document.getElementById("yellow_under").style.backgroundColor = "#999999";
				}
			}else{
		//		document.getElementById(box_id_arr[i]).style.border='1px solid black';
			}
		}

		var gender = (document.getElementById('gender').selectedIndex==0) ? 'm' : 'f';

	  var img_arr=new Array();
	  if (selected_pet_colour=='red'){
		img_arr=img_selected_red_arr;
	  }else if (selected_pet_colour=='green'){
		img_arr=img_selected_green_arr;
	  }else if (selected_pet_colour=='blue'){
		img_arr=img_selected_blue_arr;
	  }else{
		img_arr=img_selected_yellow_arr;
		}

		if ($("#pet_pic_new").attr('dont_use') === true){
			for(var i=0;i<species_arr.length;i++){
				if (species_arr[i].toLowerCase()==selected_pet.toLowerCase()){

					document.getElementById('pet_pic').src='getpetpic.phtml?selected_pet_colour='+selected_pet_colour+'&selected_pet='+selected_pet+'&gender='+gender;

					break;

				}
			}
		}else{
			$("#pet_pic_new").attr('src', "http://images.neopets.com/pets/"+selected_pet+"_"+selected_pet_colour+"_baby.gif");
		}

		//also try to change the thumbnail images
		for (var i = 0; i < $('.pet_thumb').length; i++){
			var thumb = $($('.pet_thumb')[i]);
			if ($(thumb).attr('dont_change') === true) continue;
			var pet_species = $(thumb).attr('id');
			$(thumb).css('background-image', "url('"+"http://images.neopets.com/pets/"+pet_species+"_"+selected_pet_colour+"_baby.gif"+"')");
		}
	}
	
	//CLICK
	imageClick(selected_pet);
};