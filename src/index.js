/*
* require Block
* Refer Notice File about LICENSE
* (https://github.com/ysk0951/kafkaScheduleSender/blob/master/NOTICE)
*/
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const kafka = require('kafka-node');
const schedule = require('node-schedule');
require('events').EventEmitter.defaultMaxListeners = 0
// const maria = require('../module/mariaModule')
const clientOption = {kafkaHost : "localhost:9092"};

/*  #########################################################
    ###########               Function            ###########
    #########################################################   */
let randomNum = {};
randomNum.random = function(n1, n2) {
    return parseInt(Math.random() * (n2 -n1 +1)) + n1;
};
randomNum.authNo= function(n) {
    let value = "";
    for(let i=0; i<n; i++){
        value += randomNum.random(0,9);
    }
    return value;
};
let makeWASIP = function(){
    return (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255));
}
let generateRandom = function (min, max) {
    let ranNum = Math.floor(Math.random()*(max-min+1)) + min;
    return ranNum;
}
let makeUUID = function(){
    return  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      }).replace(/-/g,"");
}
let randomArray = function(arr){
    let r = Math.floor(Math.random()*arr.length);
    return arr[r];
};

/*  #########################################################
    ###########              Make Data            ###########
    #########################################################   */
const jsonFile = fs.readFileSync(path.resolve(__dirname,'../config/data.json'), 'utf8');
const jsonData = JSON.parse(jsonFile);
let makeMsg = function(timestamp){
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
    let timestampCtrl = moment().subtract(1, 'days').toISOString();
    let getEncodingTest = randomArray(jsonData.encodingTest)+Math.floor(Math.random() * 10)+randomArray(jsonData.encodingTest);
    let randomUserId = randomArray(jsonData.randomUserId);
    let obj = {
        "remoteIp" : "192.168.124.67",
        "userId" : randomUserId,
        "userName" : myName,
        "@index_day" : "2021.05.03",
        "@timestamp" : timestampCtrl,
        //"encodingTest" : getEncodingTest,
        //'@timestamp' : tz,
	//"@index":"wooritest"
        // "amt" :getAmt,
        // // "@index" :"test",
        // "CHECK_STATUS" : "N",
        // "COUNT " : 1 ,
        // "DETECT_DTTM_LAST" : tz,
        // "ACTION_ID": makeUUID(),
        // "DETECT_DTTM" : moment(moment(new Date().valueOf()+99999),"korea/Asia").utc().format(),
        // "BASIS_FIELD" : "test",
        // "BASIS_VALUE " : "test",
        // "RULE_NAME " : "test",
        // "RULE_NO" : 1,
        // "ACTION_NAME" : "test",
        // "ACTION_CODE"  : "test",
        // "LEVEL_NAME" : "test",
        // "LEVEL_CODE " : "test",
        // "RELEASE_YN  " : "N"
        // "CHANNEL_CODE": randomArray(jsognData.channel_code),
        // "outBankCode": getOutBankCode,
        // "inBankCode": getInBankCode,
        // "inAcctNo": randomNum.authNo(13),
        // "outAcctNo": getAccountNo,
        // createStr: jsonData.getCustNo[getAccountNo],
        // CSAC_NAME: jsonData.getCustName[getAccountNo],
        // tradeCodeName: gettradeCode_kor,
        // IN_CSAC_NAME: jsonData.getCustName[randomArray(jsonData.accountList)],
        // AFTR_amt: randomNum.authNo(generateRandom(5, 7)),
        // BETR_amt: randomNum.authNo(generateRandom(5, 7))
    }
    return obj;
}
let now = moment().startOf("d");
let makeChunk = function(size){
    let ret = [];
    for(let i=0;i<size;i++){
        now.add(Math.floor(Math.random()*90)+10, "ms");
        ret.push(JSON.stringify(makeMsg(now.valueOf())));
    }
    return ret;
};
/*  #########################################################
    ###########          KAFAKA  SETTING          ###########
    #########################################################   */
const kafkaJsonFile = fs.readFileSync(path.resolve(__dirname,'../config/kafkaConfig.json'), 'utf8');
const kafkaJsonData = JSON.parse(kafkaJsonFile);    
let client = new kafka.KafkaClient(kafkaJsonData.config.kafkaHost),
producer = new  kafka.Producer(client),
payloads = [
    { topic: kafkaJsonData.config.topic, messages: [], partition: 0 }      
];
let sendKafa = function(payloads){
    return new Promise((resolve, reject)=>{
        producer.send(payloads, function (err, data) {
            console.log(err,data);
            if(err) reject(err);
            else resolve(data);
        });
    });
};
let sleep = function(ms){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve();
        }, ms);
    });
};

let chunkSize = kafkaJsonData.config.chunkSize;
let n = kafkaJsonData.config.trCount;
let tpsArr = [];
let accumulate = 0;
let breakPoint = kafkaJsonData.config.breakPoint;
let run = async function(){
    if (accumulate >= breakPoint) {
        client.close();
        job.cancel(schedule);
        console.log("exit...",accumulate,"/",breakPoint);
    } else {
        for(let i=0;i<n;i++){
            let now = moment().valueOf();
            payloads[0].messages=makeChunk(chunkSize);
            let ret = await sendKafa(payloads);
            let diff = moment().valueOf()-now;
            let tps = Math.floor(chunkSize/(diff/1000));
            accumulate ++ ;
            console.log(i, "send", tps, "tps");
            tpsArr.push(tps);
            console.log( payloads[0]);
        }
    }
};
/*  #########################################################
    ###########          schedule running         ###########
    #########################################################   */
const job = schedule.scheduleJob('* * * * * *', function(){
    run().then(()=>{
        var obj = payloads[0].messages;

        // DataDB Insert Case))
        // maria.query('',function(err,res){

        // })
        console.log("Accumulate : ",accumulate,"breakPoint : ",breakPoint);
        console.log("tps average", _.sum(tpsArr)/tpsArr.length, "tps");
        console.log("tps min", _.min(tpsArr), "tps");
        console.log("tps max", _.max(tpsArr), "tps");
    }).catch((e)=>{
        client.close();
        // maria.close();
    });
});

//####################    connection Close   ######################
// client.close(()=>{
//     console.log("exit...");
//     console.log(producer.ready)
// });
