var financeModel = require('../models/finance.js'),
	dotenv = require('dotenv');
	jwt = require('jsonwebtoken');

var setFinanceRoutes = function(app){

	app.post('/finance',
		function (req, res) {
			let token = req.headers.authorization;
			token = token.split(" ")[1];
			jwt.verify(token, process.env.SECRET, function(err, decoded) {
				var data = {
					userId: decoded.userId,
					companyId: req.body.companyId,
					closingBalance: req.body.closingBalance,
					phoenixDebit: req.body.phoenixDebit,
					incomingOep: req.body.incomingOep
				}
				financeModel.createFinanceRecord(
				    data,
				    function(result) {
				        return res.json(result);
				    }
				);
			})
		}
	);

	app.get('/finances',
		function (req, res) {
	        financeModel.getFinanceRecords(function(result) {
				let finances = result;
				res.status(201).send({
					financeList: finances
				});
	        });
		}
	);

}

module.exports = setFinanceRoutes;
