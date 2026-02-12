// Register service worker (unchanged)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}

// Update time every second (unchanged)
function updateTime() {
    const now = new Date();
    document.getElementById('time').textContent = now.toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();

// Update battery level (unchanged)
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

// Menu navigation variables
let selectedIndex = 0;
const buttons = document.querySelectorAll('#game-menu button');
let gameLoaded = false; // Track if a game is active

// Highlight the selected button
function updateSelection() {
    buttons.forEach((btn, index) => {
        if (index === selectedIndex) {
            btn.classList.add('selected');
            btn.focus(); // For accessibility
        } else {
            btn.classList.remove('selected');
        }
    });
}
updateSelection(); // Initial highlight

// Keyboard navigation for menu
document.addEventListener('keydown', (e) => {
    if (gameLoaded) {
        // If a game is loaded, Escape to return to menu
        if (e.code === 'Escape') {
            unloadGame();
        }
        return; // Let games handle their own keys
    }

    // Menu navigation
    if (e.code === 'ArrowRight' || e.code === 'ArrowDown') {
        selectedIndex = (selectedIndex + 1) % buttons.length;
        updateSelection();
    } else if (e.code === 'ArrowLeft' || e.code === 'ArrowUp') {
        selectedIndex = (selectedIndex - 1 + buttons.length) % buttons.length;
        updateSelection();
    } else if (e.code === 'Enter') {
        loadGame(buttons[selectedIndex].getAttribute('onclick').match(/'(\w+)'/)[1]);
    }
});

// Game loading function (unchanged, but now sets gameLoaded)
function loadGame(game) {
    const container = document.getElementById('game-container');
    container.innerHTML = ''; // Clear previous game
    gameLoaded = true; // Mark game as loaded
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

// New function to unload game and return to menu
function unloadGame() {
    const container = document.getElementById('game-container');
    container.innerHTML = ''; // Clear game
    gameLoaded = false; // Back to menu
    updateSelection(); // Re-highlight menu
}
