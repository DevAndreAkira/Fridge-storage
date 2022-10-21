
const form = document.querySelector("form");
const ul = document.querySelector("tbody");
const mais = document.querySelector("#mais")
const menos = document.querySelector("#menos");
let comida = document.querySelector("body > div > img");

//& CHANGE COLOR LETTER TITLE
let titleProject = document.querySelectorAll("body > div > h1 > span:nth-child(n).funnyTitle");
titleProject.forEach((e) => {
  e.style.color = gerandoCores();
  e.style.textShadow = "1px 1px black";
})

function gerandoCores() {
  let gerado = (Math.floor(Math.random() * 0xffffff).toString(16));
  return `#${gerado.length === 6 ? gerado : gerado + "1"}`;
}

//~ IMAGE FOODS
document.querySelector("#input-add").onchange = function () {
  if (document.querySelector("#input-add").value === "🍝Macarrão") {
    comida.src = "./images/food/pasta.png";
  }
  if (document.querySelector("#input-add").value === "🍞Pão de forma") {
    comida.src = "./images/food/toast.png";
  }
  if (document.querySelector("#input-add").value === "🥚Ovos") {
    comida.src = "./images/food/egg.png";
  }
}

//~ ADD AND REMOVE 
mais.onclick = function () {
  document.querySelector("#input-many").value = Number(document.querySelector("#input-many").value) + 1;
}
menos.onclick = function () {
  document.querySelector("#input-many").value = Number(document.querySelector("#input-many").value) - 1;
}

// Se existir, arrayItem = localStorage. se nao retorna vazio
let arrayItem = (localStorage.getItem("itens")) ? JSON.parse(localStorage.getItem("itens")) : [];

//& GET FROM LOCALSTORAGE
if (localStorage.getItem("itens")) {
  let arrayLocal = JSON.parse(localStorage.getItem("itens"));
  arrayLocal.forEach((e) => {
    ul.innerHTML += `<tr class="m-2 border border-gray-200 rounded px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out flex justify-between animate__animated animate__fadeIn">
    <td class="titleItem">${e.title}</td><td class="manyItens">${"x" + e.many}</td><td class="text-red-700 delete material-icons">cancel</td></tr>`;
  })
}

document.querySelector("body > div.w-3\\/4.max-w-\\[370px\\].mx-auto").classList.add("animate__animated", "animate__fadeIn");

//* SUBMIT FUNCTION
form.onsubmit = function (event) {
  event.preventDefault();

  let textInput = document.getElementById("input-add").value;
  let textMany = document.getElementById("input-many").value;
  let objFood = {
    title: textInput,
    many: textMany
  }

  if (textInput == '' || textInput == ' ' || textInput == '  ' || textInput == '   ' || textInput.length > 35) {
    return
  }
  else {
  }

  if (textMany < 1) {
    return
  }
  else {
    arrayItem.push(objFood);
    localStorage.setItem("itens", JSON.stringify(arrayItem));
  }

  if (!ul.querySelector("tr")) {
    ul.innerHTML += `<tr class="m-2 border border-gray-200 rounded px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out flex justify-between animate__animated animate__fadeIn">
  <td class="titleItem">${textInput}</td><td class="manyItens">${"x" + textMany}</td><td class="text-red-700 delete material-icons">cancel</td></tr>`;
  }
  else {
    const li = ul.querySelector("tr").cloneNode(true);
    ul.appendChild(li);
    li.querySelector("td.titleItem").textContent = objFood.title;
    li.querySelector("td.manyItens").textContent = "x" + objFood.many;
  }
  document.getElementById("input-add").value = 'Choose here';
  document.getElementById("input-many").value = '';

  //TODO - IGUALANDO LARGURA CARDS
  let cardsIcons = document.querySelectorAll("body > div > table > tbody > tr:nth-child(n) > td.titleItem")
  cardsIcons.forEach((e, index) => {
    cardsIcons[index].style.width = "auto";
  })
  cardsIguais(document.querySelectorAll("body > div > table > tbody > tr:nth-child(n) > td.titleItem"));

  //& VOLTANDO IMG
  comida.src = "./images/lunch-bag.png"
}

//! REMOVE FUNCTION
ul.onclick = function (event) {
  if (event.target.classList.contains("delete")) {

    event.target.parentElement.classList.add("animate__animated", "animate__fadeOut");
    setTimeout(() => {
      event.target.parentElement.remove();

      let teste = event.target.parentElement.textContent;
      teste = teste.replace("    ", '');
      teste = teste.replace("   ", '');
      teste = teste.replace("  ", '');
      teste = teste.replace(/(\r\n|\n|\r)/gm, "");
      teste = teste.replace("cancel", "");

      arrayItem = arrayItem.filter((e) => {
        return teste !== e.title + "x" + e.many
      });
      localStorage.setItem("itens", JSON.stringify(arrayItem));
    }, 750);
  }

  //TODO - IGUALANDO LARGURA CARDS
  let cardsIcons = document.querySelectorAll("body > div > table > tbody > tr:nth-child(n) > td.titleItem")
  cardsIcons.forEach((e, index) => {
    cardsIcons[index].style.width = "auto";
  })
  cardsIguais(document.querySelectorAll("body > div > table > tbody > tr:nth-child(n) > td.titleItem"));

  //& VOLTANDO IMG
  comida.src = "./images/lunch-bag.png"
}
//! REMOVE FUNCTION - FIM


//TODO - IGUALANDO LARGURA CARDS
// var localCards = document.querySelectorAll(".slick-slider .item-padrao");

var localCards = document.querySelectorAll("body > div > table > tbody > tr:nth-child(n) > td.titleItem");
function cardsIguais(localCards) {
  let cardsIcons = localCards;
  let alturaCards = 0;
  cardsIcons.forEach((e, index) => {
    if (cardsIcons[index].offsetWidth > alturaCards) {
      alturaCards = cardsIcons[index].offsetWidth;
    };
    // console.log(alturaCards);
  });
  cardsIcons.forEach((e, index) => {
    cardsIcons[index].style.width = alturaCards + 2 + "px";
  })
}

// Executando Função ao Atualizar
cardsIguais(localCards);

// Redimensionando 
window.onresize = function () {
  let cardsIcons = localCards;
  cardsIcons.forEach((e, index) => {
    cardsIcons[index].style.width = "auto";
  })

  // Executando Função ao Redimensionar
  cardsIguais(localCards);
}
