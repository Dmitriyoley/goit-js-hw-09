import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
const btnEL = document.querySelector('button[data-start]');


let selectedDate = null;
btnEL.disabled = true;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates){
        if(selectedDates[0] < Date.now()){
            alert("Please choose a date in the future");
            btnEL.disabled = true;
          return; 
        }
        btnEL.disabled = false;
        selectedDate = selectedDates[0];
    },
   
};
  function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};
const daysEl = document.querySelector("[data-days]")
const hoursEl = document.querySelector("[data-hours]")
const minutesEl = document.querySelector("[data-minutes]")
const secondsEl = document.querySelector("[data-seconds]")


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
   if (!ms) return;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
      

  return { days, hours, minutes, seconds };
}

btnEL.addEventListener("click", start)
  function start(){
    const refreshIntervalId = setInterval(() => {
        if (selectedDate > Date.now()) {
          return convertMs(selectedDate - Date.now());
        }
        clearInterval(refreshIntervalId);
      }, 1000);
}
  
  flatpickr("input#datetime-picker", options);