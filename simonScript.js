//Need to change wrongCombo function to show 
//the last combination not to start new one

//Need to change strictModeOn function so it does not start new sequence
//but only stops the game if wrong combination is entered.

//Part 1: Logic, start sequence
var logicArray = [];
var gameArray = [];
var key, color, gameLevel = 0;
const ATTEMTS_POSSIBLE = 20;
var gameSound = [
"https://s3.amazonaws.com/freecodecamp/simonSound1.mp3", //green 
"https://s3.amazonaws.com/freecodecamp/simonSound2.mp3", //red
"https://s3.amazonaws.com/freecodecamp/simonSound3.mp3", //yellow
"https://s3.amazonaws.com/freecodecamp/simonSound4.mp3" //blue
];
// boolean for turning strict button on
var strictMode = false;
// boolean variable to envoke sound when error happened
var mistakeSound = false;
//variable for turning game on button
var switchOn = false
//main logic of the game
$(document).ready(function() {
	$("#startBtn").click(function(){		
		//null game level otherwise it increments with any click
		startOver();
		mainLogic();	
		})
	//targeting parts for specific pattern
	$(".part").click(function(){
		key = $(this).attr("id");
		color = $(this).attr("class").split(" ")[1];
		recordGame();
	})
	//enable strict mode
	$("#strictBtn").click(function(){
		strictModeOn();
	})
	//switch button logoc
	$(".switchBtn").click(function(){

		turnGameOn();
	})
});

//function for enebling strict mode
function strictModeOn(){
	$("#strictBtn").removeClass('inactive').addClass('active');
	gameLevel =0;
	gameArray= [];
	logicArray =[];
	gameLevel++;
	strictMode = true;
	recordGame();
}

//initiate game records
function recordGame(){
	logicArray.push(key);
	addSound(key, color);
	//check if player wins
	if(!gameWon()){
		//check if strict mode is on
		if(strictMode){
			console.log("strict mode is on");
			//start with null array for recording results
			gameArray = [];
			//gameLevel = 1;
		}
		mistakeSound = true;
		wrongCombo();
		logicArray = [];
		mainLogic();
	}
	console.log("You clicked: " + color);
	//see if sequence of the game is over
	if(logicArray.length === gameArray.length && logicArray.length < ATTEMTS_POSSIBLE){
		
		logicArray = [];
		console.log("record game is on");
		mainLogic();
	}
	//logic for winning gamer
	if(logicArray.length === ATTEMTS_POSSIBLE){
		//show winning
		winGame();
		//start game from the beginning
		startOver();
	}
}

//enable switch function
function turnGameOn(){
	switchOn = (switchOn === false) ? true : false;

	if(switchOn){
		
		$(".internalSwitch").addClass("internalOff");
		$(".switchBtn").addClass("externalOn");
		$("#screen").text("--");
		$("#startBtn").removeClass('inactive').addClass('active');
	}
	else {
		$(".internalSwitch").removeClass("internalOff");
		$(".switchBtn").removeClass("externalOn");
		$("#screen").text("Game over");
		$('.btn').removeClass('active').addClass('inactive');	
	}
	recordGame();
}

//checking if player is winning
function gameWon(){
	//loop till array of clicked combinations
	for(var i =0; i < logicArray.length; i++ ){
		if(logicArray[i] !=gameArray[i]){
			return false;
		}
	}
	return true;
}

//show incorrect combinations entered
function wrongCombo(){
	console.log("incorrect");
	var errorCounter = 0;
	var incorrectEntries = setInterval(function(){
		$("#screen").text("Try again");
		errorCounter++;
		if(strictMode){
			$("#screen").text("Game over");
			startOver();
		}
		if(errorCounter ===3){
			$("#screen").text("Game level: " + gameLevel);
			clearInterval(incorrectEntries);
			logicArray = [];
			errorCounter = 0;
		}
	}, 1500);

}
//function starts game sequence
function mainLogic(){
	if(switchOn === true){	
	gameLevel++;
		console.log("Game level: " + gameLevel);
		$("#screen").text("Game level: " + gameLevel);
		randomizeNumber();
		var i = 0;
		var gameInterval = setInterval(function(){
		key = gameArray[i];
		//associates color with part id
		color = $("#" + key).attr('class').split(" ")[1];
		addSound(key, color);
		i++;
		if(i === gameArray.length){
			clearInterval(gameInterval)
		}
	}, 1000);
	}
}
//create random number that will be the next value for gameArray
function randomizeNumber(){
	var rNumber = Math.floor(Math.random() *4);
	gameArray.push(rNumber);
}

//add temp class for sound
function addSound(key, color){
	$("#" + key).addClass(color + "-pressed");
	console.log("Game chose: " + color);
	executeSound(key);
	setTimeout(function(){
		$("#" + key).removeClass(color + "-pressed");
	}, 500);
}
//play sound when button is pressed
function executeSound(key){
	var beep = new Audio(gameSound[key]);
	beep.play();
}
//start game from the beginning
function startOver(){
	gameLevel = [];
	logicArray = [];
	gameLevel = 0;
	
	if(!strictMode){
		$("#screen").text("!strictMode");	
	}
	else{
		$("#screen").text("--")
	}
	
}
//winning situation
function winGame(){
	var iter = 0;
	var winGameInterval = setInterval(function() {
		iter++;
		$("#screen").text("Victory");
		if(iter === 5){
			clearInterval(winGameInterval);
			$("#screen").text("--");
			iter = 0;
		}
	}, 1000);
}