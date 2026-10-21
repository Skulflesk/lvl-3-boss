
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var paddle = new GameObject();
paddle.x = 400;
paddle.y = 440;
paddle.width = 200;
paddle.height = 15;
paddle.color = "black";

var ball = new GameObject();
ball.x = 500;
ball.y = 250;
ball.radius = 10;
ball.color = "black";
ball.force = 5;
ball.vx = 0;
ball.vy = -10;

var score = 10;
var keys = {};

document.addEventListener("keydown", function(event)
{
    keys[event.key] = true;
});

document.addEventListener("keyup", function(event)
{
    keys[event.key] = false;
});

function movePaddle()
{
    if (keys["ArrowLeft"] && paddle.x > 0)
    {
        paddle.x -= 7;
    }

    if (keys["ArrowRight"] && paddle.x + paddle.width < canvas.width)
    {
        paddle.x += 7;
    }
}

function moveBall()
{
    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.x - ball.radius <= 0)
    {
        ball.x = ball.radius;
        ball.vx = Math.abs(ball.vx);
    }

    if (ball.x + ball.radius >= canvas.width)
    {
        ball.x = canvas.width - ball.radius;
        ball.vx = -Math.abs(ball.vx);
    }

    if (ball.y - ball.radius <= 0)
    {
        ball.y = ball.radius;
        ball.vy = Math.abs(ball.vy);
    }

    if (
        ball.vy > 0 &&
        ball.y + ball.radius >= paddle.y &&
        ball.y - ball.radius <= paddle.y + paddle.height &&
        ball.x >= paddle.x &&
        ball.x <= paddle.x + paddle.width
    )
    {
        ball.y = paddle.y - ball.radius;

        var hit = (ball.x - paddle.x) / paddle.width;

        if (hit < 1 / 6)
        {
            ball.vx = -ball.force * 5;
            ball.vy = -10;
        }
        else if (hit < 1 / 3)
        {
            ball.vx = -ball.force;
            ball.vy = -10;
        }
        else if (hit < 2 / 3)
        {
            ball.vx = 0;
            ball.vy = -10;
        }
        else if (hit < 5 / 6)
        {
            ball.vx = ball.force;
            ball.vy = -10;
        }
        else
        {
            ball.vx = ball.force * 5;
            ball.vy = -10;
        }

        score += 10;
    }

    if (ball.y > canvas.height)
    {
        ball.x = canvas.width / 2;
        ball.y = 250;
        ball.vx = 0;
        ball.vy = -10;
    }
}

function animate()
{
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    movePaddle();
    moveBall();

    paddle.drawRect();
    ball.drawCircle();

    context.fillStyle = "black";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 20, 30);
}

setInterval(animate, 20);
