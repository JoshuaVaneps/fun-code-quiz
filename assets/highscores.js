const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoresList.innerHTML =
// map takes an incoming array and converts the items to a new array
highScores.map( score => {
    //this pulls the name and score from the array and returns the new array as a list changin our html
   return `<li class="high-score">${score.name} - ${score.score}</li>`;
})
.join(""); //join creates a string from our new array