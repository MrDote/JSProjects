function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFromRange(min, max) {
    return min + Math.random() * (max - min);
}

function randomColor(colors) {
    return colors[randomIntFromRange(colors.length - 1, 0)]
}

function lerp(A, B, i) {
    return A + (B - A) * i
}