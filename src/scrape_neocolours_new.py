#http://www.crummy.com/software/BeautifulSoup/
import urllib2
from bs4 import BeautifulSoup
import time

start = time.time()
response = urllib2.urlopen("http://www.neocolours.me.uk/viewpet.php?colour=&species=&pose=all")

#rearrange written javascript code to primarily be in json format
#if (oldNeopetsChrome.ChangeImagesByManualID(image)) return true;
#var objects = [{colour: 'alien', species: 'aisha', ids: ['male_id', 'female_id']}, {...}, ...];
#for (var i = 0; i < objects.length; i++){
#	changeImage(objects[i]); 	#changeImage is defined in neopetsCollection_helper.js
#}

soup = BeautifulSoup(response.read())
f = open('neopetsCollection.js', 'w')
f.write('oldNeopetsChrome.GenerateCollectionArray = function(){\n')
f.write("var collection = [")
colours = []
#let's get a list of all colours
for select in soup.find_all('select'):
	for value in select.stripped_strings:
		value = value.lower()
		colours.append(value)
	#break because only the first one has all colours
	break

collection_count = 0
for colour in colours:
	url = "http://www.neocolours.me.uk/viewpet.php?colour="+colour+"&species=all&pose=happy+male"
	response2 = urllib2.urlopen(url)
	soup2 = BeautifulSoup(response2.read())
	
	print("begin " + colour.upper())
	
	#now we're looking at the individual colour pages
	for link2 in soup2.find_all('a'):
		href2 = link2.get('href')
		if 'viewpet' in href2:
			data2 = href2[12:].split('&')
			for i in range(len(data2)):
				data2[i] = data2[i].split('=')
			species = data2[0][1]
			response3 = urllib2.urlopen("http://www.neocolours.me.uk/"+href2)
			soup3 = BeautifulSoup(response3.read())
			
			#now we're looking at an individual pet's page
			print("\t"+colour+" "+species.upper())
			counter = 0
			male_id = ''
			female_id = ''
			for img in soup3.find_all('img'):
				href3 = img.get('src')
				if 'http://pets.neopets.com' in href3 and counter == 0:
					male_id = href3[27:35]
					counter += 1
				elif 'http://pets.neopets.com' in href3 and counter == 1:
					female_id = href3[27:35]
					counter += 1
				elif 'http://images.neopets.com/pets' in href3 and counter == 2:
					if (collection_count >= 1):
						f.write(",\n")
					f.write("\t{colour: '"+colour+"', species: '"+species+"',")
					f.write(" ids: ['"+male_id+"','"+female_id+"']}")
					collection_count += 1
					break
	print("colour " + colour + " complete")
f.write('];\n');
f.write('oldNeopetsChrome.image_collection = collection');
f.write('}\n');

f.write('oldNeopetsChrome.GenerateCollectionArray();\n');

f.write('oldNeopetsChrome.ChangeImageByID = function(image){\n')
f.write('\tif (oldNeopetsChrome.ChangeImageByManualID(image)) return true;\n')
f.write('\tvar collection = oldNeopetsChrome.image_collection;');
f.write("\tfor (var i = 0; i < collection.length; i++){\n");
f.write("\t\tif (oldNeopetsChrome.TryChangeImage(image, collection[i].colour, collection[i].species, collection[i].ids)) return true;\n");
f.write('\t}\n')
f.write('}');

f.close()
end = time.time()
print "time elapsed: "+str(end - start)