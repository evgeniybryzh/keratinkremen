"use strict";

export const showQuestions = () => {
  const $firstQuestion = document.getElementById("question-1");
  const $secondQuestion = document.getElementById("question-2");
  const $thirdQuestion = document.getElementById("question-3");
  const $fourthQuestion = document.getElementById("question-4");

  const questions = [
    {
      question: "Здесь будет вопрос номер 1",
    },
    {
      question: "Здесь будет вопрос номер 2",
    },
    {
      question: "Здесь будет вопрос номер 3",
    },
    {
      question: "Здесь будет вопрос номер 4",
    },
  ];

  $firstQuestion.innerText = questions[0].question;
  $secondQuestion.innerText = questions[1].question;
  $thirdQuestion.innerText = questions[2].question;
  $fourthQuestion.innerText = questions[3].question;
};

const generateAnswers = () => {
  const inputs = document.getElementsByClassName("generator__input");
  const $inputs = [...inputs];
  const answers = {
    q1: "",
    q2: "",
    q3: "",
    q4: "",
  };

  for (let i = 0; i < 2; i++) {
    if ($inputs[i].checked === true) {
      answers.q1 = $inputs[i].value;
    }
  }
  for (let i = 2; i < 4; i++) {
    if ($inputs[i].checked === true) {
      answers.q2 = $inputs[i].value;
    }
  }
  for (let i = 4; i < 6; i++) {
    if ($inputs[i].checked === true) {
      answers.q3 = $inputs[i].value;
    }
  }
  for (let i = 6; i < 8; i++) {
    if ($inputs[i].checked === true) {
      answers.q4 = $inputs[i].value;
    }
  }
  return answers;
};

const renderChoices = (answers) => {
  let decition = "У вас особый случай, свяжитесь с нами за доп. инфо.";
  const $decition = document.getElementById("decition");
  if (
    answers.q1 === "Да" &&
    answers.q2 === "Да" &&
    answers.q2 === "Да" &&
    answers.q2 === "Да"
  ) {
    decition = "Кератиновое выпрямление волос";
  }
  if (
    answers.q1 === "Нет" &&
    answers.q2 === "Нет" &&
    answers.q2 === "Нет" &&
    answers.q2 === "Нет"
  ) {
    decition = `Вам подходит "Ботокс"`;
  }
  $decition.innerText = decition;
};

export const getLogic = () => {
  const $button = document.getElementById("generator-btn");

  let answers = {};

  document.addEventListener("click", (event) => {
    if (event.target === $button) {
      answers = generateAnswers();
      renderChoices(answers);
    }
  });
};
