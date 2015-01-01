function loadScript(scriptName, callback){
	var s = document.createElement('script');
	s.src = chrome.extension.getURL('src/inject/'+scriptName+'.js');
	s.onload = function(){
		this.parentNode.removeChild(this);
		if (callback)
			callback();
	};
	(document.head||document.documentElement).appendChild(s);
}

function loadInit(callback){
	//console.log("0");
	loadScript('neopetsInit', callback);
}

function loadImageIdCollection(callback){
	//console.log("1");
	loadScript('neopetsCollection', callback);
}

function loadNewToOldImage(callback){
	//console.log("2");
	loadScript('neopetsNewToOld', callback);
}

function loadMain(callback){
	//console.log("3");
	loadScript('neopetsMain', callback);
}

loadMain(
	loadNewToOldImage(
		loadImageIdCollection(
			loadInit(function(){
}))));