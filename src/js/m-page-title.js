export const startTitileShow = () => {
  let titleArr = [
    "С",
    " ",
    "л",
    "ю",
    "б",
    "о",
    "в",
    "ь",
    "ю",
    " ",
    "к",
    " ",
    "В",
    "а",
    "ш",
    "и",
    "м",
    " ",
    "в",
    "о",
    "л",
    "о",
    "с",
    "а",
    "м",
    "!",
  ];
  let subtitleArr = [
    "K",
    "e",
    "r",
    "a",
    "t",
    "in",
    " ",
    "K",
    "r",
    "e",
    "m",
    "e",
    "n",
  ];
  const $title = document.getElementById("title");
  const $subtitle = document.getElementById("subtitle");
  let text1 = "";
  let text2 = "";
  let counter1 = 0;
  let counter2 = 0;
  const addLettersToTitle = () => {
    if (counter1 === titleArr.length) {
      return true;
    }
    text1 += titleArr[counter1];
    counter1 += 1;
    $title.innerText = text1;
    setTimeout(addLettersToTitle, 40);
  };
  const addLettersToSubtitle = () => {
    if (counter2 === subtitleArr.length) {
      return true;
    }
    text2 += subtitleArr[counter2];
    counter2 += 1;
    $subtitle.innerText = text2;
    setTimeout(addLettersToSubtitle, 80);
    $subtitle.classList.add("active");
  };

  addLettersToTitle();
  setTimeout(addLettersToSubtitle, 2000);
};
