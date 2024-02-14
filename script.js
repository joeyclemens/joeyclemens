let timer;
let minutes = 25;
let seconds = 0;
let isPaused = true;
let currentCycle = 0;

function startTimer() {
    if (isPaused) {
        isPaused = false;
        timer = setInterval(updateTimer, 1000);
        
        // Check if it's not a mobile view before hiding the navigation bar
        if (window.innerWidth > 768) {
            document.getElementById('banner-txt').style.display = 'none';
        }
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
    currentCycle = 0; // Reset cycle count
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
        document.getElementById('timerSound').play();
        alert("Time's up!");
        // Check if it's time to change the duration
        if (currentCycle < 4) {
            if (minutes === 0 && seconds === 0) {
                if (currentCycle === 3) {
                    setTimer(20, 0); // Change to 20 minutes after the 4th cycle
                } else {
                    setTimer(5, 0); // Change to 5 minutes for the next cycle
                }
                currentCycle++;
            }
        } else {
            setTimer(25, 0); // Reset to 25 minutes after the 4th cycle
            currentCycle = 0; // Reset cycle count
        }
    }
    displayTime();
}

function displayTime() {
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');
    document.getElementById('time').textContent = `${minutesStr}:${secondsStr}`;
}

function setTimer(newMinutes, newSeconds) {
    minutes = newMinutes;
    seconds = newSeconds;
    displayTime();
}

function displayTask() {
    const taskInput = document.getElementById('taskInput').value;
    document.getElementById('task').textContent = `Task: ${taskInput}`;
    document.getElementById('taskInputWrapper').style.display = 'none'; // Hide input box when task is set
}
