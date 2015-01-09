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
	
	if (oldNeopetsChrome.NAVIGATION_DAILIES){
		oldNeopetsChrome.AddNavList(explore_list, 
			"Freebies", oldNeopetsChrome.GetClassicDailies());
		oldNeopetsChrome.AddNavList(explore_list,
			"Wheels & Scratchcards", oldNeopetsChrome.GetWheelScratchcards());
		oldNeopetsChrome.AddNavList(explore_list,
			"Daily Chance", oldNeopetsChrome.GetDailyChanceGames());
		oldNeopetsChrome.AddNavList(explore_list,
			"Pay NP Chance", oldNeopetsChrome.GetPaidChanceGames());
		oldNeopetsChrome.AddNavList(explore_list,
			"Quests", oldNeopetsChrome.GetQuests());
	}
	if (oldNeopetsChrome.NAVIGATION_WORLDS){
		oldNeopetsChrome.AddNavList(explore_list,
			"Altador", oldNeopetsChrome.GetAltador(), "http://www.neopets.com/altador/index.phtml");
		oldNeopetsChrome.AddNavList(explore_list,
			"Brightvale", oldNeopetsChrome.GetBrightvale(), "http://www.neopets.com/medieval/brightvale.phtml");
		oldNeopetsChrome.AddNavList(explore_list,
			"Faerieland", oldNeopetsChrome.GetFaerieland(), "http://www.neopets.com/faerieland/index.phtml");
		/*oldNeopetsChrome.AddNavList(explore_list,
			"Haunted Woods", oldNeopetsChrome.GetHauntedWoods(), "http://www.neopets.com/halloween/index.phtml");
		oldNeopetsChrome.AddNavList(explore_list,
			"Kiko Lake", oldNeopetsChrome.GetKikoLake(), "http://www.neopets.com/worlds/index_kikolake.phtml");
		oldNeopetsChrome.AddNavList(explore_list,
			"Krawk Island", oldNeopetsChrome.GetKrawkIsland(), "http://www.neopets.com/pirates/index.phtml");
		oldNeopetsChrome.AddNavList(explore_list,
			"Kreludor", oldNeopetsChrome.GetKreludor(), "http://www.neopets.com/moon/index.phtml");
		oldNeopetsChrome.AddNavList(explore_list,
			"Lutari Island", oldNeopetsChrome.GetLutari(), "http://www.neopets.com/tropical/index.phtml");
		oldNeopetsChrome.AddNavList(explore_list,
			"Maraqua", oldNeopetsChrome.GetMaraqua(), "http://www.neopets.com/water/index.phtml");
		oldNeopetsChrome.AddNavList(explore_list,
			"Meridell", oldNeopetsChrome.GetMeridell(), "http://www.neopets.com/medieval/index.phtml");
		oldNeopetsChrome.AddNavList(explore_list,
			"Moltara", oldNeopetsChrome.GetMoltara(), "http://www.neopets.com/magma/index.phtml");
		oldNeopetsChrome.AddNavList(explore_list,
			"Mystery Island", oldNeopetsChrome.GetMysteryIsland(), "http://www.neopets.com/island/index.phtml");
		oldNeopetsChrome.AddNavList(explore_list,
			"Neopia Central", oldNeopetsChrome.GetNeopiaCentral(), "http://www.neopets.com/objects.phtml");
		oldNeopetsChrome.AddNavList(explore_list,
			"Roo Island", oldNeopetsChrome.GetRooIsland(), "http://www.neopets.com/worlds/index_roo.phtml");
		oldNeopetsChrome.AddNavList(explore_list,
			"Shenkuu", oldNeopetsChrome.GetShenkuu(), "http://www.neopets.com/shenkuu/index.phtml");
		oldNeopetsChrome.AddNavList(explore_list,
			"Terror Mountain", oldNeopetsChrome.GetTerrorMountain(), "http://www.neopets.com/winter/index.phtml");
		oldNeopetsChrome.AddNavList(explore_list,
			"The Lost Desert", oldNeopetsChrome.GetTheLostDesert(), "http://www.neopets.com/desert/index.phtml");
		oldNeopetsChrome.AddNavList(explore_list,
			"Tyrannia", oldNeopetsChrome.GetTyrannia(), "http://www.neopets.com/prehistoric/index.phtml");
		oldNeopetsChrome.AddNavList(explore_list,
			"Virtupets Space Station", oldNeopetsChrome.GetVirtupetsSpaceStation(), "http://www.neopets.com/space/index.phtml");*/
		oldNeopetsChrome.AddNavList(explore_list,
			"Jelly World", oldNeopetsChrome.GetJellyWorld(), "http://www.neopets.com/jelly/");
	}
	if (oldNeopetsChrome.NAVIGATION_CUSTOM){
		oldNeopetsChrome.AddNavList(explore_list,
			"Custom Links", oldNeopetsChrome.custom_navigation_links);
	}
	
	//this is their suckerfish or something script they call
	try{
		startList();
	}catch(err){}
};

