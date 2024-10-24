let milliseconds = 0;
let seconds = 0;
let mins = 0;
let hours = 0;

let getMilliseconds = document.querySelector('.milliseconds');
let getSeconds = document.querySelector('.seconds');
let getHours = document.querySelector('.hours');
let getMins = document.querySelector('.mins');
let btnStart = document.querySelector('.btn-start');
let btnStop = document.querySelector('.btn-stop');
let btnReset = document.querySelector('.btn-reset');
let btnLap = document.querySelector('.btn-lap');
let lapsContainer = document.querySelector('.laps');
let interval;
let clock = document.querySelector('.clock'); 

btnStart.addEventListener('click', () => {
    clearInterval(interval); // Clear previous interval
    interval = setInterval(startTimer, 10); // Start timer with milliseconds precision
    clock.classList.add('running'); // Light shadow when running
});

// Stop Button Event Listener
btnStop.addEventListener('click', () => {
    clearInterval(interval); // Stop the timer
    clock.classList.remove('running'); // Remove shadow when stopped
});

// Reset Button Event Listener
btnReset.addEventListener('click', () => {
    clearInterval(interval); // Stop the timer
    hours = 0; mins = 0; seconds = 0; milliseconds = 0; // Reset time
    updateDisplay(); // Update the display to 00:00:00:00
    lapsContainer.innerHTML = ''; // Clear all laps
    clock.classList.remove('running'); // Remove shadow when reset
});

// Lap Button Event Listener
btnLap.addEventListener('click', () => {
    let lapTime = `${getHours.innerHTML}:${getMins.innerHTML}:${getSeconds.innerHTML}:${getMilliseconds.innerHTML}`;
    let lapElement = document.createElement('p');
    lapElement.textContent = `🏁: ${lapTime}`;
    lapsContainer.appendChild(lapElement);
    lapsContainer.scrollTop = lapsContainer.scrollHeight;
});

// Timer Function
function startTimer() {
    milliseconds++;
    if (milliseconds > 99) {
        seconds++;
        milliseconds = 0;
    }
    if (seconds > 59) {
        mins++;
        seconds = 0;
    }
    if (mins > 59) {
        hours++;
        mins = 0;
        // Remove milliseconds when hours are present
        getMilliseconds.style.display = 'none';
    }
    updateDisplay(); // Update time on display
}

// Update the Display Function
function updateDisplay() {
    getMilliseconds.innerHTML = milliseconds < 10 ? '0' + milliseconds : milliseconds;
    getSeconds.innerHTML = seconds < 10 ? '0' + seconds : seconds;
    getMins.innerHTML = mins < 10 ? '0' + mins : mins;
    getHours.innerHTML = hours < 10 ? '0' + hours : hours;
}
