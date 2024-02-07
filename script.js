
import {
  name,
  omen

} from "./siewcy.js";

const generateButton = document.getElementById("generate-button");
const nameDisplay = document.getElementById("name-display");
const categoryPicker = document.getElementById("kategoria");
const numberPicker = document.getElementById("liczba");
const formContainer = document.getElementById("form-container");
const selectColumn = document.getElementById("select-column");


const postac = function () {
  return {
    type: "pickerRoller",
    list: [createCharacter()],
  };
};

function createCharacter() {

  let dice = ['k4', 'k6', 'k8']
  let wlosy = ['blond', 'czarne', 'rude', 'łuski', 'pióra', 'sierść'];
  let oczy = ['brązowe', 'niebieskie', 'zielone', 'czerwone', 'fioletowe', 'żółte'];
  let znaki = ['makijaż', 'skaryfikacje', 'tatuaże', 'kły', 'kopyta', 'rogi'];
  let docenia = ['spryt', 'odwagę', 'siłę', 'desperację', 'chciwość', 'nienawiść'];
  let gardzi = ['głupotą', 'słabością', 'tchórzostwem', 'miłością', 'uległością', 'szczodrością'];
  let skora = ['ciemna', 'śniada', 'jasna', 'czerwona', 'niebieska', 'zielona'];
  let bronTyp = ['miecz', 'topór', 'młot', 'kiścień', 'buława', 'lanca', 'kosa', 'halabarda']
  let zbroja = ['kolcza, ogniwa przypominają splecione skorpiony', 'kolcza, ogniwa przypominają splecione węże', 'łuskowa, łuski przypominają gadzie', 'łuskowa, łuski przypominają rybie', 'płytowa, płyty przypominają pancerz żuka', 'płytowa, płyty przypominają pancerz nosorożca']
  let wierzchowiec = ['koń', 'wilk', 'gad']


// Koń – grzywa przypomina kłęby dymu, języki ognia czy coś innego?

// Wilk – kły i pazury wyglądają jak lód, żelazo czy coś jeszcze innego?

// Gad – łuski lśnią jak stalowe kolce, odłamki obsydianu czy coś innego?
// Kropierz zdobią kolce, czaszki czy coś jeszcze innego?
// Na plecach nosisz płaszcz, niedźwiedzią skórę czy coś jeszcze innego?

// Hełm ma rogi, pióropusz czy coś innego?
// Na tarczy jest smok, czaszka czy coś jeszcze innego? wąż


  function returnAndDeleteArrayElement(array){//////////////////////
    let randomIndex = Math.floor(Math.random() * array.length)

    let returnedElement = array[randomIndex]
    array.splice(randomIndex, 1)
    return returnedElement
  }
  

  const createdCharacter =
  `${pickFromList(name)}\n
  Zastraszanie: ${returnAndDeleteArrayElement(dice)}
  Torturowanie: ${returnAndDeleteArrayElement(dice)}
  Unicestwienie: ${returnAndDeleteArrayElement(dice)}\n
  Broń: ${randomizeFromArray(bronTyp)}
  Zbroja: ${randomizeFromArray(zbroja)}
  Wierzchowiec: ${randomizeFromArray(wierzchowiec)}
  \n
  Cechy:
  Skóra: ${randomizeFromArray(skora)}
  Włosy: ${randomizeFromArray(wlosy)}
  Oczy: ${randomizeFromArray(oczy)}
  Znaki: ${randomizeFromArray(znaki)}
  Docenia: ${randomizeFromArray(docenia)}
  Gardzi: ${randomizeFromArray(gardzi)}
  `


  return createdCharacter;
}


categoryPicker.addEventListener("change", (e) => {
  removeAllChildren(nameDisplay);
});

function updatePick() {
  category = categoryPicker.value;
  numberGenerated = numberPicker.value;
}

let numberGenerated = 5;
let category = "postac";

function k(sides, exploding = false) {
  let result = Math.floor(Math.random() * sides) + 1;
  if (exploding === true) {
    if (result === sides) {
      result = result + k(sides, true);
    }
  }

  return result;
}

class Roll {
  constructor(result) {
    this.result = result;
  }
}






function removeAllChildren(element) {
  const counter = element.children.length;
  for (let m = 0; m <= counter; m++) {
    if (element.children[0]) {
      element.children[0].remove();
    }
  }
}

function randomizeFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function displayArray(ar, parent) {
  for (let j = 0; j < ar.length; j++) {
    const tableRow = document.createElement("tr");
    parent.appendChild(tableRow);

    const line = document.createElement("p");
    line.innerText = `${j + 1}. ${ar[j]}`;
    tableRow.appendChild(line);
  }
}

function pickFromList(pickedList) {
  if (pickedList.type === "mixerSpaced") {
    const nonTypeKeys = Object.keys(pickedList).filter((key) => {
      return key !== "type";
    });
    let combinedParts = "";
    for (let k = 0; k < nonTypeKeys.length; k++) {
      combinedParts += ` ${randomizeFromArray(pickedList[nonTypeKeys[k]])}`;
    }
    return combinedParts;
  } else if (pickedList.type === "mixerConcatenated") {
    const nonTypeKeys = Object.keys(pickedList).filter((key) => {
      return key !== "type";
    });
    let combinedParts = "";
    for (let k = 0; k < nonTypeKeys.length; k++) {
      combinedParts += randomizeFromArray(pickedList[nonTypeKeys[k]]);
    }
    return combinedParts;
  } else if (pickedList.type === "picker") {
    return randomizeFromArray(pickedList.list);
  } else if (pickedList().type === "pickerRoller") {
    // pickerRollers (e.g. random encounters, corpse loot) are functions, so that the numbers are rerolled each time
    return randomizeFromArray(pickedList().list);
  }
}

generateButton.addEventListener("click", () => {
  updatePick();
  const result = [];

  const pickedCategory = eval(category);
  removeAllChildren(nameDisplay);
  for (let i = 0; i < numberGenerated; i++) {
    result.push(pickFromList(pickedCategory));
  }
  displayArray(result, nameDisplay);
});

