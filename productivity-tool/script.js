// Productivity Tool JS
// To-Do List logic

const todoInput = document.getElementById('todo-input');
const todoAddBtn = document.getElementById('todo-add-btn');
const todoList = document.getElementById('todo-list');
const todoScore = document.getElementById('todo-score');

let todos = [];
let score = 0;

// Load from localStorage
function loadTodos() {
  const saved = JSON.parse(localStorage.getItem('todos-v1')) || [];
  const savedScore = Number(localStorage.getItem('todo-score-v1')) || 0;
  todos = saved;
  score = savedScore;
  renderTodos();
  updateScore();
}

function saveTodos() {
  localStorage.setItem('todos-v1', JSON.stringify(todos));
  localStorage.setItem('todo-score-v1', score);
}

function updateScore() {
  todoScore.textContent = `(Score: ${score})`;
}

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, idx) => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';

    const completeBtn = document.createElement('button');
    completeBtn.textContent = '✔';
    completeBtn.className = 'todo-complete-btn';
    completeBtn.title = todo.completed ? 'Mark as not completed' : 'Mark as completed';
    completeBtn.onclick = () => toggleComplete(idx);

    const span = document.createElement('span');
    span.textContent = todo.text;
    span.style.cursor = 'pointer';
    span.onclick = () => toggleComplete(idx);

    const delBtn = document.createElement('button');
    delBtn.textContent = '🗑';
    delBtn.className = 'todo-delete-btn';
    delBtn.onclick = () => deleteTodo(idx);

    li.appendChild(completeBtn);
    li.appendChild(span);
    li.appendChild(delBtn);
    todoList.appendChild(li);
  });
}

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;
  todos.push({ text, completed: false });
  todoInput.value = '';
  saveTodos();
  renderTodos();
}

todoAddBtn.onclick = addTodo;
todoInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addTodo();
});

function toggleComplete(idx) {
  if (!todos[idx].completed) {
    todos[idx].completed = true;
    score += 10; // 10 points per completed task
  } else {
    todos[idx].completed = false;
    score -= 10;
  }
  saveTodos();
  renderTodos();
  updateScore();
}

function deleteTodo(idx) {
  if (todos[idx].completed) {
    score -= 10;
    updateScore();
    // Remove from progress chart for today
    const today = getToday();
    if (progressData[today] && progressData[today].tasks > 0) {
      progressData[today].tasks--;
      saveProgress();
      renderProgressChart();
    }
  }
  todos.splice(idx, 1);
  // If no tasks left, reset score to zero
  if (todos.length === 0) {
    score = 0;
    updateScore();
    saveTodos();
  } else {
    saveTodos();
  }
  renderTodos();
}

// Pomodoro Timer logic
const pomodoroTimer = document.getElementById('pomodoro-timer');
const pomodoroStart = document.getElementById('pomodoro-start');
const pomodoroPause = document.getElementById('pomodoro-pause');
const pomodoroReset = document.getElementById('pomodoro-reset');
const pomodoroSessionLabel = document.getElementById('pomodoro-session-label');
const pomodoroCount = document.getElementById('pomodoro-count');
const pomodoroTestMode = document.getElementById('pomodoro-testmode');

const WORK_DURATION = 25 * 60; // 25 minutes
const BREAK_DURATION = 5 * 60; // 5 minutes
const TEST_WORK_DURATION = 10; // 10 seconds
const TEST_BREAK_DURATION = 10; // 10 seconds

let testMode = false;

let pomodoroInterval = null;
let pomodoroIsRunning = false;
let pomodoroIsWork = true;
let pomodorosCompleted = 0;

function loadPomodoro() {
  const saved = JSON.parse(localStorage.getItem('pomodoro-v1')) || {};
  pomodoroIsRunning = false;
  pomodoroIsWork = saved.isWork ?? true;
  pomodorosCompleted = saved.completed ?? 0;
  // Always use correct duration for current session
  pomodoroTime = pomodoroIsWork ? getWorkDuration() : getBreakDuration();
  updatePomodoroUI();
}

function savePomodoro() {
  localStorage.setItem('pomodoro-v1', JSON.stringify({
    time: pomodoroTime,
    isWork: pomodoroIsWork,
    completed: pomodorosCompleted
  }));
}

function updatePomodoroUI() {
  const min = String(Math.floor(pomodoroTime / 60)).padStart(2, '0');
  const sec = String(pomodoroTime % 60).padStart(2, '0');
  pomodoroTimer.textContent = `${min}:${sec}`;
  pomodoroSessionLabel.textContent = pomodoroIsWork ? 'Work' : 'Break';
  pomodoroCount.textContent = pomodorosCompleted;
}

function pomodoroTick() {
  if (pomodoroTime > 0) {
    pomodoroTime--;
    updatePomodoroUI();
    savePomodoro();
  } else {
    clearInterval(pomodoroInterval);
    pomodoroIsRunning = false;
    playBeep(); // Play sound when timer is up
    // Session complete: switch work/break
    if (pomodoroIsWork) {
      pomodorosCompleted++;
      score += 15; // 15 points per Pomodoro
      updateScore();
      saveTodos(); // Save score
      pomodoroIsWork = false;
      pomodoroTime = getBreakDuration();
    } else {
      pomodoroIsWork = true;
      pomodoroTime = getWorkDuration();
    }
    updatePomodoroUI();
    savePomodoro();
    // Optionally: show a notification or animation here
  }
}