oldNeopetsChrome.AddNavList = function(explore_list, name, array_list, link){
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
		if (array_list[i].links !== undefined){
			var ul = document.createElement("ul");
			for (var j = 0; j < array_list[i].links.length; j++){
				var ulli = $(document.createElement('li'));
				var a = $(document.createElement('a'));
				$(a).html("» "+array_list[i].links[j].name);
				$(a).attr('href', array_list[i].links[j].url);
				
				$(ulli).append(a);
				$(ul).append(ulli);
			}
			$(li).append(ul);
		}
		$(actual_list).append(li);
	}
	actual_list.css("list-style-type", "none").css('padding', '0px').css('-webkit-padding-star', '0');
	
	actual_list.css('display', 'none');
	list_container.append(actual_list);
	list_container.css("color", "#ffffff").hover(
		//hover in
		function(e){
			if (link !== undefined){
				list_container.css("color", "#ffff00");
			}
			$(".oldNeopetsChrome_navlist").css("display", "none");
			actual_list.css('display', 'block').css('position', 'absolute');
			actual_list.offset({
				top: list_container.offset().top-5, 
				left: list_container.parent().offset().left + list_container.parent().width()+5
			});
			actual_list.css('background-color', '#000000').css('color', '#ffffff');
			actual_list.css('padding', '5px');
		},
		//hover outerHeight
		function(e){
			$(".oldNeopetsChrome_navlist").css("display", "none");
			$(list_container).css('color', '#ffffff');
		}
	);
	if (link !== undefined){
		list_container.css("cursor", "pointer");
		list_container.click(function(e){
			window.location.href = link;
		});
	}
	$(explore_list).append(list_container);
};

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
};

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
};

oldNeopetsChrome.GetDailyChanceGames = function(){
	return [
		{name: "Tombola", url: "http://www.neopets.com/island/tombola.phtml"},
		{name: "Snowager", url: "http://www.neopets.com/winter/snowager.phtml"},
		{name: "Guess the Marrow", url: "http://www.neopets.com/medieval/guessmarrow.phtml"},
		{name: "Wise Old King", url: "http://www.neopets.com/medieval/wiseking.phtml"},
		{name: "Grumpy Old King", url: "http://www.neopets.com/medieval/grumpyking.phtml"},
		{name: "Deserted Tomb", url: "http://www.neopets.com/worlds/geraptiku/tomb.phtml"},
		{name: "Fruit Machine", url: "http://www.neopets.com/desert/fruitmachine.phtml"},
		{name: "Coltzan's Shrine", url: "http://www.neopets.com/desert/shrine.phtml"},
		{name: "Deadly Dice", url: "http://www.neopets.com/worlds/deadlydice.phtml"},
		{name: "Kreludor Meteor", url: "http://www.neopets.com/moon/meteor.phtml"},
		{name: "Grundo Plushie", url: "http://www.neopets.com/faerieland/tdmbgpop.phtml"},
		{name: "Fishing", url: "http://www.neopets.com/water/fishing.phtml"},
		{name: "Hide n' Seek", url: "http://www.neopets.com/games/hidenseek.phtml"},
		{name: "Qasalan Expellibox", url: "http://www.neopets.com/games/giveaway/giveaway_game.phtml"},
		{name: "Lunar Puzzle", url: "http://www.neopets.com/shenkuu/lunar/"},
		{name: "Potato Counter", url: "http://www.neopets.com/medieval/potatocounter.phtml"},
		{name: "Forgotten Shore", url: "http://www.neopets.com/pirates/forgottenshore.phtml"},
		{name: "Healing Springs", url: "http://www.neopets.com/faerieland/springs.phtml"}		
	];
};

