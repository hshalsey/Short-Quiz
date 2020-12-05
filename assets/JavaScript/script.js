var timeEl = document.querySelector("#time");
var startBtn = document.querySelector("#startButton");
var submitBtn = document.querySelector("#submit-button");
var titleScreen = document.querySelector("#title-section");
var quizScreen = document.querySelector("#quiz-section");
var highScoreScreen = document.querySelector("#highscore-section");
var highScoreDisplay = document.querySelector("#highscore-display-section");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

var questionsEl = document.querySelector("#question");
var choicesEl = document.querySelector("#choices");



function startQuiz() {
  titleScreen.setAttribute("class", "hide");
  quizScreen.setAttribute("class", "show");
  timerId = setInterval(tick, 1000);
  timeEl.textContent = time;
  getQuestion();
  };


  function tick() {
    time--;
    timeEl.textContent = time;
    if (time <= 0) {
      quizEnd();
    }
  };

  function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;
    choicesEl.innerHTML = "";
    currentQuestion.choices.forEach(function(choice, i) {

      var choiceNode = document.createElement("button");
      choiceNode.setAttribute("class", "choice");
      choiceNode.setAttribute("value", choice);
      choiceNode.textContent = i + 1 + ". " + choice;
      choiceNode.onclick = questionClick;
      choicesEl.appendChild(choiceNode);
    });
  }


  function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
      time -= 10;
      if (time < 0) {
        time = 0;
      }
      timeEl.textContent = time;

      feedbackEl.textContent = "Incorrect!";
    } else {
      feedbackEl.textContent = "Correct!";
    }
  
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
  }

  function quizEnd() {
    clearInterval(timerId);

    var highscoreSectionEl = document.querySelector("#highscore-section");
    highscoreSectionEl.setAttribute("class", "show");
  
    var finalScoreEl = document.querySelector("#final-score");
    finalScoreEl.textContent = time;
  
    quizScreen.setAttribute("class", "hide");
  }



function saveHighscore() {
    var initials = initialsEl.value.trim();
    if (initials !== "") {
  
     var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
      highscores.push(newScore);
      localStorage.setItem("highscores", JSON.stringify(highscores));
      window.location.href = "score.html";
      console.log(saveHighscore);
  
      var newScore = {
        score: time,
        initials: initials
      };
  
      
    }
  }
  function checkForEnter(event) {
    if (event.key === "Enter") {
      saveHighscore();
    }
  }
  
  submitBtn.onclick = saveHighscore;
  startBtn.onclick = startQuiz;
  initialsEl.onkeyup = checkForEnter;

  function printHighscores() {
    
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
    
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      var liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score;
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liTag);
    });
  }
  
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = clearHighscores;

  printHighscores();
  console.log(highscoreSectionEl);
  

