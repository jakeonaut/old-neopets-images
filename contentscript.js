var loadScript = function(scriptName, callback){
	var s = document.createElement('script');
	s.src = chrome.extension.getURL('src/'+scriptName+'.js');
	(document.head||document.documentElement).appendChild(s);
	s.onload = function() {
		s.parentNode.removeChild(s);
		callback();
	};
}

var loadVariables = function(callback){
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
		var script = "";
		script = "oldNeopetsChrome.change_new_images_to_old = " + items.change_new_images_to_old + ";\n";
		script += "oldNeopetsChrome.disable_pet_customization = " + items.disable_pet_customization + ";\n";
		script += "oldNeopetsChrome.add_navigation_links = " + items.add_navigation_links + ";\n";
		script += "oldNeopetsChrome.NAVIGATION_DAILIES = "+ items.NAVIGATION_DAILIES +";\n";
		script += "oldNeopetsChrome.NAVIGATION_WORLDS = " + items.NAVIGATION_WORLDS + ";\n";
		script += "oldNeopetsChrome.NAVIGATION_CUSTOM = " + items.NAVIGATION_CUSTOM + ";\n";
		script += "oldNeopetsChrome.custom_navigation_links = [";
		for (var i = 0; i < items.custom_navigation_links.length; i++){
			if (i > 0) script += ", ";
			script += "{name: '" + items.custom_navigation_links[i].name +"', url: '" + items.custom_navigation_links[i].url +"'}";
		}
		script += "];\n";
		script += "oldNeopetsChrome.add_neofriend_name_links = " + items.add_neofriend_name_links + ";\n";
		script += "oldNeopetsChrome.remove_bottom_image = " + items.remove_bottom_image + ";\n";
		script += "oldNeopetsChrome.add_quickref_to_sidebar = " + items.add_quickref_to_sidebar + ";\n";
		
		var script_tag = document.createElement('script');
		script_tag.textContent = script;
		(document.head||document.documentElement).appendChild(script_tag);
		callback();
	});
}

var scripts = ["jquery", "neopetsInit", null, "neopetsCollection", "neopetsAdoption", "neopetsCreate", "neopetsNewToOld", "neopetsMisc", "neopetsNavigation", "neopetsMain"];
var callback = function(){};
for (var i = scripts.length-1; i >= 0; i--){
	if (scripts[i] === null){
		callback = loadVariables.bind(this, callback);
	}else{
		callback = loadScript.bind(this, scripts[i], callback);
	}
}
callback();