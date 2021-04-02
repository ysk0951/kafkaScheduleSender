import time
import pickle
import codecs

pickle_outPath = 'E:\\_Project\\testData\\mappdata2.pickle'
data_filePath = 'E:\\_Project\\testData\\testdata.dat'

writePullPath='E:\\_Project\\testData\\result_out2.dat'
file_write_format='utf8'

start = time.time()

comp_dic={}
with open(pickle_outPath, 'rb') as f:
    comp_dic=pickle.load(f)

read_range_count=1000

customer_index=0
phone_index=2
bStop = False

input_file = open(data_filePath, 'r')

print('pickle dic count = {0}'.format(len(comp_dic)))

nLoopCount = 1

with codecs.open(writePullPath, 'a', encoding=file_write_format) as f:
    writeTotDataList=[]

    while(1):

        print('Loop count = {0}'.format(nLoopCount))

        for lines in range(read_range_count):
            line = input_file.readline()
            # print('line value = {0}'.format(line))

            if len(line) == 0:
                bStop = True
                break

            data = line.split('|')
            customer = data[customer_index]
            c_phone = data[phone_index]

            exist_data = comp_dic.get(customer)
            if exist_data=='1':
                writeTotDataList.append(line)

            # print('customer value = {0}, phone value = {1}'.format(customer, c_phone))

        f.write(''.join(writeTotDataList))
        # f.write('\n')
        writeTotDataList.clear()

        nLoopCount+= 1

        if bStop == True:
            break

    if len(writeTotDataList) > 0:
        f.write(''.join(writeTotDataList))
        # f.write('\n')

end = time.time() - start
print('Module Excute time = {0}'.format(end))