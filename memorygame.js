const gameContainer = document.getElementById("game");
let noClick = false;
let cardOne = null;
let cardTwo = null;
let cardFlipped = 0;

const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
];


function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

let shuffledColors = shuffle(COLORS);
function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        const newDiv = document.createElement("div");
        newDiv.classList.add(color);
        newDiv.addEventListener("click", handleCardClick);
        gameContainer.append(newDiv);
    }
}
function handleCardClick(event) {
    if (noClick) return;
    if (event.target.classList.contains('flipped')) return;

    let cardColor = event.target;
    cardColor.style.backgroundColor = cardColor.classList[0];
    

    if (!cardOne || !cardTwo) {
        cardColor.classList.add("flipped");
        cardOne = cardOne || cardColor;
        cardTwo = cardColor === cardOne ? null : cardColor;
    }

    if (cardOne && cardTwo) {
        noClick = true;
        let numOne = cardOne.className;
        let numTwo = cardTwo.className;
    
        if (numOne === numTwo) {
            cardFlipped += 2;
            cardOne.removeEventListener("click", handleCardClick);
            cardTwo.removeEventListener("click", handleCardClick);
            cardOne = null;
            cardTwo = null;
            noClick = false;
        } else {
            setTimeout(function () {
                cardOne.style.backgroundColor = "";
                cardTwo.style.backgroundColor = "";
                cardOne.classList.remove("flipped");
                cardTwo.classList.remove("flipped");
                cardOne = null;
                cardTwo = null;
                noClick = false;
            }, 1000);
        }
    }
if (cardFlipped === COLORS.length) alert("Game Over!");
}
createDivsForColors(shuffledColors);