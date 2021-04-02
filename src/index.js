//####################   KAFKA.Connection  ####################
let moment = require('moment');
var _ = require('lodash');
require('events').EventEmitter.defaultMaxListeners = 0
const clientOption = {
    kafkaHost : "192.168.124.244:2202"
};
const kafka = require('kafka-node');

//####################   KAFKA.Message   ####################
var makeMsg = function(timestamp){
    let indexDay=moment(timestamp).format("YYYY.MM");
    var obj = {
        '@index_day' : indexDay,
        "@index" :"test",
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
    return ret;
};

let client = new kafka.KafkaClient(clientOption),
    producer = new  kafka.Producer(client),
    payloads = [
        { topic: 'woori_ai_fds', messages: [], partition: 0 }      
    ];

//####################   KAFKA.sending   ####################
var sendKafa = function(payloads){
    return new Promise((resolve, reject)=>{
        producer.send(payloads, function (err, data) {
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

var chunkSize = 10;
var n = 1;
var tpsArr = [];
var run = async function(){
    for(var i=0;i<n;i++){
        var now = moment().valueOf();
        payloads[0].messages=makeChunk(chunkSize);
        var ret = await sendKafa(payloads);
        // var diff = moment().valueOf()-now;
        // var tps = Math.floor(chunkSize/(diff/1000));
        // console.log(i, "send", tps, "tps");
        // tpsArr.push(tps);
        // console.log( payloads[0].messages);
        // await sleep(1000);
    }
};
run();
// run().then(()=>{
//     console.log("tps average", _.sum(tpsArr)/tpsArr.length, "tps");
//     console.log("tps min", _.min(tpsArr), "tps");
//     console.log("tps max", _.max(tpsArr), "tps");
//     client.close(()=>{
//         console.log("exit...");
//     });
// }).catch((e)=>{
//     console.log(e);
// });

//####################    Schedule    ######################
const schedule = require('node-schedule');
// const job = schedule.scheduleJob('* * * * * *', function(){
//     let now = new Date();
// });


