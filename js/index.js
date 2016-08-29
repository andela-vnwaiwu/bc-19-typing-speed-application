/** Storing all DOM elements needed to make the application work
 *  inside variable for easy recalling and cleaner code.
 * 
 * 
 */

//Instantiating the typing application

var timer = document.getElementById("timer");
var timeRemaining = 60;
var testBox = document.getElementById("testbox");
var paraContainer = document.getElementById("paraContainer");
var testMock = document.getElementById("test-mock");
var textArea = document.getElementById("textArea");
var takeTest = document.getElementById("takeTest");
var startButton = document.getElementById("startButton");
var newTestWindow = document.getElementById("newTestWindow");
var newTestButton = document.getElementById("newTestButton");
var dashboard = document.getElementById("dashboard");
var characters = document.getElementById("cpm");
var wpm = document.getElementById("wpm");
var times = document.getElementById("times");
var finalScore = document.getElementById("finalScore");
var image = document.getElementById("image");
var score = 0;
var db = firebase.database();

var generatePassage = function(){
	paraContainer.style.display = "inline-block";
	textArea.style.display = "inline-block";
	var passages = [passage1, passage2, passage3, passage4, passage5];
	testMock.innerHTML = passages[Math.floor(Math.random()*10/2)];

};

var showWindow = function() {
	testBox.classList.remove("hidden");
	dashboard.classList.add("hidden");
	image.classList.add("hidden");
	timer.innerHTML = "Time Remaining: 60secs";
	timer.style.display = "block";
	generatePassage();
}

var calculateScore = function() {
	var wordsTyped = textArea.value;
	var wordsTypedArray = wordsTyped.split(" ");
	var wordCount = wordsTypedArray.length;
	var presentTestMock = testMock.innerHTML.split(" ");
	var testMockArray = presentTestMock;
	var testMockTypedArray = testMockArray.splice(0, wordCount);
	var score = 0;

	for(var i = 0; i < wordsTypedArray.length; i++) {
		if (wordsTypedArray[i] == testMockTypedArray[i]) {
			score += 1;
		}
	}
	return score;
};

var displayTime = function () {

	var getTime = setInterval(function() {
		timeRemaining--;
		timer.innerHTML = "Time Remaining: " + timeRemaining + "s";

		if(timeRemaining < 21) {
			timer.style.backgroundColor = "orange";
		}

		if(timeRemaining < 11) {
			timer.style.backgroundColor = "red";
		}

		if(timeRemaining == 0){

			clearInterval(getTime);

			testBox.classList.add("hidden");
			newTestWindow.classList.remove("hidden");
			console.log(finalScore);

			finalScore.innerHTML = "Your speed is: " + calculateScore() + " words per minute.";
			saveScores();
			newTestWindow.style.display = "block";

		}
	}, 1000);

	textArea.removeEventListener("keydown", displayTime);
};

// Get a user's score when they are signed in
function getUserInfo() {
	firebase.auth().onAuthStateChanged(function(user) {
		if(user) {
			var ref = db.ref("scores/").on("value", function(snapshot) {
				scores = snapshot.val();
				Score = [];
				for(key in scores) {
					if(scores[key].userid == user.uid) {
						Score.push(scores[key]);
					}
				}
				Score.sort(function(a, b){
					return a.time < b.time;
				})
				wpm.innerHTML = Score[0].scores;
				times.innerHTML = Score.length;
			});
		}
	})
}

getUserInfo();

// Displays the leaderboard scores
function leaderboard() {
	var ref = db.ref("scores/").on("value", function(snapshot) {
		scores = snapshot.val();
		Scores = [];
		for(key in scores) {
			Scores.push(scores[key]);
		}
		Scores.sort(function(a, b){
						return a.scores < b.scores;
		})
		var highestScores = []; var new_object = {};
		for (i=0; i< Scores.length; i++){
			if(new_object[Scores[i].username] === undefined){
				new_object[Scores[i].username] =  Scores[i];
				highestScores.push(Scores[i]);
			}
		}

		var table = "<table class=\"table table-striped table-hover\">";
		table += "<thead style=\"font-size: 30px\"><tr><td>#</td>";
		table += "<td>Username</td>";
		table += "<td>Score</td>";
		table += "</tr></thead><tbody>"
    for (var i = 0; i < highestScores.length; i++) {
			table += "<tr>";
			table += "<td>" + (i + 1) + "</td>";
			table += "<td>" + highestScores[i].username + "</td>";
			table += "<td>" + highestScores[i].scores + "</td>";
			table += "</tr>";
    }
    table += "</tbody></table>";
		document.getElementById("results").innerHTML = table;
	})
}

