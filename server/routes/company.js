var companyModel = require('../models/company.js');

var setCompanyRoutes = function(app){

	app.post('/company',
		function (req, res) {
			var data = {
                companyName: req.body.companyName,
                taxNumber: req.body.taxNumber,
                recordNumber: req.body.recordNumber,
                phone: req.body.phone,
                seat: req.body.seat
			}
			companyModel.createCompany(
				data,
				function(result) {
					return res.json(result);
				}
			);
		}
	);

	app.get('/companies',
		function (req, res) {
			companyModel.getCompanies(function(result) {
				let companies = result;
				res.status(201).send({
					companyList: companies
				});
			});
		}
	);

}

module.exports = setCompanyRoutes;