function startPomodoro() {
  if (!pomodoroIsRunning) {
    pomodoroIsRunning = true;
    pomodoroInterval = setInterval(pomodoroTick, 1000);
  }
}

function pausePomodoro() {
  if (pomodoroIsRunning) {
    clearInterval(pomodoroInterval);
    pomodoroIsRunning = false;
  }
}

function resetPomodoro() {
  clearInterval(pomodoroInterval);
  pomodoroIsRunning = false;
  pomodoroIsWork = true;
  pomodoroTime = getWorkDuration();
  // Reset today's pomodoros in progress chart
  const today = getToday();
  if (progressData[today]) {
    progressData[today].pomodoros = 0;
    saveProgress();
    renderProgressChart();
  }
  // Reset completed Pomodoros counter
  pomodorosCompleted = 0;
  updatePomodoroUI();
  savePomodoro();
}

pomodoroStart.onclick = startPomodoro;
pomodoroPause.onclick = pausePomodoro;
pomodoroReset.onclick = resetPomodoro;

pomodoroTestMode.addEventListener('change', () => {
  testMode = pomodoroTestMode.checked;
  saveTestMode();
  // Reset timer to current session type with new duration
  pomodoroTime = pomodoroIsWork
    ? (testMode ? TEST_WORK_DURATION : WORK_DURATION)
    : (testMode ? TEST_BREAK_DURATION : BREAK_DURATION);
  updatePomodoroUI();
  savePomodoro();
});

// --- Progress Chart logic ---
const progressChartCanvas = document.getElementById('progress-chart');
let progressData = {};
let progressChart = null;

function getToday() {
  const d = new Date();
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

function loadProgress() {
  progressData = JSON.parse(localStorage.getItem('progress-v1')) || {};
}

function saveProgress() {
  localStorage.setItem('progress-v1', JSON.stringify(progressData));
}

function addProgress(type) {
  const today = getToday();
  if (!progressData[today]) progressData[today] = { tasks: 0, pomodoros: 0 };
  progressData[today][type]++;
  saveProgress();
  renderProgressChart();
}

function renderProgressChart() {
  const days = Object.keys(progressData).sort();
  const taskCounts = days.map(day => progressData[day].tasks);
  const pomoCounts = days.map(day => progressData[day].pomodoros);

  if (progressChart) progressChart.destroy();

  // Create gradients
  const ctx = progressChartCanvas.getContext('2d');
  const taskGradient = ctx.createLinearGradient(0, 0, 0, progressChartCanvas.height);
  taskGradient.addColorStop(0, '#4f8cff');
  taskGradient.addColorStop(1, '#a5b4fc');

  const pomoGradient = ctx.createLinearGradient(0, 0, 0, progressChartCanvas.height);
  pomoGradient.addColorStop(0, '#ffe066');
  pomoGradient.addColorStop(1, '#ffd700');

  progressChart = new Chart(progressChartCanvas, {
    type: 'bar',
    data: {
      labels: days,
      datasets: [
        {
          label: 'Tasks Completed',
          data: taskCounts,
          backgroundColor: taskGradient,
          borderRadius: 12,
          borderSkipped: false,
        },
        {
          label: 'Pomodoros Completed',
          data: pomoCounts,
          backgroundColor: pomoGradient,
          borderRadius: 12,
          borderSkipped: false,
        }
      ]
    },
    options: {
      responsive: true,
      animation: {
        duration: 900,
        easing: 'easeOutElastic',
      },
      plugins: {
        legend: { position: 'top' },
        title: { display: false },
        tooltip: {
          backgroundColor: '#222',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#4f8cff',
          borderWidth: 1,
        }
      },
      scales: {
        x: { stacked: false },
        y: { beginAtZero: true, stacked: false }
      }
    }
  });
}

// --- Hook into To-Do and Pomodoro completions ---
// Update addTodo, toggleComplete, and pomodoroTick to call addProgress

// Patch toggleComplete to add progress when marking complete
const origToggleComplete = toggleComplete;
toggleComplete = function(idx) {
  const wasCompleted = todos[idx].completed;
  origToggleComplete.call(this, idx);
  const today = getToday();
  if (!wasCompleted && todos[idx].completed) {
    addProgress('tasks');
  } else if (wasCompleted && !todos[idx].completed) {
    // Unmarking as complete: decrement progress
    if (progressData[today] && progressData[today].tasks > 0) {
      progressData[today].tasks--;
      saveProgress();
      renderProgressChart();
    }
  }
};

// Patch pomodoroTick to add progress when a Pomodoro is completed
const origPomodoroTick = pomodoroTick;
pomodoroTick = function() {
  const wasWork = pomodoroIsWork;
  origPomodoroTick.call(this);
  // If just finished a work session
  if (wasWork && !pomodoroIsWork) {
    addProgress('pomodoros');
  }
};

// Play a beep sound when timer is up
function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.value = 880;
    g.gain.value = 0.15;
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.25);
    o.onended = () => ctx.close();
  } catch (e) { /* ignore errors */ }
}

// Update timer logic to use durations based on testMode
function getWorkDuration() {
  return testMode ? TEST_WORK_DURATION : WORK_DURATION;
}
function getBreakDuration() {
  return testMode ? TEST_BREAK_DURATION : BREAK_DURATION;
}

// Initial load
loadTodos();
loadPomodoro();
updatePomodoroUI();
loadProgress();
renderProgressChart();
