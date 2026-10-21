var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var score1 = 0;
var score2 = 0;

var player1 = new GameObject();
player1.x = 50;
player1.y = 200;
player1.width = 10;
player1.height = 100;
player1.color = "white";

var player2 = new GameObject();
player2.x = canvas.width - 60;
player2.y = 200;
player2.width = 10;
player2.height = 100;
player2.color = "white";

var ball = new GameObject();
ball.x = canvas.width / 2;
ball.y = canvas.height / 2;
ball.radius = 10;
ball.color = "black";
ball.force = 5;
ball.xSpeed = -5;
ball.ySpeed = 0;

function animate()
{
    context.fillStyle = "green";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.save();
    context.strokeStyle = "white";
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.stroke();
    context.restore();

    player1.drawRect();
    player2.drawRect();
    ball.drawCircle();

    ball.x += ball.xSpeed;
    ball.y += ball.ySpeed;

    if (ball.y - ball.radius <= 0)
    {
        ball.y = ball.radius;
        ball.ySpeed = Math.abs(ball.ySpeed) + 1;
    }

    if (ball.y + ball.radius >= canvas.height)
    {
        ball.y = canvas.height - ball.radius;
        ball.ySpeed = -Math.abs(ball.ySpeed) - 1;
    }

    if (
        ball.x - ball.radius <= player1.x + player1.width &&
        ball.x + ball.radius >= player1.x &&
        ball.y >= player1.y &&
        ball.y <= player1.y + player1.height &&
        ball.xSpeed < 0
    )
    {
        ball.x = player1.x + player1.width + ball.radius;
        bounce(player1, 1);
    }

    if (
        ball.x + ball.radius >= player2.x &&
        ball.x - ball.radius <= player2.x + player2.width &&
        ball.y >= player2.y &&
        ball.y <= player2.y + player2.height &&
        ball.xSpeed > 0
    )
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
    var hitPosition = ball.y - player.y;
    var section = hitPosition / player.height;

    ball.xSpeed = ball.force * direction;

    if (section < 1 / 6)
    {
        ball.xSpeed = ball.force * 5 * direction;
        ball.ySpeed = -35;
    }
    else if (section < 1 / 3)
    {
        ball.xSpeed = ball.force * direction;
        ball.ySpeed = -35;
    }
    else if (section < 2 / 3)
    {
        ball.ySpeed = 0;
    }
    else if (section < 5 / 6)
    {
        ball.xSpeed = ball.force * direction;
        ball.ySpeed = 35;
    }
    else
    {
        ball.xSpeed = ball.force * 5 * direction;
        ball.ySpeed = 35;
    }
}

function resetBall(direction)
{
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.xSpeed = ball.force * direction;
    ball.ySpeed = 0;
}

setInterval(animate, 20);