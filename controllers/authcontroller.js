var exports = (module.exports = {});

exports.signup = function(req, res) {
  res.render("signup");
};
exports.signin = function(req, res) {
  res.render("index");
};
exports.resources = function(req, res) {
  var hbsObject = {
    fullname: req.user.fullname,
    address: req.user.address,
    homeType: req.user.homeType
  }
  res.render("resources", hbsObject);
};
exports.account = function(req, res) {
  var hbsObject = {
    fullname: req.user.fullname,
    address: req.user.address,
    homeType: req.user.homeType,
    email: req.user.email,
    children: req.user.children
  }
  res.render("account", hbsObject);
};
exports.shelters = function(req, res) {
  var hbsObject = {
    fullname: req.user.fullname,
    address: req.user.address,
    homeType: req.user.homeType
  }
  res.render("shelters", hbsObject);
};
exports.dashboard = function(req, res) {
  var hbsObject = {
    fullname: req.user.fullname,
    address: req.user.address,
    homeType: req.user.homeType
  }
  res.render("dashboard", hbsObject);
};
exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.redirect("/");
  });
};
// exports.update = function(req, res) {
//   var hbsObject = {
//     fullname: ,
//     address: req.user.address,
//     homeType: req.user.homeType
//   }
//   res.render("account");
// };
