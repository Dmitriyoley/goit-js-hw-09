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
          return; 
        }
        btnEL.disabled = false;
        selectedDate = selectedDates[0];
    },
   
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
  daysEl.textContent = days < 10 ? `${days}` : days;
  hoursEl.textContent = hours < 10 ? `${hours}` : hours;
  minutesEl.textContent = minutes < 10 ? `${minutes}` : minutes;
  secondsEl.textContent = seconds < 10 ? `${seconds}` : seconds;
      

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
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