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



