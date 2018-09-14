var exports = (module.exports = {});
var request = require('request')

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
    city: req.user.city,
    state: req.user.state,
    zip: req.user.zip,
    homeType: req.user.homeType
  }
  res.render("resources", hbsObject);
};
exports.account = function(req, res) {
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
  res.render("account", hbsObject);
};
exports.shelters = function(req, res) {
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
  res.render("shelters", hbsObject);
};
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
exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.redirect("/");
  });
};
exports.petfind = function(req, res) {
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
  res.send(hbsObject);
 };
 exports.findshelter = function(req, res) {
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
  var zipcode = req.user.zip
  console.log(zipcode)
  var queryURL = 'http://api.petfinder.com/shelter.find?key=6c9f4c0537e24d967a967ac2ed603f91&location=' +zipcode+"&count=10";
  request(queryURL, function (error, response, body) {
  console.log("error", error)
    // console.log("stausCode", response&&response.statusCode )
    console.log('body:', body.shelter.latitude)
    console.log("body", body.shelter.longitude)
  })
  // res.render("resources", hbsObject);
};
// exports.update = function(req, res) {
//   var hbsObject = {
//     fullname: ,
//     address: req.user.address,
//     homeType: req.user.homeType
//   }
//   res.render("account");
// };
