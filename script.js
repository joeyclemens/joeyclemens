let timer;
let seconds = 1500; // 25 minutes in seconds
let isPaused = true;
let currentCycle = 0;

function startTimer() {
    isPaused = false;
    clearInterval(timer); // Clear any existing interval
    timer = setInterval(updateTimer, 1000); // Start the timer immediately
    // Check if it's not a mobile view before hiding the navigation bar
    if (window.innerWidth > 768) {
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
    currentCycle = 0; // Reset cycle count
    resetBreakTime(); // Reset break time display
    seconds = 1500; // Reset to 25-minute timer
    displayTime();
    
    // Show the input box on reset
    document.getElementById('taskInputWrapper').style.display = 'block';
    
    // Show the navigation bar on reset
    document.getElementById('banner-txt').style.display = 'block';
}

function updateTimer() {
    if (seconds > 0) {
        seconds--;
    } else {
        clearInterval(timer);
        document.getElementById('timerSound').play();
        if (currentCycle === 0) {
            setTimer(300); // Start with 5 minutes (300 seconds) after the first 25-minute cycle
            alert("Break time!");
            displayBreakTime();
        } else if (currentCycle === 6) { // Change to 20 minutes (1200 seconds) on the seventh cycle
            setTimer(1200);
            alert("Break time!");
            displayBreakTime();
        } else if (currentCycle % 2 === 0 && currentCycle !== 0 && currentCycle !== 6) { 
            setTimer(300); // Change to 5 minutes (300 seconds) after every even cycle, excluding the 7th cycle
            alert("Break time!");
            displayBreakTime();
        } else {
            setTimer(1500); // Continue with 25-minute timer
            resetBreakTime(); // Hide "Break Time" text during 25-second timer
            alert("Time's up!");
        }
        currentCycle++;
        startTimer(); // Start the timer again
    }
    displayTime();
}

function displayTime() {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const displaySeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    document.getElementById('time').textContent = `${minutes}:${displaySeconds}`;
}

function setTimer(newSeconds) {
    seconds = newSeconds;
    displayTime();
}

function displayTask() {
    const taskInput = document.getElementById('taskInput').value;
    document.getElementById('task').textContent = `Task: ${taskInput}`;
    document.getElementById('taskInputWrapper').style.display = 'none'; // Hide input box when task is set
}
