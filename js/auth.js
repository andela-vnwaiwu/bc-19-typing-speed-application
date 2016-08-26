        // Initialize Firebase
        var config = {
          apiKey: "AIzaSyAAz_1HRSzLX5LHsm0jkg3Nbh40Yb8plv0",
          authDomain: "typing-speed-application.firebaseapp.com",
          databaseURL: "https://typing-speed-application.firebaseio.com",
          storageBucket: "typing-speed-application.appspot.com",
        };
        firebase.initializeApp(config);

        var email = document.getElementById('signup_email').value;
        var password = document.getElementById('signup_password').value;
        console.log(email, password, ';theis is isgfn')
        function validate(){        
          firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(function(userData){
            console.log(userData, 'test user data imput')
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          });
        }