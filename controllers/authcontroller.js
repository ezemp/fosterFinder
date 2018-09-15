var exports = (module.exports = {});
var request = require("request");
var parseString = require('xml2js').parseString;
var sheltersId = []


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
    children: req.user.children,
    shelter: req.user.shelters
  };
  res.render("account", hbsObject);
};
exports.pets = function(req, res) {
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
   
  var petFindQueryURL ="https://api.petfinder.com/shelter.getPets?&key=6c9f4c0537e24d967a967ac2ed603f91&id=CO488";
  request(petFindQueryURL, function(error, response, body) {
    var xml = body;
    parseString(xml, function (err, result) {
      
      var petsName = [];
      var petsBreed = [];
      var petsPhoto = [];
      for ( i = 0; i < 25; i++) {
        
        petsName.push(result.petfinder.pets[0].pet[i].name[0]);
        petsBreed.push(result.petfinder.pets[0].pet[i].breeds[0].breed[0]);
        petsPhoto.push(result.petfinder.pets[0].pet[i].media[0].photos[0].photo[3]);
    
        
        hbsObject.petName = petsName;
        hbsObject.petBreed = petsBreed;
        hbsObject.petPhoto = petsPhoto

      }
    
  });

    
  });
  
  res.render("pets", hbsObject);
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
    children: req.user.children,
    shelter: req.user.shelters
  
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

  }); 
var zipcode = req.user.zip;
  var petQueryURL ="https://api.petfinder.com/shelter.find?&key=6c9f4c0537e24d967a967ac2ed603f91&location=" + zipcode + "&count=11";
  request(petQueryURL, function(error, response, body) {
    var xml = body;
    parseString(xml, function (err, result) {
    
    var sheltersArray = result.petfinder.shelters[0].shelter;
    var sheltersLat = [];
    var sheltersLng = [];
    var sheltersName = [];
    

    var parsedLat = result.petfinder.shelters[0].shelter[0].latitude;
    var parsedLng = result.petfinder.shelters[0].shelter[0].longitude;
    var parsedName = result.petfinder.shelters[0].shelter[0].name;

   
      for ( i = 0; i < sheltersArray.length; i++) {
        
        sheltersLat.push(result.petfinder.shelters[0].shelter[i].latitude);
        sheltersLng.push(result.petfinder.shelters[0].shelter[i].longitude);
        sheltersName.push(result.petfinder.shelters[0].shelter[i].name);
        sheltersId.push(result.petfinder.shelters[0].shelter[i].id)
        hbsObject.shelterLat = sheltersLat;
        hbsObject.shelterLng = sheltersLng;
        hbsObject.shelterName = sheltersName
        hbsObject.shelterId = sheltersId

      }
      


res.render("dashboard", hbsObject);

  });

   
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
exports.favShelter = function(req, res) {
  var hbsObject = {
   shelter: req.user.shelters

  };
  
  
};

