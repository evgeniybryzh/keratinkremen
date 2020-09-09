"use strict";
var $ = require("jquery");
export const useForm = () => {
  const $button = document.getElementById("form-button");
  const $overlay = document.querySelector(".reveal-overlay");
  const $name = document.getElementById("name");
  const $phone = document.getElementById("phone");
  const $html = document.getElementById("html");
  const form_Data = {};
  const showThanks = (name) => {
    const modal = document.createElement("div");
    const text = document.createElement("h2");
    text.innerText = `Спасибо, ${name}, мы скоро с вами свяжемся!`;
    modal.classList.add("modal", "animate__animated", "animate__backInUp");
    text.classList.add("modal__text");
    modal.appendChild(text);
    document.body.appendChild(modal);
    modal.style.bottom = `0px`;
    setTimeout(() => {
      document.body.removeChild(modal);
    }, 4000);
  };
  document.addEventListener("click", (event) => {
    form_Data.fullName = $name.value;
    form_Data.phone = $phone.value;
    if (
      event.target == $button &&
      form_Data.fullName != "" &&
      form_Data.phone != ""
    ) {
      event.preventDefault();
      $overlay.style.display = "none";
      $html.classList.remove("zf-has-scroll", "is-reveal-open");
      showThanks(form_Data.fullName);
      const useFetch = async () => {
        await fetch("https://serene-oasis-57731.herokuapp.com/", {
          headers: {
            "Content-Type": "application/json",
          },

          method: "POST",

          body: JSON.stringify(form_Data),
        }).catch((error) => console.error(error));
      };
      useFetch();
    }
  });
};
