/*
Export the user object to the typing.js file 
*/

(function() {
  var User = (function() {
    var User = function(username, password, email) {
      this.username = username;
      this.password = password;
      this.email = email;
      this.scores = [];
    };

    return User;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = User;
  else
    window.User = User;
})();

// module.exports = function (username, password, email) {
//    this.username = username;
//    this.password = password;
//    this.email = email;
//    this.scores = [];
// };
