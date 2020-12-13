console.log("neopetsNewToOld");

oldNeopetsChrome.ChangeAllImages = function(image){
	oldNeopetsChrome.RainbowPoolScript();
	oldNeopetsChrome.AdoptPageScript();
	oldNeopetsChrome.CreateNeopetScript();
	// if (oldNeopetsChrome.disable_pet_customization){
		oldNeopetsChrome.QuickRefCustomizationScript();
		oldNeopetsChrome.PetLookupScript();
	// }
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
		if (image.attr('src') && image.attr('src').indexOf("pets.neopets.com/cp/") >= 0 && image.attr('already_changed') === undefined) {
      // Special handling for activePet quickref link in status bar, cuz i am tired of seeing them as happy as possible...
      if (image.closest(".sidebarTable")) {
        oldNeopetsChrome.ChangeImageByID(image, true /* no_happy */);
      } else {
        oldNeopetsChrome.ChangeImageByID(image);
      }
		}
		//Exchange all img with the actual pet name in the url
		else if (image.attr('src') && image.attr('src').indexOf("pets.neopets.com/cpn/") >= 0 && image.attr('already_changed') === undefined){
      ((image) => {
        //make an ajax call to find out the redirected img src
        fetch(`https://cakeandturtles.nfshost.com/getRedirect.php?url=${image.attr('src')}`, {
          method: "GET",
        }).then((body) => body.text()).then((response) => {
          console.log("before: " + image.attr('src') + ", after: " + response);
          response = "http://pets.neopets.com" + response;
          $(image).attr('src', response);
          oldNeopetsChrome.ChangeImageByID(image);
          $(image)[0].onerror = function() {
            this.onerror = "";
            $(this).attr('src', $(this).attr('original_src'));
          }
        });
      })(image);
		}
		//For quickref toggle images, the pet image is set as the background image, not the src :(
		else if (image.css('background-image') && image.css('background-image').indexOf('pets.neopets.com/cp/') >= 0 && image.attr('already_changed') === undefined){
			var bg_img_url = $(image).css("background-image");
			if (bg_img_url.indexOf("url(") >= 0) {
				bg_img_url = bg_img_url.substring(5, bg_img_url.length-2);
      }
      $(image).attr('original_src', bg_img_url);
			var bg_image = $(document.createElement('img'));
			$(bg_image).attr('src', bg_img_url);
			oldNeopetsChrome.ChangeImageByID(bg_image, true /* no_happy */);
      if ($(bg_image).attr('src').indexOf("url(") >= 0) {
        $(image).css('background-image', $(bg_image).attr('src'));
      } else {
        $(image).css('background-image', "url('"+$(bg_image).attr('src')+"')");
      }
			$(image).css('background-size', $(image).width()+"px "+$(image).height()+"px");
			$(image)[0].onerror = function(){
				this.onerror = "";
				$(this).css('background-image', $(this).attr('original_src'));
				$(this).css('background-size', '');
			}
		}
		
		else if (oldNeopetsChrome.old_shop_keepers){
			oldNeopetsChrome.OldShopKeepers(image);
		}
	}
  
  // Manual battledome shit...
  window.setInterval(() => {
    const bdDivPics = $("#bdHomeStatsPic, .gQ_sprite");
    for (var i = 0; i < bdDivPics.length; i++){
      var divImage = $(bdDivPics[i]);
      var bg_img_url = divImage.css("background-image");
      if (bg_img_url && bg_img_url.indexOf('pets.neopets.com/cp/') >= 0 && image.attr('already_changed') === undefined) {
        let lastSprite = bg_img_url;
        
        if (bg_img_url.indexOf("url(") >= 0) {
          bg_img_url = bg_img_url.substring(5, bg_img_url.length-2);
        }
        divImage.attr('original_src', bg_img_url);
        var bg_image = $(document.createElement('img'));
        $(bg_image).attr('src', bg_img_url);
        oldNeopetsChrome.ChangeImageByID(bg_image, false /* no_happy */, true /* battledome */);
        divImage.css('background-image', `url("${$(bg_image).attr('src')}")`);
        divImage[0].onerror = function(){
          this.onerror = "";
          $(this).css('background-image', $(this).attr('original_src'));
          $(this).css('background-size', '');
        }    
      }
    }
  // Constant refresh to keep up with the fast paced battledome :O!
  }, 100);
}

