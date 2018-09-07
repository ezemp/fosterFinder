var db = require("../models");

module.exports = function(app) {
  // Get all examples
  // app.get("/api/examples", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // Create a new User
  app.post("/api/register", function(req, res) {
    db.User.create(req.body).then(function(dbRegister) {
      res.json(dbRegister);
    });
  });

  app.post("/api/login", function(req, res) {
    db.User.create(req.body).then(function(dbRegister) {
      res.json(dbRegister);
    });
  });
  

  // Delete an example by id
//   app.delete("/api/examples/:id", function(req, res) {
//     db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });
// };

app.post("/api/login/:email", function(req, res) {
  db.User.findOne({
    where: {
      email: req.params.email,
      password: req.params.password
    }
  }).then(function(dbUser) {
    console.log(dbUser);
    res.json(dbUser);
  });
})}
