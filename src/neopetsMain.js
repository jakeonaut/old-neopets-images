console.log("neopetsMain");
oldNeopetsChrome.change_new_images_to_old = true;
oldNeopetsChrome.disable_pet_customization = true;
oldNeopetsChrome.remove_bottom_image = true;
oldNeopetsChrome.add_neofriend_name_links = true;

if (oldNeopetsChrome.change_new_images_to_old){
	oldNeopetsChrome.ChangeAllImages();
}

if (oldNeopetsChrome.remove_bottom_image){
	oldNeopetsChrome.RemoveBottomImage();
}
if (oldNeopetsChrome.add_neofriend_name_links){
	oldNeopetsChrome.AddNeofriendNameLinks();
}