oldNeopetsChrome.OldShopKeepers = function(image){	
	var oldShopKeepers = [
		["http://images.neopets.com/shopkeepers/w7.gif", "http://bookofages.jellyneo.net/assets/imgs/history/pages/old-characters_magical-books.gif"],
		["http://images.neopets.com/shopkeepers/w9.gif", "http://bookofages.jellyneo.net/assets/imgs/history/pages/old-characters_battle-magic-1.gif"],
		["http://images.neopets.com/shopkeepers/w10.gif", "http://bookofages.jellyneo.net/assets/imgs/history/pages/old-characters_defence-magic-1.gif"],
		["http://images.neopets.com/shopkeepers/w12.gif", "http://bookofages.jellyneo.net/assets/imgs/history/pages/old-characters_garden-centre.gif"],
		["http://images.neopets.com/shopkeepers/w2.gif", "http://bookofages.jellyneo.net/assets/imgs/history/pages/old-characters_magic-shop.gif"],
		["http://images.neopets.com/shopkeepers/w16.gif", "http://bookofages.jellyneo.net/assets/imgs/history/pages/old-characters_quinton.gif"],
		["http://images.neopets.com/shopkeepers/shopwizard.gif",
      ["http://bookofages.jellyneo.net/assets/imgs/history/pages/old-characters_shop-wizard.gif"]], // "http://bookofages.jellyneo.net/assets/imgs/history/pages/old-characters_island-wizard.gif", "http://bookofages.jellyneo.net/assets/imgs/history/pages/old-characters_halloween-wizard.gif", "http://bookofages.jellyneo.net/assets/imgs/history/pages/old-characters_space-wizard.gif", "http://bookofages.jellyneo.net/assets/imgs/history/pages/old-characters_water-wizard.gif"]],
		["http://images.neopets.com/new_shopkeepers/w1569.gif", "http://bookofages.jellyneo.net/assets/imgs/history/pages/old-characters_bank-manager.gif"],
		["http://images.neopets.com/images/wishingwell.gif", "http://bookofages.jellyneo.net/assets/imgs/history/pages/old-characters_wishing-well-1.gif"],
    ["http://images.neopets.com/pirates/swash_3.gif", "http://images.neopets.com/images/frontpage/swashbucker_academy.gif"],
    ["http://images.neopets.com/pirates/swash_1.gif", "http://images.neopets.com/games/betterthanyou/contestant85.gif"],
    ["http://images.neopets.com/pirates/swash_2.gif", "http://images.neopets.com/games/betterthanyou/contestant85.gif"],
    ["", ""],
    /* ["http://images.neopets.com/images/auctioneer.gif", "http://neopets-archeology.tripod.com/Actionear.gif"],
    ["http://images.neopets.com/shopkeepers/w3.gif", "http://neopets-archeology.tripod.com/Toy_Shopkeeper_2.gif"],
    ["http://images.neopets.com/shopkeepers/w18.gif", "http://neopets-archeology.tripod.com/slush_eyrie.gif"], */
	];
  /* var oldShopKeepersBackground = [
    ["http://images.neopets.com/moneytree/moneytree.jpg", 
  ]; */

	for (var i = 0; i < oldShopKeepers.length; i++){
		if ($(image).attr('src') === oldShopKeepers[i][0]){			
			$(image).attr('original_width', $(image).attr("width"));
			$(image).attr('original_height', $(image).attr("height"));
			if (typeof oldShopKeepers[i][1] === "string")
				$(image).attr('src', oldShopKeepers[i][1]);
			else{
				if (oldNeopetsChrome.random_shop_wizard){
					var srcs = oldShopKeepers[i][1];
					var randelement = Math.floor(Math.random()*srcs.length);
					var src = srcs[randelement];
					$(image).attr('src', src);
				}else{
					$(image).attr('src', oldShopKeepers[i][1][0]);
				}
			}
			$(image).attr("width", "");
			$(image).attr("height", "");
			
			$(image)[0].onerror = function(){
				this.onerror = "";
				$(this).attr('src', $(this).attr('original_src'));
				$(this).attr("width", $(this).attr("original_width"));
				$(this).attr("height", $(this).attr("original_height"));
			}
			break;
		}
	}
}

oldNeopetsChrome.RainbowPoolScript = function(){
	var url = window.location.href;
	if (url.indexOf("www.neopets.com/pool") < 0) return;
	try{		
		set_pet_img = function(url, color_name) {
			var pet_img = document.getElementById('rp_pet_img');
			$(pet_img).width(300);
			$(pet_img).height(300);
			$(pet_img).css('padding', '0px');
			pet_img.src = url;
			if ($(pet_img).attr('src').indexOf("images.neopets.com") >= 0 || oldNeopetsChrome.ChangeImageByID($(pet_img))){
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
		set_pet_img($('#rp_pet_img').attr('src'), $("#rp_pet_title").html());
	}catch(err){
		console.log(err);
	}
}

oldNeopetsChrome.QuickRefCustomizationScript = function(){
	var url = window.location.href;
	if (url.indexOf("http://www.neopets.com/quickref.phtml") < 0) return;
  
  const speciesList = 
    Array.from($(Array.from(document.querySelectorAll('th')).filter(el => el.textContent === 'Species:')).next())
    .map((x) => x.textContent.toLowerCase());
  const colourList = 
    Array.from($(Array.from(document.querySelectorAll('th')).filter(el => el.textContent === 'Colour:')).next())
    .map((x) => x.textContent.toLowerCase());
  
  // Hide the flash...
  Array.from(document.querySelectorAll("embed")).forEach((x) => { x.style.display = "none"; });

  let petIndex = 0;
	for (var i = 0; i < $("div").length; i++){
		var div = $($('div')[i]);
		if ($(div).hasClass('pet_image')) {
      
			var bg_img_url = $(div).css("background-image");
			if (bg_img_url.indexOf("url(") >= 0)
				bg_img_url = bg_img_url.substring(5, bg_img_url.length-2);
			var image = $(document.createElement('img'));
			$(image).attr('src', bg_img_url);
			if (oldNeopetsChrome.ChangeImageByID(image, true /* no_happy */, false /* battledome */, speciesList[petIndex], colourList[petIndex])){
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
      petIndex++;
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
  //make an ajax call to find out the redirected img src
  ((image) => {
    fetch(`https://cakeandturtles.nfshost.com/getRedirect.php?url=${image.attr('src')}`, {
      method: "GET",
    }).then((body) => body.text()).then((response) => {
      //upon success
      //change img tag's src to be the redirected img src
      //and proceed as usual
      response = "http://pets.neopets.com" + response;
      $(image).attr('src', response);
      if (oldNeopetsChrome.ChangeImageByID(image, true /* no_happy */)){
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
    });
  })(image);
}