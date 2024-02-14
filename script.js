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
    window.location.reload(); // Reload the page to reset the timer
}



function updateTimer() {
    if (seconds > 0) {
        seconds--;
    } else {
        clearInterval(timer);
        document.getElementById('timerSound').play();
        
        switch (currentCycle) {
            case 0:
            case 2:
            case 4:
            case 6:
                setTimer(300); // 5-minute timer
                alert("Break time! Enjoy your 5-minute break.");
                break;
            case 1:
            case 3:
            case 5:
            case 7:
                setTimer(1500); // 25-minute timer
                alert("Focus time! 25 minutes to go.");
                break;
            case 8:
                setTimer(1200); // 20-minute timer
                alert("Last focus stretch! 20 minutes to go.");
                currentCycle = -1; // Reset cycle count after the 8th cycle
                break;
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
