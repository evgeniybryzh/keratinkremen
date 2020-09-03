export const useBurger = () => {
  const $burger = document.getElementById("burger");
  const $burgerMenu = document.getElementById("b-menu");
  const burgerLines = document.getElementsByClassName("burger__line");
  const burgerMenuLinks = document.getElementsByClassName("burger-menu__link");

  document.addEventListener("click", (event) => {
    if (
      event.target === $burger ||
      event.target === burgerLines[0] ||
      event.target === burgerLines[1] ||
      event.target === burgerLines[2]
    ) {
      $burger.classList.contains(`active-burger`)
        ? $burger.classList.remove("active-burger")
        : $burger.classList.add("active-burger");

      $burgerMenu.style.transform === "translateY(0px)"
        ? ($burgerMenu.style.transform = "translateY(-100%)")
        : ($burgerMenu.style.transform = "translateY(0px)");
    }

    for (let i = 0; i < burgerMenuLinks.length; i++) {
      if (event.target === burgerMenuLinks[i]) {
        $burgerMenu.style.transform = "translateY(-100%)";
        $burger.classList.remove("active-burger");
      }
    }
  });
};
