function loadMario() {
    const container = document.getElementById('game-container');
    container.innerHTML = '<canvas id="mario-canvas" width="800" height="400"></canvas><p>Use arrow keys: Left/Right to move, Up to jump.</p>';
    const canvas = document.getElementById('mario-canvas');
    const ctx = canvas.getContext('2d');

    // Game variables
    let mario = { x: 50, y: 300, width: 30, height: 30, dx: 0, dy: 0, onGround: true };
    let enemies = [{ x: 400, y: 300, width: 30, height: 30 }];
    let coins = [{ x: 600, y: 250, width: 20, height: 20 }];
    let score = 0;
    const gravity = 0.5;
    const jumpStrength = -12;

    // Controls
    let keys = {};
    document.addEventListener('keydown', e => keys[e.code] = true);
    document.addEventListener('keyup', e => keys[e.code] = false);

    function update() {
        // Mario movement
        if (keys['ArrowLeft']) mario.dx = -5;
        else if (keys['ArrowRight']) mario.dx = 5;
        else mario.dx = 0;

        if (keys['ArrowUp'] && mario.onGround) {
            mario.dy = jumpStrength;
            mario.onGround = false;
        }

        mario.x += mario.dx;
        mario.y += mario.dy;
        mario.dy += gravity;

        // Ground collision
        if (mario.y >= 300) {
            mario.y = 300;
            mario.dy = 0;
            mario.onGround = true;
        }

        // Enemy collision (simple)
        enemies.forEach(enemy => {
            if (mario.x < enemy.x + enemy.width && mario.x + mario.width > enemy.x &&
                mario.y < enemy.y + enemy.height && mario.y + mario.height > enemy.y) {
                // Reset on hit
                mario.x = 50;
                mario.y = 300;
                score = 0;
            }
        });

        // Coin collection
        coins.forEach((coin, index) => {
            if (mario.x < coin.x + coin.width && mario.x + mario.width > coin.x &&
                mario.y < coin.y + coin.height && mario.y + mario.height > coin.y) {
                coins.splice(index, 1);
                score += 10;
            }
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw ground
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(0, 330, canvas.width, 70);
        // Draw Mario
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(mario.x, mario.y, mario.width, mario.height);
        // Draw enemies
        ctx.fillStyle = '#000';
        enemies.forEach(enemy => ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height));
        // Draw coins
        ctx.fillStyle = '#FFD700';
        coins.forEach(coin => ctx.fillRect(coin.x, coin.y, coin.width, coin.height));
        // Draw score
        ctx.fillStyle = '#000';
        ctx.font = '20px Courier New';
        ctx.fillText(`Score: ${score}`, 10, 30);
    }

    function gameLoop() {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }
    gameLoop();
}
