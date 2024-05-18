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

  // Обработчик изменения значения темпа
  tempoInput.addEventListener("input", function() {
    const tempo = parseInt(tempoInput.value);
    // Если метроном запущен, обновляем его темп
    if (startStopButton.dataset.running === "true") {
      stopMetronome();
      startMetronome(tempo);
    }
  });

  // Запустить/остановить метроном
  startStopButton.addEventListener("click", function() {
    const tempo = parseInt(tempoInput.value);
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

function changeStarColor(stars) {
  var starElements = document.querySelectorAll('#stars');
  
  starElements.forEach(function(starElement) {
      var starsCount = starElement.innerHTML.length;
      
      if (starsCount === 1) {
          starElement.style.color = 'green'; // салатовый
      } else if (starsCount === 2) {
          starElement.style.color = 'orange'; // желтый
      } else if (starsCount === 3) {
          starElement.style.color = '#FF8C00'; // оранжевый
      } else if (starsCount === 4) {
          starElement.style.color = 'red'; // красный
      }
  });
}

// Вызываем функцию при загрузке страницы для начального установления цветов звезд
document.addEventListener('DOMContentLoaded', function() {
  changeStarColor();
});