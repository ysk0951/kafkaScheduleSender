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
const ipList = [
    "1.1.1.1",
    "1.1.1.2",
    "1.1.1.3",
    "1.1.1.4",
    "1.1.1.5"
];
const HumanName = [
    "민준",
    "서준",
    "예준",
    "도윤",
    "시우",
    "주원",
    "하준",
    "지호",
    "지후",
    "준서",
    "준우",
    "현우",
    "도현",
    "지훈",
    "건우",
    "우진",
    "선우",
    "서진",
    "민재",
    "현준",
    "연우",
    "유준",
    "정우",
    "승우",
    "승현",
    "시윤",
    "준혁",
    "은우",
    "지환",
    "승민",
    "지우",
    "유찬",
    "윤우",
    "민성",
    "준영",
    "시후",
    "진우",
    "지원",
    "수현",
    "재윤",
    "시현",
    "동현",
    "수호",
    "태윤",
    "민규",
    "재원",
    "한결",
    "민우",
    "재민",
    "은찬",
    "윤호",
    "시원",
    "이준",
    "민찬",
    "지안",
    "시온",
    "성민",
    "준호",
    "승준",
    "성현",
    "이안",
    "현서",
    "재현",
    "하율",
    "지한",
    "우빈",
    "태민",
    "지성",
    "예성",
    "민호",
    "태현",
    "지율",
    "민혁",
    "서우",
    "성준",
    "은호",
    "규민",
    "정민",
    "준",
    "지민",
    "윤성",
    "율",
    "윤재",
    "하람",
    "하진",
    "민석",
    "준수",
    "은성",
    "태양",
    "예찬",
    "준희",
    "도훈",
    "하민",
    "준성",
    "건",
    "지완",
    "현수",
    "승원",
    "강민",
    "정현",
    "서연",
    "서윤",
    "지우",
    "서현",
    "민서",
    "하은",
    "하윤",
    "윤서",
    "지유",
    "지민",
    "채원",
    "지윤",
    "은서",
    "수아",
    "다은",
    "예은",
    "지아",
    "수빈",
    "소율",
    "예린",
    "예원",
    "지원",
    "소윤",
    "지안",
    "하린",
    "시은",
    "유진",
    "채은",
    "윤아",
    "유나",
    "가은",
    "서영",
    "민지",
    "예진",
    "서아",
    "수민",
    "수연",
    "연우",
    "예나",
    "예서",
    "주아",
    "시연",
    "연서",
    "하율",
    "다인",
    "다연",
    "시아",
    "아인",
    "현서",
    "서은",
    "유주",
    "아린",
    "서우",
    "하연",
    "서율",
    "서진",
    "채윤",
    "유빈",
    "지율",
    "나윤",
    "수현",
    "예지",
    "다현",
    "소은",
    "나은",
    "나연",
    "지은",
    "민주",
    "아윤",
    "사랑",
    "시현",
    "예빈",
    "윤지",
    "서하",
    "지현",
    "소연",
    "혜원",
    "지수",
    "은채",
    "주하",
    "채아",
    "승아",
    "다윤",
    "소민",
    "서희",
    "나현",
    "민아",
    "채린",
    "하영",
    "세아",
    "세은",
    "도연",
    "규리",
    "아영",
    "다온",
    "가윤",
    "지연",
    "예림",
    "태희",
    "민채",
    
    
]

const bankCode = [
    "0213017",
    "0213020",
    "0213237",
    "0213525",
    "0213800",
    "0214090",
    "0214171",
    "0214210",
    "0214074",
    "0214236",
    "0214197",
    "0214252",
    "0214540",
    "0214595",
    "0214809",
    "0214896",
    "0216108",
    "0216111",
    "0216124",
    "0216140",
    "0216182",
    "0216205",
    "0217042",
    "0217055",
    "0217071"
]

const inBankCode = [
    "001",
    "002",
    "003",
    "004",
    "005",
    "006",
    "007",
    "008",
    "009",
    "010",
    "011",
    "012",
    "013",
    "014",
    "015",
    "016",
    "017",
    "018",
    "019",
    "020",
    "021",
    "023",
    "025",
    "026",
    "027",
    "028",
    "029",
    "031",
    "032",
    "033",
    "034",
    "035",
    "036",
    "037",
    "039",
    "043",
    "045",
    "046",
    "047",
    "048",
    "049",
    "050",
    "051",
    "052",
    "053",
    "054",
    "055",
    "057",
    "058",
    "059",
    "060",
    "061",
    "062",
    "063",
    "064",
    "065",
    "067",
    "071",
    "072",
    "073",
    "074",
    "075",
    "076",
    "077",
    "078",
    "079",
    "080",
    "081",
    "082",
    "084",
    "085",
    "086",
    "087",
    "088",
    "089",
    "090",
    "094",
    "099",
    "209",
    "218",
    "226",
    "227",
    "230",
    "238",
    "240",
    "243",
    "247",
    "261",
    "262",
    "263",
    "264",
    "265",
    "266",
    "267",
    "268",
    "269",
    "270",
    "278",
    "279",
    "280",
    "287",
    "289",
    "290",
    "291",
    "292",
    "294",
    "431",
    "448",
    "452"
]

const channel_code=[
    "A",
    "C"
]


