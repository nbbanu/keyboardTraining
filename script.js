const wordBox = document.querySelector(".word-box");
const timerBox = document.querySelector(".time");
const wordInput = document.querySelector(".word-input");
const scoreBox = document.querySelector(".score");
const popup = document.querySelector(".popup");
const result = document.querySelector(".result");

let randomWordArr = [];
let sec = 60;
let score = 0;

document.addEventListener("DOMContentLoaded", getRandomWord);

async function getRandomWord() {
  const response = await fetch(
    "https://random-word-api.herokuapp.com/word?number=100"
  );
  const data = await response.json();
  randomWordArr = data;
  generateRandomWord();
}

function generateRandomWord() {
  let randomWordIndex = Math.floor(Math.random() * randomWordArr.length);
  let randomWord = randomWordArr[randomWordIndex];
  addRandomWordToUI(randomWord);
}

function addRandomWordToUI(word) {
  wordBox.innerHTML = `
    <p class="word-text">${word}</p>
    `;
}

function startTimer() {
  let timer = setInterval(() => {
    timerBox.innerHTML = "00:" + sec;
    sec--;
    if (sec < 0) {
      clearInterval(timer);
      openPopup();
    }
  }, 1000);
}

function getWritingWord() {
  if (wordInput.value !== "") {
    let value = wordInput.value.toLowerCase();
    if (wordBox.innerText.startsWith(value)) {
      if (wordBox.innerText == value) {
        wordInput.value = "";
        score++;
        scoreBox.innerHTML = score;
        generateRandomWord();
      }
      wordInput.style.borderColor = "#838b83";
    } else {
      wordInput.style.borderColor = "red";
    }
  }
}

function openPopup(){
    popup.classList.add("open-popup");
    result.innerHTML = scoreBox.innerHTML;
}
function closePopup(){
    popup.classList.remove("open-popup");
    scoreBox.innerHTML = 0; 
}

