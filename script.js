
const clock = document.getElementById("clock");
const date = document.getElementById("date");
const stopwatch = document.getElementById("stopwatch");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

// 1. DIGITAL CLOCK

function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;
    hours = String(hours).padStart(2, "0");

    clock.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;

    date.textContent = now.toDateString();
}

updateClock();
setInterval(updateClock, 1000);


// 2. STOPWATCH

let elapsedTime = 0;
let startTime = 0;
let timer = null;

function updateStopwatch() {
    elapsedTime = Date.now() - startTime;

    const totalSeconds = Math.floor(elapsedTime / 1000);

    const hours = String(
        Math.floor(totalSeconds / 3600)
    ).padStart(2, "0");

    const minutes = String(
        Math.floor((totalSeconds % 3600) / 60)
    ).padStart(2, "0");

    const seconds = String(
        totalSeconds % 60
    ).padStart(2, "0");

    stopwatch.textContent =
        `${hours}:${minutes}:${seconds}`;
}


// Start button
startBtn.addEventListener("click", function () {
    if (timer !== null) return;

    startTime = Date.now() - elapsedTime;

    timer = setInterval(updateStopwatch, 100);
});


// Pause button
pauseBtn.addEventListener("click", function () {
    if (timer !== null) {
        clearInterval(timer);
        timer = null;
    }
});


// Reset button
resetBtn.addEventListener("click", function () {
    clearInterval(timer);
    timer = null;
    elapsedTime = 0;
    stopwatch.textContent = "00:00:00";
});