oldNeopetsChrome.GetPaidChanceGames = function(){
	return [
		{name: "Smuggler's Cove", url: "http://www.neopets.com/pirates/smugglerscove.phtml"},
		{name: "Garage Sale", url: "http://www.neopets.com/winter/igloo.phtml"},
		{name: "Buried Treasure", url: "http://www.neopets.com/pirates/buriedtreasure/index.phtml"},
		{name: "Poogle Racing", url: "http://www.neopets.com/faerieland/poogleracing.phtml"},
		{name: "Turdle Racing", url: "http://www.neopets.com/medieval/turdleracing.phtml"},
		{name: "Lever of Doom", url: "http://www.neopets.com/space/strangelever.phtml"},
		{name: "Grarrl Keno", url: "http://www.neopets.com/prehistoric/keno.phtml"},
		{name: "Neopian Lottery", url: "http://www.neopets.com/games/lottery.phtml"},
		{name: "Test Your Strength", url: "http://www.neopets.com/halloween/strtest/index.phtml"},
		{name: "Wishing Well", url: "http://www.neopets.com/wishing.phtml"},
		{name: "Coconut Shy", url: "http://www.neopets.com/halloween/coconutshy.phtml"},
		{name: "Bagatelle", url: "http://www.neopets.com/halloween/bagatelle.phtml"},
		{name: "Cork Gun Gallery", url: "http://www.neopets.com/halloween/corkgun.phtml"},
		{name: "x2 or Nothing", url: "http://www.neopets.com/medieval/doubleornothing.phtml"},
		{name: "Kiss the Mortog", url: "http://www.neopets.com/medieval/kissthemortog.phtml"},
		{name: "Cheeseroller", url: "http://www.neopets.com/medieval/cheeseroller.phtml"},
		{name: "Dice-a-Roo", url: "http://www.neopets.com/games/dicearoo.phtml"},
		{name: "Pick Your Own", url: "http://www.neopets.com/medieval/pickyourown_index.phtml"},
		{name: "Food Club", url: "http://www.neopets.com/pirates/foodclub.phtml?type=bet"},
		{name: "Bargain Stocks", url: "http://www.neopets.com/stockmarket.phtml?type=list&bargain=true"},
		{name: "Snow Wars", url: "http://www.neopets.com/games/game.phtml?game_id=55"},
		{name: "Abandoned Attic", url: "http://www.neopets.com/halloween/garage.phtml"},
		{name: "Faerie Caverns", url: "http://www.neopets.com/faerieland/caverns/index.phtml"},
		{name: "Scorchy Slots", url: "http://www.neopets.com/games/slots.phtml"}
	];
};

oldNeopetsChrome.GetQuests = function(){
	return [
		{name: "Illusen's Quest", url: "http://www.neopets.com/medieval/earthfaerie.phtml"},
		{name: "Jhudora's Quest", url: "http://www.neopets.com/faerieland/darkfaerie.phtml"},
		{name: "Brain Tree Quest", url: "http://www.neopets.com/halloween/braintree.phtml"},
		{name: "Esophagor Quest", url: "http://www.neopets.com/halloween/esophagor.phtml"},
		{name: "Kitchen Quest", url: "http://www.neopets.com/island/kitchen.phtml"},
		{name: "Snow Faerie Quest", url: "http://www.neopets.com/winter/snowfaerie.phtml"},
		{name: "Edna's Quest", url: "http://www.neopets.com/halloween/witchtower.phtml"},
		{name: "Faerie Quest", url: "http://www.neopets.com/quests.phtml"}
	];
};

