const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let changeColor = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    stopBtn.disabled = false;
  
    changeColor = setInterval(() => {
      const color = getRandomHexColor();
      body.style.background = color;
    }, 1000);
  });
  
stopBtn.addEventListener('click', () => {
    stopBtn.disabled = true;
    startBtn.disabled = false;
    clearInterval(changeColor);
  });
