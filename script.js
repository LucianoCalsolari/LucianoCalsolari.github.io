let canvas = document.getElementById("snake")
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        /**context.fillRect(snake[i].x, snake[i].y, box, box);*/
        context.beginPath();
        context.arc(snake[i].x, snake[i].y, box, box, Math.PI * 2, true)
        context.stroke();

        context.fill()

        if (i % 2 == 1) {
            context.beginPath()
                //(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void
            context.arc(snake[i].x, snake[i].y, box, box, Math.PI * 2, true)
            context.stroke()
            context.fillStyle = "white"
            context.fill()

            context.beginPath()
            context.arc(snake[i].x - 20, snake[i].y + 20, 4, 10, Math.PI * 2, true)
            context.fillStyle = "black"
            context.stroke()
            context.fill()

            context.beginPath()
            context.arc(snake[i].x + 20, snake[i].y + 20, 5, 9, Math.PI * 2, true)
            context.fillStyle = "black"
            context.stroke()
            context.fill()
        }
    }
}

function drawFood() {
    /**context.fillRect(food.x, food.y, box, box)*/
    context.fillStyle = "red"
    context.beginPath();
    context.arc(food.x, food.y, box - 10, box, Math.PI * 2, true);
    context.stroke();
    context.fill()
}

document.addEventListener('keydown', update);

function update(event) {

    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 40 && direction != "up") direction = "down";

}

function iniciarJogo() {

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert('Game Over');
        }
    }

    if (snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
    if (snake[0].x < 0 * box && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
    if (snake[0].y < 0 * box && direction == 'up') snake[0].y = 16 * box;

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") {
        snakeX += box
    }
    if (direction == "left") {
        snakeX -= box;
    }
    if (direction == "up") {
        snakeY -= box;
    }
    if (direction == "down") {
        snakeY += box;
        /**  context.rotate(10)*/
    }

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);