const _ = require('lodash'),
	jwt = require('jsonwebtoken')
	dotenv = require('dotenv');
var userModel = require('../models/user');

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), process.env.SECRET, { expiresIn: 60*60*5 });
}

function getUserScheme(req) {
	var username;
	var type;
	var userSearch = {};

	// The POST contains a username and not an email
	if(req.body.username) {
		username = req.body.username;
		type = 'username';
		userSearch = { username: username };
	}
	// The POST contains an email and not an username
	else if(req.body.email) {
		username = req.body.email;
		type = 'email';
		userSearch = { email: username };
	}

	return {
		username: username,
		type: type,
		userSearch: userSearch
	}
}

var setAuthRoutes = function(app){

	app.post('/authenticate',
		function (req, res) {
			var data = {
				email: req.body.email,
				password: req.body.password
			}
			userModel.getMyProfile(
				data,
				function(result) {
					return res.json(result);
				}
			);
		}
	);

	app.get('/sessions',
		function (req, res) {
            sessionModel.getSession(function(result) {
                return res.status(201).send(json(result));
            });
		}
	);

	app.post('/sessions/create', function(req, res) {
		var users = {};
		var data = {
			email: req.body.email,
			password: req.body.password
		}
		var userScheme = getUserScheme(req);

		userModel.getUsers(function(result) {
			users = result;

			if (!userScheme.username || !data.password) {
				return res.status(400).send("You must send the username and the password");
			}

			var user = _.find(users, userScheme.userSearch);

			if (!user) {
				return res.status(401).send("The username or password don't match");
			}

			if (user.password !== data.password) {
				return res.status(401).send("The username or password don't match");
			}

			res.status(201).send({
				id_token: createToken(user)
			});
		});

	});

}

module.exports = setAuthRoutes;
