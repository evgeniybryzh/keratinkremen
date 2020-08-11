"use strict";

export const useGenerator = () => {
  const $mainButton = document.getElementById("generator-button");
  const $secButton = document.getElementById("generator-btn");
  const $finButton = document.getElementById("gen-form-button");
  const $genBody = document.getElementById("gen-body");
  const $genSecBody = document.getElementById("gen-second-body");
  document.addEventListener("click", (event) => {
    if (event.target === $mainButton) {
      $mainButton.style.display = "none";
      $genBody.style.display = "block";
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
    }
  });
};
