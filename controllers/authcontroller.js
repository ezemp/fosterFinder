var exports = (module.exports = {});
var request = require("request");
var parseString = require('xml2js').parseString;


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
  };
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
  };
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
  };
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
  };
  
  var convertedAddress = req.user.address.replace(/ /g, "+");

  var queryURL =
    "https://maps.googleapis.com/maps/api/geocode/json?address=" + convertedAddress + "&key=AIzaSyBXCYDyq-bo7-LPvyRsIngfSOhIDLnDL5Q";
  request(queryURL, function(error, response, body) {
    var checkLat = JSON.parse(body).results[0];
    var checkLng = JSON.parse(body).results[0];
   
    if (checkLat && checkLng) {
   
      hbsObject.userLat = JSON.parse(body).results[0].geometry.location.lat;
      hbsObject.userLng = JSON.parse(body).results[0].geometry.location.lng;
    } else {
      hbsObject.lat = 39.6766368;
      hbsObject.lng = -104.9614844;
    }

    // were going to have to make a petfinder api call based on user.address

    // then were going to have to take the results
    // loop thru the limit(10 shelters)
    // grab each lat long
    // then make a forloop that makes a marker for each one

    // console.log("ERROR: ", error);
    // console.log("RESPONSE: ", error);
    // console.log("BODY: ", body);

    // console.log("BODY: ", JSON.parse(body).results[0].geometry.location);
    // console.log("DRILLING:=====", JSON.parse(body).results[0].geometry.location.lat);
    // res.render("dashboard", hbsObject);
  }); // console.log("stausCode", response&&response
var zipcode = req.user.zip;
  console.log(zipcode);
  var petQueryURL ="https://api.petfinder.com/shelter.find?&key=6c9f4c0537e24d967a967ac2ed603f91&location=" + zipcode + "&count=11";
  request(petQueryURL, function(error, response, body) {
    var xml = body;
    parseString(xml, function (err, result) {
    // console.log(result.petfinder.shelters[0].shelter[0].latitude);
    // console.log(result.petfinder.shelters[0].shelter[0].longitude);
    var sheltersArray = result.petfinder.shelters[0].shelter;
    var sheltersLat = [];
    var sheltersLng = [];
    var sheltersName = [];

    var parsedLat = result.petfinder.shelters[0].shelter[0].latitude;
    var parsedLng = result.petfinder.shelters[0].shelter[0].longitude;
    var parsedName = result.petfinder.shelters[0].shelter[0].name;
    console.log("SHELTERS ARRAY============", sheltersArray);
    // console.log(hbsObject);
      for ( i = 0; i < sheltersArray.length; i++) {
        // console.log("shelter Lat", i, ": ", result.petfinder.shelters[0].shelter[i].latitude);
        // console.log("shelter Long", i, ": ", result.petfinder.shelters[0].shelter[i].longitude);
        sheltersLat.push(result.petfinder.shelters[0].shelter[i].latitude);
        sheltersLng.push(result.petfinder.shelters[0].shelter[i].longitude);
        sheltersName.push(result.petfinder.shelters[0].shelter[i].name);
        hbsObject.shelterLat = sheltersLat;
        hbsObject.shelterLng = sheltersLng;
        hbsObject.shelterName = sheltersName

      }
      
console.log("HBS CHECK==================="+hbsObject.shelterLat);
      
    // console.log("SHELTER1=====",result.petfinder.shelters[0].shelter[0].latitude);
    // console.log("SHELTER1=====",result.petfinder.shelters[0].shelter[1].latitude);
    // console.log("SHELTER1=====",result.petfinder.shelters[0].shelter[2].latitude)
    // console.log("SHELTER1=====",result.petfinder.shelters[0].shelter[3].latitude)
    // console.log("SHELTER1=====",result.petfinder.shelters[0].shelter[4].latitude)
    // console.log("SHELTER1=====",result.petfinder.shelters[0].shelter[5].latitude)
    // console.log("SHELTER1=====",result.petfinder.shelters[0].shelter[6].latitude)


res.render("dashboard", hbsObject);

  });

    console.log("error", error);
    // console.log("stausCode", response&&response.statusCode )
    // console.log('body:', body.shelter.latitude)
    // console.log("body", result.$.shelters);
  });
  
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
  };
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
  };
  
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
