const $banner = document.getElementById("banner");
const $search = document.getElementById("inputSearch");
const $searchBtn = document.getElementById("searchBtn");
const $category = document.querySelector("category");
const $categoryAll = document.getElementById("category1");
const $categoryRice = document.getElementById("category2");
const $categorySide = document.getElementById("category3");
const $categorySoup = document.getElementById("category4");
const $categoryMain = document.getElementById("category5");
const $categoryDessert = document.getElementById("category6");
const $categoryOther = document.getElementById("category7");

const $cardListCon = document.getElementById("cardListCon");

let page = 1;
let totalResults = 0;
let groupSize = 5;
let currentPage = 1;

//페이지네이션을 위한 변수
let currentCategory = "반찬";
let currentQuery = null;

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
            </div>
          </div>`;
};

/*
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
              <a class="recipelink" href="./detail_${recipeIdx}&recipeNme=${title}.html">바로가기</a>
            </div>
          </div>`;
};
*/

function showRullet() {}

function searchRecipe() {}

const init = () => {
  loadRecipes();
};

const loadRecipes = async (rcp_pat = null, startIdx = 1, endIdx = 9) => {
  try {
    let requestUrl =
      rcp_pat === null
        ? `${url}/${startIdx}/${endIdx}`
        : `${url}/${startIdx}/${endIdx}/RCP_PAT2=${rcp_pat}`;

    const res = await fetch(requestUrl);
    const data = await res.json();

    recipeList = data.COOKRCP01.row;
    renderRecipes(recipeList);
  } catch (e) {
    console.error(e);
  }
};

init();

const LoadRecipe = (i) => {
  switch (i.srcElement.id) {
    case "category1":
      loadRecipes();
      break;
    case "category2":
      loadRecipes("밥");
      break;
    case "category3":
      loadRecipes("반찬");
      break;
    case "category4":
      loadRecipes("국");
      break;
    case "category5":
      loadRecipes("일품");
      break;
    case "category6":
      loadRecipes("후식");
      break;
    case "category7":
      loadRecipes("기타");
      break;
    default:
      loadRecipes();
      break;
  }
};

$banner.addEventListener("click", showRullet);
$search.addEventListener("keydown", searchRecipe);
$searchBtn.addEventListener("click", searchRecipe);
$categoryAll.addEventListener("click", LoadRecipe);
$categoryRice.addEventListener("click", LoadRecipe);
$categorySide.addEventListener("click", LoadRecipe);
$categorySoup.addEventListener("click", LoadRecipe);
$categoryMain.addEventListener("click", LoadRecipe);
$categoryDessert.addEventListener("click", LoadRecipe);
$categoryOther.addEventListener("click", LoadRecipe);
