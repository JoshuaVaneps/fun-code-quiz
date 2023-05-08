const question = document.getElementById("question");
//converting our objects to an array
const choices = Array.from(document.getElementsByClassName("choice-text"));
//reference our hud
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
//gives us a delay before the next answer
let acceptingAnswers = false;
//gives us a score
let score = 0;
//tells us what question were on
let questionCounter = 0;
//well give us an array of questions so we can prompt mutliple questions
let availableQuestions = [];
//gives us multiple questions as objects and lists us an answer and we can make them arrays 
//and then pull specific info from them
let questions = [
    {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    }
];

//gives us a value for correct anser and locks in amout of questions
    const CORRECT_BONUS = 10;
    const MAX_QUESTIONS = 3;

//using arrow syntax cus its faster function just function name parameters if you dont have him just have open and close
    startGame = () => {
        //gives our counter and scire a starting value of 0
        questionCounter = 0;
        score = 0;
        //copies our array into new value
        availableQuestions = [...questions];
        getNewQuestion();
    };
//we need to create a function to pull the question we got and update the count of how many questions we answered
    getNewQuestion = () => {
        if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
            //this allows us to save the score to local storage when were done
            localStorage.setItem("mostRecentScore", score);
            //this return takes us to the score page when we finish or time runs out
            return window.location.assign("./end.html");
        }

        //raises our counter any time we get a new question gives us number 1 ewhen game starts
        questionCounter++;
        // setting our question counter text to be equal to question couunter value / how many questions we have gathered from max questions
        questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
        //we want a random question so we can use math.random and math floor to set our possible values and range
       // always use length of array not a number cus its more consistent
        const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        //going through our available questions array and picking the number that matches our index 
        //we then add that question wwe just indexed to the current question variable then print
        currentQuestion = availableQuestions[questionIndex];
        //prints whatever question we get randomly to the question div
        question.innerText = currentQuestion.question;
       
       
        // this is attempting to do the same for the choices were gonna go through each choce
        //for each allows us to iterate or sift through our choices
        choices.forEach(choice => {
            //making number equal to the number variable in our data set of the 
            //html elements of the choices
            const number = choice.dataset["number"];
            //printing the choices from our question array by finding the
            // index based on what dataset matches the index
            choice.innerText = currentQuestion["choice" + number];
        });
//need to seperat out questions we already used
        availableQuestions.splice(questionIndex, 1);
//allowa user to answer
        acceptingAnswers = true;
    };
// putting a click event listener for each choice
    choices.forEach(choice =>{
        //the e target allows us to attatch it to the click
        choice.addEventListener("click", e => {
            //if were not accepting answers meaning they clicked before our delay timer was empty
            //will return and ignore the click
            if(!acceptingAnswers) return;
            //if we are acceptig answers then set the default  to false
            acceptingAnswers = false;
            //this makes the choice picked whatever is clicked
            const selectedChoice = e.target;
            //uses the number to connect the choice by its dat set number
            const selectedAnswer = selectedChoice.dataset["number"];
            // need to apply correct and incorrect class
         // this makes class incorrect by default
        //chnagesd const classToApply = 'incorrect';
        const classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
         //make an if statement that checks if choice clicked is equaled to answer if it is change  var to correct
            //chanbged wasnt working revisit if (selectedAnswer == currentQuestion.answer) {
            //  classToApply = 'correct'}

             if(classToApply === "correct") {
                incrementScore(CORRECT_BONUS);
             }
     // grabs the choice container and adds the class to it for correct or incorect  
     selectedChoice.parentElement.classList.add(classToApply);
    //  gives us a little delay between when the color shows and stops otherwise you wont see it happen
     setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        //once done run new question.
        getNewQuestion();
     }, 1000);
        });
    });

    // increases our score 
    incrementScore = num => {
        score += num;
        //update our inner text of the score hud
        scoreText.innerText = score;
    }

    startGame();

