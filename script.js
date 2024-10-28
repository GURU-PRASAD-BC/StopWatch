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
let lapcount=1;
let run=false;

// Get video element
let backgroundVideo = document.getElementById('background-video');

// Show the wrapper with animation when the start button is pressed
btnStartOnly.addEventListener('click', () => {
    const wrapper = document.querySelector('.wrapper');
    wrapper.classList.add('visible'); // Add visible class to show the wrapper
    btnStartOnly.style.display = 'none'; // Hide the start button after clicking
    // startTimer(); // Start the timer immediately
});

// Start button functionality
btnStart.addEventListener('click', () => {
    clearInterval(interval);
    document.querySelector('.cloak').classList.add('running'); // Add running class
    backgroundVideo.play(); // Start playing the video
    interval = setInterval(startTimer, 10);
    run=true;
});

// Stop button functionality
btnStop.addEventListener('click', () => {
    clearInterval(interval);
    document.querySelector('.cloak').classList.remove('running'); // Remove running class
    backgroundVideo.pause(); // Pause the video
    run=false;
});

// Reset button functionality
btnReset.addEventListener('click', () => {
    clearInterval(interval);
    lapsContainer.innerHTML = '';
    document.querySelector('.cloak').classList.remove('running');
    // backgroundVideo.currentTime = 0; // Reset video to start
    backgroundVideo.pause(); 
    run=false;
    resetTimer(); // Reset the timer and clear laps
});

// Lap button functionality
btnLap.addEventListener('click', () => {
    recordLap();
});

// Add keydown event listener
document.addEventListener('keydown', (event) => {
    // Start/Stop functionality with Enter key
    if (event.code === 'Enter') {
        event.preventDefault(); // Prevent default behavior (like submitting forms)

        if (btnStartOnly.style.display !== 'none') {
            btnStartOnly.click(); // Reveal the stopwatch if initial Start is not clicked yet
        } else {
            // Toggle start/stop
            if (run) {
                btnStop.click(); // Stop the timer if running
            } else {
                btnStart.click(); // Start the timer if stopped
            }
        }
    }

    // Record a lap with Space key
    if (event.code === 'Space') {
        event.preventDefault(); // Prevent default scrolling
        btnLap.click(); // Trigger lap button
    }

    // Reset the timer with Tab key
    if (event.code === 'Tab') {
        event.preventDefault(); // Prevent default tabbing behavior
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

    // Display time
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
    getSeconds.innerHTML = '00';
    getMins.innerHTML = '00';
    getMilliseconds.innerHTML = '00';
    getHours.style.display = 'none'; // Hide hours
}

// Record lap function
function recordLap() {
    let lapTime;
    if(hours>0) {lapTime = `${('0' + hours).slice(-2)}:${('0' + mins).slice(-2)}:${('0' + seconds).slice(-2)}:${('0' + Math.floor(milliseconds / 10)).slice(-2)}`;}
    else {lapTime = `${('0' + mins).slice(-2)}:${('0' + seconds).slice(-2)}:${('0' + Math.floor(milliseconds / 10)).slice(-2)}` ;}
    const lapElement = document.createElement('p');
    lapElement.innerText = `Lap ${lapcount++} : ${lapTime}`;
    lapsContainer.appendChild(lapElement);
    lapsContainer.scrollTop=lapsContainer.scrollHeight;
}
