var service={};

var customers =[
{id:1,name:'Vivek',email:'vivek@gmail.com',phone:'9724234034',address:'India'},
{id:2,name:'Sweta Patel',email:'sweta@gmail.com',phone:'898989898',address:'India'},
{id:3,name:'Rama',email:'rama@gmail.com',phone:'8989',address:'USA'}
];

service.getCustomers = function(){
	return customers;
};

service.getCustomerById = function(id){
  let customer = {};
  for (var i = 0; i < customers.length; i++) {
  	if(customers[i].id == id){
  		customer = customers[i];
  		break;
  	}
  }
  return customer;
};

service.getCustomerByEmail = function(email){
  let customerList = [];
  for (var i = 0; i < customers.length; i++) {
  	if( customers[i].email == email ){
  		customerList.push(customers[i]);
  	}
  }
  return customerList;
};

service.getCustomerByName = function(name){
  let customerList = [];
  for (var i = 0; i < customers.length; i++) {
  	if( customers[i].name == name ){
  		customerList.push(customers[i]);
  	}
  }
  return customerList;
};

service.addCustomer = function(customer){
	customer.id = Math.round(Math.random(233)*100000);
  	customers.push(customer);
  	return {result:'success', msg:'customer record added ok.'};
};

service.updateCustomer = function(customer){
	if(customer.id !=undefined){
  		for (var i = 0; i < customers.length; i++) {
	  	if(customers[i].id == customer.id){
	  		customers[i] = customer;
	  		break;
	  	}
	  }
  	return {result:'success', msg:'customer record updated ok.'};
  }else{
  	return {result:'fail', msg:'customer record not correct.'};
  }
};

service.deleteCustomer = function(customer){
	 if(customer.id !=undefined){
  	 let customerList = []
	  for (var i = 0; i < customers.length; i++) {
	  	if(customers[i].id != customer.id){
	  		customerList.push(customers[i]);
	  	}
	  }
	  customers = customerList;
  	return {result:'success', msg:'customer record deleted ok.'};
  }else{
  	return {result:'fail', msg:'customer record not correct.'};
  }
};


module.exports = service;
