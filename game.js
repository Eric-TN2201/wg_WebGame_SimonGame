var gamePattern = [];
var userClickedPattern = [];
var buttonColor = ['red', 'blue', 'green', 'yellow'];
var startGame = false;
var level = 0;

$(document).keypress(function() {
    if (!startGame) {
        startGame = true;
        
        nextSequence();
    }
});

$('.btn').on('click', function(){
    // get ID-btn when user click.
    var userChosenColour = this.id;

    // play sound when click
    playSound(userChosenColour);

    // push ID-btn into user-clicked-list
    userClickedPattern.push(userChosenColour);

    animationPress(userChosenColour)

    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    // refresh user-clicked-list
    userClickedPattern = [];

    level++;
    $('#level-title').text("Level " + level);

    // random color
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColor[randomNumber];
    
    // push into gamePattern
    gamePattern.push(randomChosenColor);

    // add animation
    addAnimationForNextSenquence(randomChosenColor);    
    
}

function checkAnswer(currentIndex){
    if (userClickedPattern[currentIndex] === gamePattern[currentIndex]) {
        if (userClickedPattern.length === gamePattern.length){
            // next level
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }else{
        gameOver();
    }
}

function gameOver(){
    // notify user lose
    $('body').addClass('game-over');
    $('#level-title').text('Game Over, Press Any Key to Restart');
    playSound();
    setTimeout(function() {
        $('body').removeClass('game-over');
    }, 200);

    // restart
    startOver();
}

function startOver(){
    level = 0;
    startGame = false;
    gamePattern = [];
    userClickedPattern = [];
}

function addAnimationForNextSenquence(color){
    $(`#${color}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(color);
}

function playSound(color = 'wrong'){
    var audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

function animationPress(color){
    var elm = $(`#${color}`);
    elm.addClass('pressed');
    setTimeout(function() {
        elm.removeClass('pressed');
      }, 100);
}
