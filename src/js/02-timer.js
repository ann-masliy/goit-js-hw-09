import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const timer = document.querySelector('.timer');
const input = document.querySelector('input#datetime-picker');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
      const selectedDay = selectedDates[0].getTime();
        if (selectedDay < options.defaultDate.getTime()) {
          Notiflix.Notify.failure('Please choose a date in the future'); 
        } else {
          startBtn.disabled = false;
          localStorage.setItem('selectedDate', `${selectedDates[0].getTime()}`);
          return selectedDate = selectedDates[0];
        }
    },
};

flatpickr(input, options);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
} 

let timerId = null;

const countdown = () => {
  startBtn.disabled = true;
  timerId = setInterval(() => {
    startBtn.disabled = true;
    const timeLeft = localStorage.getItem('selectedDate') - new Date().getTime();
    const timeLeftConvertMs = convertMs(timeLeft);
    if (timeLeftConvertMs.seconds >= 0) {
      days.textContent = addLeadingZero(timeLeftConvertMs.days);
      hours.textContent = addLeadingZero(timeLeftConvertMs.hours);
      minutes.textContent = addLeadingZero(timeLeftConvertMs.minutes);
      seconds.textContent = addLeadingZero(timeLeftConvertMs.seconds);

    } else {
      clearInterval(timer);
    }
  }, 1000);
};

startBtn.addEventListener('click', countdown);


input.style.width = '170px';
input.style.fontSize = '18px';
input.style.padding = '10px';
input.style.borderRadius = '5px';

startBtn.style.width = '80px';
startBtn.style.fontSize = '18px';
startBtn.style.padding = '5px';
startBtn.style.marginLeft= '10px';
startBtn.style.borderRadius = '5px';

timer.style.display = 'flex';
timer.style.marginTop = '20px';

const timerFields = Array.from(document.querySelectorAll('div.field'));

for (const timerField of timerFields) {
  timerField.style.display = 'flex';
  timerField.style.flexDirection = 'column';
  timerField.style.textAlign = 'center';
  timerField.style.paddingRight = '20px';
}

const values = Array.from(document.querySelectorAll('span.value'));

for (const value of values) {
  value.style.fontSize = '32px';
  value.style.lineHeight = '1.6';
  value.style.display = 'block';
  value.style.fontFamily = 'Ubuntu';
}

const labels = Array.from(document.querySelectorAll('.label'));

for (const label of labels) {
  label.style.display = 'block';
  label.style.textAlign = 'center';
  label.style.fontSize = '20px';
  label.style.fontFamily = 'Ubuntu';
}


