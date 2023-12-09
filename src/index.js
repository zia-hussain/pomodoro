const pomodoroTime = document.querySelector('.pomodoro__time');
const pomodoroState = document.querySelector('.pomodoro__state');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const modes = document.querySelectorAll('.mode');
const getStartedMessage = document.querySelector('.get-started');
const sound = document.querySelector('audio');
let countdown;
let selectedTime;

modes.forEach(mode => mode.addEventListener('click', switchModes));
startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

function switchModes(e) {
    modes.forEach(mode => mode.classList.remove('active'));
    e.target.classList.add('active');
    getStartedMessage.style.display = 'none';

    // Clear the previous interval
    clearInterval(countdown);

    // Store the selected time without starting the timer
    selectedTime = parseInt(e.target.dataset.time, 10);

    // Display the selected time
    displayTimeLeft(selectedTime);
}

function startTimer() {
    if (selectedTime) {
        // Start the timer only if a mode is selected
        timer(selectedTime);
    } else {
        // Inform the user to select a mode
        getStartedMessage.style.display = 'block';
    }
}

function resetTimer() {
    // Clear the interval and reset the selected time
    clearInterval(countdown);
    selectedTime = 0;

    // Display the selected time (0:00)
    displayTimeLeft(selectedTime);

    // Clear the active mode
    modes.forEach(mode => mode.classList.remove('active'));

    // Hide the get started message
    // getStartedMessage.style.display = 'none';
}

function timer(seconds) {
    clearInterval(countdown);
    const start = Date.now();
    const finish = start + seconds * 1000;
    displayTimeLeft(seconds);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((finish - Date.now()) / 1000);
        if (secondsLeft <= 0) {
            clearInterval(countdown);
            document.title = 'Time Up!';
            sound.currentTime = 5;
            sound.play();
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    const displayTime = `${minutes}:${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}`;
    document.title = displayTime;
    pomodoroTime.textContent = displayTime;
}
