"sue strict";

export const useForm = () => {
  const $form = document.getElementById("form");
  const $button = document.getElementById("form-button");
  document.addEventListener("click", (event) => {
    if (event.target == $button) {
      event.preventDefault();

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
