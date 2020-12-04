  //http://stackoverflow.com/questions/2700000/how-to-disable-text-selection-using-jquery
if (window.jQuery) {
  (function($){
      $.fn.disableSelection = function() {
          return this
                   .attr('unselectable', 'on')
                   .css('user-select', 'none')
                   .on('selectstart', false);
      };
  })(jQuery);
}

oldNeopetsChrome.AddNavigationLinks = function(){
	var navigation = $("#template_nav");
	var nav_buttons = navigation.children();
	var explore_list = $($(nav_buttons[3]).children()[1]);
	var games_list = $($(nav_buttons[2]).children()[1]);
	
	oldNeopetsChrome.AddNavList(games_list,
		"Featured Game", [], "http://www.neopets.com/games/featuredgame/");
	
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
		oldNeopetsChrome.AddNavList(explore_list,
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
			"Virtupets Space Station", oldNeopetsChrome.GetVirtupetsSpaceStation(), "http://www.neopets.com/space/index.phtml");
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

oldNeopetsChrome.AddNavList = function(parent_list, name, child_list, link){
	oldNeopetsChrome.AddNavListRecursive(parent_list, name, child_list, link, 1);
}

oldNeopetsChrome.AddNavListRecursive = function(parent_list, name, child_list, link, depth){
	var list_container = $(document.createElement('li'));
	var a = $(document.createElement('a'));
	a.html("» "+name);
	if (link === undefined) link = "#";
	a.attr('href', link);
	
	list_container.append(a);
	if (child_list.length > 0){
		var actual_list = $(document.createElement('ul'));
		actual_list.addClass("oldNeopetsChrome_navlist");
		actual_list.addClass("onc_nav_depth_"+depth);
		for (var i = 0; i < child_list.length; i++){
			var li = $(document.createElement('li'));
			$(li).css("color", "#ffffff");
			if (child_list[i].links !== undefined){
				oldNeopetsChrome.AddNavListRecursive(actual_list, child_list[i].name, child_list[i].links, child_list[i].url, depth+1);
			}else{
				var a = $(document.createElement('a'));
				$(a).html("» "+child_list[i].name);
                $(a).css("color", "#ffffff");
                $(a).hover(
                    //hover in
                    function(e){
                        this.css("color", "#ffff00");
                    }.bind(a),
                    //hover out
                    function(e){
                        this.css("color", "#ffffff");
                    }.bind(a)
                );
				$(a).attr('href', child_list[i].url);
				$(li).append(a);
			}
			$(actual_list).append(li);
		}
		
		actual_list.css("list-style-type", "none").css('padding', '0px').css('-webkit-padding-star', '0');
		
		actual_list.css('display', 'none');
		list_container.append(actual_list);
		list_container.hover(
			//hover in
			function(e){
				if (link !== undefined){
					list_container.css("color", "#ffff00");
				}
				$(".onc_nav_depth_"+depth).css("display", "none");
				actual_list.css('display', 'block').css('position', 'absolute');
				actual_list.offset({
					top: list_container.offset().top-5, 
					left: list_container.parent().offset().left + list_container.parent().width()+5
				});
				actual_list.css('background-color', '#000000').css('color', '#ffffff');
				actual_list.css('padding', '5px');
			},
			//hover out
			function(e){
				$(".onc_nav_depth_"+depth).css("display", "none");
				$(list_container).css('color', '#ffffff');
			}
		);
	}
	
	list_container.css("color", "#ffffff");
	$(parent_list).append(list_container);
}

/***************************************************/

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
		{name: "Bargain Stocks", url: "http://www.neopets.com/stockmarket.phtml?type=list&bargain=true"},
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
		{name: "Glass Bottom Boat Tours", url: "http://www.neopets.com/worlds/kiko/glass_boat.phtml"},
		{name: "Kiko Lake Carpentry", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=67"},
		{name: "Kiko Pop", url: "http://www.neopets.com/worlds/kiko/kpop/"},
		{name: "Kiko Lake Treats", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=66"},
		{name: "Colouring Pages", url: "http://www.neopets.com/worlds/kiko/colouring_page.phtml"},
	];
};

oldNeopetsChrome.GetKrawkIsland = function(){
	return [
		{name: "Forgotten Shore", url: "http://www.neopets.com/pirates/forgottenshore.phtml"},
		{name: "Keep Out!", url: "http://www.neopets.com/pirates/keepout.phtml"},
		{name: "Smuggler's Cove", url: "http://www.neopets.com/pirates/smugglerscove.phtml"},
		{name: "The Academy", url: "http://www.neopets.com/pirates/academy.phtml"},
		{name: "The Golden Dubloon", url: "http://www.neopets.com/pirates/restaurant.phtml"},
		{name: "Dubloon-O-Matic", url: "http://www.neopets.com/pirates/dubloonomatic.phtml"},
		{name: "Governor's Mansion", url: "www.neopets.com/pirates/mansion.phtml", links: [
			{name: "Anchor Management", url: "http://www.neopets.com/pirates/anchormanagement.phtml"}
		]},
		{name: "Warf Wharf", url: "http://www.neopets.com/pirates/warfwharf.phtml", links: [
			{name: "Colouring Pages", url: "http://www.neopets.com/pirates/colouring.phtml"},
			{name: "Krawps", url: "http://www.neopets.com/pirates/krawps.phtml"},
			{name: "Krawk Cup", url: "http://www.neopets.com/pirates/championship.phtmls"},
			{name: "Bilge Dice", url: "http://www.neopets.com/pirates/bilge.phtml"},
			{name: "Food Club", url: "http://www.neopets.com/pirates/foodclub.phtml"},
			{name: "Krawk Fashions", url: "http://www.neopets.com/pirates/fashion.phtml"},
			{name: "Little Nippers", url: "http://www.neopets.com/pirates/piratepets.phtml"}
		]},
		{name: "Buried Treasure", url: "http://www.neopets.com/pirates/buriedtreasure/index.phtml"},
		{name: "Armada", url: "http://www.neopets.com/games/armada/armada.phtml"}
	];
};

oldNeopetsChrome.GetKreludor = function(){
	return [
		{name: "Kreludan Mining Corp", url: "http://www.neopets.com/moon/mining.phtml"},
		{name: "Booktastic Books", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=70"},
		{name: "Cafe Kreludor", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=72"},
		{name: "Neocola Machine", url: "http://www.neopets.com/moon/neocola.phtml"},
		{name: "Kreludan Homes", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=71"},
		{name: "Colouring Pages", url: "http://www.neopets.com/moon/colour.phtml"},
		{name: "Kreludor Meteor", url: "http://www.neopets.com/moon/meteor.phtml"}
	];
};

oldNeopetsChrome.GetLutari = function(){
	return [];
};

oldNeopetsChrome.GetMaraqua = function(){
	return [
		{name: "Maraquan Ruins", url: "www.neopets.com/water/index_ruins.phtml", links: [
			{name: "Ye Olde Fishing Vortex", url: "http://www.neopets.com/water/fishing.phtml"},
			{name: "Colouring Pages", url: "http://www.neopets.com/water/maraqua_colour.phtml"},
			{name: "Whirlpool", url: "http://www.neopets.com/games/game.phtml?game_id=927"},
			{name: "Bubbling Pit", url: "http://www.neopets.com/water/bubblingpit.phtml"},
			{name: "Attack of the Revenge", url: "http://www.neopets.com/games/game.phtml?game_id=527"}
		]},
		{name: "Maraquan Battledome Items", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=87"},
		{name: "Maraquan Petpets", url: "www.neopets.com/objects.phtml?type=shop&obj_type=88"},
		{name: "Petpet Plunge", url: "http://www.neopets.com/games/game.phtml?game_id=1078"},
		{name: "Kelp", url: "http://www.neopets.com/water/restaurant.phtml"},
		{name: "Maraquan Neohomes", url: "http://www.neopets.com/neohome/"},
		{name: "Collectable Sea Shells", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=86"},
		{name: "Jubble Bubble", url: "http://www.neopets.com/games/game.phtml?game_id=619"}
	];
};

oldNeopetsChrome.GetMeridell = function(){
	return [
		{name: "Meri Acres Farm", url: "http://www.neopets.com/medieval/index_farm.phtml", links: [
			{name: "Pick Your Own", url: "http://www.neopets.com/medieval/pickyourown_index.phtml"},
			{name: "Attack of the Slorgs", url: "http://www.neopets.com/games/slorgattack.phtml"},
			{name: "Extreme Potato Counter", url: "http://www.neopets.com/games/epc.phtml"},
			{name: "Potato Counter", url: "http://www.neopets.com/medieval/potatocounter.phtml"},
			{name: "Rubbish Dump", url: "http://www.neopets.com/medieval/rubbishdump.phtml"},
			{name: "Guess the Weight", url: "http://www.neopets.com/medieval/guessmarrow.phtml"}
		]},
		{name: "Meridell Castle", url: "http://www.neopets.com/medieval/index_castle.phtml", links: [
			{name: "Double or Nothing", url: "http://www.neopets.com/medieval/doubleornothing.phtml"},
			{name: "Kayla's Potion Shop", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=73"},
			{name: "Grumpy Old King", url: "http://www.neopets.com/medieval/grumpyking.phtml"},
			{name: "Invasion of Meridell", url: "http://www.neopets.com/games/iom/index.phtml"},
			{name: "Escape from Meridell Castle", url: "http://www.neopets.com/games/play.phtml?game_id=197"}
		]},
		{name: "Darigan Citadel", url: "http://www.neopets.com/medieval/index_evil.phtml", links: [
			{name: "Lord Darigan's Chambers", url: "http://www.neopets.com/medieval/dariganschambers.phtml"},
			{name: "Cell Block", url: "http://www.neopets.com/games/cellblock/cellblock.phtml"},
			{name: "Petpet Arena", url: "http://www.neopets.com/games/petpet_battle/index.phtml"},
			{name: "Darigan Toys", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=74"},
			{name: "Minions of Darigan", url: "http://www.neopets.com/medieval/minions.phtml"},
			{name: "Darigan Colouring", url: "http://www.neopets.com/medieval/colouring.phtml"}
		]},
		{name: "Turmaculus", url: "http://www.neopets.com/medieval/turmaculus.phtml"},
		{name: "Cheese Roller", url: "http://www.neopets.com/medieval/cheeseroller.phtml"},
		{name: "Illusen's Glade", url: "http://www.neopets.com/medieval/earthfaerie.phtml"},
		{name: "Ultimate Bullseye", url: "http://www.neopets.com/games/bullseye.phtml"},
		{name: "Round Table Poker", url: "http://www.neopets.com/games/draw_poker/round_table_poker.phtml"},
		{name: "Turdle Racing", url: "http://www.neopets.com/medieval/turdleracing.phtml"},
		{name: "Ye Olde Food Shoppe", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=56"},
		{name: "Kiss The Morthog", url: "http://www.neopets.com/medieval/kissthemortog.phtml"},
		{name: "Ye Olde Petpets", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=57"},
		{name: "Shape Shifter", url: "http://www.neopets.com/medieval/shapeshifter_index.phtml"}
	];
};

oldNeopetsChrome.GetMoltara = function(){
	return [
		{name: "The Caves", url: "", links: [
			{name: "Dark Cave", url: "http://www.neopets.com/magma/darkcave.phtml"},
			{name: "The Gilded Page", url: "http://www.neopets.com/magma/magma_colour.phtml"},
			{name: "The Arcanium", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=114"},
			{name: "Magma Pool", url: "www.neopets.com/magma/pool.phtml"},
			{name: "The Petpetorium", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=113"},
			{name: "Igneot's Cavern", url: "http://www.neopets.com/magma/igneot.phtml"}
		]},
		{name: "Tangor's Workshop", url: "http://www.neopets.com/magma/workshop.phtml"},
		{name: "Town Hall", url: "http://www.neopets.com/magma/townhall.phtml"},
		{name: "Cave Glider", url: "http://www.neopets.com/games/game.phtml?game_id=1156"},
		{name: "Lampwych's Lights Fantastic", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=110"},
		{name: "Tunnel Tumble", url: "http://www.neopets.com/games/game.phtml?game_id=1175"},
		{name: "Cog's Togs", url: "www.neopets.com/objects.phtml?type=shop&obj_type=111"},
		{name: "Molten Morsels", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=112"}
	];
};

oldNeopetsChrome.GetMysteryIsland = function(){
	return [
		{name: "Lost City of Geraptiku", url: "http://www.neopets.com/worlds/index_geraptiku.phtml", links: [
			{name: "Deserted Tomb", url: "http://www.neopets.com/worlds/geraptiku/tomb.phtml"},
			{name: "Petpet Shop", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=89"},
			{name: "Colouring Pages", url: "http://www.neopets.com/worlds/geraptiku/colouring.phtml"},
		]},
		{name: "Island Mystic", url: "http://www.neopets.com/island/mystichut.phtml"},
		{name: "Cooking Pot", url: "http://www.neopets.com/island/cookingpot.phtml"},
		{name: "Rock Pool", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=27"},
		{name: "Trading Post", url: "http://www.neopets.com/island/tradingpost.phtml"},
		{name: "Techo Mtn", url: "http://www.neopets.com/island/volcano_codestone.phtml"},
		{name: "Gadgads Game", url: "http://www.neopets.com/games/gadgadsgame.phtml"},
		{name: "Training School", url: "http://www.neopets.com/island/training.phtml"},
		{name: "The Beach", url: "http://www.neopets.com/island/beach.phtml"},
		{name: "Island Arena", url: "http://www.neopets.com/island/abandonedarena.phtml"},
		{name: "Tiki Tours", url: "http://www.neopets.com/island/tikitours.phtml"},
		{name: "Haiku Generator", url: "http://www.neopets.com/island/haiku/haiku.phtml"},
		{name: "Kitchen Quest", url: "http://www.neopets.com/island/kitchen.phtml"},
		{name: "Island Market", url: "http://www.neopets.com/island/island_market.phtml"},
		{name: "Tropical Foods", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=20"},
		{name: "Tombola", url: "http://www.neopets.com/island/tombola.phtml"},
		{name: "Beach Volleyball", url: "http://www.neopets.com/games/volleyball.phtml"},
		{name: "Tiki Tack", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=21"},
		{name: "Harbour", url: "http://www.neopets.com/island/return.phtml"}
	];
};

oldNeopetsChrome.GetNeopiaCentral = function(){
	return [
		{name: "Neopian Bazaar", url: "http://www.neopets.com/market_bazaar.phtml", links: [
			{name: "Petpet Supplies", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=69"},
			{name: "Zazzle T-shirts", url: "http://www.zazzle.com/neopets"},
			{name: "Neohome Superstore", url: "http://www.neopets.com/neohome/shop"},
			{name: "Health Food", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=16"},
			{name: "Toy Shop", url: "www.neopets.com/objects.phtml?type=shop&obj_type=3"},
			{name: "Wizards Shop", url: "http://www.neopets.com/tcg/home.phtml?sc9ejf2=33651"},
			{name: "Grooming Parlour", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=5"},
			{name: "Chocolate Factory", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=14"},
			{name: "Defence Magic", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=10"},
			{name: "Usuki Land", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=48"},
			{name: "Hubert's Hotdogs", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=46"},
			{name: "Fresh Smoothies", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=18"},
			{name: "Uni's Clothing", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=4"},
			{name: "Gifts Galore", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=17"},
			{name: "Gardening Supplies", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=12"},
			{name: "The Bakery", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=15"},
			{name: "Battle Magic", url: "www.neopets.com/objects.phtml?type=shop&obj_type=9"},
			{name: "Fine Furniture", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=41"},
			{name: "Collectable Card Shop", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=8"}
		]},
		{name: "Neopian Plaza", url: "http://www.neopets.com/market_plaza.phtml", links: [
			{name: "Kadoatery", url: "http://www.neopets.com/games/kadoatery/index.phtml"},
			{name: "Wishing Well", url: "http://www.neopets.com/wishing.phtml"},
			{name: "Alien Vending Machine", url: "http://www.neopets.com/vending.phtml"},
			{name: "Plushie Shop", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=98"},
			{name: "Welcome Center", url: "http://www.neopets.com/petcentral.phtml"},
			{name: "Hospital", url: "http://www.neopets.com/hospital.phtml"},
			{name: "Defenders HQ", url: "http://www.neopets.com/games/defenders_choose.phtml"},
			{name: "Pizzaroo", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=47"},
			{name: "Second-Hand Shoppe", url: "http://www.neopets.com/thriftshoppe/index.phtml"},
			{name: "School Supplies", url: "www.neopets.com/objects.phtml?type=shop&obj_type=53"},
			{name: "Music Shop", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=84"},
			{name: "The Pound", url: "http://www.neopets.com/pound/"}
		]},
		{name: "Art Centre", url: "http://www.neopets.com/art/", links: [
			{name: "Art Gallery", url: "http://www.neopets.com/art/gallery.phtml"},
			{name: "How To Draw", url: "http://www.neopets.com/art/drawing.phtml"},
			{name: "Poetry Contest", url: "http://www.neopets.com/contributions_poems.phtml"},
			{name: "Coin Shop", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=68"},
			{name: "Coffee Shop", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=34"},
			{name: "Neopian Times", url: "http://www.neopets.com/ntimes/index.phtml"},
			{name: "Story Telling", url: "http://www.neopets.com/art/storytell.phtml"}
		]},
		{name: "Auction House", url: "http://www.neopets.com/auctions.phtml"},
		{name: "Neopian Bank", url: "http://www.neopets.com/bank.phtml"},
		{name: "Food Shop", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=1"},
		{name: "Book Shop", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=7"},
		{name: "General Store", url: "http://www.neopets.com/generalstore.phtml"},
		{name: "Petpet Shop", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=25"},
		{name: "Money Tree", url: "http://www.neopets.com/donations.phtml"},
		{name: "Rainbow Pool", url: "http://www.neopets.com/pool/"},
		{name: "NC Mall", url: "http://ncmall.neopets.com/mall/shop.phtml?page=&cat="},
		{name: "Post Office", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=58"},
		{name: "Neolodge", url: "http://www.neopets.com/neolodge.phtml"},
		{name: "Magic Shop", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=2"},
		{name: "Pharmacy", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=13"},
		{name: "Movie Central", url: "http://www.neopets.com/moviecentral/index.phtml"}
	];
};

oldNeopetsChrome.GetRooIsland = function(){
	return [
		{name: "Blumaroll", url: "http://ncmall.neopets.com/mall/shop.phtml?page=blumaroll"},
		{name: "Roo Island Properties", url: "www.neopets.com/neohome/"},
		{name: "Poetry Contest", url: "http://www.neopets.com/contributions_poems.phtml"},
		{name: "Art Gallery", url: "http://www.neopets.com/art/gallery.phtml"},
		{name: "Colouring Pages", url: "http://www.neopets.com/worlds/roo/colouring_page.phtml"},
		{name: "Coffee Shop", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=34"},
		{name: "Merry Go Round", url: "http://www.neopets.com/worlds/roo/merrygoround.phtml"},
		{name: "Dice-A-Roo", url: "http://www.neopets.com/games/dicearoo.phtml"},
		{name: "Deadly Dice", url: "http://www.neopets.com/worlds/deadlydice.phtml"},
		{name: "Souvenirs", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=76"},
		{name: "Spring Shop", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=116"},
		{name: "Games Room", url: "http://www.neopets.com/games/"},
		{name: "Storytelling", url: "http://www.neopets.com/art/storytell.phtml"},
		{name: "How To Draw", url: "http://www.neopets.com/art/drawing.phtml"}
	];
};

oldNeopetsChrome.GetShenkuu = function(){
	return [
		{name: "Lunar Temple", url: "http://www.neopets.com/shenkuu/lunar/"},
		{name: "Remarkable Restoratives", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=102"},
		{name: "Culinary Concoctions", url: "http://www.neopets.com/shenkuu/cooking.phtml"},
		{name: "Exotic Foods", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=101"},
		{name: "Wonderous Weaponry", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=100"},
		{name: "Kuo-Jong", url: "http://www.neopets.com/games/game.phtml?game_id=707"},
		{name: "Noda's Fortune Cookies", url: "http://ncmall.neopets.com/mall/fortune/"}
	];
};

oldNeopetsChrome.GetTerrorMountain = function(){
	return [
		{name: "Top of the Mountain", url: "", links: [
			{name: "Dar-BLAT!!!", url: "www.neopets.com/games/game.phtml?game_id=895"},
			{name: "Snow Faerie Quests", url: "http://www.neopets.com/winter/snowfaerie.phtml"},
			{name: "Terror Mountain Tilt", url: "http://www.neopets.com/games/game.phtml?game_id=925"},
			{name: "Super Happy Icy Fun Snow Shop", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=37"},
			{name: "Snowbeast Snackrifice", url: "http://www.neopets.com/games/game.phtml?game_id=818"},
			{name: "Toy Repair Shop", url: "http://www.neopets.com/winter/brokentoys.phtml"},
			{name: "Garage Sale Game", url: "http://www.neopets.com/games/game.phtml?game_id=676"},
			{name: "Igloo Garage Sale", url: "http://www.neopets.com/winter/igloo.phtml"},
			{name: "Snow Wars 2", url: "http://www.neopets.com/games/game.phtml?game_id=544"},
			{name: "Snow Roller", url: "http://www.neopets.com/games/game.phtml?game_id=1076"},
			{name: "Shop of Mystery", url: "http://www.neopets.com/winter/shopofmystery.phtml"}
		]},
		{name: "Ice Caves", url: "", links: [
			{name: "The Snowager", url: "http://www.neopets.com/winter/snowager.phtml"},
			{name: "Snowmuncher", url: "http://www.neopets.com/games/game.phtml?game_id=412"},
			{name: "Ice Arena", url: "http://www.neopets.com/dome/index.phtml?battle_location=2&rnd=1406759480&rndno=910"},
			{name: "Colouring Pages", url: "http://www.neopets.com/winter/colouring.phtml"},
			{name: "Hannah and the Ice Caves", url: "http://www.neopets.com/games/game.phtml?game_id=473"},
			{name: "Let it Slide", url: "http://www.neopets.com/games/game.phtml?game_id=970"},
			{name: "Ice Crystal Shop", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=36"},
			{name: "The Neggery", url: "http://www.neopets.com/winter/neggery.phtml"}
		]},
		{name: "Scratch Card Kiosk", url: "http://www.neopets.com/winter/kiosk.phtml"},
		{name: "Gift Tags", url: "http://www.neopets.com/winter/present_tags.phtml"},
		{name: "Ice Cream Machine", url: "http://www.neopets.com/games/game.phtml?game_id=507"},
		{name: "Advent Calendar", url: "http://www.neopets.com/winter/adventcalendar.phtml"},
		{name: "Snowball Fight", url: "http://www.neopets.com/games/game.phtml?game_id=633"},
		{name: "Slushie Shop", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=35"},
		{name: "Rink Runner", url: "http://www.neopets.com/games/game.phtml?game_id=220"},
		{name: "Ice Cream Cart", url: "http://www.neopets.com/winter/icecream.phtml"},
		{name: "Merry Outfits", url: "http://www.neopets.com/winter/merryoutfits.phtml"},
		{name: "Wintery Petpets", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=61"}
	];
};

oldNeopetsChrome.GetTheLostDesert = function(){
	return [
		{name: "Pyramids Game", url: "www.neopets.com/games/pyramids/"},
		{name: "Sutek's Tomb", url: "http://www.neopets.com/games/game.phtml?game_id=306"},
		{name: "Coltzan's Shrine", url: "http://www.neopets.com/desert/shrine.phtml"},
		{name: "City of Sakhmet", url: "http://www.neopets.com/desert/sakhmet.phtml", links: [
			{name: "Petpet Stall", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=50"},
			{name: "Food Stall", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=49"},
			{name: "Colouring Pages", url: "http://www.neopets.com/desert/colouringpages.phtml"},
			{name: "Scarab 21", url: "http://www.neopets.com/games/scarab21/"},
			{name: "Osiris Pottery", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=55"},
			{name: "Sakhmet Solitaire", url: "http://www.neopets.com/games/sakhmet_solitaire/index.phtml"},
			{name: "Battle Supplies", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=54"},
			{name: "Emergency Supplies", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=85"},
			{name: "Geos", url: "http://www.neopets.com/games/lobby/mp_lobby.phtml"},
			{name: "Fruit Machine", url: "http://www.neopets.com/desert/fruit/index.phtml"},
			{name: "Scratch Cards", url: "http://www.neopets.com/desert/sc/kiosk.phtml"},
			{name: "Sutek's Scrolls", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=51"},
			{name: "Paintbrush Stall", url: "http://www.neopets.com/desert/paintbrushes.phtml"},
		]},
		{name: "City of Qasala", url: "http://www.neopets.com/desert/qasala.phtml", links: [
			{name: "Words of Antiquity", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=92"},
			{name: "Desert Arms", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=91"},
			{name: "Mystical Surroundings", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=108"},
			{name: "Qasan Delights", url: "www.neopets.com/objects.phtml?type=shop&obj_type=90"}
		]},
		{name: "Tug-O-War", url: "http://www.neopets.com/games/game.phtml?game_id=909"},
		{name: "Swarm!", url: "http://www.neopets.com/games/game.phtml?game_id=562"}
	];
};

oldNeopetsChrome.GetTyrannia = function(){
	return [
		{name: "Plateau", url: "http://www.neopets.com/prehistoric/plateau.phtml", links: [
			{name: "Lair of the Beast", url: "www.neopets.com/prehistoric/thebeast.phtml"},
			{name: "Giant Omelette", url: "http://www.neopets.com/prehistoric/omelette.phtml?rand=11996"},
			{name: "Wheel of Monotony", url: "http://www.neopets.com/prehistoric/monotony/monotony.phtml"},
			{name: "Tyrannian Arena", url: "http://www.neopets.com/dome/"},
			{name: "Battleground", url: "http://www.neopets.com/prehistoric/battleground/"},
			{name: "Tyrannian War Memorial", url: "http://www.neopets.com/neopedia.phtml?neopedia_id=291"},
			{name: "Town Hall", url: "http://www.neopets.com/prehistoric/townhall.phtml"},
			{name: "Ticket Booth", url: "http://www.neopets.com/prehistoric/ticketbooth.phtml"},
			{name: "Concert Hall", url: "http://www.neopets.com/prehistoric/concerthall.phtml"},
			{name: "Destruct-O-Match III", url: "www.neopets.com/games/game.phtml?game_id=999"},
			{name: "Tyrannian Food", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=42"}
		]},
		{name: "Cave Paintings", url: "http://www.neopets.com/prehistoric/painting.phtml"},
		{name: "Tyrannian Petpets", url: "http://www.neopets.com/prehistoric/painting.phtml"},
		{name: "Wheel of Mediocrity", url: "www.neopets.com/prehistoric/mediocrity.phtml"},
		{name: "Tyrannian Weaponry", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=45"},
		{name: "Furniture", url: "www.neopets.com/objects.phtml?type=shop&obj_type=43"},
		{name: "Village", url: "http://www.neopets.com/prehistoric/village.phtml"},
		{name: "Ugga Shinies", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=117"}
	];
};

oldNeopetsChrome.GetVirtupetsSpaceStation = function(){
	return [
		{name: "Recreation Deck", url: "http://www.neopets.com/space/recreation.phtml", links: [
			{name: "Gormball", url: "http://www.neopets.com/space/gormball.phtml"},
			{name: "Splat-a-Sloth", url: "http://www.neopets.com/games/game.phtml?game_id=81"},
			{name: "Space Battledome Arena", url: "www.neopets.com/dome/index.phtml?battle_location=4"},
			{name: "Evil Fuzzles From Beyond The Stars", url: "http://www.neopets.com/games/game.phtml?game_id=585"},
			{name: "Spell or Starve", url: "www.neopets.com/games/game.phtml?game_id=202"},
			{name: "Grundo's Cafe", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=22"}
		]},
		{name: "Hangar", url: "http://www.neopets.com/space/hangar.phtml", links: [
			{name: "The Return of the Return of Dr. Sloth", url: "www.neopets.com/games/game.phtml?game_id=480"},
			{name: "Neverending Boss Battle", url: "http://www.neopets.com/games/game.phtml?game_id=552"},
			{name: "Typing Terror", url: "http://www.neopets.com/games/game.phtml?game_id=574"}
		]},
		{name: "Space Weaponry", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=23"},
		{name: "Space Armour", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=24"},
		{name: "Lever of Doom", url: "http://www.neopets.com/space/strangelever.phtml"},
		{name: "Space Petpets", url: "http://www.neopets.com/objects.phtml?type=shop&obj_type=26"},
		{name: "Grundo Warehouse", url: "http://www.neopets.com/space/warehouse/prizecodes.phtml"},
		{name: "Adopt a Grundo", url: "http://www.neopets.com/space/spaceadoption.phtml"}
	];
};
