/*  #########################################################
    ###########          MariaDB Module           ###########
    #########################################################   */

const mysql = require('mysql');
const fs = require('fs');
const mariaJsonFile = fs.readFileSync('../config/mariaDBConfig.json', 'utf8');
const vals = JSON.parse(mariaJsonFile).config;
class MariaDBCalss{
  constructor(){
    this.pool = mysql.createConnection({
      host: vals.DBHost,
      port: vals.DBPort,
      user: vals.DBUser,
      password: vals.DBPass,
      database: vals.database,
      connectionLimit: 5
    });
  }
  query(query,callback){
    this.pool.query(query,callback);
  }
  close(){
    this.pool.end();
  }
}
let maria = new MariaDBCalss();
maria.close();
// module.exports = new MariaDBCalss();

//ex
//  maria.query('select * from TF_ACTION',function(err,res,field){
//    console.log(err,res);
//    console.log(res.length);
//  });
//  maria.close();


