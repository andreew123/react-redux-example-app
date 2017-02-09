const mysql = require('mysql');
const dbConnectionCreator = require('../utilities/mysqlConnection.js');
const dotenv = require('dotenv');

var userModel = {
    convertRowToObject: function(row, password = false) {
        return {
            userId: row.id,
            firstname: row.first_name,
            lastname: row.last_name,
            email: row.email,
            password: !row.password ? '' : row.password,
            phone: row.phone_number,
            birthday: row.birthday,
            title: row.title,
            role: row.role_name
        };
    },

    getUsers: function(callback) {
        var dbConnection = dbConnectionCreator();
        var usersQuery = constructGetUsersSql();
        dbConnection.query(usersQuery, function(error, results, fields) {
            if (error) {
                dbConnection.destroy();
                return callback(error);
            } else {
                var users = {};
                results.forEach(function(result) {
                    users[result.id] = userModel.convertRowToObject(result, true);
                });
                return callback(users);
            }
        });
    },

    getMyProfile: function(data, callback) {
        var dbConnection = dbConnectionCreator();
        var userQuery = constructGetUserSql(data);
        dbConnection.query(userQuery, function(error, results, fields) {
            if (error) {
                dbConnection.destroy();
                return callback({success: false, message: 'unknown error'});
            } else {
                var user = {};
                results.forEach(function(result) {
                    user = userModel.convertRowToObject(result);
                });
                return callback({user: user});
            }
        });
    },

    createUser: function(callback) {
        var dbConnection = dbConnectionCreator();
        var createUserSqlString = constructCreateUserSqlString(callback);
        dbConnection.query(createUserSqlString, function(error, results, fields){
            if (error) {
                dbConnection.destroy();
                console.log('Error when inserting record!');
            } else {
                console.log('Save was successful!');
            }
        });
    },

    editProfile: function(data, callback) {
        var dbConnection = dbConnectionCreator();
        var updateProfileSqlString = constructUpdateProfileSqlString(data);
        dbConnection.query(updateProfileSqlString, function(error, results, fields){
            if (error) {
                dbConnection.destroy();
                console.log('Error when inserting record!');
            } else {
                console.log('Save was successful!');
            }
        });
    },

    editPassword: function(data, callback) {
        var dbConnection = dbConnectionCreator();
        var updatePasswordSqlString = constructUpdatePasswordSqlString(data);
        dbConnection.query(updatePasswordSqlString, function(error, results, fields){
            if (error) {
                dbConnection.destroy();
                console.log('Error when inserting record!');
            } else {
                console.log('Save was successful!');
            }
        });
    }
};

function constructCreateUserSqlString(data){
    var query = "INSERT INTO user SET" +
        " first_name = " + mysql.escape(data.firstname) +
        ", last_name = " + mysql.escape(data.lastname) +
        ", email = " + mysql.escape(data.email) +
        ", password = " + mysql.escape(data.password) +
        ", phone_number = " + mysql.escape(data.phone) +
        ", birthday = " + mysql.escape(data.birthday) +
        ", title = " + mysql.escape(data.title) +
        ", role_id = " + mysql.escape(data.roleId);
    return query;
}

function constructUpdateProfileSqlString(data){
    var query = "UPDATE user SET" +
        " first_name = " + mysql.escape(data.firstname) +
        ", last_name = " + mysql.escape(data.lastname) +
        ", phone_number = " + mysql.escape(data.phone) +
        ", birthday = " + mysql.escape(data.birthday) +
        ", title = " + mysql.escape(data.title) +
        " WHERE id = " + mysql.escape(data.userId);
    return query;
}

function constructUpdatePasswordSqlString(data){
    var query = "UPDATE user SET" +
        " password = " + mysql.escape(data.password) +
        " WHERE id = " + mysql.escape(data.userId);
    return query;
}

function constructGetUsersSql() {
    var query = "SELECT u.*, r.role_name FROM user u " +
        "LEFT JOIN role r ON (r.id = u.role_id)";
	return query;
}

function constructGetUserSql(data) {
    var query = "SELECT u.id, u.first_name, u.last_name, u.email, " +
        "u.phone_number, u.birthday, u.title, r.role_name FROM user u " +
        "LEFT JOIN role r ON (r.id = u.role_id) " +
        "WHERE email = " + mysql.escape(data.email);
    return query;
}


module.exports = userModel;
