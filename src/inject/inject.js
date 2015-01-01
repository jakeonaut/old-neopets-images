function loadScript(scriptName, callback){
	var s = document.createElement('script');
	s.src = chrome.extension.getURL('src/inject/'+scriptName+'.js');
	s.onload = function(){
		this.parentNode.removeChild(this);
		callback();
	};
	(document.head||document.documentElement).appendChild(s);
}

function loadInit(callback){
	loadScript('neopetsInit', callback);
}

function loadImageIdCollection(callback){
	loadScript('neopetsCollection', callback);
}

function loadNewToOldImage(callback){
	loadScript('neopetsOldToNew', callback);
}

function loadMain(callback){
	loadScript('neopetsMain', callback);
}


loadInit(
	loadImageIdCollection(
		loadNewToOldImage(
			loadMain(function(){
}))));