
function GameObject()
{
    this.x = 20;
    this.y = 20;
    this.width = 10;
    this.height = 100;
    this.radius = 10;
    this.color = "black";
    this.force = 5;

    this.drawCircle = function()
    {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    };

    this.drawRect = function()
    {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    };
}