//LOCATION LINKS
oldNeopetsChrome.GetJellyWorld = function(){
	return [
		{name: "Bouncy Supreme", url: "http://www.neopets.com/games/game.phtml?game_id=532"},
		{name: "Green Jelly", url: "http://www.neopets.com/jelly/greenjelly.phtml"},
		{name: "Giant Jelly", url: "http://www.neopets.com/jelly/jelly.phtml"},
		{name: "Jelly Blobs of Doom", url: "http://www.neopets.com/games/jellyblobs.phtml"},
		{name: "Jelly Foods", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=62"},
		{name: "Colouring Pages", url: "http://www.neopets.com/jelly/colouring_page.phtml"}
	];
};

oldNeopetsChrome.GetAltador = function(){
	return [
		{name: "Altadorian Archives", url: "http://www.neopets.com/altador/archives.phtml"},
		{name: "Hall of Heroes", url: "http://www.neopets.com/altador/hallofheroes.phtml"},
		{name: "Illustrious Armoury", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=94"},
		{name: "Magical Marvels", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=96"},
		{name: "Exquisite Ambrosia", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=95"},
		{name: "Legendary Petpets", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=97"},
		{name: "The Altador Cup", url: "http://www.neopets.com/altador/colosseum/"},
		{name: "The Altadorian Docks", url: "http://www.neopets.com/altador/docks.phtml"},
		{name: "The Restive Tomb", url: "http://www.neopets.com/altador/tomb.phtml"}
	];
};

oldNeopetsChrome.GetBrightvale = function(){
	return [
		{name: "Wise Old King", url: "http://www.neopets.com/medieval/wiseking.phtml"},
		{name: "Wheel of Knowledge", url: "http://www.neopets.com/medieval/knowledge.phtml"},
		{name: "Royal Potionery", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=83"},
		{name: "Brightvale Glaziers", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=79"},
		{name: "The Scrollery", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=78"},
		{name: "Brightvale Books", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=77"},
		{name: "Brightvale Armoury", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=80"},
		{name: "Brightvale Motery", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=82"},
		{name: "Fruits of Brightvale", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=81"}
	];
};

oldNeopetsChrome.GetFaerieland = function(){
	return [
		{name: "Faerie City", url: "http://www.neopets.com/faerieland/faeriecity.phtml", links: [
			{name: "The Hidden Tower", url: "http://www.neopets.com/faerieland/hiddentower938.phtml"},
			{name: "Faerieland Employment Agency", url: "http://www.neopets.com/faerieland/employ/employment.phtml"},
			{name: "Faerie Quests", url: "http://www.neopets.com/quests.phtml"},
			{name: "Faerie Bubbles", url: "http://www.neopets.com/games/game.phtml?game_id=358"},
			{name: "Faerie Petpets", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=40"},
			{name: "Faerie Weapon Shop", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=93"},
			{name: "Colouring Pages", url: "http://www.neopets.com/faerieland/faerie_colour.phtml"},
			{name: "Faerie Paint Brushes", url: "http://www.neopets.com/faerieland/brushes.phtml"},
			{name: "Faerie Foods", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=39"},
			{name: "Faerie Furniture", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=75"},
			{name: "Faerieland Bookshop", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=38"},
			{name: "Personality Quiz", url: "http://www.neopets.com/faerieland/personality.phtml"}
		]},
		{name: "Jhudora's Bluff", url: "http://www.neopets.com/faerieland/darkfaerie.phtml"},
		{name: "Faerie Caverns", url: "http://www.neopets.com/faerieland/caverns/index.phtml"},
		{name: "Poogle Races", url: "http://www.neopets.com/faerieland/poogleracing.phtml"},
		{name: "Wheel of Excitement", url: "http://www.neopets.com/faerieland/wheel.phtml"},
		{name: "Healing Springs", url: "http://www.neopets.com/faerieland/springs.phtml"},
		{name: "Rainbow Fountain", url: "http://www.neopets.com/faerieland/rainbowfountain.phtml"},
	];
};

oldNeopetsChrome.GetHauntedWoods = function(){
	return [	
		{name: "Deserted Fairground", url: "http://www.neopets.com/halloween/index_fair.phtml", links: [
			{name: "Castle Nox", url: "http://www.neopets.com/halloween/fortnox.phtml"},
			{name: "Wheel of Misfortune", url: "http://www.neopets.com/halloween/wheel/index.phtml"},
			{name: "Test Your Strength", url: "http://www.neopets.com/halloween/strtest/index.phtml"},
			{name: "Carnival of Terror", url: "http://www.neopets.com/games/game.phtml?game_id=902"},
			{name: "Coconut Shy", url: "http://www.neopets.com/halloween/coconutshy.phtml"},
			{name: "Scratchcards", url: "http://www.neopets.com/halloween/scratch.phtml"},
			{name: "Spooky Food", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=30"},
			{name: "Bagatelle", url: "http://www.neopets.com/halloween/bagatelle.phtml"},
			{name: "Cork Gun Gallery", url: "http://www.neopets.com/halloween/corkgun.phtml"},
			{name: "Haunted Weaponry", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=59"},
			{name: "Spooky Furniture", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=60"},
			{name: "Ghost Neopets", url: "http://www.neopets.com/halloween/ghostpets.phtml"}
		]},
		{name: "Haunted Marketplace", url: "http://www.neopets.com/halloween/hall_market.phtml"},
		{name: "Brain Tree", url: "http://www.neopets.com/halloween/braintree.phtml"},
		{name: "Stone Dome", url: "http://www.neopets.com/dome/index.phtml?&rndno=398"},
		{name: "Gypsy Camp", url: "http://www.neopets.com/halloween/hwp/gypsy_camp.phtml"},
		{name: "Fetch!", url: "http://www.neopets.com/games/maze/maze.phtml"},
		{name: "Spooky Petpets", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=31"},
		{name: "Castle of Eliv Thade", url: "http://www.neopets.com/games/game.phtml?game_id=230"},
		{name: "Halloween Paint Brushes", url: "http://www.neopets.com/halloween/costumes.phtml"},
		{name: "Edna's Tower", url: "http://www.neopets.com/halloween/witchtower.phtml"},
		{name: "MAGAX: Destroyer II", url: "http://www.neopets.com/games/game.phtml?game_id=763"},
		{name: "Colouring Pages", url: "http://www.neopets.com/halloween/colouring_page.phtml"},
		{name: "Esophagor", url: "http://www.neopets.com/halloween/esophagor.phtml"},
		{name: "Game Graveyard", url: "http://www.neopets.com/halloween/gamegraveyard.phtml"},
		{name: "Haunted House", url: "http://www.neopets.com/halloween/haunted_house.phtml"},
		{name: "Neopet Masks", url: "http://www.neopets.com/halloween/spet_masks.phtml"}
	];
};

oldNeopetsChrome.GetKikoLake = function(){
	return [
		{name: "", url: ""},
	];
};

oldNeopetsChrome.GetKrawkIsland = function(){
	return [
		{name: "", url: ""},
	];
};

oldNeopetsChrome.GetKreludor = function(){
	return [
		{name: "", url: ""},
	];
};

oldNeopetsChrome.GetLutari = function(){
	return [
		{name: "", url: ""},
	];
};

oldNeopetsChrome.GetMaraqua = function(){
	return [
		{name: "", url: ""},
	];
};

oldNeopetsChrome.GetMeridell = function(){
	return [
		{name: "", url: ""},
	];
};

oldNeopetsChrome.GetMoltara = function(){
	return [
		{name: "", url: ""},
	];
};

oldNeopetsChrome.GetMysteryIsland = function(){
	return [
		{name: "", url: ""},
	];
};

oldNeopetsChrome.GetNeopiaCentral = function(){
	return [
		{name: "", url: ""},
	];
};

oldNeopetsChrome.GetRooIsland = function(){
	return [
		{name: "", url: ""},
	];
};

oldNeopetsChrome.GetShenkuu = function(){
	return [
		{name: "", url: ""},
	];
};

oldNeopetsChrome.GetTerrorMountain = function(){
	return [
		{name: "", url: ""},
	];
};

oldNeopetsChrome.GetTheLostDesert = function(){
	return [
		{name: "", url: ""},
	];
};

oldNeopetsChrome.GetTyrannia = function(){
	return [
		{name: "", url: ""},
	];
};

oldNeopetsChrome.GetVirtupetsSpaceStation = function(){
	return [
		{name: "", url: ""},
	];
};