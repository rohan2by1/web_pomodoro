import "./styles/main.css";
import PomodoroTimer from "./timer";

document.addEventListener("DOMContentLoaded", () => {
  const timer = new PomodoroTimer();

  // Initialize with pomodoro mode
  timer.setMode("pomodoro");

  // Mode selection buttons
  document.querySelectorAll(".mode-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      timer.setMode(btn.dataset.mode);
    });
  });

  // Start/Pause button
  document.getElementById("startBtn").addEventListener("click", () => {
    if (timer.isRunning) {
      timer.pauseTimer();
    } else {
      timer.startTimer();
    }
  });

  // Reset button
  document.getElementById("resetBtn").addEventListener("click", () => {
    timer.resetTimer();
  });

  // Skip button
  document.getElementById("skipBtn").addEventListener("click", () => {
    timer.skipToNextMode();
  });

  // Listen for keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      if (timer.isRunning) {
        timer.pauseTimer();
      } else {
        timer.startTimer();
      }
    } else if (e.code === "KeyR") {
      timer.resetTimer();
    }
  });

  // Check for notifications permission
  if (
    Notification.permission !== "granted" &&
    Notification.permission !== "denied"
  ) {
    document.querySelector(".container").insertAdjacentHTML(
      "afterbegin",
      `<div class="notification-request bg-gray-800 p-3 mb-4 rounded-lg text-sm">
        <p>Enable notifications to get alerts when your timer ends.</p>
        <button id="enableNotifications" class="mt-2 bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded">
          Enable Notifications
        </button>
      </div>`
    );

    document
      .getElementById("enableNotifications")
      .addEventListener("click", () => {
        Notification.requestPermission();
        document.querySelector(".notification-request").remove();
      });
  }
});
function initLofiScene() {
  // Create stars
  const starsContainer = document.querySelector(".stars");
  for (let i = 0; i < 50; i++) {
    const star = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    const x = 110 + Math.random() * 380;
    const y = 60 + Math.random() * 200;
    const radius = Math.random() * 1.5 + 0.5;

    star.setAttribute("cx", x);
    star.setAttribute("cy", y);
    star.setAttribute("r", radius);
    star.classList.add("star");
    star.style.animationDuration = Math.random() * 3 + 2 + "s";
    star.style.animationDelay = Math.random() * 3 + "s";

    starsContainer.appendChild(star);
  }

  // Create rain
  const rainContainer = document.querySelector(".rain");
  for (let i = 0; i < 80; i++) {
    const raindrop = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    const x = 110 + Math.random() * 380;
    const y = 60 + Math.random() * 280;
    const length = Math.random() * 15 + 5;

    raindrop.setAttribute("x1", x);
    raindrop.setAttribute("y1", y);
    raindrop.setAttribute("x2", x);
    raindrop.setAttribute("y2", y + length);
    raindrop.classList.add("raindrop");
    raindrop.style.opacity = Math.random() * 0.5 + 0.2;

    // Animate rain
    const animateRain = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animate"
    );
    const startY = y - 280;
    animateRain.setAttribute("attributeName", "y1");
    animateRain.setAttribute("from", startY);
    animateRain.setAttribute("to", startY + 280);
    animateRain.setAttribute("dur", Math.random() * 2 + 1.5 + "s");
    animateRain.setAttribute("repeatCount", "indefinite");
    raindrop.appendChild(animateRain);

    const animateRain2 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animate"
    );
    animateRain2.setAttribute("attributeName", "y2");
    animateRain2.setAttribute("from", startY + length);
    animateRain2.setAttribute("to", startY + 280 + length);
    animateRain2.setAttribute("dur", Math.random() * 2 + 1.5 + "s");
    animateRain2.setAttribute("repeatCount", "indefinite");
    raindrop.appendChild(animateRain2);

    rainContainer.appendChild(raindrop);
  }
}

// Add to your DOMContentLoaded event
document.addEventListener("DOMContentLoaded", () => {
  const timer = new PomodoroTimer();

  // Initialize the lofi scene
  initLofiScene();

  // Rest of your existing code...
});

function initMusicPlayer() {
  const toggleButton = document.getElementById("toggleMusic");
  const musicPlayer = document.querySelector(".music-player");
  const audioElement = new Audio("https://stream.nightride.fm/chillsynth.m4a"); // A good lofi stream

  audioElement.volume = 0.4; // Set initial volume

  toggleButton.addEventListener("click", () => {
    if (audioElement.paused) {
      audioElement.play();
      toggleButton.innerHTML = '<i class="fas fa-pause music-icon"></i>';
      musicPlayer.classList.add("playing");
    } else {
      audioElement.pause();
      toggleButton.innerHTML = '<i class="fas fa-play music-icon"></i>';
      musicPlayer.classList.remove("playing");
    }
  });
}

// Add to your DOMContentLoaded event
document.addEventListener("DOMContentLoaded", () => {
  const timer = new PomodoroTimer();

  // Initialize the lofi animations
  initLofiScene(); // or initLofiBackground();

  // Initialize the music player
  initMusicPlayer();

  // Rest of your existing code...
});