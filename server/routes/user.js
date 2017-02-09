const _ = require('lodash');
var userModel = require('../models/user.js');

var setUserRoutes = function(app){

	app.post('/user',
		function (req, res) {
			var data = {
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				email: req.body.email,
				password: req.body.password,
				birthday: req.body.birthday,
				phone: req.body.phone,
				title: req.body.title,
				roleId: req.body.roleId
			}
			userModel.createUser(
				data,
				function(result) {
					return res.json(result);
				}
			);
		}
	);

	app.post('/me',
		function (req, res) {
			var data = {
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				birthday: req.body.birthday,
				phone: req.body.phone,
				title: req.body.title,
				userId: 1
			}
			userModel.editProfile(
				data,
				function(result) {
					return res.json(result);
				}
      		);
		}
	);

	app.post('/me/password',
		function (req, res) {
			var data = {
				password: req.body.password,
				userId: 1
			}
			userModel.editPassword(
				data,
				function(result) {
					return res.json(result);
				}
      		);
		}
	);

	app.get('/users',
		function (req, res) {
			userModel.getUsers(function(result) {
				let users = result;
				res.status(201).send({
					userList: users
				});
			});
		}
	);

}

module.exports = setUserRoutes;
