
import time
import pickle


open_filePath = 'E:\\_Project\\testData\\testdata.dat'
pickle_outPath = 'E:\\_Project\\testData\\mappdata2.pickle'

input_file = open(open_filePath, 'r')
start = time.time()
bStop = False

customer_index=0
phone_index=2

comp_dic={}
read_range_count=1000

while(1):
    for lines in range(read_range_count):
        line = input_file.readline()
        # print('line value = {0}'.format(line))

        if len(line) == 0:
            bStop = True
            break

        data = line.split('|')
        customer = data[customer_index]
        c_phone = data[phone_index]

        if len(customer.lstrip()) > 0 :
            comp_dic[customer] = "1"

        print('customer value = {0}, phone value = {1}'.format(customer, c_phone))

    if bStop == True:
        break


with open(pickle_outPath, 'wb') as f:
    pickle.dump(comp_dic, f)


end = time.time() - start
print('Module Excute time = {0}'.format(end))