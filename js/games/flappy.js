function loadFlappy() {
    const container = document.getElementById('game-container');
    container.innerHTML = '<canvas id="flappy-canvas" width="400" height="400"></canvas><p>Press Space to flap.</p>';
    const canvas = document.getElementById('flappy-canvas');
    const ctx = canvas.getContext('2d');

    // Game variables
    let bird = {x: 50, y: 200, dy: 0};
    let pipes = [{x: 400, top: 0, bottom: 300, gap: 150}];
    let score = 0;
    const gravity = 0.5;
    const jump = -10;

    // Controls
    document.addEventListener('keydown', e => {
        if (e.code === 'Space') bird.dy = jump;
    });

    function update() {
        bird.y += bird.dy;
        bird.dy += gravity;

        // Move pipes
        pipes.forEach(pipe => pipe.x -= 2);

        // Add new pipes
        if (pipes[pipes.length - 1].x < 200) {
            pipes.push({x: 400, top: 0, bottom: Math.random() * 200 + 200, gap: 150});
        }

        // Remove off-screen pipes
        if (pipes[0].x < -50) pipes.shift();

        // Collision
        if (bird.y < 0 || bird.y > 400 || pipes.some(pipe => bird.x < pipe.x + 50 && bird.x + 20 > pipe.x && (bird.y < pipe.top + pipe.gap || bird.y + 20 > pipe.bottom))) {
            // Reset
            bird = {x: 50, y: 200, dy: 0};
            pipes = [{x: 400, top: 0, bottom: 300, gap: 150}];
            score = 0;
        }

        // Score
        pipes.forEach(pipe => {
            if (pipe.x + 50 < bird.x && !pipe.passed) {
                pipe.passed = true;
                score++;
            }
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw bird
        ctx.fillStyle = '#ff0';
        ctx.fillRect(bird.x, bird.y, 20, 20);
        // Draw pipes
        ctx.fillStyle = '#0f0';
        pipes.forEach(pipe => {
            ctx.fillRect(pipe.x, pipe.top, 50, pipe.gap);
            ctx.fillRect(pipe.x, pipe.bottom, 50, 400 - pipe.bottom);
        });
        // Draw score
        ctx.fillStyle = '#fff';
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
