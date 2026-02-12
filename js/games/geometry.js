function loadGeometry() {
    const container = document.getElementById('game-container');
    container.innerHTML = '<canvas id="geometry-canvas" width="800" height="400"></canvas><p>Press Space to jump over spikes. Sync with the beat!</p>';
    const canvas = document.getElementById('geometry-canvas');
    const ctx = canvas.getContext('2d');

    // Game variables
    let player = { x: 100, y: 300, width: 30, height: 30, dy: 0, onGround: true };
    let obstacles = [{ x: 400, y: 300, width: 30, height: 30 }, { x: 600, y: 250, width: 30, height: 30 }];
    let score = 0;
    const gravity = 0.5;
    const jumpStrength = -12;
    let beatTimer = 0;

    // Controls
    document.addEventListener('keydown', e => {
        if (e.code === 'Space' && player.onGround) {
            player.dy = jumpStrength;
            player.onGround = false;
        }
    });

    function update() {
        // Player physics
        player.y += player.dy;
        player.dy += gravity;
        if (player.y >= 300) {
            player.y = 300;
            player.dy = 0;
            player.onGround = true;
        }

        // Move obstacles
        obstacles.forEach(obstacle => obstacle.x -= 5);
        // Reset obstacles
        if (obstacles[0].x < -30) {
            obstacles.shift();
            obstacles.push({ x: 800, y: Math.random() > 0.5 ? 300 : 250, width: 30, height: 30 });
            score += 1;
        }

        // Collision detection
        obstacles.forEach(obstacle => {
            if (player.x < obstacle.x + obstacle.width && player.x + player.width > obstacle.x &&
                player.y < obstacle.y + obstacle.height && player.y + player.height > obstacle.y) {
                // Reset on hit
                player.y = 300;
                score = 0;
                obstacles = [{ x: 400, y: 300, width: 30, height: 30 }, { x: 600, y: 250, width: 30, height: 30 }];
            }
        });

        // Simple beat (flash screen every 60 frames)
        beatTimer++;
        if (beatTimer % 60 === 0) {
            // Could add sound here
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw ground
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 330, canvas.width, 70);
        // Draw player
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(player.x, player.y, player.width, player.height);
        // Draw obstacles
        ctx.fillStyle = '#FF0000';
        obstacles.forEach(obstacle => ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height));
        // Draw score
        ctx.fillStyle = '#FFF';
        ctx.font = '20px Courier New';
        ctx.fillText(`Score: ${score}`, 10, 30);
    }

    function gameLoop() {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }
    gameLoop();
}s
