/**
*  This function handles the user information and processes them accordingly
*/

// var User = function (username, password, email) {
//    this.username = username;
//    this.password = password;
//    this.email = email;
//    this.scores = [];
// };

(function() {
  var Users = (function() {
    var Users = function() {
			this.userslist = [];
    // };

    // Validator.prototype.foo = function foo() {
    //   ...
    // };

// module.exports = 
// function(){
//   var User = require('./user.js');
//   var fs = require('fs');
//    this.userslist = [];
	//  JSON.parse(fs.readFileSync(, 'utf8'));

  // = [];

// Function returns a user's information if they have signed up
  this.checkUser = function(username, password) {
  	// for(var a = 0; a < this.userslist.length; a++) {
      	if(username == "victor" && password ==  "olusegun") {
					// return this.userslist[a];
					return true;

      	}
      // }
			// return 'You have not been signed up before';
			return false;
  }

  // Function that handles saving a new user in the local storage system
  this.saveUser = function(user) {
    if (user instanceof User) {
      for(var i = 0; i < this.userslist.length; i++) {
      	if(user.username == this.userslist[i].username) {
      		return 'User have been saved before';
      	}
      }
      this.userslist.push(user);
			return window.location = "index.html";
    }
  }

  // function that lists all the users who have used the application
	this.list = function() {
		if(this.userslist.length < 1) {
			return 'You do not have any one on this list';
		} return this.userslist;
	}

  // Function that saves a user's score in the user object and
	this.saveScore = function(username, wpm, cpm) {
		var score = [wpm, cpm];
		for (var j = 0; j < this.userslist.length; j++) {
			if(username == this.userslist[j].username) {
				this.userslist[j].scores.push(score);
        return true;
			}
		} return 'Could not save your score'
	}

  // function that produces the leaderboard ranking of scores
  this.highScores = function() {
		var array = this.userslist;
		var sorted1 = [];
		for(var k = 0; k < array.length; k++) {
			array[k].scores.sort(function(a,b) {
				return a[0] < b[0];
			});
			sorted1.push(array[k]);
		}
		var sorted2 = sorted1.sort(function(a,b) {
			return a.scores[0][0] < b.scores[0][0];
		});
    // return array3;
    return sorted2
	};
};

  return Users;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Users;
  else
    window.Users = Users;
})();
