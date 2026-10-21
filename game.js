var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var player1 = new GameObject();
player1.x = 50;
player1.y = 200;
player1.width = 10;
player1.height = 100;
player1.color = "white";

var player2 = new GameObject();
player2.x = 940;
player2.y = 200;
player2.width = 10;
player2.height = 100;
player2.color = "white";

var ball = new GameObject();
ball.x = 500;
ball.y = 250;
ball.radius = 10;
ball.color = "black";
ball.force = 5;
ball.vx = -5;
ball.vy = 0;

var score1 = 0;
var score2 = 0;

function animate()
{
    context.fillStyle = "green";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.save();
    context.strokeStyle = "white";
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(500, 0);
    context.lineTo(500, 500);
    context.stroke();
    context.restore();

    player1.drawRect();
    player2.drawRect();
    ball.drawCircle();

    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.y - ball.radius <= 0)
    {
        ball.y = ball.radius;
        ball.vy = Math.abs(ball.vy) + 1;
    }

    if (ball.y + ball.radius >= canvas.height)
    {
        ball.y = canvas.height - ball.radius;
        ball.vy = -Math.abs(ball.vy) - 1;
    }

    if (ball.x - ball.radius <= player1.x + player1.width &&
        ball.y >= player1.y &&
        ball.y <= player1.y + player1.height &&
        ball.vx < 0)
    {
        ball.x = player1.x + player1.width + ball.radius;
        bounce(player1, 1);
    }

    if (ball.x + ball.radius >= player2.x &&
        ball.y >= player2.y &&
        ball.y <= player2.y + player2.height &&
        ball.vx > 0)
    {
        ball.x = player2.x - ball.radius;
        bounce(player2, -1);
    }

    if (ball.x < 0)
    {
        score2++;
        resetBall(1);
    }

    if (ball.x > canvas.width)
    {
        score1++;
        resetBall(-1);
    }

    context.fillStyle = "red";
    context.font = "30px Arial";
    context.fillText(score1, 450, 40);

    context.fillStyle = "blue";
    context.fillText(score2, 530, 40);
}

function bounce(player, direction)
{
    var hit = (ball.y - player.y) / player.height;

    ball.vx = ball.force * direction;

    if (hit < 1 / 6)
    {
        ball.vx = ball.force * 5 * direction;
        ball.vy = -35;
    }
    else if (hit < 1 / 3)
    {
        ball.vx = ball.force * direction;
        ball.vy = -35;
    }
    else if (hit < 2 / 3)
    {
        ball.vy = 0;
    }
    else if (hit < 5 / 6)
    {
        ball.vx = ball.force * direction;
        ball.vy = 35;
    }
    else
    {
        ball.vx = ball.force * 5 * direction;
        ball.vy = 35;
    }
}

function resetBall(direction)
{
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.vx = ball.force * direction;
    ball.vy = 0;
}

setInterval(animate, 20);