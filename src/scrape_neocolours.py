#http://www.crummy.com/software/BeautifulSoup/
import urllib2
from bs4 import BeautifulSoup
import time

start = time.time()
response = urllib2.urlopen("http://www.neocolours.me.uk/paintbrushes.php")
soup = BeautifulSoup(response.read())
f = open('neopetsCollection.js', 'w')
f.write('oldNeopetsChrome.ChangeImageByID = function(image){\n')
#looking at list of all colours
for link in soup.find_all('a'):
	href = link.get('href')
	if 'viewpet' in href:
		data = href[12:].split('&')
		for i in range(len(data)):
			data[i] = data[i].split('=')
		colour = data[0][1]
		print("begin " + colour.upper())
		f.write("var colour = '"+colour+"';");
		f.write("var changeImage = function(new_ids, pet_name){")
		for i in range(2):
			f.write("\tif (oldNeopetsChrome.ChangeImage(image, '/' + new_ids["+str(i)+"] + '/',")
			f.write("\t\tpet_name + '_' + colour + '_baby.gif')) return true;")
		f.write("};\n")
		response2 = urllib2.urlopen("http://www.neocolours.me.uk/"+href)
		soup2 = BeautifulSoup(response2.read())
		
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
				#f.write("//"+species.upper())
				print("\t"+colour+" "+species.upper())
				counter = 0
				male_id = ''
				female_id = ''
				for link3 in soup3.find_all('img'):
					href3 = link3.get('src')	
					if 'http://pets.neopets.com' in href3 and counter == 0:
						male_id = href3[27:35]
						counter += 1
					elif 'http://pets.neopets.com' in href3 and counter == 1:
						female_id = href3[27:35]
						f.write("if (changeImage(['"+male_id+"','"+female_id+"'],'"+species+"'))return true;")
						break
		print("colour " + colour + " complete")
		
f.write('\n};')
f.close()
end = time.time()
print "time elapsed: "+str(end - start)