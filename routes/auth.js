var authController = require("../controllers/authcontroller.js");

module.exports = function(app, passport) {
  app.get("/signup", authController.signup);

  app.get("/", authController.signin);

  app.get("/dashboard", isLoggedIn, authController.dashboard);

  app.get("/resources", isLoggedIn, authController.resources);

  app.get("/shelters", isLoggedIn, authController.shelters);

  app.get("/account", isLoggedIn, authController.account);

  app.get("/logout", authController.logout);

  app.get("/petfind", isLoggedIn, authController.petfind);
  app.get("/findshelter", isLoggedIn, authController.findshelter)


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
      city: req.user.city,
      state: req.user.state,
      zip: req.user.zip,
      homeType: req.user.homeType,
      email: req.user.email,
      children: req.user.children
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
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

  // app.put("/account", isLoggedIn, authController.update);
};
