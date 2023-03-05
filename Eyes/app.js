document.addEventListener('mousemove', (e) => {
    const {clientX, clientY} = e;

    const anchor = document.getElementById('anchor');
    const rekt = anchor.getBoundingClientRect();

    const anchorX = rekt.left + rekt.width / 2;
    const anchorY = rekt.top + rekt.height / 2;

    const angleDeg = angle(clientX, clientY, anchorX, anchorY);
    const eyes = document.querySelectorAll('.eye');
    eyes.forEach(eye => {
        eye.style.transform = `rotate(${180 + angleDeg}deg)`;
    })
    anchor.style.filter = `hue-rotate(${angleDeg}deg)`;
})

function angle(cx, cy, ax, ay) {
    const dy = ay - cy;
    const dx = ax - cx;

    const rad = Math.atan2(dy, dx);
    return rad * 180 / Math.PI;
}