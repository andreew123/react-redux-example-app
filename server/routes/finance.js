var financeModel = require('../models/finance.js');

var setFinanceRoutes = function(app){

	app.post('/finance',
		function (req, res) {
			let token = req.headers['Authorization'];
            var data = {
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
