//####################      KAFKA      ####################
let moment = require('moment');
var _ = require('lodash');
require('events').EventEmitter.defaultMaxListeners = 0
const clientOption = {
    kafkaHost : "192.168.124.244:2002"
};

//####################    Schedule    ######################
const host = "192.168.124.244";
const port = "2200";
const schedule = require('node-schedule');
const job = schedule.scheduleJob('* * * * * *', function(){
    let now = new Date();
    console.log(now);
});


