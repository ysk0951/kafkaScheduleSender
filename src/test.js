/*  #########################################################
    ###########          MariaDB in Docker        ###########
    #########################################################   */

    const mariaDB = require('mariadb');
    const fs = require('fs');
    const mariaJsonFile = fs.readFileSync('../config/mariaDBConfig.json', 'utf8');
    const mariaJsonData = JSON.parse(mariaJsonFile);
    console.log(mariaJsonData,mariaDB);