oldNeopetsChrome.RemoveBottomImage = function(){
	$(".footerNifty").css("display", "none");
}

oldNeopetsChrome.AddNeofriendNameLinks = function(){
	try{
		for (var i = 0; i < $("form").length; i++){
			if ($($("form")[i]).attr('action') === 'process_neofriend.phtml'){
				var table = $($($('form')[i]).children()[0]);
				var tbody = $(table.children()[0]);

				var friend_rows = tbody.children();
				friend_rows = friend_rows.slice(2, friend_rows.length-3);

				for (var j = 0; j < friend_rows.length; j++){
					var name_entry = $($($(friend_rows[j]).children()[1]).children()[0]);
					var name = $(name_entry).html();
					//replace name_entry with name_link
					var a = document.createElement('a');
					$(a).attr('href', "http://www.neopets.com/userlookup.phtml?user="+name);
					$(a).html(name);
					$(a).css('font-weight', 'bold');
					$(name_entry).replaceWith(a);
				}
			}
		}
	}catch(err){}
}