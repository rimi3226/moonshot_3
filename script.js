let fps = 55;
let delay = 12;
let humanCount = 3;
let treeCount = 3;

function updateStats() {
    document.getElementById('fps').textContent = fps;
    document.getElementById('delay').textContent = delay + 'ms';
    document.getElementById('human-count').textContent = humanCount;
    document.getElementById('tree-count').textContent = treeCount;
}

function updateSensorData() {
    document.getElementById('temp1').textContent = (Math.random() * 5 + 18).toFixed(1) + '°C';
    document.getElementById('temp2').textContent = (Math.random() * 5 + 18).toFixed(1) + '°C';
    document.getElementById('humidity').textContent = (Math.random() * 10 + 40).toFixed(1) + '%';
    console.log('Updating charts...');
}

function updateAverages() {
    document.getElementById('avg-temp1').textContent = (Math.random() * 3 + 17).toFixed(1) + '°C';
    document.getElementById('avg-temp2').textContent = (Math.random() * 3 + 17).toFixed(1) + '°C';
    document.getElementById('avg-humidity').textContent = (Math.random() * 5 + 40).toFixed(1) + '%';
}

function setupVideoStream() {
    console.log('Setting up video stream...');
}

function simulateDataChanges() {
    fps = Math.floor(Math.random() * 10) + 50;
    delay = Math.floor(Math.random() * 5) + 10;
    humanCount = Math.floor(Math.random() * 5) + 1;
    treeCount = Math.floor(Math.random() * 5) + 1;
    updateStats();
}

function init() {
    setupVideoStream();
    updateSensorData();
    updateAverages();
    updateStats();
    setInterval(updateSensorData, 5000);
    setInterval(updateAverages, 30000);
    setInterval(simulateDataChanges, 3000);
}

window.onload = init;