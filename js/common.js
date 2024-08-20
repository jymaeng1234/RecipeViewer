const API_KEY = config.API_KEY;
const $imgFacebook = document.getElementById("imgFacebook");
const $imgInstagram = document.getElementById("imgInstagram");
const $imgMail = document.getElementById("imgMail");
const $logo = document.getElementById("logo");

const url = new URL(
  `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json`
);

function gotoPage(url) {
  window.location = url;
}

$logo.addEventListener("click", (e) => {
  return gotoPage("/");
});

$imgFacebook.addEventListener("click", (e) => {
  gotoPage("https://www.facebook.com");
});

$imgInstagram.addEventListener("click", (e) => {
  gotoPage("https://www.instagram.com");
});

$imgMail.addEventListener("click", (e) => {
  gotoPage("https://www.gmail.com");
});
