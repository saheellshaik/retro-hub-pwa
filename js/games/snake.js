function loadSnake() {
    const container = document.getElementById('game-container');
    container.innerHTML = '<canvas id="snake-canvas" width="400" height="400"></canvas><p>Use arrow keys to control Snake X.</p>';
    const canvas = document.getElementById('snake-canvas');
    const ctx = canvas.getContext('2d');

    // Game variables (simplified Snake X with basic features)
    let snake = [{x: 200, y: 200}];
    let food = {x: 100, y: 100};
    let direction = 'right';
    let score = 0;

    // Controls
    document.addEventListener('keydown', e => {
        if (e.code === 'ArrowUp' && direction !== 'down') direction = 'up';
        else if (e.code === 'ArrowDown' && direction !== 'up') direction = 'down';
        else if (e.code === 'ArrowLeft' && direction !== 'right') direction = 'left';
        else if (e.code === 'ArrowRight' && direction !== 'left') direction = 'right';
    });

    function update() {
        // Move snake
        let head = {x: snake[0].x, y: snake[0].y};
        if (direction === 'up') head.y -= 10;
        else if (direction === 'down') head.y += 10;
        else if (direction === 'left') head.x -= 10;
        else if (direction === 'right') head.x += 10;

        snake.unshift(head);

        // Check food
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            food = {x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10};
        } else {
            snake.pop();
        }

        // Collision with walls or self
        if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400 || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
            // Reset
            snake = [{x: 200, y: 200}];
            direction = 'right';
            score = 0;
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw snake
        ctx.fillStyle = '#0f0';
        snake.forEach(segment => ctx.fillRect(segment.x, segment.y, 10, 10));
        // Draw food
        ctx.fillStyle = '#f00';
        ctx.fillRect(food.x, food.y, 10, 10);
        // Draw score
        ctx.fillStyle = '#fff';
        ctx.font = '20px Courier New';
        ctx.fillText(`Score: ${score}`, 10, 30);
    }

    function gameLoop() {
        update();
        draw();
        setTimeout(gameLoop, 100);
    }
    gameLoop();
}
