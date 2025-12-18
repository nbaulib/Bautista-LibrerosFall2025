//https://www.geeksforgeeks.org/html/how-to-draw-with-mouse-in-html-5-canvas/


// wait for the content of the window element
// to load, then performs the operations.
// This is considered best practice.
window.addEventListener('load', function () {
    resize();
    document.addEventListener('mousedown', drawDots);
    window.addEventListener('resize', resize);
});

const canvas = document.querySelector('#canvas-bg');

// Context for the canvas for 2 dimensional operations
const ctx = canvas.getContext('2d');

let count = 1;

// Resizes the canvas to the available size of the window.
function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}

// Updates the coordianates of the cursor when 
// an event e is triggered to the coordinates where 
// the said event is triggered.
function getPosition(event) {
    return {
        x: event.clientX - canvas.offsetLeft,
        y: event.clientY - canvas.offsetTop
    };
}

function randomDots(event) {
    const coord = getPosition(event);

    const spreadRadius = 120;

    for (let i = 0; i < count; i++) {
        // Random offset from click point
        const offsetX = (Math.random() - 0.5) * spreadRadius * 2;
        const offsetY = (Math.random() - 0.5) * spreadRadius * 2;

        ctx.beginPath();
        ctx.arc(
            coord.x + offsetX,
            coord.y + offsetY,
            (Math.random() + 0.2) * 5 * 2, // dot radius
            0,
            Math.PI * 2
        );
        ctx.fill();
    }
}

function drawDots(event) {
    ctx.fillStyle = '#56310cac';
    randomDots(event);
    count++;
}