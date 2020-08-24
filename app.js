let userScore = 0;
let compScore = 0;
const userScore_span = document.getElementById('user-score');
const compScore_span = document.getElementById('comp-score');
const scoreBoard_div = document.querySelector('.score-board');
const result_p = document.querySelector('.result > p');
const rock_div = document.getElementById('r');
const paper_div = document.getElementById('p');
const scissors_div = document.getElementById('s');

function getComputerChoices(){
	const choices = ['r','p','s'];
	const randomNumber = Math.floor(Math.random() * 3);
	return choices[randomNumber];
}

function convertWord(letter){
	if (letter === "r") return "Rocks";
	if (letter === "p") return "Paper";
	return "Scissors";
}

function wins(userChoice, computerChoice){
	userScore++;
	userScore_span.innerHTML = userScore;
	compScore_span.innerHTML = compScore;
	const smallUserWord = "user".fontsize(3).sub();
	const smallCompWord = "comp".fontsize(3).sub();
	result_p.innerHTML = convertWord(userChoice)+smallUserWord +"  beats  " + convertWord(computerChoice)+smallCompWord + ". You Wins!!!";
	document.getElementById(userChoice).classList.add('green-glow');
	setTimeout(function() {document.getElementById(userChoice).classList.remove('green-glow')}, 300);
}
function lost(userChoice, computerChoice){
	compScore++;
	userScore_span.innerHTML = userScore;
	compScore_span.innerHTML = compScore;
	const smallUserWord = "user".fontsize(3).sub();
	const smallCompWord = "comp".fontsize(3).sub();
	result_p.innerHTML = convertWord(userChoice)+smallUserWord +"  loses to  " + convertWord(computerChoice)+smallCompWord + ". You Lose :(";
	document.getElementById(userChoice).classList.add('red-glow');
	setTimeout(function() {document.getElementById(userChoice).classList.remove('red-glow')}, 300);
}
function draw(userChoice, computerChoice){
	const smallUserWord = "user".fontsize(3).sub();
	const smallCompWord = "comp".fontsize(3).sub();
	result_p.innerHTML = convertWord(userChoice)+smallUserWord +"  equals  " + convertWord(computerChoice)+smallCompWord + ". It's a Draw ";
	document.getElementById(userChoice).classList.add('grey-glow');
	setTimeout(function() {document.getElementById(userChoice).classList.remove('grey-glow')}, 300);
}


function game(userChoice){
	const computerChoice = getComputerChoices();
	switch (userChoice + computerChoice) {
	    case "rs":
		case "pr":
		case "sp":
		  wins(userChoice, computerChoice);
		  break;
		case "rp":
		case "ps":
		case "sr":
		  lost(userChoice, computerChoice);
		  break;
		case "rr": 
		case "pp":
		case "ss":
		  draw(userChoice, computerChoice);
		  break;		 
	}
}

function main(){
   rock_div.addEventListener('click',function(){
	   game("r");
   })
   paper_div.addEventListener('click',function(){
       game("p");
   })
   scissors_div.addEventListener('click',function(){
	   game("s");
   })
}
main();
