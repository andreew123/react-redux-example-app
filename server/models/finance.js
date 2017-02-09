const mysql = require('mysql');
const dbConnectionCreator = require('../utilities/mysqlConnection.js');

let financeModel = {
    convertRowToObject: function(row) {
		return {
			recordId: row.id,
            firstname: row.first_name,
            lastname: row.last_name,
            date: row.created_at,
            closingBalance: row.closing_balance,
            phoenixDebit: row.phoenix_debit,
            incomingOep: row.incoming_oep
		};
	},

    getFinanceRecords: function(callback) {
        let dbConnection = dbConnectionCreator();
        let recordQuery = constructGetRecordSql();
        dbConnection.query(recordQuery, function(error, results, fields) {
			if (error) {
				dbConnection.destroy();
				return callback({error: error});
			} else {
                var records = {};
                results.forEach(function(result) {
                    records[result.id] = financeModel.convertRowToObject(result);
                });
                return callback(records);
			}
		});
	},

    createFinanceRecord: function(callback) {
      	let dbConnection = dbConnectionCreator();
      	let createRecordSqlString = constructCreateRecordSqlString(callback);
      	dbConnection.query(createRecordSqlString, function(error, results, fields){
            if (error) {
                dbConnection.destroy();
                console.log('Error when inserting record!');
    		} else {
                console.log('Save was successful!');
    		}
      	});
    }
};

function constructCreateRecordSqlString(data){
    let query = "INSERT INTO finance SET " +
        "closing_balance = " + mysql.escape(data.closingBalance) +
        ", phoenix_debit = " + mysql.escape(data.phoenixDebit) +
        ", incoming_oep = " + mysql.escape(data.incomingOep) +
        ", user_id = " + mysql.escape(data.userId);
    return query;
}

function constructGetRecordSql() {
    let query = "SELECT f.id, f.created_at, f.updated_at, f.closing_balance, " +
        "f.phoenix_debit, f.incoming_oep, u.first_name, u.last_name FROM finance f " +
        "LEFT JOIN user u ON (u.id = f.user_id) WHERE f.deleted_at IS NULL " +
        "ORDER BY f.created_at";
	return query;
}

module.exports = financeModel;
