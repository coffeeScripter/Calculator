import random 
import string
f = open('testData/vergo0.csv','w')
for x in range(100):
	value = '';
	for j in range(30):
		if random.choice(range(1,10,1)) != 1 :
			if j == 29 :
				value += str(random.choice(range(100000, 999999, 1)))
			elif j == 8 or j == 1 :
				value += ''.join(random.sample(string.ascii_letters, 6)) +','
			else :
				value += str(random.choice(range(100000, 999999, 1))) + ','
		else :
			if j == 29 :
				value+= ' '
			else :
				value+= '  ,'
	f.write(value +'\n')
	print(x)
f.close()
print('done')
