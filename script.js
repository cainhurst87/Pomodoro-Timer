document.addEventListener("DOMContentLoaded", function() {

    // Constants
    let pomodoroDuration = 25 * 60;
    let shortBreakDuration = 5 * 60;
    let longBreakDuration = 15 * 60;
    let currentTime = pomodoroDuration;
    let isRunning = false;
    let isPaused = false;
    let timerInterval;

    // Get the elements from the DOM 
    const timeDisplay = document.getElementById("time-display");
    const pomodoroBtn = document.getElementById("pomodoro-btn");
    const shortBreakBtn = document.getElementById("short-break-btn");
    const longBreakBtn = document.getElementById("long-break-btn");
    const restartBtn = document.getElementById("restart-btn");
    const playBtn = document.getElementById("play-btn");
    const pauseBtn = document.getElementById("pause-btn");
    const stopBtn = document.getElementById("stop-btn");
    const saveCustomizationBtn = document.getElementById("save-customization-btn");
    const customizeModal = document.getElementById("customizeModal");

    // Start the timers configurable by the user as the default values
    let userPomodoroDuration = pomodoroDuration;
    let userShortBreakDuration = shortBreakDuration;
    let userLongBreakDuration = longBreakDuration;
    let currentMode = 'pomodoro'; // Track the current mode

    // Initialize the timer display and update every second
    function updateTimeDisplay(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timeDisplay.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    // Start the timer, decrease it every second and alert when it ends 
    function startTimer() {
        if (isRunning) return;
        isRunning = true;
        timerInterval = setInterval(function() {
            if (currentTime > 0) {
                currentTime--;
                updateTimeDisplay(currentTime);
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                alert("Time's up!");
                resetTimer();
            }
        }, 1000);

        playBtn.classList.add("active");
        pauseBtn.classList.remove("active");
        stopBtn.classList.remove("active");
        pomodoroBtn.disabled = true;
        shortBreakBtn.disabled = true;
        longBreakBtn.disabled = true;
    }

    // Pause the timer
    function pauseTimer() {
        if (!isRunning) return;
        clearInterval(timerInterval);
        isRunning = false;
        isPaused = true;

        playBtn.classList.remove("active");
        pauseBtn.classList.add("active");
    }

    // Stop the timer and reset it to the value given by the user
    function stopTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        isPaused = false;
        if (currentMode === 'pomodoro') {
            currentTime = userPomodoroDuration;
        } else if (currentMode === 'shortBreak') {
            currentTime = userShortBreakDuration;
        } else if (currentMode === 'longBreak') {
            currentTime = userLongBreakDuration;
        }
        updateTimeDisplay(currentTime);

        pomodoroBtn.disabled = false;
        shortBreakBtn.disabled = false;
        longBreakBtn.disabled = false;
        playBtn.classList.remove("active");
        pauseBtn.classList.remove("active");
        stopBtn.classList.remove("active");
    }

    // Reset the timer to the value given by the user
    function resetTimer(){
        if (currentMode === 'pomodoro') {
            currentTime = userPomodoroDuration;
        } else if (currentMode === 'shortBreak') {
            currentTime = userShortBreakDuration;
        } else if (currentMode === 'longBreak') {
            currentTime = userLongBreakDuration;
        }
        updateTimeDisplay(currentTime);

        pomodoroBtn.disabled = false;
        shortBreakBtn.disabled = false;
        longBreakBtn.disabled = false;
        playBtn.classList.remove("active");
        pauseBtn.classList.remove("active");
        stopBtn.classList.remove("active");
    }

    // Setup timer to pomodoro mode
    function handlePomodoroClick() {
        currentMode = 'pomodoro';
        currentTime = userPomodoroDuration;
        updateTimeDisplay(currentTime);
        if (isRunning) return;
        pomodoroBtn.classList.add("active");
        shortBreakBtn.classList.remove("active");
        longBreakBtn.classList.remove("active");
    }

    // Setup timer to short break mode
    function handleShortBreakClick() {
        currentMode = 'shortBreak';
        currentTime = userShortBreakDuration;
        updateTimeDisplay(currentTime);
        if (isRunning) return;
        shortBreakBtn.classList.add("active");
        pomodoroBtn.classList.remove("active");
        longBreakBtn.classList.remove("active");
    }

    // Setup timer to long break mode
    function handleLongBreakClick() {
        currentMode = 'longBreak';
        currentTime = userLongBreakDuration;
        updateTimeDisplay(currentTime);
        if (isRunning) return;
        longBreakBtn.classList.add("active");
        pomodoroBtn.classList.remove("active");
        shortBreakBtn.classList.remove("active");
    }

    // Handle play button click
    function handlePlayClick() {
        if (isRunning) return;
        if (isPaused) {
            isPaused = false;
            startTimer();
        } else {
            startTimer();
        }
    }

    // Handle pause button click
    function handlePauseClick() {
        pauseTimer();
    }

    // Handle stop button click
    function handleStopClick() {
        stopTimer();
    }

    // Handle restart button click
    function handleRestartClick() {
        stopTimer();
    }

    // Handle modal menus's save  button click
    function handleSaveCustomizationClick() {

        // Get the values from the input fields and validate them to be in the range of 1 to 60
        const pomodoroMinutes = Math.min(Math.max(parseInt(document.getElementById("pomodoro-minutes").value), 1), 60) || 25;
        const shortBreakMinutes = Math.min(Math.max(parseInt(document.getElementById("short-break-minutes").value), 1), 15) || 5;
        const longBreakMinutes = Math.min(Math.max(parseInt(document.getElementById("long-break-minutes").value), 1), 30) || 15;

        userPomodoroDuration = pomodoroMinutes * 60;
        userShortBreakDuration = shortBreakMinutes * 60;
        userLongBreakDuration = longBreakMinutes * 60;

        if (currentMode === 'pomodoro') {
            currentTime = userPomodoroDuration;
        } else if (currentMode === 'shortBreak') {
            currentTime = userShortBreakDuration;
        } else if (currentMode === 'longBreak') {
            currentTime = userLongBreakDuration;
        }
        updateTimeDisplay(currentTime);

        const modal = bootstrap.Modal.getInstance(document.getElementById('customizeModal'));
        modal.hide();
    }

    // Event listeners
    customizeModal.addEventListener("show.bs.modal", function() {
        stopTimer();
        pomodoroBtn.classList.add("active");
        shortBreakBtn.classList.remove("active");
        longBreakBtn.classList.remove("active");
    });

    // Event listeners
    pomodoroBtn.addEventListener("click", handlePomodoroClick);
    shortBreakBtn.addEventListener("click", handleShortBreakClick);
    longBreakBtn.addEventListener("click", handleLongBreakClick);
    playBtn.addEventListener("click", handlePlayClick);
    pauseBtn.addEventListener("click", handlePauseClick);
    stopBtn.addEventListener("click", handleStopClick);
    restartBtn.addEventListener("click", handleRestartClick);
    saveCustomizationBtn.addEventListener("click", handleSaveCustomizationClick);

    pomodoroBtn.classList.add("active");

});
