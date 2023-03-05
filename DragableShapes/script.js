let canvas = document.querySelector('#canvas')
let ctx = canvas.getContext("2d");

let pieces = [];

let selectedPiece = null;

addEventListeners();

function addEventListeners() {
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
}

function onMouseDown (e) {
    selectedPiece = getPressedPiece(e);
    
    if (selectedPiece != null) {
        selectedPiece.offset = {
            x: e.x - selectedPiece.x,
            y: e.y - selectedPiece.y
        }
    }
}

function onMouseMove(e) {
    if (selectedPiece != null) {
        selectedPiece.x = e.x - selectedPiece.offset.x;
        selectedPiece.y = e.y - selectedPiece.offset.y;
    }
}

function onMouseUp(e) {
    selectedPiece = null;
}

function getPressedPiece(e) {
    for (let i = pieces.length - 1; i >= 0; i--) {
        if (e.x > pieces[i].x && e.x < pieces[i].x + pieces[i].width && e.y > pieces[i].y && e.y < pieces[i].y + pieces[i].height) {
            // console.log('selected piece')
            return pieces[i];
        }
    }
    return null;
}

function initializePieces(numPieces = 1) {
    pieces = [];
    for (let i = 0; i < numPieces; i++) {
        pieces.push(new Square());
    }
}


const Square = function() {
    this.x = 200;
    this.y = 300;
    this.width = 200;
    this.height = 150;

    this.draw = function(ctx) {
        ctx.beginPath();
        ctx.fillStyle = 'red'
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.stroke();
    }
}

function animate() {
    canvas.width = window.outerWidth;
    canvas.height = window.outerHeight;
    for (let i = 0; i< pieces.length; i++) {
        pieces[i].draw(ctx);
    }
    window.requestAnimationFrame(animate);
}

initializePieces(2);
animate();