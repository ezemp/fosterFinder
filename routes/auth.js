var authController = require("../controllers/authcontroller.js");
var db = require("../models");

module.exports = function(app, passport) {
  app.get("/signup", authController.signup);

  app.get("/", authController.signin);

  app.get("/dashboard", isLoggedIn, authController.dashboard);

  app.get("/resources", isLoggedIn, authController.resources);
  app.get("/pets", isLoggedIn, authController.pets);
  app.get("/account", isLoggedIn, authController.account);

  app.get("/logout", authController.logout);

  app.get("/petfind", isLoggedIn, authController.petfind);

  app.post(
    "/",
    passport.authenticate("local-signin", {
      successRedirect: "/dashboard",

      failureRedirect: "/"
    })
  );
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/dashboard",

      failureRedirect: "/signup"
    })
  );
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("/");
  }
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

};
