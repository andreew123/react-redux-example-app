const mysql = require('mysql');
const dbConnectionCreator = require('../utilities/mysqlConnection.js');

let companyModel = {
    convertRowToObject: function(row) {
		return {
            companyId: row.id,
            companyName: row.company_name,
            taxNumber: row.tax_number,
            recordNumber: row.record_number,
            phone: row.phone,
            seat: row.seat
		};
	},

    getCompanies: function(callback) {
        let dbConnection = dbConnectionCreator();
        let companyQuery = constructGetCompanySql();
        dbConnection.query(companyQuery, function(error, results, fields) {
			if (error) {
				dbConnection.destroy();
				return callback(error);
			} else {
                var companies = {};
                results.forEach(function(result) {
                    companies[result.id] = companyModel.convertRowToObject(result);
                });
                return callback(companies);
			}
		});
	},

    createCompany: function(callback) {
      	let dbConnection = dbConnectionCreator();
      	let createCompanySqlString = constructCreateCompanySqlString(callback);
      	dbConnection.query(createCompanySqlString, function(error, results, fields){
            if (error) {
                dbConnection.destroy();
                console.log('Error when inserting record!');
    		} else {
                console.log('Save was successful!');
    		}
      	});
    }
};

function constructCreateCompanySqlString(data){
    let query = "INSERT INTO company SET " +
        "company_name = " + mysql.escape(data.companyName) +
        ", tax_number = " + mysql.escape(data.taxNumber) +
        ", record_number = " + mysql.escape(data.recordNumber) +
        ", phone = " + mysql.escape(data.phone) +
        ", seat = " + mysql.escape(data.seat);
    return query;
}

function constructGetCompanySql() {
    let query = "SELECT * FROM company WHERE deleted_at IS NULL";
	return query;
}

module.exports = companyModel;