leaderboard();

function saveScores() {
	firebase.auth().onAuthStateChanged(function(user) {
		if(user) {
			var ref = db.ref("scores/").push({
				userid : user.uid,
				username: user.displayName,
				scores : calculateScore(),
				time: new Date().getTime()
			}, function(error){
				if(error) {
					console.log("Error");
				}else{
					console.log("Success");
				}
			});
		}
	})
}


textArea.addEventListener("keydown", displayTime);

takeTest.addEventListener("click", showWindow);


newTestButton.addEventListener("click", function(){
	window.location.reload();
});

var passage1 = "Four score and seven years ago our fathers brought forth on this continent a new nation, conceived in liberty, and dedicated to the proposition that all men are created equal. Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battlefield of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this. But, in a larger sense, we can not dedicate, we can not consecrate, we can not hallow this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract."

var passage2 = "Fans, for the past two weeks you have been reading about a bad break. Yet today I consider myself the luckiest man on the face of the Earth. I have been in ballparks for seventeen years and have never received anything but kindness and encouragement from you fans. Look at these grand men. Which of you would not consider it the highlight of his career just to associate with them for even one day? Sure, I am lucky. Who would not consider it an honor to have known Jacob Ruppert? Also, the builder of baseball's greatest empire, Ed Barrow? To have spent six years with that wonderful little fellow, Miller Huggins? Then to have spent the next nine years with that outstanding leader, that smart student of psychology, the best manager in baseball today, Joe McCarthy? Sure, I am lucky.";


var passage3 = "You are not going to believe this, but you used to fit right here. I would hold you up to say to your mother: 'This kid is going to be the best kid in the world. This kid is going to be somebody better than anybody I ever knew.' And you grew up to be good and wonderful. It was great just watching you. Every day was like a privilege. Then the time came for you to be your own man and take on the world and you did. But somewhere along the line, you changed. You stopped being you. You let people stick a finger in your face and tell you you are no good. And when things got hard, you started looking for something to blame, like a big shadow. Let me tell you something you already know. The world is not all sunshine and rainbows.";

var passage4 = "Mr. Simms does not want it. He does not need to be labeled: 'Still worthy of being a Baird man'. What the hell is that? What is your motto here? 'Boys, inform on your classmates, save your hide. Anything short of that, we are going to burn you at the stake?'  Well, gentlemen, when the shit hits the fan, some guys run and some guys stay. Here is Charlie facing the fire and there is George hiding in Big Daddy's pocket. And what are you doing? You are going to reward George and destroy Charlie. Are you finished, Mr. Slade? No, I am just getting warmed up. I do not know who went to this place, William Howard Taft, William Jennings Bryan, William Tell, whoever. Their spirit is dead, if they ever had one. It is gone. You are building a rat ship here.";


var passage5 = "Consider yourself in Contempt! Colonel Jessep, did you order the Code Red? You do not have to answer that question! I will answer the question! You want answers? I think I am entitled to. You want answers? I want the truth! You cannot handle the truth! Son, we live in a world that has walls, and those walls have to be guarded by men with guns. Who is going to do it? You? You, Lt. Weinburg? I have a greater responsibility than you could possibly fathom. You weep for Santiago, and you curse the Marines. You have that luxury. You have the luxury of not knowing what I know. That Santiago's death, while tragic, probably saved lives. And my existence, while grotesque and incomprehensible to you, saves lives. You do not want the truth because deep down in places you do not talk about at parties, you want me on that wall, you need me on that wall.";


