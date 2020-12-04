console.log("Neopets Collection Helper");

oldNeopetsChrome.ChangeImage = function(image, new_img_id, old_img_postfix, no_happy = false, battledome = false){
	var old_img_url = "http://images.neopets.com/pets/";
	var change = false;
	//HAPPY
	if ($(image).attr('src').indexOf(new_img_id+"1/") >= 0){
    if (battledome) {
      old_img_url += "rangedattack/";
    } else if (!no_happy) {
      old_img_url += "happy/";
    }
		change = true;
	}
	//SAD
	else if ($(image).attr('src').indexOf(new_img_id+"2/") >= 0){
    if (battledome) {
      old_img_url += "defended/";
    } else {
      old_img_url += "sad/";
    }
		change = true;
	}
	//ANGRY
	else if ($(image).attr('src').indexOf(new_img_id+"3/") >= 0){
    if (battledome) {
      old_img_url += "closeattack/";
    } else {
      old_img_url += "angry/";
    }
		change = true;
	}
	//ILL
	else if ($(image).attr('src').indexOf(new_img_id+"4/") >= 0){
    if (battledome) {
      old_img_url += "hit/";
    } else {
      old_img_url += "beaten/";
    }
		change = true;
	}
	
	if (!change) return false;
	old_img_url += old_img_postfix;
	$(image).attr('src', old_img_url);
	return true;
}

oldNeopetsChrome.TryChangeImage = function(image, colour, species, new_ids, no_happy = false, battledome = false){
  let suffix = "_baby.gif";
  if (battledome) {
    suffix = "_right.gif";
  }
	for (var i = 0; i < new_ids.length; i++){
		if (oldNeopetsChrome.ChangeImage(image, '/' + new_ids[i] + '/', species + '_' + colour + suffix, no_happy, battledome)) 
			return true;
	}
}

oldNeopetsChrome.ChangechangeImage = function(colour, image){
	return function(new_ids, species){
		for (var i = 0; i < new_ids.length; i++){
			if (oldNeopetsChrome.ChangeImage(image, '/' + new_ids[i] + '/', species + '_' + colour + '_baby.gif')) 
				return true;
		}
	}
}

