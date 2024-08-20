const API_KEY = config.API_KEY;
const $logo = document.getElementById("logo");

const url = new URL(
  `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json`
);

function gotoPage(url) {
  // location.href = url;
}

// $logo.addEventListener("click", gotoPage("/"));
// $imgFacebook.addEventListener("click", gotoPage("https://www.facebook.com"));
// $imgInstagram.addEventListener("click", gotoPage("https://www.instagram.com"));
// $imgMail.addEventListener("click", gotoPage("https://www.gmail.com"));
