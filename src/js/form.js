"use strict";

export const useForm = () => {
  const $form = document.getElementById("form");
  const $button = document.getElementById("form-button");
  const $overlay = document.querySelector(".reveal-overlay");
  const $name = document.getElementById("name");
  const $phone = document.getElementById("phone");
  const $html = document.getElementById("html");

  const formData = {};

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
    formData.fullName = $name.value;
    formData.phone = $phone.value;
    if (
      event.target == $button &&
      formData.fullName != "" &&
      formData.phone != ""
    ) {
      event.preventDefault();
      $overlay.style.display = "none";
      $html.classList.remove("zf-has-scroll", "is-reveal-open");
      showThanks(formData.fullName);
      fetch("https://wh.automate.io/webhook/5f2c31b1adf7e235b343eed5", {
        // файл-обработчик
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // отправляемые данные
        },
        body: JSON.stringify(formData),
      }).catch((error) => console.error(error));
    }
  });
};
