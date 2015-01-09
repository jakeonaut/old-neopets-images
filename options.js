function save_options(){
	var change_new_images_to_old = document.getElementById("change_new_images_to_old").checked;
	
	var disable_pet_customization = document.getElementById("disable_pet_customization").checked;
	
	var add_navigation_links = document.getElementById("add_navigation_links").checked;
	
	var NAVIGATION_DAILIES = document.getElementById("NAVIGATION_DAILIES").checked;
	var NAVIGATION_WORLDS = document.getElementById("NAVIGATION_WORLDS").checked;
	var NAVIGATION_CUSTOM = document.getElementById("NAVIGATION_CUSTOM").checked;
	var custom_navigation_links = [];
	var all = document.getElementsByTagName("*");
	var nav_link = {name: '', url: ''};
	for (var i = 0; i < all.length; i++){
		if (all[i].className === "nav_name" && all[i].value.length > 0){
			nav_link.name = all[i].value;
		}else if (all[i].className === "nav_url"){
			nav_link.url = all[i].value;
			custom_navigation_links.push(nav_link);
			nav_link = {name: '', url: ''};
		}
	}
	console.log(custom_navigation_links);
	
	var remove_bottom_image = document.getElementById("remove_bottom_image").checked;
	
	var add_neofriend_name_links = document.getElementById("add_neofriend_name_links").checked;
	
	var add_quickref_to_sidebar = document.getElementById("add_quickref_to_sidebar").checked;
	
	///////////
	chrome.storage.sync.set({
		change_new_images_to_old: change_new_images_to_old,
		disable_pet_customization: disable_pet_customization,
		add_navigation_links: add_navigation_links,
		NAVIGATION_DAILIES: NAVIGATION_DAILIES,
		NAVIGATION_WORLDS: NAVIGATION_WORLDS,
		NAVIGATION_CUSTOM: NAVIGATION_CUSTOM,
		custom_navigation_links: custom_navigation_links,
		remove_bottom_image: remove_bottom_image,
		add_neofriend_name_links: add_neofriend_name_links,
		add_quickref_to_sidebar: add_quickref_to_sidebar
	}, 	function(){
		//Update status to let user know options were saved
		var status = document.getElementById("status");
		status.textContent = "Options saved.";
		setTimeout(function(){
			status.textContent = '';
		}, 750);
	});
}

function restore_options(){
	//Use default values
	chrome.storage.sync.get({
		change_new_images_to_old: true,
		disable_pet_customization: false,
		add_navigation_links: true,
		NAVIGATION_DAILIES: true,
		NAVIGATION_WORLDS: true,
		NAVIGATION_CUSTOM: false,
		custom_navigation_links: [],
		remove_bottom_image: true,
		add_neofriend_name_links: true,
		add_quickref_to_sidebar: true
	}, function(items){
		document.getElementById('change_new_images_to_old').checked = items.change_new_images_to_old;
		document.getElementById('disable_pet_customization').checked = items.disable_pet_customization;
		document.getElementById('add_navigation_links').checked = items.add_navigation_links;
		document.getElementById('NAVIGATION_DAILIES').checked = items.NAVIGATION_DAILIES;
		document.getElementById('NAVIGATION_WORLDS').checked = items.NAVIGATION_WORLDS;
		document.getElementById('NAVIGATION_CUSTOM').checked = items.NAVIGATION_CUSTOM;
		
		document.getElementById("custom_nav_links").innerHTML = "";
		console.log(items);
		for (var i = 0; i < items.custom_navigation_links.length; i++){
			var div = document.createElement('div');
			div.id = 'custom_nav_link';
			
			var name = document.createElement('input');
			name.type="text";
			name.className="nav_name";
			console.log(items.custom_navigation_links[i].name);
			name.value = items.custom_navigation_links[i].name;
			console.log(name.value);
			
			var url = document.createElement('input');
			url.type='text';
			url.className="nav_url";
			url.value = items.custom_navigation_links[i].url;
			
			var remove = document.createElement('input');
			remove.type="submit";
			remove.value="Remove Link";
			
			div.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: ";
			div.appendChild(name);
			div.appendChild(document.createTextNode("  url: "));
			div.appendChild(url);
			div.appendChild(remove);
			remove.addEventListener("click", function(event){
				div.parentNode.removeChild(div);
			});
			
			document.getElementById("custom_nav_links").appendChild(div);
		}
		
		document.getElementById('remove_bottom_image').checked = items.remove_bottom_image;
		document.getElementById('add_neofriend_name_links').checked = items.add_neofriend_name_links;
		document.getElementById('add_quickref_to_sidebar').checked = items.add_quickref_to_sidebar;
	});
}

//add the functions as handlers
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

document.getElementById('add_navigation_links').addEventListener('click', function(event){
	if (this.checked){
		document.getElementById('NAVIGATION_DAILIES').disabled = false;
		document.getElementById('NAVIGATION_WORLDS').disabled = false;
		document.getElementById('NAVIGATION_CUSTOM').disabled = false;
	}else{
		document.getElementById('NAVIGATION_DAILIES').disabled = true;
		document.getElementById('NAVIGATION_WORLDS').disabled = true;
		document.getElementById('NAVIGATION_CUSTOM').disabled = true;
	}
});

document.getElementById('NAVIGATION_CUSTOM').addEventListener('click', function(event){
	if (this.checked){
		document.getElementsById('add_custom_nav_link').disabled = false;
		var names_and_urls = document.getElementsByTagName('*');
		for (i in names_and_urls){
			if ((' '+names_and_urls[i].className + ' ').indexOf(' nav_name ') > -1 ||
				(' '+names_and_urls[i].className + ' ').indexOf(' nav_url ') > -1){
					names_and_urls[i].disabled = false;
			}
		}
	}else{
		document.getElementsById('add_custom_nav_link').disabled = true;
		var names_and_urls = document.getElementsByTagName('*');
		for (i in names_and_urls){
			if ((' '+names_and_urls[i].className + ' ').indexOf(' nav_name ') > -1 ||
				(' '+names_and_urls[i].className + ' ').indexOf(' nav_url ') > -1){
					names_and_urls[i].disabled = true;
			}
		}
	}
});

document.getElementById('add_custom_nav_link').addEventListener('click', function(event){
	var div = document.createElement('div');
	div.id = 'custom_nav_link';
	
	var name = document.createElement('input');
	name.type="text";
	name.className="nav_name";
	
	var url = document.createElement('input');
	url.type='text';
	url.className="nav_url";
	
	var remove = document.createElement('input');
	remove.type="submit";
	remove.value="Remove Link";
	
	div.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: ";
	div.appendChild(name);
	div.innerHTML += "&nbsp;&nbsp;url: ";
	div.appendChild(url);
	div.innerHTML += "&nbsp;";
	div.appendChild(remove);
	remove.addEventListener("click", function(event){
		div.parentNode.removeChild(div);
	});
	
	document.getElementById("custom_nav_links").appendChild(div);
});