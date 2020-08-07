"use strict";
var $ = require("jquery");
export const useGenerator = () => {
  const $mainButton = document.getElementById("generator-button");
  const $genBody = document.getElementById("gen-body");

  document.addEventListener("click", (event) => {
    if (event.target === $mainButton) {
      $mainButton.style.display = "none";
      $genBody.style.display = "block";
    }
  });
};
