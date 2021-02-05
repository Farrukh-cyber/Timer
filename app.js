const form = document.querySelector('.form');
// grab the .time-input
const timeInput = document.querySelector('.time-input');
// grab the select[name='format']
const format = document.querySelector("select[name='format']");
// grab the .set-btn
const setBtn = document.querySelector('.set-btn');
// grab the .countdown
const countDown = document.querySelector('.countdown');
// grab the .stop-btn 
const stopBtn = document.querySelector('.stop-btn');
// grab the .reset-btn
const resetBtn = document.querySelector('.reset-btn');
/* grab necessary elements ends */ 


/* global variables and constants*/
// variable to store setInterval
let countDownInterval;

// secondsLeft in millisecond
let secondsLeftms;
// end time
let endTime;
// .stop-btn clicked or not
let stopBtnClicked = false;
/* global variables ends */


/* .stop-btn click listener */
stopBtn.addEventListener('click', () => {
  // toggle the value of 'stopBtnClicked'
  stopBtnClicked = !stopBtnClicked;

  // if STOP button is clicked
  if (stopBtnClicked === true) {
    // change the text to 'PLAY'
    stopBtn.innerHTML = 'PLAY';
    // enable the .reset-btn
    resetBtn.disabled = false;
    // clear the setInterval() inorder to freeze the countdown timer
    clearInterval(countDownInterval);
  } else if (stopBtnClicked === false) {
    // if PLAY button is clicked
    // then change text to 'STOP'
    stopBtn.innerHTML = 'STOP';
    // disable the .reset-btn
    resetBtn.disabled = true;
    // then update endTime
    endTime = secondsLeftms + Date.now();
    // set a new setInterval()
    countDownInterval = setInterval(() => {
      setCountDown(endTime);
    }, 1000);
  }
});
/* .stop-btn click listener ends */


/* .reset-btn click listener */
resetBtn.addEventListener('click', () => {
  resetCountDown();
});
/* .reset-btn click listener ends */


/* .form submit listener */
form.addEventListener('submit', (event) => {
  // prevent the default page reloading
  event.preventDefault();

  // get the countdown time user typed
  let countDownTime = timeInput.value;

  // check if it is not zero
  if (countDownTime > 0) {
    // check which is the format, ie the <select> element's value
    if (format.value === 'hours') {
      // convert hours to milliseconds
      // 1 hrs = 3600000 ms (5 zeros)
      countDownTime = countDownTime * 3600000;
    } else if (format.value === 'minutes') {
      // 1 minute = 60000 ms (4 zeros)
      countDownTime = countDownTime * 60000;
    } else if (format.value === 'seconds') {
      // 1 seconds = 1000 ms (3 zeros)
      countDownTime = countDownTime * 1000;
    }

    // get current time in milliseconds
    const now = Date.now();
    // calculate the ending time
    endTime = now + countDownTime;

    // activate the countdown at first
    setCountDown(endTime);

    countDownInterval = setInterval(() => {
      setCountDown(endTime);
    }, 1000);

    // then disable the .set-btn
    setBtn.disabled = true;
    // then enable the .stop-btn
    stopBtn.disabled = false;
  }

});
/* .form submit listener ends */


/* setCountDown function */
const setCountDown = (endTime) => {
  // calculate how many milliseconds is left to reach endTime from now
  secondsLeftms = endTime - Date.now();
  // convert it to seconds
  const secondsLeft = Math.round(secondsLeftms / 1000);

  // calculate the hours, minutes and seconds
  let hours = Math.floor(secondsLeft / 3600);
  let minutes = Math.floor(secondsLeft / 60) - (hours * 60);
  let seconds = secondsLeft % 60;

  // adding an extra zero infront of digits if it is < 10
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  // stopping the timer if the time is up 
  if (secondsLeft < 0) {
    resetCountDown();
    return;
  }

  // set the .countdown text
  countDown.innerHTML = `${hours} : ${minutes} : ${seconds}`;

};
/* setCountDown function ends */


/* resetCountDown function */
const resetCountDown = () => {
  // destroy the setInterval()
  clearInterval(countDownInterval);
  // reset the countdown text
  countDown.innerHTML = '00 : 00 : 00';
  // set stopBtnClicked = false
  stopBtnClicked = false;
  // change inner text to STOP
  stopBtn.innerHTML = 'STOP';

  // enable .set-btn
  setBtn.disabled = false;

  // disable .stop-btn and .reset-btn
  stopBtn.disabled = true;
  resetBtn.disabled = true;
};