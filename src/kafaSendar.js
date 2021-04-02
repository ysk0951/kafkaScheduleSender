let moment = require('moment');
var _ = require('lodash');
require('events').EventEmitter.defaultMaxListeners = 0
const clientOption = {
    kafkaHost : "localhost:9092"
};
const kafka = require('kafka-node');
var randomNum = {};
 
randomNum.random = function(n1, n2) {
    return parseInt(Math.random() * (n2 -n1 +1)) + n1;
};
 
randomNum.authNo= function(n) {
    var value = "";
    for(var i=0; i<n; i++){
        value += randomNum.random(0,9);
    }
    return value;
};
 
var makeWASIP = function(){
    return (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255));
}

var generateRandom = function (min, max) {
    var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
    return ranNum;
}

 
var makeUUID = function(){
    return  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      }).replace(/-/g,"");
}

var randomArray = function(arr){
    var r = Math.floor(Math.random()*arr.length);
    return arr[r];
};

//getData
const fs = require('fs');
const jsonFile = fs.readFileSync('./data.json', 'utf8');
const jsonData = JSON.parse(jsonFile);
var makeMsg = function(timestamp){
    let indexDay=moment(timestamp).format("YYYY.MM");
    let tz = moment(moment(new Date().valueOf()),"korea/Asia").utc().format();
    let wip = randomArray(jsonData.ipList);
    let NAT_IP = randomArray(jsonData.ipList);
    let AF_U_KEY = randomArray(jsonData.ipList);
    let myName=randomArray(jsonData.HumanName);
    let yourName=randomArray(jsonData.HumanName);
    let getAmt = randomNum.authNo(generateRandom(5,7));
    let getOutBankCode =  randomArray(jsonData.bankCode);
    let getInBankCode= randomArray(jsonData.inBankCode);
    let getAccountNo = randomArray(jsonData.accountList);
    let gettradeCode=randomArray(jsonData.tradeCode);
    let gettradeCode_kor=jsonData.tradeCode_kor[gettradeCode];
    var obj = {
        '@id' :makeUUID(),
        '@timestamp' : tz,
        "amt" :getAmt,
        "@index" :"test",
        "CHANNEL_CODE" :randomArray(jsonData.channel_code),
        "outBankCode" : getOutBankCode,
        "inBankCode" :getInBankCode,
        "inAcctNo" : randomNum.authNo(13),
        "outAcctNo" :getAccountNo,
        createStr :jsonData.getCustNo[getAccountNo],
        CSAC_NAME:jsonData.getCustName[getAccountNo],
	tradeCodeName : gettradeCode_kor,
	IN_CSAC_NAME : jsonData.getCustName[randomArray(jsonData.accountList)],
        AFTR_amt: randomNum.authNo(generateRandom(5,7)),
	BETR_amt :randomNum.authNo(generateRandom(5,7))
    }
    return obj;
}
var now = moment().startOf("d");
var makeChunk = function(size){
    var ret = [];
    for(let i=0;i<size;i++){
        now.add(Math.floor(Math.random()*90)+10, "ms");
        ret.push(JSON.stringify(makeMsg(now.valueOf())));
    }
    console.log("makeChunk",ret);
    return ret;
};

let client = new kafka.KafkaClient(clientOption),
    producer = new  kafka.Producer(client),
    payloads = [
        { topic: 'woori_ai_fds', messages: [], partition: 0 }      
    ];
var sendKafa = function(payloads){
    return new Promise((resolve, reject)=>{
        producer.send(payloads, function (err, data) {
            console.log(err,data);
            if(err) reject(err);
            else resolve(data);
        });
    });
};
var sleep = function(ms){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve();
        }, ms);
    });
};

var chunkSize = 1;
var n = 1;
var tpsArr = [];
var run = async function(){
    for(var i=0;i<n;i++){
        var now = moment().valueOf();
        payloads[0].messages=makeChunk(chunkSize);
        var ret = await sendKafa(payloads);
        var diff = moment().valueOf()-now;
        var tps = Math.floor(chunkSize/(diff/1000));
        console.log(i, "send", tps, "tps");
        tpsArr.push(tps);
        console.log( payloads[0]);
    }
};

//####################    Schedule    ######################
const schedule = require('node-schedule');
const job = schedule.scheduleJob('* * * * * *', function(){
    run().then(()=>{
        console.log("tps average", _.sum(tpsArr)/tpsArr.length, "tps");
        console.log("tps min", _.min(tpsArr), "tps");
        console.log("tps max", _.max(tpsArr), "tps");
    }).catch((e)=>{
        console.log(e);
    });
});

//####################    connection Close   ######################
// client.close(()=>{
//     console.log("exit...");
//     console.log(producer.ready)
// });