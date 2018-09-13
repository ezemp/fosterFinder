var authController = require("../controllers/authcontroller.js");

module.exports = function(app, passport) {
  app.get("/signup", authController.signup);

  app.get("/", authController.signin);

  app.get("/dashboard", isLoggedIn, authController.dashboard);

  app.get("/logout", authController.logout);

  app.post(
    "/",
    passport.authenticate("local-signin", {
      successRedirect: "/dashboard",

      failureRedirect: "/"
    })
  );
  exports.dashboard = function(req, res) {
  
    var hbsObject = {
    fullname: req.user.fullname,
    address: req.user.address,
    homeType: req.user.homeType
  }
  res.render("dashboard", hbsObject);
};

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
};
