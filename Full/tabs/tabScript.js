function changeContent(pdfUrl, audioUrl) {
  document.getElementById('pdfViewer').src = pdfUrl;
  document.getElementById('audioPlayer').src = audioUrl;
}
document.addEventListener("DOMContentLoaded", function() {
  const metronomeToggle = document.getElementById("metronome-toggle");
  const metronomeMenu = document.getElementById("metronome-menu");
  const tempoInput = document.getElementById("tempo-input");
  const startStopButton = document.getElementById("start-stop-button");

  // Показать/скрыть меню метронома
  metronomeToggle.addEventListener("click", function() {
    metronomeMenu.style.display = metronomeMenu.style.display === "block" ? "none" : "block";
  });

  // Запустить/остановить метроном
  startStopButton.addEventListener("click", function() {
    const tempo = parseInt(tempoInput.value);
    if (isNaN(tempo)) {
      alert("Please enter a valid tempo.");
      return;
    }
    if (startStopButton.dataset.running === "true") {
      stopMetronome();
    } else {
      startMetronome(tempo);
    }
  });

  let metronomeInterval;
  let audio = new Audio("Full/tabs/метроном.mp3");

  function startMetronome(tempo) {
    startStopButton.dataset.running = "true";
    startStopButton.innerHTML = "<img src='Full/tabs/пауза.png' alt='Stop'>";
    metronomeInterval = setInterval(function() {
      audio.play();
    }, 60000 / tempo);
  }

  function stopMetronome() {
    startStopButton.dataset.running = "false";
    startStopButton.innerHTML = "<img src='Full/tabs/пуск.png' alt='Play'>";
    clearInterval(metronomeInterval);
  }
});
