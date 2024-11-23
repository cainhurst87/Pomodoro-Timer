document.addEventListener("DOMContentLoaded", function() {

    let pomodoroDuration = 25 * 60;
    let shortBreakDuration = 5 * 60;
    let longBreakDuration = 15 * 60;
    let currentTime = pomodoroDuration;
    let isRunning = false;
    let isPaused = false;
    let timerInterval;

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

    function updateTimeDisplay(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timeDisplay.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

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
            }
        }, 1000);

        playBtn.classList.add("active");
        pauseBtn.classList.remove("active");
        stopBtn.classList.remove("active");
        pomodoroBtn.disabled = true;
        shortBreakBtn.disabled = true;
        longBreakBtn.disabled = true;
    }

    function pauseTimer() {
        if (!isRunning) return;
        clearInterval(timerInterval);
        isRunning = false;
        isPaused = true;

        playBtn.classList.remove("active");
        pauseBtn.classList.add("active");
    }

    function stopTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        isPaused = false;
        currentTime = pomodoroDuration;
        updateTimeDisplay(currentTime);

        pomodoroBtn.disabled = false;
        shortBreakBtn.disabled = false;
        longBreakBtn.disabled = false;
        playBtn.classList.remove("active");
        pauseBtn.classList.remove("active");
        stopBtn.classList.remove("active");
    }

    function handlePomodoroClick() {
        currentTime = pomodoroDuration;
        updateTimeDisplay(currentTime);
        if (isRunning) return;
        pomodoroBtn.classList.add("active");
        shortBreakBtn.classList.remove("active");
        longBreakBtn.classList.remove("active");
    }

    function handleShortBreakClick() {
        currentTime = shortBreakDuration;
        updateTimeDisplay(currentTime);
        if (isRunning) return;
        shortBreakBtn.classList.add("active");
        pomodoroBtn.classList.remove("active");
        longBreakBtn.classList.remove("active");
    }

    function handleLongBreakClick() {
        currentTime = longBreakDuration;
        updateTimeDisplay(currentTime);
        if (isRunning) return;
        longBreakBtn.classList.add("active");
        pomodoroBtn.classList.remove("active");
        shortBreakBtn.classList.remove("active");
    }

    function handlePlayClick() {
        if (isRunning) return;
        if (isPaused) {
            isPaused = false;
            startTimer();
        } else {
            startTimer();
        }
    }

    function handlePauseClick() {
        pauseTimer();
    }

    function handleStopClick() {
        stopTimer();
    }

    function handleRestartClick() {
        stopTimer();
    }

    function handleSaveCustomizationClick() {
        const pomodoroMinutes = parseInt(document.getElementById("pomodoro-minutes").value) || 25;
        const shortBreakMinutes = parseInt(document.getElementById("short-break-minutes").value) || 5;
        const longBreakMinutes = parseInt(document.getElementById("long-break-minutes").value) || 15;

        pomodoroDuration = pomodoroMinutes * 60;
        shortBreakDuration = shortBreakMinutes * 60;
        longBreakDuration = longBreakMinutes * 60;

        currentTime = pomodoroDuration;
        updateTimeDisplay(currentTime);

        const modal = bootstrap.Modal.getInstance(document.getElementById('customizeModal'));
        modal.hide();
    }

    customizeModal.addEventListener("show.bs.modal", function() {
        stopTimer();
        pomodoroBtn.classList.add("active");
        shortBreakBtn.classList.remove("active");
        longBreakBtn.classList.remove("active");
    });

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
