const mysql = require("mysql");
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'usersdb'
  });
  connection.connect(function(err){
  if(!err) {
      console.log("Database is connected ... nn");
  } else {
      console.log("Error connecting database ... nn");
  }
  });
exports.register = function(req, res){
    var today = new Date();
    var users = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email":req.body.email,
        "password":req.body.password,
        "created:":today
    }
    connection.query("INSERT INTO users SET ?", users, function(error,results,fields){
        if (error){
            console.log("error occured during creation")
            res.send({
                "code":400,
                "failed":"error occured"
            })
        }else{
            console.log("User created successfully", results)
            res.send({
                "code":200,
                "success":"user registered successfully"
            })
        }
    })
}

exports.login = function(req,res){
    var email = req.body.email;
    var password = req.body.password
    connection.query("SELECT * FROM users WHERE email = ?",[email],function(error, results, fields)){
        if(error){
            res.send({
                "code":400,
                "failed":"error occured"
            })
        }else{
            if(results.length > 0){
                if(results[0].password == password){
                    res.send({
                        "code":200,
                        "success":"login successfull"
                    });
                }
                else{
                    res.send({
                        "code":204,
                        "success":"Email and password do not match"
                    });
                }
            }
            else{
                res.send({
                    "code":204,
                    "success":"Email does not appear in our system"
                });
            }
        }
    }
}