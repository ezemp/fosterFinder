const mysql = require("mysql");

module.exports.authenticate = function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    connection.query('SELECT * FROM users WHERE email = ?',[email],function (error, results, fields){
     if(error){
         res.json({
             status:false,
             message:"An error occurred"
         })
     }else{
         if(results.length > 0){
             if(password==results[0].password){
                 res.json({
                     status:true,
                     message:"successfully logged in"
                 })
             }else{
                 res.json({
                     status:false,
                     message:"Email and password do not match"
                 });
             }
         }
         else{
             res.json({
                 status:false,
                 message:"No email matches one in database"
             })
         }
     }
    })
}

