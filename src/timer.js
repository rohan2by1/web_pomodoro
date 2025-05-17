export default class PomodoroTimer {
  constructor() {
    this.modes = {
      pomodoro: { duration: 25 * 60, label: "Focus" },
      "short-break": { duration: 5 * 60, label: "Short Break" },
      "long-break": { duration: 15 * 60, label: "Long Break" },
    };
    this.currentMode = "pomodoro";
    this.timeRemaining = this.modes[this.currentMode].duration;
    this.isRunning = false;
    this.timer = null;
    this.sessionsCompleted = 0;
  }

  startTimer() {
    if (this.isRunning) return;

    this.isRunning = true;
    const startTime =
      Date.now() -
      (this.modes[this.currentMode].duration - this.timeRemaining) * 1000;

    this.timer = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      this.timeRemaining = Math.max(
        0,
        this.modes[this.currentMode].duration - elapsedSeconds
      );

      this.updateUI();

      if (this.timeRemaining <= 0) {
        this.completeSession();
      }
    }, 100);

    this.updateUI();
  }

  pauseTimer() {
    if (!this.isRunning) return;

    clearInterval(this.timer);
    this.isRunning = false;
    this.updateUI();
  }

  resetTimer() {
    this.pauseTimer();
    this.timeRemaining = this.modes[this.currentMode].duration;
    this.updateUI();
  }

  skipToNextMode() {
    this.pauseTimer();

    if (this.currentMode === "pomodoro") {
      // After pomodoro, go to short break (or long break after 4 sessions)
      this.sessionsCompleted++;
      if (this.sessionsCompleted % 4 === 0) {
        this.setMode("long-break");
      } else {
        this.setMode("short-break");
      }
    } else {
      // After any break, go back to pomodoro
      this.setMode("pomodoro");
    }
  }

  setMode(mode) {
    this.pauseTimer();
    this.currentMode = mode;
    this.timeRemaining = this.modes[mode].duration;

    // Update body class for styling
    document.body.classList.remove(
      "pomodoro-mode",
      "short-break-mode",
      "long-break-mode"
    );
    document.body.classList.add(`${mode}-mode`);

    // Update selected button
    document.querySelectorAll(".mode-btn").forEach((btn) => {
      btn.classList.remove("selected");
      if (btn.dataset.mode === mode) {
        btn.classList.add("selected");
      }
    });

    this.updateUI();
  }

  completeSession() {
    this.pauseTimer();
    this.playNotificationSound();
    this.skipToNextMode();
  }

  playNotificationSound() {
    const audio = new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"
    );
    audio.play();
  }

  updateUI() {
    // Update timer display
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;
    const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    document.querySelector(".timer").textContent = formattedTime;

    // Update progress circle
    const progress =
      (1 - this.timeRemaining / this.modes[this.currentMode].duration) * 100;
    document.documentElement.style.setProperty("--progress", `${progress}%`);

    // Update start/pause button
    const startBtn = document.getElementById("startBtn");
    if (this.isRunning) {
      startBtn.innerHTML = '<i class="fas fa-pause mr-2"></i>Pause';
      document.querySelector(".timer-container").classList.add("active");
    } else {
      startBtn.innerHTML = '<i class="fas fa-play mr-2"></i>Start';
      document.querySelector(".timer-container").classList.remove("active");
    }

    // Update session counter
    document.getElementById("sessionCount").textContent =
      this.sessionsCompleted;
  }
}
