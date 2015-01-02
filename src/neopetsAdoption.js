oldNeopetsChrome.AdoptPageScript = function(){
	var url = window.location.href;
	if (url.indexOf("http://www.neopets.com/pound/adopt.phtml") < 0) return;

	try{
		select_pet = function(id) {
			// validate
			if (selected_pet==id || pet_arr[id]===undefined || !document.getElementById('pet'+id+'_name')) {
				return;
			} else {
				selected_pet = id;
			}
			// change select display
			for (var i=0; i<3; i++) {
				if (id!=i && pet_arr[i]!==undefined && document.getElementById('pet'+i+'_name') && !document.getElementById('pet'+i+'_error')) {
					document.getElementById('pet'+i).style.cursor = 'pointer';
					document.getElementById('pet'+i).style.border = '2px solid white';
					document.getElementById('pet'+i+'_price_div').style.backgroundColor = '#ffffff';
					document.getElementById('pet'+i+'_stats_div').style.backgroundColor = '#ffffff';
					document.getElementById('pet'+i+'_img').src = pet_arr[i].sadImg.src;
					document.getElementById('pet'+i+'_name').style.color = 'black';
					document.getElementById('pet'+i+'_name').style.textDecoration = 'none';
					document.getElementById('pet'+i+'_name').style.cursor = 'default';
					//remove name click listener
					document.getElementById('pet'+i+'_name').onclick = function(){};
					//we have not yet tried to calculate the images
					if ($("#pet"+i+"_img").attr('original_sad_src') === undefined){
						$("#pet"+i+"_img").attr('already_changed', true);
						$("#pet"+i+"_img").attr('original_sad_src', $("#pet"+i+"_img").attr('src'));
						$("#pet"+i+"_img").attr('i', i);
						$.ajax({
							type: "GET",
							url: "http://cakeandturtles.nfshost.com/getRedirect.php",
							data: {url: $("#pet"+i+"_img").attr('src')},
							local_image: $("#pet"+i+"_img"),
							//upon success
							//change img tag's src to be the redirected img src
							//and proceed as usual
							success: function(final_url){
								final_url = "http://pets.neopets.com" + final_url;
								$(this.local_image).attr('src', final_url);
								oldNeopetsChrome.ChangeImageByID(this.local_image);
								pet_arr[$(this.local_image).attr('i')].sadImg.src = $(this.local_image).attr('src');
								$(this.local_image)[0].onerror = function(){
									this.onerror = "";
									$(this).attr('src', $(this).attr('original_sad_src'));
									pet_arr[$(this).attr('i')].sadImg.src = $(this).attr('original_sad_src');
								}
							}
						});
					}
				}
			}
			document.getElementById('pet'+id).style.cursor = 'default';
			document.getElementById('pet'+id).style.border = '2px solid green';
			document.getElementById('pet'+id+'_price_div').style.backgroundColor = '#efefef';
			document.getElementById('pet'+id+'_stats_div').style.backgroundColor = '#efefef';
			document.getElementById('pet'+id+'_img').src = pet_arr[id].happyImg.src;
			document.getElementById('pet'+id+'_name').style.color = 'green';
			document.getElementById('pet'+id+'_name').style.textDecoration = 'underline';
			document.getElementById('pet'+id+'_name').style.cursor = 'pointer';
			var pet_name = $("#pet"+id+"_name").html();
			//add click event to open up pet lookup in new tab
			document.getElementById('pet'+id+'_name').onclick = function(){
				window.open('http://www.neopets.com/petlookup.phtml?pet='+pet_name,'_blank');
			};
			//we have not yet tried to calculate the images
			if ($("#pet"+id+"_img").attr('original_happy_src') === undefined){
				$("#pet"+i+"_img").attr('already_changed', true);
				$("#pet"+id+"_img").attr('original_happy_src', $("#pet"+id+"_img").attr('src'));
				$("#pet"+id+"_img").attr('int_id', id);
				$.ajax({
					type: "GET",
					url: "http://cakeandturtles.nfshost.com/getRedirect.php",
					data: {url: $("#pet"+id+"_img").attr('src')},
					local_image: $("#pet"+id+"_img"),
					//upon success
					//change img tag's src to be the redirected img src
					//and proceed as usual
					success: function(final_url){
						final_url = "http://pets.neopets.com" + final_url;
						$(this.local_image).attr('src', final_url);
						oldNeopetsChrome.ChangeImageByID(this.local_image);
						pet_arr[$(this.local_image).attr('int_id')].happyImg.src = $(this.local_image).attr('src');
						$(this.local_image)[0].onerror = function(){
							this.onerror = "";
							$(this).attr('src', $(this).attr('original_happy_src'));
							pet_arr[$(this).attr('int_id')].happyImg.src = $(this).attr('original_happy_src');
						}
					}
				});
			}
		}
		
		var id = selected_pet;
		selected_pet = null;
		select_pet(id);
	}catch(err){
		console.log(err);
	}
}