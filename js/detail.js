const $cate = document.querySelector("cate");
const $menuName = document.getElementById("menuName");

let jsonFile = "../recipe1.json";

fetch(jsonFile)
  .then((response) => response.json())
  .then((data) => data.COOKRCP01.row[0])
  .then((recipeItem) => {
    console.log(recipeItem.RCP_NM);
    $menuName = recipeItem.RCP_NM;
  });
