let seconds = 0;
let mins = 0;
let hours = 0;
let milliseconds = 0;
let getSeconds = document.querySelector('.seconds');
let getMins = document.querySelector('.mins');
let getHours = document.querySelector('.hours');    
let getMilliseconds = document.querySelector('.milliseconds');
let btnStart = document.querySelector('.btn-start');
let btnStop = document.querySelector('.btn-stop');
let btnReset = document.querySelector('.btn-reset');
let btnLap = document.querySelector('.btn-lap');
let lapsContainer = document.querySelector('.laps');
let btnStartOnly = document.querySelector('.btn-start-only');
let interval;
let run = false;

// Get video element
let backgroundVideo = document.getElementById('background-video');

// Load laps from localStorage if available
let lapsData = JSON.parse(localStorage.getItem('lapsData')) || [];
let lapcount = lapsData.length + 1; // Set lapcount based on the number of laps in localStorage

// Load timer values from localStorage if available
const storedTime = JSON.parse(localStorage.getItem('timerData'));
if (storedTime) {
    hours = storedTime.hours;
    mins = storedTime.mins;
    seconds = storedTime.seconds;
    milliseconds = storedTime.milliseconds;
    updateDisplay(); // Update display with loaded values
}

// Show the wrapper with animation when the start button is pressed
btnStartOnly.addEventListener('click', () => {
    const wrapper = document.querySelector('.wrapper');
    wrapper.classList.add('visible'); // Add visible class to show the wrapper
    btnStartOnly.style.display = 'none'; // Hide the start button after clicking
});

// Function to display laps from localStorage on page load
function displayLapsFromStorage() {
    lapsContainer.innerHTML = ''; // Clear existing laps in UI
    lapsData.forEach((lap, index) => {
        const lapElement = document.createElement('p');
        lapElement.innerText = `Lap ${index + 1} : ${lap}`;
        lapsContainer.appendChild(lapElement);
    });
}

// Call this function on page load to display stored laps
displayLapsFromStorage();

// Start button functionality
btnStart.addEventListener('click', () => {
    clearInterval(interval);
    document.querySelector('.cloak').classList.add('running'); // Add running class
    backgroundVideo.play(); // Start playing the video
    interval = setInterval(startTimer, 10);
    run = true;
});

// Stop button functionality
btnStop.addEventListener('click', () => {
    clearInterval(interval);
    document.querySelector('.cloak').classList.remove('running'); // Remove running class
    backgroundVideo.pause(); // Pause the video
    run = false;

    // Store the current timer values in localStorage
    localStorage.setItem('timerData', JSON.stringify({ hours, mins, seconds, milliseconds }));
});

// Reset button functionality
btnReset.addEventListener('click', () => {
    clearInterval(interval);
    lapsContainer.innerHTML = '';
    document.querySelector('.cloak').classList.remove('running');
    backgroundVideo.pause(); 
    run = false;
    resetTimer(); // Reset the timer and clear laps

    // Clear laps data and timer from UI and localStorage
    lapsData = [];
    localStorage.removeItem('lapsData');
    localStorage.removeItem('timerData');
    lapcount = 1; // Reset lap counter to start from 1
});

// Lap button functionality
btnLap.addEventListener('click', () => {
    recordLap();
});

// Keydown event listeners for button functionalities
document.addEventListener('keydown', (event) => {
    // Start/Stop functionality with Enter key
    if (event.code === 'Enter') {
        event.preventDefault(); // Prevent default behavior (like submitting forms)

        if (btnStartOnly.style.display !== 'none') {
            btnStartOnly.click(); // Reveal the stopwatch if initial Start is not clicked yet
        } else {
            // Toggle start/stop
            if (run) {
                btnStop.focus();
                btnStop.click(); // Stop the timer if running
            } else {
                btnStart.focus();
                btnStart.click(); // Start the timer if stopped
            }
        }
    }

    // Record a lap with Space key
    if (event.code === 'Space') {
        event.preventDefault(); // Prevent default scrolling
        btnLap.focus();
        btnLap.click(); // Trigger lap button
    }

    // Reset the timer with Tab key
    if (event.code === 'Tab') {
        event.preventDefault(); // Prevent default tabbing behavior
        btnReset.focus();
        btnReset.click(); // Trigger reset button
    }
});

// Timer function
function startTimer() {
    milliseconds += 10; // Increase milliseconds by 10
    if (milliseconds >= 1000) { 
        seconds++; 
        milliseconds = 0;
    }
    if (seconds >= 60) { 
        mins++; 
        seconds = 0; 
    }
    if (mins >= 60) { 
        hours++; 
        mins = 0; 
    }
    updateDisplay(); // Update the timer display
}

// Function to update the display with current timer values
function updateDisplay() {
    getMilliseconds.innerHTML = ('0' + Math.floor(milliseconds / 10)).slice(-2); // Format milliseconds
    getSeconds.innerHTML = ('0' + seconds).slice(-2); // Format seconds
    getMins.innerHTML = ('0' + mins).slice(-2); // Format minutes

    // If hours are greater than 0, display it
    if (hours > 0) {
        getHours.style.display = 'inline'; // Show the hours span
        getHours.innerHTML = ('0' + hours).slice(-2) + ':'; // Format hours
    } else {
        getHours.style.display = 'none'; // Hide hours if 0
    }
}

// Reset timer function
function resetTimer() {
    hours = 0;
    mins = 0;
    seconds = 0;
    milliseconds = 0;
    lapcount = 1;
    updateDisplay();
}

// Record lap function
function recordLap() {
    let lapTime;
    if (hours > 0) {
        lapTime = `${('0' + hours).slice(-2)}:${('0' + mins).slice(-2)}:${('0' + seconds).slice(-2)}:${('0' + Math.floor(milliseconds / 10)).slice(-2)}`;
    } else {
        lapTime = `${('0' + mins).slice(-2)}:${('0' + seconds).slice(-2)}:${('0' + Math.floor(milliseconds / 10)).slice(-2)}`;
    }

    // Store lap in the array and localStorage
    lapsData.push(lapTime);
    localStorage.setItem('lapsData', JSON.stringify(lapsData));

    // Display lap in UI
    const lapElement = document.createElement('p');
    lapElement.innerText = `Lap ${lapcount++} : ${lapTime}`;
    lapsContainer.appendChild(lapElement);
    lapsContainer.scrollTop = lapsContainer.scrollHeight;
}
