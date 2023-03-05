const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = window.outerHeight;
canvas.width = window.outerWidth;

let particles = [];

const particlesPerClick = 500;
const angleIncrement = (2 * Math.PI) / particlesPerClick;

let mouse = {
    x: 0,
    y: 0
};

const speed = 7;

const gravity = 0.005;
const friction = 0.996;





const Particle = function(x, y, velocity, color = 'blue', rad = 5) {
    this.x = x;
    this.y = y;
    this.velX = velocity.x;
    this.velY = velocity.y;
    this.rad = rad;
    this.color = color;
    this.alpha = 1;
    this.ran = 1;

    this.genRan = function() {
        this.ran = Math.random();
        while (this.ran > 0.99 || this.ran < 0.005) {
            this.ran = Math.random();
        }
    }
    // this.genRan();

    this.draw = function(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    this.move = function() {
        this.velY *= friction;
        this.velX *= friction;
        this.velY += gravity;
        this.x += this.velX;
        this.y += this.velY;
    }

    this.fade = function() {
        this.alpha -= (0.0015 * this.ran);
    }

    this.update = function() {
        this.draw(ctx);
        this.move();
        this.fade();
    }
}

// function initParticles(num) {

// }



function addEventListeners() {
    canvas.addEventListener('click', onClick);
}

function onClick (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    for (let i = 0; i < particlesPerClick; i++) {
        particles.push(new Particle(
            mouse.x,
            mouse.y,
            {
                x: speed * Math.cos(angleIncrement * i) * Math.random(),
                y: speed * Math.sin(angleIncrement * i) * Math.random()
            },
            `hsl(${Math.random() * 360}, 50%, 50%)`
            // 'red'
            ))
    }
}

const color = 'rgba(4, 5, 9, 0.03)';
function animate() {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((part, index) => {
        if (part.alpha > 0) {
            part.update();
        }
        else {
            particles.splice(index, 1)
        }
    })

    requestAnimationFrame(animate);
}

addEventListeners();
animate();