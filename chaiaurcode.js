let randomNumber;
let minRange = 1;
let maxRange = 10;

const minSelect = document.getElementById('minSelect');
const maxSelect = document.getElementById('maxSelect');
const startBtn = document.getElementById('startGameBtn');
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');
const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;
let playGame = false;


function populateMinSelect() {
  minSelect.innerHTML = '';
  for (let i = 0; i <= parseInt(Math.random()*100+100); i+=5) {
    minSelect.innerHTML += `<option value="${i}">${i}</option>`;
  }
}


function populateMaxSelect(minVal) {
  maxSelect.innerHTML = '';
  for (let i = 1; i <= parseInt(Math.random()*1000+1000); i+=10) {
    maxSelect.innerHTML += `<option value="${i}">${i}</option>`;
  }
}


populateMinSelect();
populateMaxSelect(1);


minSelect.addEventListener('change', () => {
  const minVal = minSelect.value;
  populateMaxSelect(minVal);
});


maxSelect.addEventListener('change', () => {
  const maxVal = maxSelect.value;
  minSelect.innerHTML = '';
  for (let i = 1; i < parseInt(maxVal); i++) {
    minSelect.innerHTML += `<option value="${i}">${i}</option>`;
  }
});


startBtn.addEventListener('click', () => {
  minRange = parseInt(minSelect.value);
  maxRange = parseInt(maxSelect.value);

  if (minRange >= maxRange) {
    alert('Minimum must be less than Maximum!');
    return;
  }

  randomNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
  console.log(`Random number: ${randomNumber}`);

  userInput.disabled = false;
  submit.disabled = false;
  prevGuess = [];
  numGuess = 1;
  guessSlot.innerHTML = '';
  remaining.innerHTML = '10';
  lowOrHi.innerHTML = '';
  playGame = true;
});


submit.addEventListener('click', function (e) {
  e.preventDefault();
  if (!playGame) return;

  const guess = parseInt(userInput.value);
  validateGuess(guess);
});

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('Please enter a valid number');
  } else if (guess < minRange || guess > maxRange) {
    alert(`Enter number between ${minRange} and ${maxRange}`);
  } else {
    prevGuess.push(guess);
    if (numGuess === 11) {
      displayGuess(guess);
      displayMessage(`Game Over. Number was ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage(`🎉 You guessed it right!`);
    endGame();
  } else if (guess < randomNumber) {
    displayMessage(`📉 Too low!`);
  } else {
    displayMessage(`📈 Too high!`);
  }
}

function displayGuess(guess) {
  userInput.value = '';
  guessSlot.innerHTML += `${guess}, `;
  numGuess++;
  remaining.innerHTML = `${11 - numGuess}`;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
  userInput.value = '';
  userInput.setAttribute('disabled', '');
  submit.setAttribute('disabled', '');
  p.classList.add('button');
  p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function () {
    startOver.removeChild(p);
    userInput.value = '';
    lowOrHi.innerHTML = '';
    userInput.setAttribute('disabled', '');
    submit.setAttribute('disabled', '');
    prevGuess = [];
    numGuess = 1;
    playGame = false;
  });
}
