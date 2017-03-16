var express = require('express');
var Promise = require("promise");
var passwordHash = require('password-hash');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var connectionPool  = require('../connection');

var userRouters = express.Router();

userRouters.get('/all-users', function(req, res, next) {

    jwt.verify(req.query.token, 'admin secret', function(err, decode) {
        if (err) {
            return res.status(404).json({
                title: 'Token is invalid',
                error: err
            });
        }
    });

    var users = [];

    var sqlQuery = 'SELECT u.user_id, u.first_name, u.last_name FROM User u';

    connectionPool.getConnection(function(err, connection)  {
        
         if (err) {
           connection.release();
           res.json({"code" : 100, "status" : "Error in connection database"});
           return;
         }
         console.log('connected as id ' + connection.threadId);

         connection.query(sqlQuery, function(err, result) {
             connection.release();
             console.log(result);
             if(err) throw err;
             for(var i = 0; i < result.length; i++) {
                 users.push({userId: result[i].user_id, firstName: result[i].first_name, lastName: result[i].last_name})
            }
            res.status(201).json({
                message: 'Got all users',
                userObjs: users
            });
         });

    });

});

userRouters.get('/admin/user-by-id/:userId', function(req, res, next) {

    jwt.verify(req.query.token, 'admin secret', function(err, decode) {
        if (err) {
            return res.status(404).json({
                title: 'Token is invalid',
                error: err
            });
        }
    });

    var sqlQuery = ' SELECT * FROM User u JOIN Education e ON u.email_id = e.user_emailId LEFT JOIN User_Job uj ' 
                    + ' ON uj.user_id = u.user_id LEFT JOIN Job j ON uj.job_id = j.job_id '
                    + ' WHERE u.user_id = ? ';
    sqlQuery = mysql.format(sqlQuery, req.params.userId);
 
    connectionPool.getConnection(function(err, connection)  {
        
         if (err) {
           connection.release();
           res.json({"code" : 100, "status" : "Error in connection database"});
           return;
         }
         console.log('connected as id ' + connection.threadId);

    connection.query(sqlQuery, function(err, result) { 
        connection.release();
        if(err) throw err;
        var education = [];
        var jobs = [];
        if(result.length > 0){
        for(var i = 0; i < result.length; i++) {
            education.push({educationId: result[i].education_id, major: result[i].major, 
                            university: result[i].university, year: result[i].year});
            jobs.push({jobId: result[i].job_id, jobTitle: result[i].job_title, 
                       jobDescription: result[i].job_description, appliedOn: result[i].job_applied_date});
        }

        function removeDuplicates(arr, prop) {
            var new_arr = [];
            var lookup  = {};
            for (var i in arr) {
                lookup[arr[i][prop]] = arr[i];
            }
            for (i in lookup) {
                new_arr.push(lookup[i]);
            }
                return new_arr;
            }
 
        var uniqueEducation = removeDuplicates(education, "educationId");

        var uniqueJobs = removeDuplicates(jobs, "jobId");

        var user = {
            userId: result[0].user_id,
            firstName: result[0].first_name,
            lastName: result[0].last_name,
            emailId: result[0].email_id,
            educationProfile: uniqueEducation,
            appliedJobs: uniqueJobs
        }
        }
        res.status(201).json({
            message: 'Got user',
            userObj: user
        });
     });
  });

});

userRouters.get('/user-by-id/:userId', function(req, res, next) {

    jwt.verify(req.query.token, 'applicant secret', function(err, decode) {
        if (err) {
            return res.status(404).json({
                title: 'Token is invalid',
                error: err
            });
        }
    });

    var sqlQuery = 'SELECT * FROM User JOIN Education ON User.email_id = Education.user_emailId WHERE User.user_id = ?';
    sqlQuery = mysql.format(sqlQuery, req.params.userId);
 
    connectionPool.getConnection(function(err, connection)  {
        
         if (err) {
           connection.release();
           res.json({"code" : 100, "status" : "Error in connection database"});
           return;
         }
         console.log('connected as id ' + connection.threadId);

    connection.query(sqlQuery, function(err, result) { 
        connection.release();
        if(err) throw err;
        var education = [];
        if(result.length > 0){
        for(var i = 0; i < result.length; i++) {
            education.push({major: result[i].major, university: result[i].university, year: result[i].year})
        }
        var user = {
            userId: result[0].user_id,
            firstName: result[0].first_name,
            lastName: result[0].last_name,
            emailId: result[0].email_id,
            educationProfile: education
        }
    }
        res.status(201).json({
            message: 'Got user',
            userObj: user
        });
     });
  });

});

