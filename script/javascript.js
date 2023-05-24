"use strict";

let game_contaienr = document.querySelector(".game-container");
let cover = document.getElementById("cover");
let startGame = document.getElementById("start-game");

startGame.addEventListener("click", () => {
  startGame.classList.add("hide");
  game_contaienr.classList.remove("blur-background");
  cover.classList.remove("cover");
});

let question = {
  QUESTION_FIRST_VALUE: 0,
  QUESTION_SECOND_VALUE: 0,
  CORRECT_ANSWER: "",
};

// ============================random values generat for question ===========================
let question_generator = (a) => {
  if (a === "X") {
    return {
      f_v: Math.floor(Math.random() * 20),
      s_v: Math.floor(Math.random() * 20),
    };
  } else if (a === "-") {
    return {
      f_v: Math.floor(Math.random() * 100),
      s_v: Math.floor(Math.random() * 100),
    };
  } else if (a === "+") {
    return {
      f_v: Math.floor(Math.random() * 100),
      s_v: Math.floor(Math.random() * 100),
    };
  } else if (a === "/") {
    return {
      f_v : Math.floor(Math.random() * 100),
      s_v : Math.floor(Math.random() * 12 + 1),
     
    };
  }
};

// ==============================operation buttons ======================
let operator = "";
let operation_buttons = document.querySelectorAll(".operator-part");
operation_buttons.forEach((op) => {
  op.addEventListener("click", () => {
    document.getElementById("choise").style.display = "none";
    operator = op.innerText;
    checkGameOver();

    run();
  });
});

// ========================run game ==============================
function run() {
  let firstValue_El = document.querySelector(".first-value");
  let secondValue_El = document.querySelector(".second-value");
  let operator_El = document.querySelector(".operator");

  operator_El.innerText = operator;
  let showQuestion = question_generator(operator);

  switch (operator) {
    case "X":
      question.QUESTION_FIRST_VALUE = showQuestion.f_v;
      question.QUESTION_SECOND_VALUE = showQuestion.s_v;
      question.CORRECT_ANSWER =
        question.QUESTION_FIRST_VALUE * question.QUESTION_SECOND_VALUE;

      break;
    case "-":
      question.QUESTION_FIRST_VALUE = showQuestion.f_v;
      question.QUESTION_SECOND_VALUE = showQuestion.s_v;
      question.CORRECT_ANSWER =
        question.QUESTION_FIRST_VALUE - question.QUESTION_SECOND_VALUE;
      break;
    case "/":
      question.QUESTION_FIRST_VALUE = showQuestion.f_v;
      question.QUESTION_SECOND_VALUE = showQuestion.s_v;
      question.CORRECT_ANSWER = Math.round(
        question.QUESTION_FIRST_VALUE / question.QUESTION_SECOND_VALUE
      );
      break;
    case "+":
      question.QUESTION_FIRST_VALUE = showQuestion.f_v;
      question.QUESTION_SECOND_VALUE = showQuestion.s_v;
      question.CORRECT_ANSWER =
        question.QUESTION_FIRST_VALUE + question.QUESTION_SECOND_VALUE;
      break;

    default:
  }

  firstValue_El.innerText = question.QUESTION_FIRST_VALUE;
  secondValue_El.innerText = question.QUESTION_SECOND_VALUE;

  // =====================random values generate for options=============
  let random_options = () => {
    let random_1 = Math.floor(Math.random() * 15);
    let random_2 = Math.floor(Math.random() * 15);
    let random_3 = Math.floor(Math.random() * 15);
    let random_4 = Math.floor(Math.random() * 15);
    let random_5 = Math.floor(Math.random() * 15);
    let random_6 = Math.floor(Math.random() * 15);
    let random_7 = Math.floor(Math.random() * 15);
    let random_8 = Math.floor(Math.random() * 15);

    let randomArr = [
      random_1,
      random_2,
      random_3,
      random_4,
      random_5,
      random_6,
      random_7,
      random_8,
    ];
    let optionArr = [...new Set(randomArr)];
    if (optionArr.length >= 4) {
      return optionArr;
    } else {
      return {
        random_1,
        random_2,
        random_3,
        random_4,
      };
    }
  };
  let optionArr = random_options();

  operation_buttons.forEach((op) => {
    op.setAttribute("disabled", "disabled");
  });
  let optionEl1 = document.querySelector(".option-1");
  let optionEl2 = document.querySelector(".option-2");
  let optionEl3 = document.querySelector(".option-3");
  let optionEl4 = document.querySelector(".option-4");

  optionEl1.innerText = Math.round(question.CORRECT_ANSWER + optionArr[0]);
  optionEl2.innerText = Math.round(question.CORRECT_ANSWER - optionArr[1]);
  optionEl3.innerText = Math.round(question.CORRECT_ANSWER + optionArr[2]);
  optionEl4.innerText = Math.round(question.CORRECT_ANSWER - optionArr[3]);

  let correct_random_value = Math.floor(Math.random() * 4 + 1);

  document.querySelector(`.option-${correct_random_value}`).innerText =
    Math.round(question.CORRECT_ANSWER);
}

// =============================scoring=========================
let scoreEl = document.getElementById("score");
let high_scoreEl = document.getElementById("high-score");
let timerEl = document.getElementById("timer");
let timer = 10;

let resultEl = document.getElementById("result");

let score = 0;
let get_score = localStorage.getItem("high-score");
let high_score = 0;
if (get_score) {
  high_score = JSON.parse(get_score);
}

// ======================check game over and animations ===================
function checkGameOver() {
  setInterval(() => {
    timer--;
    // timer = timer < 10 ? "0" + timer : timer;
    timerEl.innerText = `Timer : 0${timer}`;
    scoreEl.textContent = `Score : ${score}`;
    high_scoreEl.textContent = `High Score :  ${high_score}`;

    // ================check isanimat================
    if (resultEl.classList.contains("celebration")) {
      resultEl.classList.remove("celebration");
    }
    // ===============formation timer ============
    //=================check score conditions=============
    if (score > high_score) {
      high_score = score;
      save_score();
    }
    if (timer === 0) {
      timer = 10;
      score--;

      resultEl.textContent = "Time Out";
      resultEl.style.color = "black";
      resultEl.classList.add("celebration");

      let sh = question_generator(operator);
      question.QUESTION_FIRST_VALUE = sh.f_v;
      question.QUESTION_SECOND_VALUE = sh.s_v;
      run();
    }
  }, 1000);

  let options = document.querySelectorAll(".option");
  options.forEach((option) => {
    option.removeAttribute("disabled", "disabled");
    option.addEventListener("click", () => {
      timer = 10;
      if (option.innerText == question.CORRECT_ANSWER) {
        resultEl.textContent = "Correct Answer";
        resultEl.style.color = "green";
        resultEl.classList.add("celebration");
        score++;
      } else {
        resultEl.textContent = "Wrong Answer";
        resultEl.style.color = "red";
        resultEl.classList.add("celebration");
        score--;
      }

      let sh = question_generator(operator);
      question.QUESTION_FIRST_VALUE = sh.f_v;
      question.QUESTION_SECOND_VALUE = sh.s_v;
      run();
    });
  });
}

function save_score() {
  localStorage.setItem("high-score", JSON.stringify(high_score));
}
