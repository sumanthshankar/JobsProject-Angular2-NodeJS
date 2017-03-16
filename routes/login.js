var express = require('express');
var passwordHash = require('password-hash');
var connectionPool  = require('../connection');
var jwt = require('jsonwebtoken');
var mysql = require('mysql');

var loginRoutes = express.Router();

loginRoutes.post('/admin-login', function(req, res, next) { 

    connectionPool.getConnection(function(err, connection)  {
        
         if (err) {
           connection.release();
           res.json({"code" : 100, "status" : "Error in connection database"});
           return;
         }
         console.log('connected as id ' + connection.threadId);

    var sqlQuery = 'SELECT * FROM Admin WHERE email_id = ?';
    var insert = [req.body.emailId];
    sqlQuery = mysql.format(sqlQuery, insert);

    connection.query(sqlQuery, function(err, result) {

        connection.release();

        if(err) {
            return res.status(404).json({
                title: 'An error in executing SQL Query',
                error: err
            });
        }
        if(result.length == 0) {
            return res.status(404).json({
                title: 'Couldnot not log you in',
                error: { message: 'Invalid emailId!' }
            });
        }
        if(!passwordHash.verify(req.body.password, result[0].password)) {
            return res.status(404).json({
                title: 'Couldnot not log you in',
                error: { message: 'Invalid password!' }
            });
        }
        var token = jwt.sign({ admin: result }, 'admin secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in as Admin',
            token: token
        });
    });

  });
  
});

loginRoutes.post('/add-admin', function(req, res, next) { 
    connection.connect(function(err) { 
        if (err) {
        console.error('error connecting: ' + err.stack);
        }

        console.log('Connected to Jobs Database with Connection Id ' + connection.threadId);
    });

    var user = {
        email_id: req.body.emailId,
        password: passwordHash.generate(req.body.password)
    }

    connection.query('INSERT INTO Admin SET ?', user, function(err, result ) { 
        if(err) throw err;
        console.log(result);
    });

});

loginRoutes.post('/applicant-login', function(req, res, next) { 

    connectionPool.getConnection(function(err, connection)  {
        
         if (err) {
           connection.release();
           res.json({"code" : 100, "status" : "Error in connection database"});
           return;
         }
         console.log('connected as id ' + connection.threadId);

    var sqlQuery = 'SELECT * FROM User WHERE email_id = ?';
    var insert = [req.body.emailId];
    sqlQuery = mysql.format(sqlQuery, insert);

    connection.query(sqlQuery, function(err, result) {

        connection.release();

        if(err) {
            return res.status(404).json({
                title: 'An error in executing SQL Query',
                error: err
            });
        }
        if(result.length == 0) {
            return res.status(404).json({
                title: 'Couldnot not log you in',
                error: { message: 'Invalid emailId!' }
            });
        }
        if(!passwordHash.verify(req.body.password, result[0].password)) {
            return res.status(404).json({
                title: 'Couldnot not log you in',
                error: { message: 'Invalid password!' }
            });
        }
        var user = {
            userId: result[0].user_id,
            firstName: result[0].first_name,
            lastName: result[0].last_name,
            emailId: result[0].email_id,
        }
        var token = jwt.sign({ applicant: user }, 'applicant secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in as Applicant',
            token: token,
            userId: result[0].user_id
        });
    });

  });
  
});

module.exports = loginRoutes;