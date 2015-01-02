//http://stackoverflow.com/questions/2700000/how-to-disable-text-selection-using-jquery
(function($){
    $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
})(jQuery);

oldNeopetsChrome.AddNavigationLinks = function(){
	var navigation = $("#template_nav");
	var nav_buttons = navigation.children();
	var explore_list = $($(nav_buttons[3]).children()[1]);
	oldNeopetsChrome.AddNavList(explore_list, 
		"Freebies", oldNeopetsChrome.GetClassicDailies());
	oldNeopetsChrome.AddNavList(explore_list,
		"Wheels & Scratchcards", oldNeopetsChrome.GetWheelScratchcards());
	
	//this is their suckerfish or something script they call
	startList();
}

oldNeopetsChrome.AddNavList = function(explore_list, name, array_list){
	var list_container = $(document.createElement('li'));
	list_container.html("» "+name);
	list_container.disableSelection();
	var actual_list = $(document.createElement('ul'));
	//actual_list.disableSelection();
	actual_list.addClass("oldNeopetsChrome_navlist");
	for (var i = 0; i < array_list.length; i++){
		var li = $(document.createElement('li'));
		var a = $(document.createElement('a'));
		$(a).html("» "+array_list[i].name);
		$(a).attr('href', array_list[i].url);
		$(li).append(a);
		$(actual_list).append(li);
	}
	
	actual_list.css('display', 'none');
	list_container.append(actual_list);
	list_container.css("color", "#ffffff").css("cursor", "pointer").click(
		function(e){
			if (actual_list.css("display") === "none"){
				$(".oldNeopetsChrome_navlist").css("display", "none");
				actual_list.css('display', 'block');
			}else{
				$(".oldNeopetsChrome_navlist").css("display", "none");
			}
		}
	);
	$(explore_list).append(list_container);
}

oldNeopetsChrome.GetClassicDailies = function(){
	return [
		{name: "Soup Kitchen", url: "http://www.neopets.com/soupkitchen.phtml"},
		{name: "Free Jelly", url: "http://www.neopets.com/jelly/jelly.phtml"},
		{name: "Giant Omelette", url: "http://www.neopets.com/prehistoric/omelette.phtml"},
		{name: "Bank Interest", url: "http://www.neopets.com/bank.phtml"},
		{name: "Money Tree", url: "http://www.neopets.com/donations.phtml"},
		{name: "Second-hand Shoppe", url: "http://www.neopets.com/thriftshoppe/index.phtml"},
		{name: "Rubbish Dump", url: "http://www.neopets.com/medieval/rubbishdump.phtml"},
		{name: "Altador Prizes", url: "http://www.neopets.com/altador/council.phtml"},
		{name: "Shop Till", url: "http://www.neopets.com/market.phtml?type=till"},
		{name: "Shop of Offers", url: "http://www.neopets.com/shop_of_offers.phtml?slorg_payout=yes"},
		{name: "Petpet Park", url: "http://www.neopets.com/petpetpark/daily.phtml"},
		{name: "Monthly Freebies", url: "http://www.neopets.com/freebies/index.phtml"},
		{name: "Movie Central", url: "http://www.neopets.com/moviecentral/index.phtml"},
		{name: "Obsidian Quarry", url: "http://www.neopets.com/magma/quarry.phtml"},
		{name: "Apple Bobbing", url: "http://www.neopets.com/halloween/applebobbing.phtml?"},
		{name: "Anchor Management", url: "http://www.neopets.com/pirates/anchormanagement.phtml"},
		{name: "Negg Cave", url: "http://www.neopets.com/shenkuu/neggcave/"},
		{name: "Battleground of Obelisk", url: "http://www.neopets.com/prehistoric/battleground/"},
		{name: "Grave Danger", url: "http://www.neopets.com/halloween/gravedanger/index.phtml"},
		{name: "The Coincidence", url: "http://www.neopets.com/magma/portal/ship.phtml"},
		{name: "Kiko Pop", url: "http://www.neopets.com/worlds/kiko/kpop/"}
	];
}

oldNeopetsChrome.GetWheelScratchcards = function(){
	return [
		{name: "Wheel of Mediocrity", url: "http://www.neopets.com/prehistoric/mediocrity.phtml"},
		{name: "Wheel of Excitement", url: "http://www.neopets.com/faerieland/wheel.phtml"},
		{name: "Wheel of Misfortune", url: "http://www.neopets.com/halloween/wheel/index.phtml"},
		{name: "Wheel of Knowledge", url: "http://www.neopets.com/medieval/knowledge.phtml"},
		{name: "Wheel of Monotony", url: "http://www.neopets.com/prehistoric/monotony/monotony.phtml"},
		{name: "Wheel of Extravagance", url: "http://www.neopets.com/desert/extravagance.phtml"},
		{name: "NC Archives Wheel", url: "http://www.neopets.com/mall/wheel/"},
		{name: "Winter Scratchcards", url: "http://www.neopets.com/winter/kiosk.phtml"},
		{name: "Spooky Scratchcards", url: "http://www.neopets.com/halloween/scratch.phtml"},
		{name: "Desert Scratchcards", url: "http://www.neopets.com/desert/sc/kiosk.phtml"}
	];
}