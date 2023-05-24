let start = document.querySelector(".start");
let game_contaienr = document.querySelector(".game-container");
let cover = document.getElementById("cover");
let choise = document.getElementById("choise");
let options = document.querySelectorAll(".option");

start.addEventListener("click", () => {
  game_contaienr.classList.remove("blur-background");
  cover.classList.remove("cover");
  start.style.display = "none";
  choise.style.display = "block";
  select_operation();
});
// ========================== start game ========================/
let operator = null;
let random_values = {
  firstRandomValue: 0,
  secondRandomValue: 0,
};

let operation_buttons = document.querySelectorAll(".operator-part");

function select_operation() {
  operation_buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      timing();
      operator = e.target.innerHTML;
      let operatorEl = (document.getElementById("operator").innerHTML =
        operator);
      getRandomValues();
      start_game();
      SaveHeightScore();

      operation_buttons.forEach((btn) => {
        btn.classList.remove("hover-effect");
        btn.setAttribute("disabled", "disabled");
      });

      options.forEach((option) => {
        option.removeAttribute("disabled", "disabled");
        option.classList.add("hover-effect");
      });
    });
  });
}

// ========================= start game =================================

let firstValueEl = document.querySelector(".first-value");
let secondValueEl = document.querySelector(".second-value");

function start_game() {
  choise.style.display = "none";
  random_values = getRandomValues();
  let QUESTION_FIRST_VALUE = Math.floor(Math.random() * 20);
  let QUESTION_SECOND_VALUE = Math.floor(Math.random() * 100);
  let random_correct = Math.floor(Math.random() * 4);

  let optionEl1 = document.querySelector(".option-1");
  let optionEl2 = document.querySelector(".option-2");
  let optionEl3 = document.querySelector(".option-3");
  let optionEl4 = document.querySelector(".option-4");

  firstValueEl.innerText = QUESTION_FIRST_VALUE;
  secondValueEl.innerText = QUESTION_SECOND_VALUE;

  let correctAnswer = null;
  if (operator == "X") {
    correctAnswer = QUESTION_FIRST_VALUE * QUESTION_SECOND_VALUE;
  } else if (operator == "/") {
    correctAnswer = QUESTION_FIRST_VALUE / QUESTION_SECOND_VALUE;
  } else if (operator == "+") {
    correctAnswer = QUESTION_FIRST_VALUE + QUESTION_SECOND_VALUE;
  } else if (operator == "-") {
    correctAnswer = QUESTION_FIRST_VALUE - QUESTION_SECOND_VALUE;
  } else if (operator == "%") {
    correctAnswer = QUESTION_FIRST_VALUE - QUESTION_SECOND_VALUE;
  }

  optionEl1.innerText = random_values.firstOption + correctAnswer;
  optionEl2.innerText = random_values.secondOption + correctAnswer;
  optionEl3.innerText = random_values.thirdOption + correctAnswer;
  optionEl4.innerText = random_values.fourthOption + correctAnswer;

  document.querySelector(`.option-${random_correct}`).innerText =
    correctAnswer;
}

checkOptions();
//=================================== check game over =====================================
let height_scoreEl = document.getElementById("height-score");
let hscore = JSON.parse(localStorage.getItem("height-score"));
let height_score = 0;

height_score = hscore;
height_scoreEl.innerHTML = "Height Score : " + height_score;

let score = 0;
let scoreEl = document.getElementById("score");
let timer = 10;

function timing() {
  setInterval(function () {
    if (timer == 0) {
      result.innerText = `Time Out`;
      result.classList.add("celebration");

      score--;
      scoreEl.innerHTML = "Score :" + score;
      timer = 10;
      start_game();
    }
    if (result.classList.contains("celebration")) {
      setTimeout(() => {
        result.classList.remove("celebration");
      }, 1000);
    }
    timer--;
    let timerEl = (document.getElementById("timer").innerHTML =
      "Timer : 0" + timer);
  }, 1000);
}

function checkOptions() {
  options.forEach((option) => {
    option.addEventListener("click", (e) => {
      if (timer > 1 && e.target.innerHTML == correctAnswer) {
        score++;
        result.innerText = `Correct Answer`;
        result.style.color = "green";
        result.classList.add("celebration");
      } else {
        score--;
        result.style.color = "red";
        result.innerText = `Wrong Answer`;
        result.classList.add("celebration");
      }
      if (score > height_score) {
        height_score = score;
        SaveHeightScore();
      }
      height_scoreEl.innerHTML = "Height Score : " + height_score;
      timer = 10;
      scoreEl.innerHTML = "Score :" + score;
      start_game();
    });
  });
}

function SaveHeightScore() {
  localStorage.setItem("height-score", JSON.stringify(height_score));
}

// ========================================= randoms ==============================================
let getRandomValues = () => {
  let firstOption =
    Math.floor(Math.random() * 10) - Math.floor(Math.random() * 10);
  let secondOption =
    Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10);
  let thirdOption =
    Math.floor(Math.random() * 10) - Math.floor(Math.random() * 10);
  let fourthOption =
    Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10);
  return {
    firstOption,
    secondOption,
    thirdOption,
    fourthOption,
  };
};
