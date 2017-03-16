var mysql = require('mysql');

var connectionPool = mysql.createPool({
     connectionLimit : 100, 
     host     : 'localhost',
     user     : 'root',
     password : '12345',
     database : 'Jobs',
     debug    :  false
 });

module.exports = connectionPool;