// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}

// Update time every second
function updateTime() {
    const now = new Date();
    document.getElementById('time').textContent = now.toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();

// Update battery level
if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
        function updateBattery() {
            const level = Math.floor(battery.level * 100);
            document.getElementById('battery').textContent = `Battery: ${level}%`;
        }
        updateBattery();
        battery.addEventListener('levelchange', updateBattery);
    });
} else {
    document.getElementById('battery').textContent = 'Battery: N/A';
}

// Game loading function
function loadGame(game) {
    const container = document.getElementById('game-container');
    container.innerHTML = ''; // Clear previous game
    switch (game) {
        case 'snake':
            loadSnake();
            break;
        case 'flappy':
            loadFlappy();
            break;
        case 'mario':
            loadMario();
            break;
        case 'geometry':
            loadGeometry();
            break;
    }
}
