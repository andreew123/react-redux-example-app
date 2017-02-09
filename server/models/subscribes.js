const mysql = require('mysql');
const dbConnectionCreator = require('../utilities/mysqlConnection.js');

let subscribeModel = {
    createSubscribe : function(callback) {
      	let dbConnection = dbConnectionCreator();
      	let createSubscribeSqlString = constructCreateSubscribeSqlString(callback);
      	dbConnection.query(createSubscribeSqlString, function(error, results, fields){
            if (error) {
                dbConnection.destroy();
                console.log("Error when inserting subscriber!");
        		} else {
                console.log("Thank you for your subscribe!");
        		}
      	});
    }
};

function constructCreateSubscribeSqlString(data){
    let query = "INSERT INTO pskd_customer SET " +
        "firstname = " + mysql.escape(data.firstname) + ", lastname = " + mysql.escape(data.lastname) +
        ", email = " + mysql.escape(data.email) + ", id_shop_group = 1, id_shop = 1" +
        ", id_default_group = 2, id_lang = 2, newsletter = 1, active = 0";
    return query;
}


module.exports = subscribeModel;
