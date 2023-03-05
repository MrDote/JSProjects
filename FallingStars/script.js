const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let mouse = {
    x: 0,
    y: 0
};

canvas.addEventListener('click', onClick);

function onClick(e) {
    mouse.x = e.clientX;
    const radius = 15;
    if (mouse.x < radius) {
        mouse.x = radius;
    }
    if (mouse.x > canvas.width - radius) {
        mouse.x = canvas.width - radius;
    }

    stars.push(new Star(mouse.x, -50, randomFromRange(-5, 5), 10, radius, 'white'));
}


function Star(x, y, velX, velY, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velX = velX;
    this.velY = velY;
    this.friction = -0.7;
    this.gravity = 1;
}

Star.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
}

Star.prototype.shatter = function(minStars = 8) {
    this.radius -= 3;

    for (let i = 0; i < minStars; i++) {
        miniStars.push(new MiniStar(this.x, this.y, randomFromRange(-10, 10), randomFromRange(-25, -10), 2));
    }
}

Star.prototype.move = function() {
    if (this.y + this.radius + this.velY + ground >= canvas.height) {
        this.velY *= this.friction;
        this.shatter();
    }
    else {
        this.velY += this.gravity;
    }
    if ((this.x + this.radius + this.velX >= canvas.width) || (this.x - this.radius + this.velX <= 0)){
        this.velX *= -1;
    }
    this.x += this.velX;
    this.y += this.velY;
}

Star.prototype.update = function() {
    this.draw();
    this.move();
}





function MiniStar(x, y, velX, velY, radius, color) {
    Star.call(this, x, y, velX, velY, radius, color);
    this.friction = -0.7;
    this.gravity = 0.7;
    this.lifetime = 180;
    this.opacity = 1;
}

MiniStar.prototype.draw = function() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = `rgba(227, 234, 239, ${this.opacity})`;
    ctx.shadowColor = '#E3EAEF';
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
}

MiniStar.prototype.move = function() {
    if (this.y + this.radius + this.velY + ground >= canvas.height) {
        this.velY *= this.friction;
    }
    else {
        this.velY += this.gravity;
    }
    this.x += this.velX;
    this.y += this.velY;
}

MiniStar.prototype.update = function() {
    this.draw();
    this.move();
    this.lifetime -= 1;
    this.opacity -= 1/this.lifetime;
}


function createMountainRange(num, height, color, start = 0, end = canvas.width) {
    const mountWidth = (end - start) / (2*num);

    for (let i = 0; i < num; i++) {
        const mountStart = lerp(start, end, i/num);

        ctx.beginPath();
        ctx.moveTo(mountStart, canvas.height);
        ctx.lineTo(mountStart + mountWidth, canvas.height - height);
        ctx.lineTo(mountStart + 2*mountWidth, canvas.height);
        ctx.lineTo(mountStart, canvas.height);
        ctx.fillStyle = color;
        ctx.fill();
    }
}




const backgroundGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
backgroundGrad.addColorStop(0.1, '#171E26');
backgroundGrad.addColorStop(1, '#3f586b');

const ground = 100;
let stars;
let miniStars;
let backStars;


function init() {
    stars = [];
    miniStars = [];
    backStars = [];

    for (let i = 0; i < 150; i++) {
        backStars.push(new Star(Math.random() * canvas.width, Math.random() * canvas.height/2, 0, 0, Math.random() * 2, 'white'));
    }
}

function animate() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    ctx.fillStyle = backgroundGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    backStars.forEach(star => {
        star.draw();
    })

    createMountainRange(1, 600, '#384551');
    createMountainRange(2, 400, '#2B3843');
    createMountainRange(3, 265, '#26333E');

    stars.forEach((star, i) => {
        if (star.radius <= 0) {
            stars.splice(i, 1); 
        }
        else {
            star.update();
        }
    });
    miniStars.forEach((mini, i) => {
        if (mini.lifetime == 0) {
            miniStars.splice(i, 1);
        }
        mini.update();
    });

    ctx.fillStyle = '#182028';
    ctx.fillRect(0, canvas.height - ground, canvas.width, ground);

    requestAnimationFrame(animate);
}

init();
animate();