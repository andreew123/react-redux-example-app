const mysql = require('mysql');
const dbConnectionCreator = require('../utilities/mysqlConnection.js');

var sessionModel = {
    convertRowToObject: function(row) {
        return {
            email: row.email,
            password: row.password
        };
    }

}
