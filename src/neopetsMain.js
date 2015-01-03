console.log("neopetsMain");
oldNeopetsChrome.change_new_images_to_old = true;
oldNeopetsChrome.disable_pet_customization = true;
oldNeopetsChrome.remove_bottom_image = true;
oldNeopetsChrome.add_neofriend_name_links = true;

oldNeopetsChrome.add_navigation_links = true;
	oldNeopetsChrome.NAVIGATION_DAILIES = 0;
	oldNeopetsChrome.NAVIGATION_WORLDS = 1;
	oldNeopetsChrome.NAVIGATION_CUSTOM = 2;
	oldNeopetsChrome.navigation_type = oldNeopetsChrome.NAVIGATION_WORLDS;

if (oldNeopetsChrome.add_navigation_links){
	oldNeopetsChrome.AddNavigationLinks();
}

if (oldNeopetsChrome.remove_bottom_image){
	oldNeopetsChrome.RemoveBottomImage();
}

if (oldNeopetsChrome.add_neofriend_name_links){
	oldNeopetsChrome.AddNeofriendNameLinks();
}

if (oldNeopetsChrome.change_new_images_to_old){
	oldNeopetsChrome.ChangeAllImages();
}