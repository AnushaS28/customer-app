var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password : 'smartant',
    port : 3306, //port mysql
    database:'nodejs',
    connectionLimit: 11,
    supportBigNumbers: true
});

var service= {};

service.getCustomers = function(callback){
  var sql = "SELECT * FROM customer";
  pool.getConnection(
    function(err, connection) {
    if(err) { console.log(err); callback([]); return; }
    // make the query
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) { console.log(err); callback([]); return; }
      callback(results);
    });
  });
};

service.addCustomer = function(customer,callback) {
  //customer.id = Math.round(Math.random()*1000000);
        pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback({result:"fail"}); return; }
        connection.query("INSERT INTO customer set ? ",customer, function(err, results) {
          connection.release();
          if(err){
           console.log("Error Selecting : %s ",err );
           callback({result:"fail"});
          }else{
           callback({result:"success",msg:"Customer added successfully."});
         }
      });
    });
};

service.getCustomerById = function(id,callback){
  var record = {};
  var sql = "SELECT * FROM customer where id='"+id+"'";
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback({}); return; }
    // make the query
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) { console.log(err); callback({}); return; }
      if(results.length == 0){
        callback(record);
      }
      callback(results[0]);
    });
  });
};

service.deleteCustomer = function(id,callback){
  var sql = "delete FROM customer where id='"+id+"'";
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback({result:"fail"}); return; }
    // make the query
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) { console.log(err); callback({result:"fail"}); return; }
      callback({result:"success"});
    });
  });
};


service.getCustomersBySearch = function(searchParam,callback){
 //select * from customer where name like "%vivek%";
 var sql = "SELECT * FROM customer where "+ searchParam.field + " like "+ "\"%"+searchParam.searchword+"%\"";
  pool.getConnection(
    function(err, connection) {
    if(err) { console.log(err); callback([]); return; }
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) { console.log(err); callback([]); return; }
      callback(results);
    });
  });

}
service.updateCustomer = function(customer,callback){
         pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback({result:"fail"}); return; }
        connection.query("UPDATE customer set ? WHERE id = ? ",[customer,customer.id], function(err, results) {
          if(err){
           console.log("Error Selecting : %s ",err );
           callback({result:"fail"});
          }else{
           callback({result:"success"});
         }
      });
    });
};

module.exports = service;
