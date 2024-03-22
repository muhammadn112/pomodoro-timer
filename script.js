let timer;
let isRunning = false;
let timeLeft;
let workDuration = 25 * 60; 
let breakDuration = 5 * 60; 

function startStopTimer() {
    if (!isRunning) {
        startTimer();
        document.getElementById("start-stop").textContent = "Stop";
    } else {
        stopTimer();
        document.getElementById("start-stop").textContent = "Start";
    }
}

function startTimer() {
    isRunning = true;
    timer = setInterval(updateTimer, 1000);
}

function stopTimer() {
    isRunning = false;
    clearInterval(timer);
}

function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        if (document.getElementById("timer-label").textContent === "Work") {
            document.getElementById("timer-label").textContent = "Break";
            timeLeft = breakDuration;
        } else {
            document.getElementById("timer-label").textContent = "Work";
            timeLeft = workDuration;
        }
        startTimer();
    } else {
        timeLeft--;
        displayTime();
    }
}

function resetTimer() {
    stopTimer();
    if (isRunning) {
        document.getElementById("start-stop").textContent = "Start";
    }
    document.getElementById("timer-label").textContent = "Work";
    timeLeft = workDuration;
    displayTime();
}

function displayTime() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("time-left").textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

document.addEventListener("DOMContentLoaded", function() {
    timeLeft = workDuration;
    displayTime();
    
    document.getElementById("work-duration").addEventListener("change", function() {
        workDuration = parseInt(this.value) * 60;
        if (!isRunning && document.getElementById("timer-label").textContent === "Work") {
            timeLeft = workDuration;
            displayTime();
        }
    });
    
    document.getElementById("work-duration").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            workDuration = parseInt(this.value) * 60;
            timeLeft = workDuration;
            document.getElementById("timer-label").textContent = "Work";
            displayTime();
            if (!isRunning) {
                displayTime();
            }
        }
    });
    
    
    document.getElementById("break-duration").addEventListener("change", function() {
        breakDuration = parseInt(this.value) * 60;
        if (!isRunning && document.getElementById("timer-label").textContent === "Break") {
            timeLeft = breakDuration;
            displayTime();
        }
    });
    
    document.getElementById("break-duration").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            breakDuration = parseInt(this.value) * 60;
            timeLeft = breakDuration;
            document.getElementById("timer-label").textContent = "Break";
            displayTime();
            if (!isRunning) {
                displayTime();
            }
        }
    });
    
});
