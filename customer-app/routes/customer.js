var express = require('express');
var router = express.Router();
var customerService = require('../service/customer-service');
var customerDBService = require('../service/customer-db-service');

router.get('/', function(req, res, next) {
	let callback = function(result){
		res.send(result);
	}
  customerDBService.getCustomers(callback);
});

router.get('/:id', function(req, res, next) {
	let callback = function(data){
		res.send(data);
	}
  customerDBService.getCustomerById(req.params.id,callback);
});

router.post('/', function(req, res, next) {
	let callback=function (result) {
		res.send(result);
	}
	customerDBService.addCustomer(req.body,callback);
});
router.put('/', function(req, res, next) {
	let callback=function (result) {
		res.send(result);
	}
	customerDBService.updateCustomer(req.body,callback);
});

router.delete('/', function(req, res, next) {
	let callback=function (result) {
		res.send(result);
	}
	customerDBService.deleteCustomer(req.body.id,callback);
});
module.exports = router;
