const mysql = require("mysql")
  

module.exports.register = function(req, res){
    var today = new Date();
    var users = {
        "name":req.body.name,
        "email":req.body.email,
        "password":req.body.password,
        "address":req.body.address,
        "home_type":req.body.homeType,
        "children":req.body.children,
        "created_at":today
    }
    connection.query('INSERT INTO users SET ?',users, function(error, results, fields){
        if (error){
            res.json({
                status:false,
                message:"There was an error with the inputs."
            })
        }else{
            res.json({
                status:true,
                data:results,
                message:"User successfully register"
            })
        }
    })
}