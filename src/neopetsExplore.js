oldNeopetsChrome.NeopetsExplore = function(){
	oldNeopetsChrome.RevertFaerieland();
}

oldNeopetsChrome.RevertFaerieland = function(){
	// http://www.drsloth.com/view/151216/
  if (location.href === "http://www.neopets.com/faerieland/index.phtml") {
    const flashEmbed = document.querySelector("embed");
    flashEmbed.style.display = "none";
    
    const oldFaerieland = document.createElement("div");
    oldFaerieland.style.textAlign = "center";
    const oldFaerielandImage = document.createElement("img");
    oldFaerielandImage.src = "http://images.neopets.com/faerieland/faerieland.gif";
    oldFaerieland.appendChild(oldFaerielandImage);
    // oldFaerielandImage.setAttribute("usemap", "#image-map");
    $(oldFaerieland).insertBefore(flashEmbed);
  }
	//http://www.w3schools.com/tags/tag_area.asp
}