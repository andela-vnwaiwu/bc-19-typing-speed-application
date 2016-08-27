  // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAAz_1HRSzLX5LHsm0jkg3Nbh40Yb8plv0",
      authDomain: "typing-speed-application.firebaseapp.com",
      databaseURL: "https://typing-speed-application.firebaseio.com",
      storageBucket: "typing-speed-application.appspot.com",
    };
    firebase.initializeApp(config);
    /**
     * Handles the sign in button press.
     */
    function toggleSignIn() {
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var rawUsername = document.getElementById('username').value;
        var username = rawUsername.trim();
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        if (username.length == "") {
          alert('Please enter a password');
          return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
          console.log("I am in google");
          document.getElementById('authentication').classList.add("hidden");
          document.getElementById('dashboard').classList.remove("hidden");
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          document.getElementById('login').disabled = false;
          
          // [END_EXCLUDE]
        })
        // [END authwithemail]
        
      }
      document.getElementById('login').disabled = true;      
    }
    /**
     * Handles the sign up button press.
     */
    function handleSignUp() {
      var email = document.getElementById('email').value;
      var username = document.getElementById('username').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      if (username == "") {
        alert('Please enter a username');
        return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function() {
        var user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: username
        }).then(function() {
            firebase.database().ref('users/' + user.uid).set({
            username: username,
            email: email,
            scores:[0]
          })
        }, function(error) {
          console.log(error.message);
        })
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END createwithemail]

    }
    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     */
    function initApp() {
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        // [START_EXCLUDE silent]
        // [END_EXCLUDE]
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;

          // [START_EXCLUDE silent]
          document.getElementById('sign-in-status').textContent = 'Signed in';
          document.getElementById('login').textContent = 'Sign out';
          document.getElementById('my-name').innerHTML = displayName;
          document.getElementById('authentication').classList.add("hidden");
          document.getElementById('dashboard').classList.remove("hidden");
          document.getElementById('logout').classList.remove('hidden');

          var db = firebase.database();
          
          // displays the users latest score on the dashboard
          // function getUserInfo() {
          //   firebase.auth().onAuthStateChanged(function(user) {
          //     if(user) {
          //       var ref = db.ref("users/" + uid ).on("value", function(snapshot) {
          //         users = snapshot.val();
          //         console.log(users.scores.length);
          //         document.getElementById('wpm').innerHTML = users.scores;
          //         document.getElementById('cpm').innerHTML = users.email;
          //         document.getElementById('times').innerHTML = users.scores.length -1;
          //       });
          //     }
          //   })
          // }
          getUserInfo();
          
          // document.getElementById('cpm').innerHTML = ref;
          // [END_EXCLUDE]
        } else {
          // User is signed out.
          // [START_EXCLUDE silent]
          document.getElementById('sign-in-status').textContent = 'Signed out';
          document.getElementById('login').textContent = 'Sign in';
          document.getElementById('logout').classList.add('hidden');
          document.getElementById('authentication').classList.remove("hidden");
          document.getElementById('dashboard').classList.add("hidden");
          // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]
        document.getElementById('login').disabled = false;
        // [END_EXCLUDE]
      });
      // [END authstatelistener]
      document.getElementById('login').addEventListener('click', toggleSignIn, false);
      document.getElementById('logout').addEventListener('click', toggleSignIn, false);
      document.getElementById('signup').addEventListener('click', handleSignUp, false);
    }
    window.onload = function() {
      initApp();
    };