userRouters.post('/add-new-user', function(req, res, next) { 

    var sqlQuery1 = 'SELECT email_id FROM User WHERE email_id = ?';
    sqlQuery1 = mysql.format(sqlQuery1, req.body.emailId);

    connectionPool.getConnection(function(err, connection)  {
        
         if (err) {
           connection.release();
           res.json({"code" : 100, "status" : "Error in connection database"});
           return;
         }
         console.log('connected as id ' + connection.threadId);

    var user = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email_id: req.body.emailId,
        password: passwordHash.generate(req.body.password)
    }

    var promise = new Promise(function (resolve, reject) {
        connection.query(sqlQuery1, function(err, result) {
            if(err) throw err;
            if(result.length!=0) reject(err);
            else resolve(result);
        });
    });

    var sqlQuery2 = 'INSERT INTO User SET ?';
    sqlQuery2 = mysql.format(sqlQuery2, user);

    promise
    .then(function(result) { 
        console.log('Inside 1st promise');
        return connection.query(sqlQuery2, function(err, result) {
            if(err) throw err;
        });
    })
    .then(function(result) { 
        console.log('Inside 2nd promise');
        if(req.body.educationProfile.length != 0) {
        for(var i = 0; i < req.body.educationProfile.length; i ++) {
            var education = {
                major: req.body.educationProfile[i].major,
                university: req.body.educationProfile[i].university,
                year: req.body.educationProfile[i].year,
                user_emailId: req.body.emailId
            }
            var sqlQuery3 = 'INSERT INTO Education SET ?';
            sqlQuery3 = mysql.format(sqlQuery3, education);
            connection.query(sqlQuery3, function(err, result) {  
                if(err) throw err;
            });
        }
        }
        return;
    })
    .catch(function(err) { 
        return res.status(404).json({
            title: 'Email already used',
            error: { message: 'Email already used by another user! Please choose another email!' }
        });
    })
    .finally(function(err){
        connection.release();
        console.log('connection released');
        res.status(201).json({
        message: 'New user added'
    });
    });
    
    });
});

userRouters.put('/edit-profile/:userId', function(req, res, next) {

    jwt.verify(req.query.token, 'applicant secret', function(err, decode) {
        if (err) {
            return res.status(404).json({
                title: 'Token is invalid',
                error: err
            });
        }
    });

    connectionPool.getConnection(function(err, connection) {
        
         if (err) {
           connection.release();
           res.json({"code" : 100, "status" : "Error in connection database"});
           return;
         }
         console.log('connected as id ' + connection.threadId);

        var promise = new Promise(function (resolve, reject) {
            var sqlQuery1 = 'SELECT * FROM User WHERE email_id = ?';
            sqlQuery1 = mysql.format(sqlQuery1, req.body.emailId);
            connection.query(sqlQuery1, function(err, result) {
                if(err) throw err;
                if(result.length != 1) reject(err);
                else resolve(result);
            });
        });

        promise
        .then(function(result){
            console.log('inside promise 1');
            var sqlQuery2 = 'UPDATE User SET first_name = ?, last_name = ?, password = ? WHERE user_id = ?';
            var insert = [req.body.firstName, req.body.lastName, 
                          passwordHash.generate(req.body.password), req.params.userId];
            sqlQuery2 = mysql.format(sqlQuery2, insert);
            return connection.query(sqlQuery2, function(err, result) {
                if(err) throw err;
            });
        })
        .then(function(result) {
            console.log('inside promise 2');
            var sqlQuery3 = 'DELETE FROM Education WHERE user_emailId = ?';
            sqlQuery3 = mysql.format(sqlQuery3, req.body.emailId);
            return connection.query(sqlQuery3, function(err, result) {
                if(err) throw err;
            });
        })
        .then(function(result) {
            console.log('inside promise 3');
            for(var i = 0; i < req.body.educationProfile.length; i ++) {      
            var sqlQuery3 = 'INSERT INTO Education(major, university, year, user_emailId) VALUES(?, ?, ?, ?)';
            var insert = [req.body.educationProfile[i].major, req.body.educationProfile[i].university, 
                          parseInt(req.body.educationProfile[i].year), req.body.emailId];
            sqlQuery3 = mysql.format(sqlQuery3, insert);
            connection.query(sqlQuery3, function(err, result) {  
                if(err) throw err;
            });
            }
            return;
        })
        .catch(function(err) { 
            return res.status(404).json({
                title: 'Email already used',
                error: { message: 'Email already used by another user! Please choose another email!' }
            });
        })
        .catch(function(err2) { 
            return res.status(404).json({
                title: 'SQL error inside promise 1',
                error: { message: 'SQL error inside promise 1' }
            });
        })
        .finally(function(err){
            connection.release();
            console.log('connection released');
            return res.status(201).json({
            message: 'Saved job under users array'
        });
        });
    });
});

userRouters.delete('/delete-profile', function(req, res, next) {

    jwt.verify(req.query.token, 'applicant secret', function(err, decode) {
        if (err) {
            return res.status(404).json({
                title: 'Token is invalid',
                error: err
            });
        }
    });

    var decode = jwt.decode(req.query.token);

    connectionPool.getConnection(function(err, connection) {
        if (err) {
           connection.release();
           res.json({"code" : 100, "status" : "Error in connection database"});
           return;
         }
         console.log('connected as id ' + connection.threadId);
         var sqlQuery1 = 'DELETE FROM User WHERE user_id = ?';
         sqlQuery1 = mysql.format(sqlQuery1, parseInt(decode.applicant.userId));
         console.log(parseInt(decode.applicant.userId));
         connection.query(sqlQuery1, function(err, connection) {
             if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
             }
         });
         connection.release();
         console.log('connection released');
    });

    connectionPool.getConnection(function(err, connection) {
        if (err) {
           connection.release();
           res.json({"code" : 100, "status" : "Error in connection database"});
           return;
         }
         console.log('connected as id ' + connection.threadId);
         var sqlQuery2 = 'DELETE FROM Education WHERE user_emailId = ?';
         sqlQuery2 = mysql.format(sqlQuery2, decode.applicant.emailId);
         console.log(decode.applicant.emailId);
         connection.query(sqlQuery2, function(err, connection) {
             if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
             }
         });
         connection.release();
         console.log('connection released');
         res.status(201).json({
            message: 'Deleted your profile'
        });
    });

});

module.exports = userRouters;