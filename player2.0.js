function drawGuitarTab(canvasId, strings, notes) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    const stringSpacing = 20;
    const fretSpacing = 50;
    let currX = 20;

    // Отрисовка линий струн
    ctx.beginPath();
    for (let i = 0; i < strings; i++) {
        let y = (i * stringSpacing) + 20; // первая струна в 50px от верха холста
        ctx.moveTo(10, y);
        ctx.lineTo(canvas.width - 10, y);
    }
    ctx.stroke();

    // Отрисовка нот
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    notes.forEach(note => {
        if (note == '|') {
            // Рисуем разделитель тактов
            ctx.beginPath();
            ctx.moveTo(currX, 20);
            ctx.lineTo(currX, 20 + ((strings - 1) * stringSpacing));
            ctx.stroke();
            currX += fretSpacing;
        } else {
            // Для каждой струны рисуем ноту
            note.forEach((fret, stringIndex) => {
                if (fret !== '-') {
                    let y = 20 + (stringSpacing * stringIndex);

                    // Очистим область под цифрой
                    ctx.clearRect(currX - 10, y - 10, 20, 20);

                    // Выведем цифру
                    ctx.fillText(fret, currX, y);
                }
            });
            currX += fretSpacing;
        }
    });
}
// Пример использования
drawGuitarTab('tabCanvas', 6, [,
    ['-', '-', '-', '-', '-', '0'],
    ['-', '-', '-', '-', '-', '3'],
    ['-', '-', '-', '-', '-', '5'],
    ['-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '0'],
    '|',
    ['-', '-', '-', '-', '-', '3'],
    ['-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '6'],
    ['-', '-', '-', '-', '-', '5'],
    ['-', '-', '-', '-', '-', '-'],
    '|',
    ['-', '-', '-', '-', '-', '0'],
    ['-', '-', '-', '-', '-', '3'],
    ['-', '-', '-', '-', '-', '5'],
    ['-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '3'],
    '|',
    ['-', '-', '-', '-', '-', '0'],
    // можно продолжать табулатуру дальше
]);
drawGuitarTab('seven', 6, [,
    ['-', '-', '-', '-', '9', '7'],
    ['-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '9', '7'],
    ['-', '-', '-', '-', '12', '10'],
    ['-', '-', '-', '-', '9', '7'],
    '|',
    ['-', '-', '-', '-', '7', '5'],
    ['-', '-', '-', '-', '5', '3'],
    ['-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '4', '2'],
    ['-', '-', '-', '-', '-', '-'],
    '|',
    ['-', '-', '-', '-', '9', '7'],
    ['-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '9', '7'],
    ['-', '-', '-', '-', '12', '10'],
    ['-', '-', '-', '-', '9', '7'],
    '|',
    ['-', '-', '-', '-', '7', '5'],
    ['-', '-', '-', '-', '5', '3'],
    ['-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '4', '2'],
    ['-', '-', '-', '-', '-', '-'],

]);
const tabCanvas = document.getElementById('tabCanvas');
const runnerCanvas = document.getElementById('runnerCanvas');
const runnerCtx = runnerCanvas.getContext('2d');
const audioPlayer = document.getElementById('audioPlayer');
runnerCtx.globalAlpha = 0.5;

const tabCanvas1 = document.getElementById('seven');
const runnerCanvas1 = document.getElementById('runnerCanvas2');
const runnerCtx1 = runnerCanvas1.getContext('2d'); // Создаем контекст для второго канваса
const audioPlayer1 = document.getElementById('audioPlayer2');
runnerCtx1.globalAlpha = 0.5; // Установим альфа канал

const strings = 6;
const stringSpacing = 20;
const fretSpacing = 50;
const runnerHeight = stringSpacing * (strings - 1);
const runnerWidth = 5;
let notesXPositions = [];

// Предполагаемые временные метки для нот
const syncData = [
    { time: 0.0, x: 20 },
    { time: 0.5, x: 70 },
    { time: 1, x: 120 },
    { time: 2, x: 220 },
    { time: 2.3, x: 320 },
    { time: 2.5, x: 320 + 100 },
    { time: 2.9, x: 320 + 150 },
    { time: 4, x: 320 + 300 },
    { time: 4.5, x: 320 + 350 },
    { time: 5, x: 320 + 400 },
    { time: 6, x: 320 + 500 },
    { time: 6.5, x: 320 + 600 },
];

const syncData1 = [
    { time: 0.0, x: 20 },
    { time: 0.5, x: 120 },
    { time: 0.8, x: 170 },
    { time: 1.2, x: 220 },
    { time: 1.5, x: 320 },
    { time: 1.9, x: 370 },
    { time: 2.9, x: 470 },

    { time: 3.8, x: 620 },
    { time: 4.6, x: 720 },
    { time: 4.9, x: 770 },
    { time: 5.2, x: 820 },
    { time: 5.5, x: 920 },
    { time: 5.9, x: 970 },
    { time: 6.9, x: 1070 },

];

function updateMarker() {
    const currentTime = audioPlayer.currentTime;
    let xPosition = null;

    // Найдем текущую X позицию, перебирая массив syncData
    for (let i = 0; i < syncData.length; i++) {
        if (currentTime >= syncData[i].time && (i == syncData.length - 1 || currentTime < syncData[i + 1].time)) {
            xPosition = syncData[i].x;
            break;
        }
    }

    if (xPosition !== null) {
        runnerCtx.clearRect(0, 0, runnerCanvas.width, runnerCanvas.height);
        runnerCtx.beginPath();
        runnerCtx.fillStyle = 'brown';
        runnerCtx.rect(xPosition - (runnerWidth / 2), 20, runnerWidth, runnerHeight);
        runnerCtx.fill();
    }
}
function updateMarker1() {
    const currentTime = audioPlayer1.currentTime;
    let xPosition = null;

    // Найдем текущую X позицию, перебирая массив syncData1
    for (let i = 0; i < syncData1.length; i++) {
        if (currentTime >= syncData1[i].time && (i == syncData1.length - 1 || currentTime < syncData1[i + 1].time)) {
            xPosition = syncData1[i].x;
            break;
        }
    }

    if (xPosition !== null) {
        runnerCtx1.clearRect(0, 0, runnerCanvas1.width, runnerCanvas1.height);
        runnerCtx1.beginPath();
        runnerCtx1.fillStyle = 'brown';
        runnerCtx1.rect(xPosition - (runnerWidth / 2), 20, runnerWidth, runnerHeight);
        runnerCtx1.fill();
    }
}

audioPlayer.ontimeupdate = updateMarker;
audioPlayer1.ontimeupdate = updateMarker1;