oldNeopetsChrome.ChangeImageByManualID = function(image, no_happy = false, battledome = false){
	var collection = [];
	var addToCollection = function(colour, arr){
		for (var i = 0; i < arr.length; i++){
			var obj = {colour: colour, species: arr[i][0], ids: arr[i][1]};
			collection.push(obj);
		}
	};
	
	//manually added pets (deluxe pets not caught by original id scrape)
	addToCollection('baby', [
		['elephante', ['gvj8c7rn']], ['korbat', ['kgmnvlx8']]
	]);
	addToCollection('christmas', [
		['bruce', ['kf57v3j']], ['elephante', ['wc5zvo28']], ['flotsam', ['vsmfbozr']], ['grundo', ['8mfkk63q']], ['ixi', ['gk247lso']], ['kacheek', ['r4jjtt92']], ['kiko', ['rhc3kk4k']], ['kougra', ['76cvnxcw']], ['kyrii', ['2fzg7bnx']], ['moehog', ['7g7hcr3n']], ['nimmo', ['sc648vjh']], ['quiggle', ['4h74gm35']], ['ruki', ['tljlclrv']], ['scorchio', ['o7ohgknn']], ['shoyru', ['ztrddov5']], ['techo', ['92htbdcc']], ['tonu', ['onjm7vt3']], ['tuskaninny', ['x4o2o2zr']], ['yurble', ['cxr6qcbh']], ['zafara', ['mvfl8hhf']]
	]);
	addToCollection('desert', [
		['elephante', ['hots8v44']], ['grarrl', ['gtmcldwt']], ['hissi', ['zhvh4dcj']], ['kacheek', ['sb5dvvof']], ['kiko', ['f89krb5q']], ['kougra', ['ov8nlv5d']], ['kyrii', ['trrnh6sv']], ['lupe', ['6nmwg2md']], ['peophin', ['wll663ns']], ['poogle', ['4ljfxw5m']], ['pteri', ['f34ht3bb']], ['scorchio', ['h6s4vr6j']], ['shoyru', ['rhkgctg5']], ['tuskaninny', ['jj5zbf4m']], ['uni', ['x39vhl9b']], ['wocky', ['cbojv5d2']], ['zafara', ['lzzxjo5o']]
	]);
	addToCollection('halloween', [
		['gelert', ['88gr23k6']], ['grarrl', ['vv8677k2']], ['jetsam', ['nh4jgswl']], ['kacheek', ['zskv6jmh']], ['krawk', ['2cqljbw5']], ['kyrii', ['3cngrbhg']], ['lenny', ['349v6n3n']], ['moehog', ['k88zbw62']], ['mynci', ['cjlq93wk']], ['peophin', ['jhgvnccj']], ['shoyru', ['wx7q8z4j']], ['tonu', ['66kgxsqs']], ['tuskaninny', ['cxjbmsh6']], ['usul', ['nrjdgc25']], ['wocky', ['hojdbg6g']], ['yurble', ['xo8h72hr']], ['zafara', ['cko99r4c']]
	]);
	addToCollection('island', [
		['blumaroo', ['ldhggmw7']], ['bruce', ['g5vz5tz5']], ['cybunny', ['gw25kfkg']], ['elephante', ['zjvvgt7v']], ['eyrie', ['398m6jqg']], ['flotsam', ['vcoqjhf6']], ['gelert', ['orjm9t5v']], ['grarrl', ['kl9xhgb6']], ['grundo', ['9wrm5ngb']], ['hissi', ['6jvsnlr3']], ['ixi', ['ktqwzwcb']], ['jetsam', ['3bhtqzfm']], ['kacheek', ['nvgtg7dc']], ['koi', ['4ccq9n9h']], ['kougra', ['9sccj2jf']], ['krawk', ['9z4x5gkt']], ['kyrii', ['8vtwnjoc']], ['lenny', ['j423b7tr']], ['lupe', ['wff83twf']], ['meerca', ['dqhcffoz']], ['mynci', ['c64jnojn']], ['nimmo', ['cmm6tbnj']], ['poogle', ['39qvxx5s']], ['pteri', ['6f9mn9jg']], ['quiggle', ['bfdvhowj']], ['ruki', ['h9d8v57h']], ['scorchio', ['x7k3s98r']], ['shoyru', ['5bwcdj97']], ['skeith', ['ow6ns7vw']], ['techo', ['7586s24g']], ['tuskaninny', ['zb5xn9dx']], ['usul', ['rgh3mqb2']], ['yurble', ['68lm96q6']], ['zafara', ['l9r4nolz']]
	]);
	addToCollection('maraquan', [
		['aisha', ['37wgjb6s']], ['elephante', ['bgo9qr2v']]
	]);
	addToCollection('mutant', [
		['aisha', ['c4wrb4vd']]
	]);
	addToCollection('pirate', [
		['chia', ['jcxd5mwr']], ['cybunny', ['sjccqjmm']], ['elephante', ['xrmn8kjq']], ['eyrie', ['5nlgmqns']], ['flotsam', ['3tzmmw8t']], ['gelert', ['qqts7vc9']], ['gnorbu', ['ff47qz2b']], ['grarrl', ['6sn7czqq']], ['grundo', ['gh3sk8fk']], ['jetsam', ['t2noms5b']], ['kacheek', ['dwzh25od']], ['koi', ['bz32zvsc']], ['korbat', ['6trcxdrx']], ['kougra', ['wk49q6sw']], ['krawk', ['59jkc2kv']], ['kyrii', ['866t2loc']], ['lenny', ['o6thnzxx']], ['lupe', ['gzxdvf3h']], ['meerca', ['73tkwm6g']], ['moehog', ['g5w5gco7']], ['mynci', ['n4tbrjxv']], ['poogle', ['zrdn3td3']], ['pteri', ['lvt86m7q']], ['quiggle', ['gnxshxjt']], ['scorchio', ['nx8dng2q']], ['shoyru', ['8bt8hkgb']], ['skeith', ['dht9k86g']], ['techo', ['oh65nlg4']], ['tonu', ['jx2ndgn6']], ['tuskaninny', ['hv6dxnnf']], ['uni', ['lwnvkz28']], ['wocky', ['klr3hbvt']], ['xweetok', ['bbhsrrrj']], ['yurble', ['q2mrh894']], ['zafara', ['3g54oknx']]
	]);
	addToCollection('quigukiboy', [['quiggle', ['nxv6l5qh']]]);
	addToCollection('quigukigirl', [['quiggle', ['jh39qn2z']]]);
	addToCollection('usukiboy', [['usul', ['zdk99bsw']]]);
	addToCollection('usukigirl', [['usul', ['kjlo5dj3']]]);
	addToCollection('robot', [
		['aisha', ['9zfrzklx']], ['draik', ['95nsnmxj']], ['gelert', ['bbfzw8l8']], ['gnorbu', ['rcjxcm6v']], ['grarrl', ['zjd3lj3o']], ['grundo', ['4flmwkcx']], ['ixi', ['d9tlmd82']], ['jetsam', ['l82zrrmx']], ['jubjub', ['hq4lsczg']], ['kacheek', ['8n4qgd7f']], ['kiko', ['mfrmvrk6']], ['koi', ['9zz8c7v2']], ['kougra', ['gvbdmwkf']], ['kyrii', ['njgwskmz']], ['lenny', ['jjfvkl5h']], ['lupe', ['5v6xlgwc']], ['meerca', ['5hs3xn83']], ['moehog', ['8klgs5l4']], ['mynci', ['bqxcm2tm']], ['peophin', ['r2rlnztf']], ['poogle', ['fns52f3v']], ['pteri', ['jkdrm326']], ['skeith', ['2jodfnzh']], ['tuskaninny', ['3z5r33t7']], ['uni', ['lgnhzffc']], ['usul', ['fxkmhzdk']], ['wocky', ['om5n63d8']], ['zafara', ['cl4z39tb']]
	]);
	addToCollection('royalboy', [
		['bruce', ['9vqlg9m6']], ['elephante', ['lx9k3hcb']], ['eyrie', ['59jgl6l9']], ['flotsam', ['jgqtbrh2']], ['gelert', ['bgj5qgn2']], ['grarrl', ['xobkqzxb']], ['ixi', ['l6nvhoxq']], ['kau', ['2mwq3vf8']], ['korbat', ['wk7so52h']], ['kougra', ['df75rstv']], ['krawk', ['8z4srodg']], ['kyrii', ['7msogmvz']], ['moehog', ['9tt2gfld']], ['mynci', ['cwx3glvx']], ['quiggle', ['ktv3ggzc']], ['scorchio', ['w4schsql']], ['shoyru', ['3mnzm6bn']], ['uni', ['r2nnw5tv']], ['usul', ['5g46cfm5']], ['zafara', ['3l7tz3j8']]
	]);
	addToCollection('royalgirl', [
		['bruce', ['g2brtwg7']], ['buzz', ['3bnx6zgn']], ['elephante', ['lvgs2lq7']], ['eyrie', ['4xllsmf5']], ['gelert', ['kxtzb5nq']], ['grarrl', ['t49g7o28']], ['jubjub', ['33fh6olg']], ['kau', ['95s28dt6']], ['korbat', ['j7lc7xw2']], ['kougra', ['sst6bfbr']], ['krawk', ['qm44b8r7']], ['kyrii', ['q34ndtk3']], ['lupe', ['qzs244js']], ['moehog', ['dc9jk4qc']], ['mynci', ['nz32jtx7']], ['poogle', ['xjkjddzn']], ['shoyru', ['wo3zscj7']], ['uni', ['5kjhm6b7']], ['usul', ['88s5lgxf']], ['zafara', ['rfhf76xz']]
	]);
	addToCollection("tyrranian", [
		['meerca', ['f9swrj7t']], ['scorchio', ['x3ftwc4q']], ['usul', ['gdw46zvg']]
	]);
			
	for (var i = 0; i < collection.length; i++){
		if (oldNeopetsChrome.TryChangeImage(image, collection[i].colour, collection[i].species, collection[i].ids, no_happy, battledome)) return true;
	}
}