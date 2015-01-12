oldNeopetsChrome.RemoveBottomImage = function(){
	$(".footerNifty").css("display", "none");
}

oldNeopetsChrome.AddNeofriendNameLinks = function(){
	try{
		for (var i = 0; i < $("form").length; i++){
			if ($($("form")[i]).attr('action') === 'process_neofriend.phtml'){
				var table = $($($('form')[i]).children()[0]);
				var tbody = $(table.children()[0]);

				var friend_rows = tbody.children();
				friend_rows = friend_rows.slice(2, friend_rows.length-3);

				for (var j = 0; j < friend_rows.length; j++){
					var name_entry = $($($(friend_rows[j]).children()[1]).children()[0]);
					var name = $(name_entry).html();
					//replace name_entry with name_link
					var a = document.createElement('a');
					$(a).attr('href', "http://www.neopets.com/userlookup.phtml?user="+name);
					$(a).html(name);
					$(a).css('font-weight', 'bold');
					$(name_entry).replaceWith(a);
				}
			}
		}
	}catch(err){}
}

oldNeopetsChrome.MakeActivePet
oldNeopetsChrome.AddQuickrefToSidebar = function(){
	var url = window.location.href;
	if (url.indexOf("http://www.neopets.com/quickref.phtml") >= 0) return;
	
	var loading_image = $(document.createElement("img"));
	loading_image.attr('src', 'http://images.neopets.com/loading.gif');
		
	var container = $(document.createElement('div'));
	$(container)[0].className = "sidebarModule";
	$(container).css("margin-bottom", "7px");
	$($(".sidebar").children()[0]).after(container);
	$("<link/>", {
	   rel: "stylesheet",
	   type: "text/css",
	   href: "http://cakeandturtles.nfshost.com/quickref.css"
	}).appendTo("head");
	$.getScript("http://images.neopets.com/js/quickref.js", {});
	
	$(container).append(loading_image);
	
	$(container).load("http://www.neopets.com/quickref.phtml #nav", function(){
		$(container).append($("#nav"));
		if (oldNeopetsChrome.change_new_images_to_old)
			oldNeopetsChrome.ChangeAllImages();
		
		$(loading_image).remove();
		$(".active_pet").css("float", "left").css("padding", "0px");
		$(".inactive_pet").css("float", "left").css("padding", "0px");
		togglePetDetails = function(){};
		
		var links = $('a[href^="/process_changepet.phtml"');
		for (var i = 0; i < links.length; i++){
			var link = $(links[i]);
			var href = link.attr('href');
			link.attr('href', 'javascript:;');
			$(link).click(function(hhref){
				console.log(hhref);
				$.ajax(hhref)
					.done(function(){
						window.location.reload();
					});
				
				$(container).after(loading_image);
				$(".oldNeopetsChromeActivePetLink").css("pointer-events", "none");
				for (var j = 0; j < $(".pet_menu_launcher").length; j++){
					if ($($(".pet_menu_launcher")[j]).css("background-image").indexOf("arrow_up") >= 0){
						$($(".pet_menu_launcher")[j]).click();
					}
				}
			}.bind(link, href));
			$(link).addClass("oldNeopetsChromeActivePetLink");
		}
	});
}