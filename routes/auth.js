var authController = require("../controllers/authcontroller.js");

module.exports = function(app, passport) {
  app.get("/signup", authController.signup);

  app.get("/", authController.signin);

  app.get("/dashboard", isLoggedIn, authController.dashboard);

  app.get("/resources", isLoggedIn, authController.resources);

  app.get("/shelters", isLoggedIn, authController.shelters);

  app.get("/account", isLoggedIn, authController.account);

  app.get("/logout", authController.logout);

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

  // app.put("/account", isLoggedIn, authController.update);
};
