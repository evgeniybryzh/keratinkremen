"use strict";

export const useGenerator = () => {
  const $mainButton = document.getElementById("generator-button");
  const $secButton = document.getElementById("generator-btn");
  const $finButton = document.getElementById("gen-form-button");
  const $genBody = document.getElementById("gen-body");
  const $genSecBody = document.getElementById("gen-second-body");
  const labels = document.getElementsByClassName("generator__label");
  const qBoxes = document.getElementsByClassName("generator__question-box");
  const $mTitle = document.getElementById("mtitle");
  const inputs = document.getElementsByClassName("generator__input");

  document.addEventListener("click", (event) => {
    if (event.target === $mainButton) {
      $mainButton.style.display = "none";
      $genBody.style.display = "block";
      $mTitle.style.display = "none";
    }
    if (event.target === $secButton) {
      $genBody.style.display = "none";
      $genSecBody.style.display = "flex";
      $genSecBody.style.justifyContent = "flex-start";
      $genSecBody.style.alignItems = "center";
      $genSecBody.style.flexDirection = "column";
    }
    if (event.target === $finButton) {
      $mainButton.style.display = "inline-block";
      $genSecBody.style.display = "none";
      qBoxes[1].style.display = "none";
      qBoxes[2].style.display = "none";
      qBoxes[3].style.display = "none";
      $mTitle.style.display = "block";
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].checked = false;
      }
    }
    if (event.target === labels[1]) {
      qBoxes[1].style.display = "flex";
    }
    if (event.target === labels[2]) {
      qBoxes[2].style.display = "flex";
    }
    if (event.target === labels[4]) {
      qBoxes[3].style.display = "flex";
    }
  });
};
