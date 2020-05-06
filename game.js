var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var gameOver = false;

$(document).one("keydown", function() {
    $("h1").text("Level " + level);
    nextSequence();
});

function nextSequence() {

  userClickedPattern = []

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeTo(0050, 0).fadeTo(0050, 1);

  playSound(randomChosenColor);

  ++level;
  $("h1").text("Level " + level);
};


$(".btn").click(function(e) {
  var userChosenColor = e.target.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});


function playSound(name) {
  var associatedSound = new Audio("sounds/" + name + ".mp3");
  associatedSound.play();
};


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
}, 0100);
};


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    console.log(gamePattern);
    console.log(userClickedPattern);
      if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver = true;

    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 0500);

    $("h1").text("Game Over, press any key to restart");
  }
};


    $(document).keydown(function() {
      if (gameOver === true) {
        gamePattern = [];
        level = 0;
        $("h1").text("Level " + level);
        nextSequence();
      }
    });
