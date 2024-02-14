let timer;
let minutes = 25;
let seconds = 0;
let isPaused = true;

function startTimer() {
    if (isPaused) {
        isPaused = false;
        timer = setInterval(updateTimer, 1000);
        // Hide the navigation bar when the timer starts
        document.getElementById('banner-txt').style.display = 'none';
    }
}

function pauseTimer() {
    isPaused = true;
    clearInterval(timer);
}

function resetTimer() {
    isPaused = true;
    clearInterval(timer);
    minutes = 25;
    seconds = 0;
    displayTime();
    // Show the input box on reset
    document.getElementById('taskInputWrapper').style.display = 'block';
    // Show the navigation bar on reset
    document.getElementById('banner-txt').style.display = 'block';
}

function updateTimer() {
    if (seconds > 0) {
        seconds--;
    } else if (minutes > 0) {
        seconds = 59;
        minutes--;
    } else {
        clearInterval(timer);
        document.getElementById('timerSound').play(); // Play the audio when the timer ends
        alert("Time's up!");
    }
    displayTime();
}


function displayTime() {
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');
    document.getElementById('time').textContent = `${minutesStr}:${secondsStr}`;
}

function displayTask() {
    const taskInput = document.getElementById('taskInput').value;
    document.getElementById('task').textContent = `Task: ${taskInput}`;
    document.getElementById('taskInputWrapper').style.display = 'none'; // Hide input box when task is set
}
