"use strict";

export const showQuestions = () => {
  const $firstQuestion = document.getElementById("question-1");
  const $secondQuestion = document.getElementById("question-2");
  const $thirdQuestion = document.getElementById("question-3");
  const $fourthQuestion = document.getElementById("question-4");

  const questions = [
    {
      question: "У Вас натуральные волосы?",
    },
    {
      question: "Окрашенные на оксиде, который выше 6%?",
    },
    {
      question: "Ваши волосы осветленны?",
    },
    {
      question: "Ваши волосы обламываются по длинне?",
    },
  ];

  $firstQuestion.innerText = questions[0].question;
  $secondQuestion.innerText = questions[1].question;
  $thirdQuestion.innerText = questions[2].question;
  $fourthQuestion.innerText = questions[3].question;
};

const generateAnswers = () => {
  const inputs = document.getElementsByClassName("generator__input");

  const answers = {
    q1: "",
    q2: "",
    q3: "",
    q4: "",
  };

  for (let i = 0; i < 2; i++) {
    if (inputs[i].checked) {
      answers.q1 = inputs[i].value;
    }
  }
  for (let i = 2; i < 4; i++) {
    if (inputs[i].checked) {
      answers.q2 = inputs[i].value;
    }
  }
  for (let i = 4; i < 6; i++) {
    if (inputs[i].checked) {
      answers.q3 = inputs[i].value;
    }
  }
  for (let i = 6; i < 8; i++) {
    if (inputs[i].checked) {
      answers.q4 = inputs[i].value;
    }
  }

  return answers;
};

const renderChoices = (answers) => {
  const $mainButton = document.getElementById("generator-button");
  const $secButton = document.getElementById("generator-btn");
  const $finButton = document.getElementById("gen-form-button");
  const $genBody = document.getElementById("gen-body");
  const $genSecBody = document.getElementById("gen-second-body");
  const labels = document.getElementsByClassName("generator__label");
  const qBoxes = document.getElementsByClassName("generator__question-box");
  let decition = "У вас особый случай, свяжитесь с нами за доп. инфо.";
  const $decition = document.getElementById("decition");
  if (answers.q1 === "Да") {
    decition =
      'Натуральным волосам идеально подходит - "кератин, нанопластика"';
    $genBody.style.display = "none";
    $genSecBody.style.display = "flex";
    $genSecBody.style.justifyContent = "flex-start";
    $genSecBody.style.alignItems = "center";
    $genSecBody.style.flexDirection = "column";
  }

  if (answers.q1 === "Нет" && answers.q2 === "Нет") {
    decition = `В таком случае вам идеально подойдет - "кератин, нанопластика"`;
    $genBody.style.display = "none";
    $genSecBody.style.display = "flex";
    $genSecBody.style.justifyContent = "flex-start";
    $genSecBody.style.alignItems = "center";
    $genSecBody.style.flexDirection = "column";
  }

  if (answers.q1 === "Нет" && answers.q2 === "Да" && answers.q3 === "Нет") {
    decition = `В таком случае вам идеально подойдет - "мягкий кератин, ботокс"`;
    $genBody.style.display = "none";
    $genSecBody.style.display = "flex";
    $genSecBody.style.justifyContent = "flex-start";
    $genSecBody.style.alignItems = "center";
    $genSecBody.style.flexDirection = "column";
  }

  if (
    answers.q1 === "Нет" &&
    answers.q2 === "Да" &&
    answers.q3 === "Да" &&
    answers.q4 === "Нет"
  ) {
    decition = `В таком случае вам нужно записаться на процедуру холодного ботокса для волос, на мягких двухступенчатых составах`;
    $genBody.style.display = "none";
    $genSecBody.style.display = "flex";
    $genSecBody.style.justifyContent = "flex-start";
    $genSecBody.style.alignItems = "center";
    $genSecBody.style.flexDirection = "column";
  }
  if (
    answers.q1 === "Нет" &&
    answers.q2 === "Да" &&
    answers.q3 === "Да" &&
    answers.q4 === "Да"
  ) {
    decition = `В вашем случе, вам подойдут процедуры холодной реконструкции волос`;
    $genBody.style.display = "none";
    $genSecBody.style.display = "flex";
    $genSecBody.style.justifyContent = "flex-start";
    $genSecBody.style.alignItems = "center";
    $genSecBody.style.flexDirection = "column";
  }
  $decition.innerText = decition;
};

export const getLogic = () => {
  const inputs = document.getElementsByClassName("generator__input");
  const labels = document.getElementsByClassName("generator__label");

  document.addEventListener("click", (e) => {
    for (let i = 0; i <= labels.length; i++) {
      if (e.target === labels[i] || e.target === inputs[i]) {
        renderChoices(generateAnswers());
      }
    }
  });
};
