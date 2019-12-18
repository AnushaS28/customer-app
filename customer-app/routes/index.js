var express = require('express');
var router = express.Router();
var customerService = require('../service/customer-service');
var customerDBService = require('../service/customer-db-service');

router.get('/', function(req, res, next) {
  res.redirect('/login');
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/dashboard', function(req, res, next) {
  res.render('index', { title: 'Dashboard' });
});

router.get('/aboutus', function(req, res, next) {
  res.render('index', { title: 'About us' });
});

router.get('/customers', function(req, res, next) {
	let callback = function(result){
		res.render('customers', { title: 'Customers', data:result});
	}
  customerDBService.getCustomers(callback);
});

router.get('/customers/:field/:searchText', function(req, res, next) {
  let params = {field:req.params.field,searchword:req.params.searchText};
  let callback = function(result){
    res.render('customers', { title: 'Customers', data:result});
  }
  customerDBService.getCustomersBySearch(params,callback);
});

router.get('/customers/add', function(req, res, next) {
  res.render('add-customer', { title: 'Add Customer'});
});

router.get('/customers/edit/:id', function(req, res, next) {
  let callback = function(data){
    res.render('edit-customer', { title: 'Update Customer', customer:data});
  }
  customerDBService.getCustomerById(req.params.id,callback);
});
module.exports = router;
