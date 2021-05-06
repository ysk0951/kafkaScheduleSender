//testFile
const fs = require('fs');
const path = require('path');
const test2 = path.resolve(__dirname,)
console.log(test2);
const kafkaJsonFile = fs.readFileSync(path.resolve(__dirname,'../config/kafkaConfig.json'), 'utf8');
// const jsonFile = fs.readFileSync('../config/data.json', 'utf8');
console.log(kafkaJsonFile)