let key = "ccd18072d2c94b6cb1d01e1f680ff822";
let http = "http";

const searchInput = document.querySelector("#search-word");
const languageInput = document.querySelector("#language");
const sortInput = document.querySelector("#sort-by");
// const dateFromInput = document.querySelector("#date-from");
// const dateToInput = document.querySelector("#date-to");
const articleGallery = document.querySelector(".articles");

const searchFunction = () => {
  event.preventDefault();
  //   ! Vorherige Artikel löschen
  articleGallery.innerHTML = "";

  let searchWord = searchInput.value;
  console.log(searchWord);
  let language = languageInput.value;
  console.log(language);
  let sortBy = sortInput.value;
  console.log(sortBy);
  //   let dateFrom = dateFromInput.value;
  //   console.log(dateFrom);
  //   let dateTo = dateToInput.value;
  //   console.log(dateTo);

  fetch(
    `https://newsapi.org/v2/everything?q=${searchWord}&sortBy=${sortBy}&language=${language}&apiKey=${key}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (i = 0; data.articles.length > i; i++) {
        if (i < 12) {
          //   ! Neue Artikel Karte generieren
          let newArticleCard = document.createElement("article");
          newArticleCard.classList.add("article-card");
          //   ! Artikel Headline
          let newArticleHeadline = document.createElement("h2");
          newArticleHeadline.textContent = data.articles[i].title;
          newArticleCard.appendChild(newArticleHeadline);
          //   ! Artikel Text
          let newArticleText = document.createElement("p");
          newArticleText.textContent = data.articles[i].content;
          newArticleCard.appendChild(newArticleText);
          //   ! Artikel Bild
          if (data.articles[i].urlToImage !== null) {
            let newArticleImg = document.createElement("img");
            newArticleImg.src = data.articles[i].urlToImage;
            newArticleImg.alt = "Artikel Bild";
            newArticleCard.appendChild(newArticleImg);
          } else {
            let newArticleImgNone = document.createElement("h2");
            newArticleImgNone.textContent = "Kein Vorschaubild";
            newArticleCard.appendChild(newArticleImgNone);
          }
          //   ! Button "Zum Artikel"
          let newArticleButton = document.createElement("a");
          newArticleButton.setAttribute("href", data.articles[i].url);
          newArticleButton.setAttribute("target", "_blank");
          newArticleButton.textContent = "Zum Artikel";
          newArticleCard.appendChild(newArticleButton);
          //   ! Artikel Karte zum Dom hinzufügen
          articleGallery.appendChild(newArticleCard);
        } else {
          console.log("max 12");
        }
      }
    });
};
