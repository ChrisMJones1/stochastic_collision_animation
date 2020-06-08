function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function getRndIntegerInc(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getRndHexColor() {
    // let r = getRndInteger(0, (256));
    // let g = getRndInteger(0, (256));
    // let b = getRndInteger(0, (256));
    return "#" + (getRndInteger(0, (256))).toString(16) + (getRndInteger(0, (256))).toString(16) + (getRndInteger(0, (256))).toString(16);

}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


const pageWidth = window.innerWidth;
const pageHeight =  window.innerHeight;

ctx.canvas.width  = pageWidth;
ctx.canvas.height = pageHeight;

ctx.fillStyle = 'white';
ctx.strokeStyle = 'white';

let randomWidth = getRndInteger(0, (pageWidth));
let randomHeight = getRndInteger(0, (pageHeight));

let randomx = getRndInteger(0, (pageWidth));
let randomy = getRndInteger(0, (pageHeight));



let radius = 10;

let gap = 5;

//ctx.fillRect((pageWidth / 2) - (randomWidth / 2), (pageHeight / 2) - (randomHeight / 2), randomWidth, randomHeight);

const firstCircles = [];

// ctx.beginPath();
// ctx.fillStyle = 'white';
// ctx.arc(0, 0, radius, 0, Math.PI * 2)
// ctx.fill();

console.log(getRndHexColor());

class Circle {
    constructor(x, y, radius, forcex, forcey, id) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = getRndHexColor();
        this.forcex = forcex;
        this.forcey = forcey;
        this.id = id;
    }
}

function firstDraw() {
    const circles = []

    for(let x = gap + radius; x < pageWidth - gap - radius / 2; x = x + radius * 2 + gap) {
        for(let y = gap + radius; y < pageHeight - gap - radius / 2; y = y + radius * 2 + gap) {
            let circ = new Circle(x, y, radius, getRndIntegerInc(-radius / 8, radius / 8), getRndIntegerInc(-radius / 8, radius / 8), `${x}${y}`);
            circles.push(circ);
        }
    }

    for (let c of circles) {

        if(Math.random() > 0.95) {
            ctx.beginPath();
            // ctx.lineWidth = getRndInteger(1, 7);
            ctx.strokeStyle = getRndHexColor();
            ctx.arc(c.x, c.y, radius, 0, Math.PI * 2)
            ctx.stroke();

            c.x = c.x + c.forcex;
            c.y = c.y + c.forcey;
            // c.radius = radius + getRndIntegerInc(-radius / 10, radius / 10);


            firstCircles.push(c);
        }

    }
    window.requestAnimationFrame(update);
}

let tick = 0;
let nextframe;

function update() {

    const collision_set = new Set();
    ctx.clearRect(0, 0, pageWidth, pageHeight);

    for (let c of firstCircles) {

        ctx.beginPath();
        // ctx.lineWidth = getRndInteger(1, 7);
        ctx.strokeStyle = c.color;
        // ctx.moveTo(c.x, c.y);
        ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2)
        ctx.stroke();

        c.x = c.x + c.forcex;
        c.y = c.y + c.forcey;


        //check for collision
        const collision = [];
        collision.push(firstCircles.filter(circ => (Math.sqrt((c.x - circ.x) * (c.x - circ.x) + (c.y - circ.y) * (c.y - circ.y))) < (c.radius + circ.radius)));
        if (collision.length > 1) {
            for (let collide of collision) {
                collision_set.add(collide.id);
            }
        }

        if (c.x >= pageWidth - radius / 2 || c.x <= radius / 2) {
            c.forcex *= -1;
            c.color = getRndHexColor();
        }

        if (c.y >= pageHeight - radius / 2 || c.y <= radius / 2) {
            c.forcey *= -1;
            c.color = getRndHexColor();
        }

        c.x = c.x < radius / 2 ? radius / 2 : c.x > pageWidth - radius / 2 ? pageWidth - radius / 2 : c.x
        c.y = c.y < radius / 2 ? radius / 2 : c.y > pageHeight - radius / 2 ? pageHeight - radius / 2 : c.y
        // c.radius = radius + getRndInteger(-radius / 10, radius / 10);

    }
    for (let col_id of collision_set) {

        let index = firstCircles.findIndex(i => i.id === col_id);
        firstCircles[index].forcex *= -1;
        firstCircles[index].forcey *= -1;
    }

    console.log(collision_set);


    window.requestAnimationFrame(update);


}

function requestUpdate() {

}



window.addEventListener('load', firstDraw);