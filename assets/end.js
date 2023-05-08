const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
// turns our string into an array using parse
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;
//gotta store local storage info in string then use json to stringify the array


localStorage.setItem("highScores", JSON.stringify([]));
username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    console.log("clicked the save button!");
    //making it so we dont leave the page when we click save
    e.preventDefault();

    const score = { 
        //sorting our scores
        score: Math.floor(Math.random() * 100),
        name: username.value
      
    };
    highScores.push(score);
//will sort out all the saved scores and return a sorted array
    highScores.sort( (a,b) => {
        return b.score - a.score;
    });
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    // window.location.assign("/");
};



