const mysql = require('mysql');
const dotenv = require('dotenv');

let createConnection = function() {
    let connection = mysql.createConnection({
        host						: process.env.DB_HOST,
		user      					: process.env.DB_USER,
		password  					: process.env.DB_PASS,
		database  					: process.env.DB_NAME
    });
    return connection;
}

module.exports = createConnection;
