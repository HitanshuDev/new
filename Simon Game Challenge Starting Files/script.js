// Function to generate a random number between 0 and 3
function randomNumber() {
    return Math.floor(Math.random() * 4);
}

// Available elements (buttons)
var elements = ["green", "red", "yellow", "blue"];

// Function to flash a button
function flash(id) {
    $("#" + id).addClass("pressed");
    setTimeout(() => {
        $("#" + id).removeClass("pressed");
    }, 100);
}

// Game variables
var level = 0;
var pattern = [];
var userPattern = [];

// Function to start the game
function startGame() {
    level = 1;
    pattern = [];
    userPattern = [];
    
    $("#level-title").text("Level " + level);
    
    nextSequence();
}

// Function to generate the next step in the pattern
function nextSequence() {
    var randomColor = elements[randomNumber()];
    pattern.push(randomColor);
    var audio = new Audio("sounds/" + randomColor + ".mp3")
    audio.play();
    
    $("." + randomColor).fadeOut().fadeIn();
}

// Function to handle user clicks
$(".btn").on("click", function () {
    var userClicked = $(this).attr("id");
    userPattern.push(userClicked);

    flash(userClicked);
    var audio = new Audio("sounds/" + userClicked + ".mp3")
    audio.play();

    // Check if the user's input is correct
    checkAnswer(userPattern.length - 1);
});

// Function to check the user's answer
function checkAnswer(index) {
    if (userPattern[index] === pattern[index]) {
        if (userPattern.length === pattern.length) {
            setTimeout(() => {
                userPattern = [];
                level++;
                $("#level-title").text("Level " + level);
                nextSequence();
            }, 1000);
        }
    } else {
        endGame();
    }
}

// Function to handle game over
function endGame() {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);

    $(document).on("keypress", startGame);
}

// Start the game on keypress
$(document).on("keypress", function () {
    $(document).off("keypress"); // Remove keypress listener to prevent multiple triggers
    startGame();
});




// function randomNumber(){
//     return Math.floor(Math.random()*4) + 1;
// }

// var elements = ["green", "red", "yellow", "blue"];

// function flash(id){
//     $("#" + id).addClass("pressed");
//     setTimeout(() => {
//         $("#" + id).removeClass("pressed");
//     }, 100);
    
// }



// var level = 1;

// var pattern = [];

// $("document").on("keypress", startGame(pattern,1));

// function endgame(){

//     var audio = new Audio("sounds/wrong.mp3");
//     audio.play();

//     $("#level-title").text("Game Over, Press Any Key to Restart");
//     $("body").addClass("game-over");
//     setTimeout(() => {
//         $("body").removeClass("game-over");
//     }, 200);

//     $(document).on("keypress", startGame(pattern,1));
// }


// function startGame(pattern, level){
//     $("#level-title").text("Level " + level);
//     pattern.push(elements[randomNumber()]);
//     flash(pattern[pattern.length-1]);
        
//     var user = [];
//     for(var i = 0 ; i < pattern.length ; i++){
//         var elementId;
//         $(".btn").on("click", function (event) {
//             elementId = $(event.target).attr("id");
//         });
//         if(elementId == pattern[i]){
//             flash(elementId);
//         }else{
//             endgame();  // to be written
//         }

//         startGame(pattern,level+1);
//     }
// }
