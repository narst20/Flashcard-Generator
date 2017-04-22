/*pseudocode
1. pull data needed to generate flash cards
2. 
*/
var inquirer=require("inquirer");

inquirer.prompt([
  {
    type: "list",
    message: "Welcome! Please choose a flashcard option.",
    choices: ["Make front and back flashcards", "Review cards", "Make a fill in the blank flashcards"],
    name: "option"
  }
]).then(function(answers) {
	console.log(answers);
	if (answers.option==="Make front and back flashcards"){
		inquirer.prompt([
			{
	    		name: "count",
	    		type: "input",
	    		message: "How many cards to you want to make",
	  		}
		]).then(function(num) {
			makeCard();
			});
	}

	else if (answers.option==="Make a fill in the blank flashcards"){
		inquirer.prompt([
			{
	    		name: "count",
	    		type: "input",
	    		message: "How many cards to you want to make",
	  		}
		]).then(function(num) {
				clozing();
			});
	}

	else if (answers.option==="Review cards"){
		console.log("option2");	
		inquirer.prompt([
		  {
		    type: "list",
		    message: "Please choose a flashcard option.",
		    choices: ["Front and back flashcards", "Fill in the blank flashcards"],
		    name: "cardoption"
		  }
		]).then(function(choice) {
			if (choice.cardoption==="Front and back flashcards"){
				inquirer.prompt([
					{
					    type: "list",
					    message: "Which side?",
					    choices: ["Front", "Back"],
					    name: "frontback"
			  		}
				]).then(function(frontback) {
						if (frontback.frontback==="Front"){
							newcard.cardfront();
						}
						else if (frontback.frontback==="Back"){
							newcard.cardback();
						}
						else {
							console.log("Error!! Hit Crtl+C to start again!");
						}

					});
			}
			else if (choice.cardoption==="Fill in the blank flashcards"){
						inquirer.prompt([
							{
							    type: "list",
							    message: "Which component?",
							    choices: ["Full text", "Guess the answer", "Guess the question"],
							    name: "clozechoice"
					  		}
						]).then(function(clozze) {
						if (clozze.clozechoice==="Full text"){
							newclozecard.clozerunfull();
						}
						else if (clozze.clozechoice==="Guess the answer"){
							newclozecard.clozerunfront();
						}
						else if (clozze.clozechoice==="Guess the question"){
							newclozecard.clozerunanswer();
						}
						else {
							console.log("Error!! Hit Crtl+C to start again!");
						}
					});				
			}
		});
	}
});


//Initial templates for cards
var numcards;
var counter=0;
var frontArr=["What is the capital of Bulgaria?", "Who holds the world record holder for the most homeruns in a career?", "What is the address of the Dursley house in the Harry Potter franchise?"];
var backArr=["Sofia","Barry Bonds", "4 Privet Drive"];
var fulltextArr=["Sofia is the capital of Bulgaria.", "Barry Bonds holds the world record holder for the most homeruns in a career.", "4 Prive Drive is the address of the Dursley house in the Harry Potter franchise?"];
var clozeArr=["???? is the capital of Bulgaria.", "???? holds the world record holder for the most homeruns in a career.", "???? is the address of the Dursley house in the Harry Potter franchise?"];
var clozeanswerArr=["Sofia","Barry Bonds", "4 Privet Drive"];
var script;

//functions
function makeCard() {
		inquirer.prompt([
			{
		    	type: "input",
		    	message: "What is the question?",
		    	name: "front"
			},
			{
		    	type: "input",
		    	message: "What is the answer?",
		    	name: "back"
			},
			{
		   		type: "input",
		  		message: "Name this card!",
		   		name: "title"
		  	},
		]).then(function(results) {
			function BasicCard(front, back) {
				this.front=results.front;
			 	this.back=results.back;
			 	this.cardview=function(){
			 	frontArr.push(this.front);
			 	backArr.push(this.back);
			 	console.log(frontArr);
			 	console.log(backArr);
			 	}
			 	this.cardfront=function(){
			 	console.log(frontArr);
			 	}			 	
			 	this.cardback=function(){
			 	console.log(backArr);
			 	}
 			};
			var newcard= new BasicCard(results.front, results.back);
			newcard.cardview();
			});
		counter++;
}

function clozing(){
	inquirer.prompt([
	{
		type: "input",
		message: "Write the full text!",
		name: "fulltext"
	},
	{
		type: "input",
		message: "What do you want to remove?",
		name: "clozeanswer"
	},
	]).then(function(clozeresults) {
			console.log(clozeresults.fulltext);
			console.log(clozeresults.clozeanswer);
			function ClozeCard(fulltext, cloze) {
				this.fulltext=clozeresults.fulltext;
				this.cloze=this.fulltext.replace(clozeresults.clozeanswer, "????");
				this.clozerun=function(){
					fulltextArr.push(this.fulltext);
			 		clozeanswerArr.push(clozeresults.clozeanswer);
			 		clozeArr.push(this.cloze);
			 		console.log(fulltextArr);
					console.log(clozeanswerArr);
					console.log(clozeArr);
				}
				this.clozerunfront=function(){
					console.log(clozeArr);
				}
				this.clozerunanswer=function(){
					console.log(clozeanswerArr);
				}
				this.clozerunfull=function(){
					console.log(fulltextArr);
				}
			};
		var newclozecard= new ClozeCard(this.fulltext, this.cloze);
			newclozecard.clozerun();		
		})
}

