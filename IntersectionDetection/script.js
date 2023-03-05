const canvas = document.querySelector("#canvas");



const A = {x:200, y:100};
const B = {x:150, y:250};
const C = {x:50, y:100};
const D = {x:250, y:200};
const E = {x:300, y:300};
const F = {x:250, y:300};
const pieces = [A, B, C, D, E, F];

const rad = 20;

const ctx = canvas.getContext('2d');

///////////////////////////////////////////////////

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
        if (Math.sqrt((e.x - pieces[i].x) * (e.x - pieces[i].x) + (e.y - pieces[i].y) * (e.y - pieces[i].y)) < rad) {
            return pieces[i];
        }
    }
    return null;
}

animate();

function animate() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height)

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.beginPath();
    ctx.moveTo(A.x, A.y);
    ctx.lineTo(B.x, B.y);
    ctx.moveTo(C.x, C.y);
    ctx.lineTo(D.x, D.y);
    ctx.moveTo(E.x, E.y);
    ctx.lineTo(F.x, F.y);

    ctx.stroke();

    drawDot(A, "A");
    drawDot(B, "B");
    drawDot(C, "C");
    drawDot(D, "D");
    drawDot(E, "E");
    drawDot(F, "F");


    const I = getIntersection(A, B, C, D);
    const J = getIntersection(A, B, F, E);
    const P = getIntersection(C, D, F, E);
    drawDot(I, 'I');
    drawDot(J, 'J');
    drawDot(P, 'P');

    // const M = {
    //     x: lerp(A.x, B.x, t),
    //     y: lerp(A.y, B.y, t)
    // }
    // const N = {
    //     x: lerp(C.x, D.x, t),
    //     y: lerp(C.y, D.y, t)
    // }
    // drawDot(M, "M", t < 0 || t > 1)
    // drawDot(N, "N", t < 0 || t > 1)

    // t += 0.005

    requestAnimationFrame(animate)
}



/////////////////////////////////////////////////////


function getIntersection(A, B, C, D) {
    const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
    const bot = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

    if (bot != 0) {
        const t = tTop/bot;
        const u = uTop/bot;
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return {
                x: lerp(A.x, B.x, t),
                y: lerp(A.y, B.y, t),
                offset: t
            }
        }
    }
}

function lerp(A, B, i) {
    return A + (B - A) * i
}


function drawDot(point, label, isOut = false) {

    if (point) {
        
        ctx.beginPath();
        ctx.fillStyle = isOut ? 'red' : 'white';
        ctx.arc(point.x, point.y, rad, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 14px Arial';
        ctx.fillText(`${label}`, point.x, point.y);
    }
}