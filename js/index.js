// Aunthenticate a user

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
var words = document.getElementById("wpm");
var times = document.getElementById("times");
var finalScore = document.getElementById("finalScore");
var image = document.getElementById("image");
var score = 0;

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
			var db = firebase.database();
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
				// console.log(Score);
				document.getElementById('wpm').innerHTML = Score[0].scores;
				document.getElementById('times').innerHTML = Score.length;
			});
		}
	})
}

// Get a user's score when they are signed in
function leaderboard() {
	var db = firebase.database();
	var ref = db.ref("scores/").on("value", function(snapshot) {
		scores = snapshot.val();
		Scores = [];
		for(key in scores) {
			Scores.push(scores[key]);
		}
		// console.log(Scores);
		Scores.sort(function(a, b){
						return a.scores < b.scores;
		})
		console.log(Scores);
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
		// console.log(highestScores);
	})
}

leaderboard();

function saveScores() {
	firebase.auth().onAuthStateChanged(function(user) {
		if(user) {
			var db = firebase.database();
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

var passage1 = "Four score and seven years ago our fathers brought forth on this continent a new nation, conceived in liberty, and dedicated to the proposition that all men are created equal.Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battlefield of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this.But, in a larger sense, we can not dedicate, we can not consecrate, we can not hallow this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract. The world will little note, nor long remember what we say here, but it can never forget what they did here. It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion that we here highly resolve that these dead shall not have died in vain that this nation, under God, shall have a new birth of freedom and that government of the people, by the people, for the people, shall not perish from the earth.Four score and seven years ago our fathers brought forth on this continent a new nation, conceived in liberty, and dedicated to the proposition that all men are created equal."

var passage2 = "Fans, for the past two weeks you have been reading about a bad break. Yet today I consider myself the luckiest man on the face of the Earth. I have been in ballparks for seventeen years and have never received anything but kindness and encouragement from you fans. Look at these grand men. Which of you wouldn't consider it the highlight of his career just to associate with them for even one day? Sure, I'm lucky. Who wouldn't consider it an honor to have known Jacob Ruppert? Also, the builder of baseball's greatest empire, Ed Barrow? To have spent six years with that wonderful little fellow, Miller Huggins? Then to have spent the next nine years with that outstanding leader, that smart student of psychology, the best manager in baseball today, Joe McCarthy? Sure, I'm lucky.";


var passage3 = "You ain't gonna believe this, but you used to fit right here. I'd hold you up to say to your mother, 'This kid's gonna be the best kid in the world. This kid's gonna be somebody better than anybody I ever knew.' And you grew up good and wonderful. It was great just watching you, every day was like a privilege. Then the time came for you to be your own man and take on the world, and you did. But somewhere along the line, you changed. You stopped being you. You let people stick a finger in your face and tell you you're no good. And when things got hard, you started looking for something to blame, like a big shadow. Let me tell you something you already know.The world ain't all sunshine and rainbows. It's a very mean and nasty place, and I don't care how tough you are, it will beat you to your knees and keep you there permanently if you let it. You, me, or nobody is gonna hit as hard as life. But it ain't about how hard you hit, it's about how hard you can get hit and keep moving forward. How much you can take and keep moving forward. That's how winning is done!";

var passage4 = "Mr. Simms doesn't want it. He doesn't need to labeled, 'Still worthy of being a Baird man'. What the hell is that? What is your motto here? 'Boys, inform on your classmates, save your hide. Anything short of that, we're gonna burn you at the stake?'  Well, gentlemen, when the shit hits the fan, some guys run and some guys stay. Here's Charlie facing the fire and there's George hiding in Big Daddy's pocket. And what are you doing? You're gonna reward George and destroy Charlie. Are you finished, Mr. Slade? No, I'm just gettin' warmed up. I don't know who went to this place, William Howard Taft, William Jennings Bryan, William Tell, whoever. Their spirit is dead, if they ever had one. It's gone. You're building a rat ship here. A vessel for seagoing snitches, and if you think you're preparing these minnows for manhood, you better think again, because I say you are killing the very spirit this institution proclaims it instills. What a sham. What kind of a show you guys are putting on here today? I mean, the only class in this act is sitting next to me, and I'm here to tell ya this boy's soul is intact. It's non-negotiable. You know how I know? Someone here, and I'm not gonna say who, offered to buy it. Only Charlie here wasn't selling. Sir, you're out of order.";


var passage5 = "Consider yourself in Contempt! Colonel Jessep, did you order the Code Red? You don't have to answer that question! I'll answer the question! You want answers? I think I'm entitled to. You want answers? I want the truth! You can't handle the truth! Son, we live in a world that has walls, and those walls have to be guarded by men with guns. Who's gonna do it? You? You, Lt. Weinburg? I have a greater responsibility than you could possibly fathom. You weep for Santiago, and you curse the Marines. You have that luxury. You have the luxury of not knowing what I know. That Santiago's death, while tragic, probably saved lives. And my existence, while grotesque and incomprehensible to you, saves lives. You don't want the truth because deep down in places you don't talk about at parties, you want me on that wall, you need me on that wall. We use words like honor, code, loyalty. We use these words as the backbone of a life spent defending something. You use them as a punchline. I have neither the time nor the inclination to explain myself to a man who rises and sleeps under the blanket of the very freedom that I provide, and then questions the manner in which I provide it. I would rather you just said thank you, and went on your way, Otherwise, I suggest you pick up a weapon, and stand a post. Either way, I don't give a damn what you think you are entitled to. Did you order the Code Red? I did the job. Did you order the Code Red? You're Goddamn right I did!";


