var db = require("../models")
var request = require("request")

function convertWord(location){
for (i = 0; i < location.length; i++) {
  if (location[i] === " "){
  location[i] === "+"
}}}
//   
//   }
// }

app.get("/shelters/:address", function(req, res){
  console.log(convertWord(address))
  var address = req.user.address
//   var location = 
//   res.send("test")

})
var queryURL = 'http://api.petfinder.com/shelters.find?key=6c9f4c0537e24d967a967ac2ed603f91&location=' + location+"&count=10";
request('http://www.google.com', function (error, response, body) {
console.log("error", error)
  console.log("stausCode", response&&response.statusCode )
  console.log('body:', body)
  
})

// $.ajax(
//   url: queryURL,
//   method: 'GET'
// }).then(function (data) {
//   console.log(data.response);
//   // Here we save the name 
//   var shelters = data.response.shelters;
//   $.each(venues, function (i, shelter) {
//     var newButtonsDiv = $('<div class=newVenueButtons>')
//     var queryName = shelter.name;
//     var lat = shelter.location.lat;
//     var lng = shelter.location.lng;
//     var newShelterButton = $('<button class="shelterButton">' + queryName + '</button>');
//     newVenueButton.attr({
//       shelterName: queryName,
//       latitude: lat,
//       longitude: lng
//     