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
const $recipeCount = document.getElementById("recipeCount");

// 카테고리 선택을 위한 변수
let currentCategory = null;

// 레시피 개수 정보 출력
const renderCount = (count) => {
  totalResults = count;
  $recipeCount.innerHTML = `
          <p id="count">${count ? Number(count).toLocaleString() : "0"}</p>
          <p>개의 레시피</p>`;
};

// 레시피 목록 출력 (카드)
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
  let urlToDetail = `/detail.html?RCP_NM=${title}`;

  return ` <li>
            <div class="card"  id="card${recipeIdx}">
               <img src="${urlToImage}" alt="" />
               <h3 id="cardTitle">${title}</h3>
               <div>
                 <strong>${calorie}kcal</strong>
                 <p class="cate">${category}</p>
               </div>
               <a class="more" href="${urlToDetail}" target="_blank"></a>
             </div>
          </li>`;
};

// 레시피 로드 함수
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
    let totalCnt = data.COOKRCP01.total_count;
    recipeList = data.COOKRCP01.row;
    renderCount(totalCnt);
    renderRecipes(recipeList);
    pagination();
  } catch (e) {
    console.error(e);
  }
};

const LoadRecipe = (target) => {
  //카테고리 버튼 스타일 변경
  const $beforeSelected = document.querySelector(".cateOn");
  $beforeSelected.classList.toggle("cateOn");
  $Selected = document.getElementById(target.srcElement.id);
  $Selected.classList.toggle("cateOn");

  // 레시피 로드
  switch (target.srcElement.id) {
    case "category1":
      currentCategory = null;
      break;
    case "category2":
      currentCategory = "밥";
      break;
    case "category3":
      currentCategory = "반찬";
      break;
    case "category4":
      currentCategory = "국";
      break;
    case "category5":
      currentCategory = "일품";
      break;
    case "category6":
      currentCategory = "후식";
      break;
    case "category7":
      currentCategory = "기타";
      break;
    default:
      currentCategory = null;
      break;
  }
  loadRecipes(currentCategory);
};

const loadRecipesByName = async (rcp_nm = null, startIdx = 1, endIdx = 9) => {
  try {
    let requestUrl =
      rcp_nm === null
        ? `${url}/${startIdx}/${endIdx}`
        : `${url}/${startIdx}/${endIdx}/RCP_NM=${rcp_nm}`;

    const res = await fetch(requestUrl);
    const data = await res.json();

    let totalCnt = data.COOKRCP01.total_count;
    recipeList = data.COOKRCP01.row;
    renderCount(totalCnt);
    renderRecipes(recipeList);
    pagination();
  } catch (e) {
    console.error(e);
  }
};

const searchRecipe = (e) => {
  if (e.key === "Enter" || e.type === "click") {
    if ($search.value === "") {
      $search.value = "";
      $search.focus();
    }

    loadRecipesByName($search.value);
  }
};

// 페이지네이션을 위한 변수
let pageSize = 9;
let page = 1;
let totalResults = 0;
let groupSize = 6;
let currentPage = 1;

// 페이지네이션 함수
const movePage = (pageNum) => {
  page = pageNum;
  currentPage = pageNum;
  loadRecipes(null, pageSize * (pageNum - 1) + 1, pageNum * pageNum);
};

const pagination = () => {
  let pageGroup = Math.ceil(page / groupSize);
  let lastPage = Math.min(
    Math.ceil(totalResults / pageSize),
    pageGroup * groupSize
  );
  let firstPage = (pageGroup - 1) * groupSize + 1;
  let totalPage = Math.ceil(totalResults / pageSize);
  let prevGroup = (pageGroup - 2) * groupSize + 1;
  let nextGroup = pageGroup * groupSize + 1;

  let paginationHtml = `<button class="next" ${
    pageGroup == 1 ? "disabled" : ""
  } onClick='movePage(${prevGroup})>이전페이지그룹</button>`;

  paginationHtml += `<button class="next" ${
    pageGroup == 1 ? "disabled" : ""
  } onClick='movePage(${currentPage - 1})>이전</button>`;

  for (let i = firstPage; i < lastPage; i++) {
    paginationHtml += `<button class='${
      i == currentPage ? "on" : ""
    }' onClick='movePage(${i})'>${i}</button>`;
  }
  paginationHtml += `<button class="next" ${
    pageGroup * groupSize >= totalPage
  } onClick='movePage(${currentPage + 1})>다음</button>`;

  paginationHtml += `<button class="next" ${
    pageGroup * groupSize >= totalPage
  } onClick='movePage(${nextGroup + 1})>다음페이지그룹</button>`;

  document.querySelector(".pageCon").innerHTML = paginationHtml;
};

init();

$search.addEventListener("keydown", searchRecipe);
$searchBtn.addEventListener("click", searchRecipe);
$categoryAll.addEventListener("click", LoadRecipe);
$categoryRice.addEventListener("click", LoadRecipe);
$categorySide.addEventListener("click", LoadRecipe);
$categorySoup.addEventListener("click", LoadRecipe);
$categoryMain.addEventListener("click", LoadRecipe);
$categoryDessert.addEventListener("click", LoadRecipe);
$categoryOther.addEventListener("click", LoadRecipe);
