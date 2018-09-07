// Get references to page elements
var $email = $("#email");
var $password = $("#password");
var $logIn = $("#in");
var $register = $("#up");
var $signUp = $("#signUp");
var $name = $("#name");
var $address = $("#address");
var $home = $("#home");
var $children  = $("#children");

// The API object contains methods for each kind of request we'll make
var API = {
  saveUser: function(user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/register",
      data: JSON.stringify(user)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var user = {
  name: $name.val().trim(),
  email: $email.val().trim(),
  password: $password.val().trim(),
  address: $address.val().trim(),
  home_type: $home.val().trim(),
  children: $children.val().trim()
  };

  if (!(user.email && user.password)) {
    alert("You must enter a valid login.");
    return;
  }

  API.saveUser(user)
  function register(req ,res){
  
  }

  $name.val("");
  $email.val("");
  $password.val("");
  $address.val("");
  $home.val("");
  $children.val("");

};
function displayRegister() {
  console.log("ttttt")
  $.post("/api/register", function(req, res) {
    res.render("register");
    // window.location.href = "/register";
  });
}
// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// Add event listeners to the submit and delete buttons
// $logIn.on("click", displayDashboard);
$register.on("click", handleFormSubmit);
$signUp.on("click", handleFormSubmit);

// $exampleList.on("click", ".delete", handleDeleteBtnClick);

