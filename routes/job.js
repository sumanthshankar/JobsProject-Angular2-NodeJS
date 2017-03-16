var express = require('express');
var passwordHash = require('password-hash');
var connectionPool  = require('../connection');
var jwt = require('jsonwebtoken');
var mysql = require('mysql');

var jobRoutes = express.Router();

jobRoutes.get('/all-jobs', function(req, res, next) { 

    var sqlQuery = 'SELECT * FROM Job';

    sqlQuery = mysql.format(sqlQuery);

    connectionPool.getConnection(function(err, connection) { 
        if (err) {
           connection.release();
           res.json({"code" : 100, "status" : "Error in connection database"});
           return;
         }
         console.log('connected as id ' + connection.threadId);

         connection.query(sqlQuery, function(err, result) {
             connection.release();

             if(err) {
                 return res.status(404).json({
                     title: 'An error occurred while executing sql query',
                     error: err
                 });
             }

             res.status(201).json({
                    message: 'Got all Job',
                    jobs: result
             });
         });
    });

});

jobRoutes.get('/single-job/:jobId', function(req, res, next) { 

    jwt.verify(req.query.token, 'admin secret', function(err, decode) {
        if (err) {
            return res.status(404).json({
                title: 'Token is invalid',
                error: err
            });
        }
    });

    var sqlQuery = 'SELECT * FROM Job WHERE job_id = ?';

    sqlQuery = mysql.format(sqlQuery, req.params.jobId);

    connectionPool.getConnection(function(err, connection) {
        if (err) {
           connection.release();
           res.json({"code" : 100, "status" : "Error in connection database"});
           return;
         }
         console.log('connected as id ' + connection.threadId);

         connection.query(sqlQuery, function(err, result) { 
             connection.release();

             if(err) {
                return res.status(404).json({
                    title: 'An error occurred while executing sql query',
                    error: err
                });
            }
            res.status(201).json({
                    message: 'Got single Jobs',
                    job: result
             });
        });
    });
});

jobRoutes.post('/add-job', function(req, res, next) {

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
         var promise = new Promise(function (resolve, reject) {
         var sqlQuery1 = 'SELECT * FROM User_Job WHERE user_id = ? AND job_id = ?';
         var insert = [req.body.userId, req.body.jobId];
         sqlQuery1 = mysql.format(sqlQuery1, insert);
         connection.query(sqlQuery1, function(err, result) {
            if(err) throw err;
            if(result.length != 0) reject(err);
            else resolve(result);
            });
        });

        promise
        .then(function(result) {
            console.log('Inside Promise 1');
            var sqlQuery2 = 'INSERT INTO User_Job VALUES(?, ?, now())';
            var insert = [req.body.userId, req.body.jobId];
            sqlQuery2 = mysql.format(sqlQuery2, insert);
            console.log('connected as id ' + connection.threadId);
            connection.query(sqlQuery2, function(err, result) {
                connection.release();
                console.log('Connection Released');
                if(err) throw err;
                if(result) {
                    return res.status(201).json({
                    message: 'Job added'
                });
                }
            });
        })
        .catch(function(err) { 
            connection.release();
            console.log('Connection Released');
            return res.status(404).json({
                title: 'Cannot add job',
                error: { message: 'Job already applied' }
            });
        });
    });
});

jobRoutes.put('/edit-job/:jobId', function(req, res, next) { 

    jwt.verify(req.query.token, 'admin secret', function(err, decode) {
        if (err) {
            return res.status(404).json({
                title: 'Token is invalid',
                error: err
            });
        }
    });

    var sqlQuery = 'UPDATE Job SET job_title = ?, job_description = ?, job_end_date = ? WHERE job_id = ?';
    var insert = [req.body.jobTitle, req.body.jobDescription, req.body.jobEndDate, req.params.jobId];

    sqlQuery = mysql.format(sqlQuery, insert);

    connectionPool.getConnection(function(err, connection){
         if (err) {
           connection.release();
           res.json({"code" : 100, "status" : "Error in connection database"});
           return;
         }
         console.log('connected as id ' + connection.threadId);

         connection.query(sqlQuery, function(err, result) { 
            connection.release();

            if(err) {
                return res.status(404).json({
                    title: 'An error occurred while executing sql query',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Job updated',
            });
         });
    });

});

jobRoutes.delete('/delete-job/:jobId', function(req, res, next) {

    jwt.verify(req.query.token, 'admin secret', function(err, decode) {
        if (err) {
            return res.status(404).json({
                title: 'Token is invalid',
                error: err
            });
        }
    });

    var sqlQuery = 'DELETE FROM Job WHERE job_id = ?';

    sqlQuery = mysql.format(sqlQuery, req.params.jobId);

    connectionPool.getConnection(function(err, connection){
         if (err) {
           connection.release();
           res.json({"code" : 100, "status" : "Error in connection database"});
           return;
         }

         connection.query(sqlQuery, function(err, result) { 
             connection.release();

             if(err) {
                return res.status(404).json({
                    title: 'An error occurred while executing sql query',
                    error: err
                });
             }
             res.status(201).json({
                message: 'Job deleted',
            });
         });
    });

});

jobRoutes.delete('/delete-applicant-job/:userId/:jobId', function(req, res, next) {

    jwt.verify(req.query.token, 'admin secret', function(err, decode) {
        if (err) {
            return res.status(404).json({
                title: 'Token is invalid',
                error: err
            });
        }
    });

    var sqlQuery = 'DELETE FROM User_Job WHERE user_id = ? AND job_id = ?';
    var insert = [req.params.userId, req.params.jobId]
    sqlQuery = mysql.format(sqlQuery, insert);

    connectionPool.getConnection(function(err, connection){
         if (err) {
           connection.release();
           res.json({"code" : 100, "status" : "Error in connection database"});
           return;
         }

         connection.query(sqlQuery, function(err, result) { 
             connection.release();

             if(err) {
                return res.status(404).json({
                    title: 'An error occurred while executing sql query',
                    error: err
                });
             }
             res.status(201).json({
                message: 'Job deleted',
                obj: req.params.jobId
            });
         });
    });

});

jobRoutes.post('/post-job', function(req, res, next) {

    jwt.verify(req.query.token, 'admin secret', function(err, decode) {
        if (err) {
            return res.status(404).json({
                title: 'Token is invalid',
                error: err
            });
        }
    });

    var job = {
        job_title: req.body.jobTitle,
        job_description: req.body.jobDescription,
        job_end_date: req.body.jobEndDate,
        job_posted_date: new Date()
    };

    var sqlQuery = 'INSERT INTO Job SET ?';
    
    var job = {
        job_title: req.body.jobTitle,
        job_description: req.body.jobDescription,
        job_end_date: req.body.jobEndDate,
        job_posted_date: new Date()
    };

    sqlQuery = mysql.format(sqlQuery, job);

    connectionPool.getConnection(function(err, connection){
         if (err) {
           connection.release();
           res.json({"code" : 100, "status" : "Error in connection database"});
           return;
         }
         console.log('connected as id ' + connection.threadId);

         connection.query(sqlQuery, function(err, result) { 

            connection.release();

            if(err) {
                return res.status(404).json({
                    title: 'An error occurred while executing sql query',
                    error: err
                });
            }
            res.status(201).json({
                message: 'New Job posted',
            });
        
        });

    });

});

module.exports = jobRoutes;