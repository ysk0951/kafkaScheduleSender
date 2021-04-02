const kafka = require('kafka-node');
const client = new kafka.KafkaClient({
    kafkaHost : "192.168.124.244:29092",
    connectTimeout:5000,
    requestTimeout:5000
});
const admin = new kafka.Admin(client);
admin.listGroups((err, res) => {
  console.log('consumerGroups', err, res);
});
console.log("start");