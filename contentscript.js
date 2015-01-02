var loadScript = function(scriptName, callback){
	var s = document.createElement('script');
	s.src = chrome.extension.getURL('src/'+scriptName+'.js');
	(document.head||document.documentElement).appendChild(s);
	s.onload = function() {
		s.parentNode.removeChild(s);
		callback();
	};
}

var scripts = ["jquery", "neopetsInit", "neopetsCollection", "neopetsAdoption", "neopetsNewToOld", "neopetsMisc", "neopetsMain"];
var callback = function(){};
for (var i = scripts.length-1; i >= 0; i--){
	callback = loadScript.bind(this, scripts[i], callback);
}
callback();