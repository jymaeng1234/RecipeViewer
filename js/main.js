const API_KEY = config.API_KEY;

const $logo = document.getElementById("logo");
const $banner = document.getElementById("banner");
const $search = document.getElementById("inputSearch");
const $searchBtn = document.getElementById("searchBtn");
const $category = document.querySelector("category");
const $cardListCon = document.getElementById("cardListCon");

// const url = new URL(`http://openapi.foodsafetykorea.go.kr/api/${apiKey}/COOKRCP01/json/${startIdx}/${endIdx}`);
const url = new URL(
  `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json`
);
let pageSize = 9;
let page = 1;
let totalResults = 0;
let groupSize = 5;
let currentPage = 1;

//페이지네이션을 위한 변수
let currentCategory = "반찬";
let currentQuery = null;

const fetchRecipes = async (startIdx = 1, endIdx = 9) => {
  try {
    let requestUrl = `${url}/${startIdx}/${endIdx}`;
    const res = await fetch(requestUrl);
    const data = await res.json();

    recipeList = data.COOKRCP01.row;
    renderRecipes(recipeList);
  } catch (e) {
    console.error(e);
  }
};

const renderRecipes = (recipeList) => {
  const recipeHtml = recipeList.map((recipe) => createHtml(recipe)).join("");
  $cardListCon.innerHTML = recipeHtml;
};

const createHtml = (recipe) => {
  let urlToImage = recipe.ATT_FILE_NO_MK || "./img/noimage.png";
  let title = recipe.RCP_NM || "메뉴명 없음";
  let calorie = recipe.INFO_ENG || "정보 없음";
  let category = recipe.RCP_PAT2 || "정보 없음";
  let recipeIdx = recipe.RCP_SEQ || "-1";

  return `<div class="card"  id="card${recipeIdx}">
            <img src="${urlToImage}" alt="" />
            <h3>${title}</h3>
            <div>
              <strong>${calorie}kcal</strong>
              <p>${category}</p>
              <a class="recipelink" href="./detail_${recipeIndex}&recipeNme=${title}.html">바로가기</a>
            </div>
          </div>`;
};

function gotoMain() {
  location.href = "/";
}

function showRullet() {}

function searchRecipe() {}

const loadData = () => {};

const init = () => {
  // fetchRecipes();
};

init();

$logo.addEventListener("click", gotoMain);
$banner.addEventListener("click", showRullet);
$search.addEventListener("keydown", searchRecipe);
$searchBtn.addEventListener("click", searchRecipe);
