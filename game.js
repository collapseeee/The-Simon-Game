var userClickedPattern = []; // 4.3
var gamePattern = []; // 2.5
const buttonColours = ["red", "blue", "green", "yellow"]; // 2.3
var started = false; // 7.1
var level = 0; // 7.2

$(document).keypress(function (e) { // 7
  if (started == false) {
    console.log("Game started.")
    nextSequence();
  }
  started = true;
});

$(document).ready(function() {
  $(".btn").click(function() { // 4.1
    if (started == true) {
      var userChosenColour = this.id; // 4.2
    playSound(userChosenColour); // 5.1
    animatePress(userChosenColour); // 6.2
    userClickedPattern.push(userChosenColour); // 4.4
    checkAnswer(userClickedPattern.length-1); // 8.2
    };
  });
});

function checkAnswer(currentLevel) { // 8
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(() => {{
        nextSequence();
      }}, 1000);
    };
  } else {
    startOver();
  };
};

function nextSequence() { // 2
  console.log("Current Level: " + level);
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4); // 2.2
  var randomChosenColour = buttonColours[randomNumber]; // 2.4
  playSound(randomChosenColour); // 5.3
  flashElement(randomChosenColour);
  gamePattern.push(randomChosenColour); // 2.6
  $("#level-title").text("Level " + level++); // 7.3
  //console.log(gamePattern); // for debugging.
}

function flashElement(colour) { // 3.2
  $("#" + colour).fadeOut(150).fadeIn(150);
}

function animatePress(currentColour) { // 6
  $("#" + currentColour).addClass("pressed"); // 6.3
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed"); // 6.4
  }, 100);
};

function playSound(name) { // 3 & 5
  let audio = new Audio("/sounds/" + name + ".mp3");
  audio.play();
};

function startOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  level = 0;
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
};