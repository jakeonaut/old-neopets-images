console.log("neopetsMain");

//THESE OPTIONS are set in contentscript from chrome storage
/*oldNeopetsChrome.change_new_images_to_old = true;
oldNeopetsChrome.disable_pet_customization = true;
oldNeopetsChrome.remove_bottom_image = true;
oldNeopetsChrome.add_neofriend_name_links = true;
oldNeopetsChrome.add_quickref_to_sidebar = true;

oldNeopetsChrome.add_navigation_links = true;
	oldNeopetsChrome.NAVIGATION_DAILIES = true;
	oldNeopetsChrome.NAVIGATION_WORLDS = true;
	oldNeopetsChrome.NAVIGATION_CUSTOM = true;
	oldNeopetsChrome.custom_navigation_links = [];
*/

if (oldNeopetsChrome.add_navigation_links === true){
	oldNeopetsChrome.AddNavigationLinks();
}

if (oldNeopetsChrome.remove_bottom_image === true){
	oldNeopetsChrome.RemoveBottomImage();
}

if (oldNeopetsChrome.change_new_images_to_old === true){
	oldNeopetsChrome.ChangeAllImages();
}

if ($( "a:contains('Log in')" ).length === 0){
	oldNeopetsChrome.AddQuickrefToSidebar();
}

//other misc, why even have options
oldNeopetsChrome.AddNeofriendNameLinks();
oldNeopetsChrome.LinkToConcertHall();