
import time
import codecs
import random

writePullPath='E:\\Test Files\\20210125\\logdata1.dat'
file_write_format='utf8'
nBulkCnt = 1000
total_write_count=21000000
# total_write_count=10

start = time.time()

with codecs.open(writePullPath, 'a', encoding=file_write_format) as f:
    writeCount = 0
    writeTotDataList = []

    pgmIDList = ["BSLB9052", "BSEB3001", "AAFBMETA", "ABGB0073", "DFFB9058", "DFKB3910", "LABB9451", "LACB9052", "EACB3001", "EAFBMETA", "ECLB0073", "ECMB9058", "NSAB3910", "EWLB9451", "", ""]
    ynIDList = ["Y", "N"]

    for i in range(total_write_count):
        writeDetailDataList = []
        writeDetailDataList.append("%s"%"".join([random.choice("abcdefghijklmnopqrstuvwxyz0123456789") for _ in range(8)]))
        writeDetailDataList.append("%d"%i)
        writeDetailDataList.append("%s"%random.choice(pgmIDList))
        writeDetailDataList.append("%s"%random.choice(ynIDList))

        writeTotDataList.append('|'.join(writeDetailDataList))
        writeCount += 1

        if writeCount == nBulkCnt:
            f.write('\n'.join(writeTotDataList))
            f.write('\n')
            writeTotDataList.clear()
            writeCount = 0

    if len(writeTotDataList) > 0:
        f.write('\n'.join(writeTotDataList))
        f.write('\n')

end = time.time() - start
print('Module Excute time = {0}'.format(end))