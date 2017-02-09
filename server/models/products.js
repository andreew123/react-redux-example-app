const mysql = require('mysql');
const dbConnectionCreator = require('../utilities/mysqlConnection.js');

let productModel = {
    convertRowToObject: function(row, url) {
		return {
			attributeId: row.identifier,
			productId: row.id_product,
            name: row.name,
            price: Math.round(parseInt(row.net_price) * (parseInt(row.rate) / 100 + 1)),
            image: url + (!row.id_image ? row.image_default : row.id_image) + '-medium_default/' + row.link_rewrite + '.jpg',
            url: 'https://gyogyszerfutar.hu/' + row.category_rewrite + '/' + row.id_product + '-' + row.link_rewrite + '-' + row.ean13 + '.html'
		};
	},

	getProducts: function(callback) {
        let dbConnection = dbConnectionCreator();
        let productQuery = constructGetProductSql();
        let urlQuery = constructGetProductUrlSql();
		dbConnection.query(productQuery, function(error, results, fields) {
			if (error) {
				dbConnection.destroy();
				return callback({error: error});
			} else {
                var products = {};
                dbConnection.query(urlQuery, function(error, res, fields) {
                    if (error) {
                        return callback({error: error});
                    } else {
                        if (res[0].value === null) {
                            let url = "https://gyogyszerfutar.hu/";
                        } else {
                            let url = res[0].value;
                        }
                        results.forEach(function(result) {
                            products[result.identifier] = productModel.convertRowToObject(result, url);
                        });
                        return callback({productData: products} );
                    }
                });
			}
		});
	}
};

function constructGetProductSql() {
    let query = "SELECT p.id_product, p.id_category_default, p.ean13, pa.id_product_attribute AS identifier, " +
        "pa.price AS net_price, pai.id_image, i.id_image as image_default, pl.name, pl.link_rewrite, pac.id_attribute, t.rate, " +
        "cl.link_rewrite as category_rewrite FROM pskd_product p " +
        "LEFT JOIN pskd_category_lang cl ON (cl.id_category = p.id_category_default AND id_lang = 2) " +
        "LEFT JOIN pskd_image i ON (i.id_product = p.id_product) " +
        "LEFT JOIN pskd_product_attribute a ON (a.id_product = p.id_product) " +
        "LEFT JOIN pskd_product_attribute_shop pa ON (pa.id_product = p.id_product) " +
        "LEFT JOIN pskd_product_attribute_image pai ON (pai.id_product_attribute = a.id_product_attribute) " +
        "LEFT JOIN pskd_product_lang pl ON (pl.id_product = p.id_product) " +
        "LEFT JOIN pskd_product_attribute_combination pac " +
        "ON (pac.id_product_attribute = pa.id_product_attribute) " +
        "LEFT JOIN pskd_tax_rules_group tg ON (p.id_tax_rules_group = tg.id_tax_rules_group) " +
        "LEFT JOIN pskd_tax t ON (tg.id_tax_rules_group = t.id_tax) " +
        "LEFT JOIN pskd_attribute_lang al ON (al.id_attribute = pac.id_attribute) " +
        "WHERE p.active = 1 AND al.id_lang = 2 GROUP BY pa.id_product_attribute ORDER BY pa.id_product_attribute " +
        "LIMIT 8";
	return query;
}

function constructGetProductUrlSql() {
    let query = "SELECT value FROM pskd_configuration WHERE name = 'PS_MEDIA_SERVER_1'";
    return query;
}


module.exports = productModel;
