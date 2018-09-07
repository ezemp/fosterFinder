var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
   res.render("index");
  });
  app.get("/dashboard", function(req, res) {
    res.render("dashboard");
   });
  app.get("/register", function(req, res) {
    res.render("register");
   });

  // Load example page and pass in an example by id
  app.get("/", function(req, res) {
    db.User.findOne({
      where: {
        email: req.params.email,
        password: req.params.password
      }
      }).then(function(dbUser) {
      res.render("dashboard");
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