const accountList = [
"0429457168322",
"6209977541309",
"3567700557807",
"8044227055494",
"0040288045361",
"5431598613162",
"4477848141357",
"4081697686656",
"0933900447065",
"1506472367871",
"8805151542430",
"9021231177124",
"5466622133409",
"3383809034442",
"1612337333081",
"1010888909768",
"5681472227558",
"4988520821595",
"3937635890556",
"7618692715493",
"2713773233990",
"7876226463290",
"5095378652148",
"9172375729147",
"2193679017366",
"6129285301456",
"7251594282260",
"4083593581568",
"2745210418769",
"4103713709713",
"8797503809968",
"6788368307340",
"3441793638681",
"8426304918947",
"7718423466101",
"1522475614029",
"4474800427138",
"7222053914917",
"6824911294575",
"0608547795434",
"5306517671223",
"3879866648622",
"3811683731070",
"5803496787896",
"9529347291372",
"7961131122579"
]
const getCustName = {
    "0429457168322":"서우",
    "6209977541309":"서진",
    "3567700557807":"채은",
    "8044227055494":"민서",
    "0040288045361":"서연",
    "5431598613162":"우빈",
    "4477848141357":"나연",
    "4081697686656":"민지",
    "0933900447065":"지원",
    "1506472367871":"채원",
    "8805151542430":"시우",
    "9021231177124":"연우",
    "5466622133409":"민주",
    "3383809034442":"시우",
    "1612337333081":"준영",
    "1010888909768":"지현",
    "5681472227558":"윤성",
    "4988520821595":"나연",
    "3937635890556":"동현",
    "7618692715493":"유준",
    "2713773233990":"서우",
    "7876226463290":"주아",
    "5095378652148":"민지",
    "9172375729147":"정민",
    "2193679017366":"도훈",
    "6129285301456":"지환",
    "7251594282260":"율",
    "4083593581568":"민규",
    "2745210418769":"예은",
    "4103713709713":"지율",
    "8797503809968":"서우",
    "6788368307340":"윤호",
    "3441793638681":"지율",
    "8426304918947":"나윤",
    "7718423466101":"예은",
    "1522475614029":"예진",
    "4474800427138":"서진",
    "7222053914917":"예성",
    "6824911294575":"민혁",
    "0608547795434":"하린",
    "5306517671223":"채은",
    "3879866648622":"시연",
    "3811683731070":"도윤",
    "5803496787896":"민석",
    "9529347291372":"지수",
    "796113112257":"나현"
}

const getCustNo ={
"0429457168322":"4433266721",
"6209977541309":"8225802742",
"3567700557807":"3392786807",
"8044227055494":"6137458080",
"0040288045361":"3225698478",
"5431598613162":"2512003364",
"4477848141357":"0929105577",
"4081697686656":"9035337207",
"0933900447065":"1653203059",
"1506472367871":"6607045956",
"8805151542430":"2323314032",
"9021231177124":"3088366218",
"5466622133409":"3383404510",
"3383809034442":"7448233573",
"1612337333081":"2237039746",
"1010888909768":"9227007854",
"5681472227558":"1020906159",
"4988520821595":"5551146452",
"3937635890556":"8553500859",
"7618692715493":"7384977260",
"2713773233990":"3629042556",
"7876226463290":"7155598073",
"5095378652148":"7689188530",
"9172375729147":"0660840774",
"2193679017366":"7306667226",
"6129285301456":"6021191973",
"7251594282260":"1520245944",
"4083593581568":"9368599449",
"2745210418769":"0233317289",
"4103713709713":"0751527904",
"8797503809968":"8174288507",
"6788368307340":"7519002474",
"3441793638681":"0150188485",
"8426304918947":"4051251600",
"7718423466101":"6484083178",
"1522475614029":"1447373880",
"4474800427138":"6368620387",
"7222053914917":"8565625756",
"6824911294575":"0480651247",
"0608547795434":"6880530596",
"5306517671223":"5456150868",
"3879866648622":"1241033025",
"3811683731070":"2478365421",
"5803496787896":"3788687250",
"9529347291372":"5269881204",
"796113112257":"9459599651"
}

const tradeCode=[
    "W","D"
]
const tradeCode_kor ={
     "W":"입급",
     "D":"출금"
}

var makeMsg = function(timestamp){
    let indexDay=moment(timestamp).format("YYYY.MM");
    let tz = moment(moment(new Date().valueOf()),"korea/Asia").utc().format();
    let wip = randomArray(ipList);
    let NAT_IP = randomArray(ipList);
    let AF_U_KEY = randomArray(ipList);
    let myName=randomArray(HumanName);
    let yourName=randomArray(HumanName);
    let getAmt = randomNum.authNo(generateRandom(5,7));
    let getOutBankCode =  randomArray(bankCode);
    let getInBankCode= randomArray(inBankCode);
    let getAccountNo = randomArray(accountList);
    let gettradeCode=randomArray(tradeCode);
    let gettradeCode_kor=tradeCode_kor[gettradeCode];
    var obj = {
        '@id' :makeUUID(),
        '@timestamp' : tz,
        "amt" :getAmt,
        "@index" :"test",
        "CHANNEL_CODE" :randomArray(channel_code),
        "outBankCode" : getOutBankCode,
        "inBankCode" :getInBankCode,
        "inAcctNo" : randomNum.authNo(13),
        "outAcctNo" :getAccountNo,
        createStr :getCustNo[getAccountNo],
        CSAC_NAME:getCustName[getAccountNo],
	tradeCodeName : gettradeCode_kor,
	IN_CSAC_NAME : getCustName[randomArray(accountList)],
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

client.close(()=>{
    console.log("exit...");
    console.log(producer.ready)
});