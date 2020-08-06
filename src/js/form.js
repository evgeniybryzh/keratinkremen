"use strict";

export const useForm = () => {
  const $form = document.getElementById("form");
  const $button = document.getElementById("form-button");
  const $overlay = document.querySelector(".reveal-overlay");

  document.addEventListener("click", (event) => {
    if (event.target == $button) {
      event.preventDefault();
      $form.style.display = "none";
      $overlay.style.display = "none";
      fetch("https://hooks.zapier.com/hooks/catch/7951976/ozydy6s", {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        });
    }
  });
};
