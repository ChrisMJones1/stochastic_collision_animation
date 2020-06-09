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
    return "#" + (getRndInteger(0, (256))).toString(16).padStart(2, '0') + (getRndInteger(0, (256))).toString(16).padStart(2, '0') + (getRndInteger(0, (256))).toString(16).padStart(2, '0');

}

//Modified and expanded version of collision function created by jsfiddle user Inkfood
function collision_calc(ballOne, ballTwo, indexOne, indexTwo) {
    let deltaX = ballOne.x - ballTwo.x;
    let deltaY = ballOne.y - ballTwo.y;
    let collisionAngle = Math.atan2(deltaY, deltaX);
    let magOne = Math.sqrt(ballOne.forcex * ballOne.forcex + ballOne.forcey * ballOne.forcey);
    let magTwo = Math.sqrt(ballTwo.forcex * ballTwo.forcex + ballTwo.forcey * ballTwo.forcey);
    let dirOne = Math.atan2(ballOne.forcey, ballOne.forcex);
    let dirTwo = Math.atan2(ballTwo.forcey, ballTwo.forcex);
    firstCircles[indexOne].forcex = magOne * Math.cos(dirOne - collisionAngle);
    firstCircles[indexOne].forcey = magOne * Math.sin(dirOne - collisionAngle);
    firstCircles[indexTwo].forcex = magTwo * Math.cos(dirTwo - collisionAngle);
    firstCircles[indexTwo].forcey = magTwo * Math.sin(dirTwo - collisionAngle);

    firstCircles[indexTwo].color = firstCircles[indexOne].color;

    //random point mutation
    if(Math.random() > 0.95)
    {
        firstCircles[indexTwo].color = getRndHexColor();
    }

}

const themeColors = ["#00ffff", "#9952e0", "#ff7bac", "#3fa9f5", "#FFF"];

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


let pageWidth = window.innerWidth;
let pageHeight =  window.innerHeight;

let vmin = pageHeight < pageWidth ? pageHeight / 100 : pageWidth / 100;
let vmax = pageHeight >= pageWidth ? pageWidth / 100 : pageHeight / 100;


ctx.canvas.width  = pageWidth;
ctx.canvas.height = pageHeight;

ctx.fillStyle = 'white';
ctx.strokeStyle = 'white';

// ctx.font = ctx.font = "2em League Spartan";

let randomWidth = getRndInteger(0, (pageWidth));
let randomHeight = getRndInteger(0, (pageHeight));

let randomx = getRndInteger(0, (pageWidth));
let randomy = getRndInteger(0, (pageHeight));


let animationFrame;

let radius = 25;

let gap = 5;

//ctx.fillRect((pageWidth / 2) - (randomWidth / 2), (pageHeight / 2) - (randomHeight / 2), randomWidth, randomHeight);

let firstCircles = [];

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
            let circ = new Circle(x, y, radius, getRndIntegerInc(-radius / 6, radius / 6), getRndIntegerInc(-radius / 6, radius / 6), `${x}${y}`);
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
    animationFrame = window.requestAnimationFrame(update);
}

let tick = true;
let nextframe;
let collide_buffer = new Set();
let i = 0;
let j = 0;
let k = 0;

let color2 = 'white';
let color1 = 'cyan';

function update() {
    // if(j > pageWidth && i > pageHeight) {
    //     j = 0;
    //     i = 0;
    //     // let col = color2;
    //     // color2 = color1;
    //     // color1 = col;
    // }

    if(j > 100) {
        tick = false;
        j = 100;
    } else if(j < 0) {
        tick = true;
        j = 0;
    }

    let gradient = ctx.createLinearGradient(0,0, pageWidth, pageHeight);
    gradient.addColorStop(0, color1);

    gradient.addColorStop(j/100, color2);

    gradient.addColorStop(1, color1);



    ctx.clearRect(0, 0, pageWidth, pageHeight);
    ctx.font = "6vmin League Spartan";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    let text1 = "Christopher Jones";
    let text = "Full Stack Developer"
    let text2 = "Bringing Order to the Chaos"
    let textLeft = Math.floor((pageWidth/2) - (ctx.measureText(text).width / 2) - radius);
    let textRight = Math.ceil((ctx.measureText(text).actualBoundingBoxRight + (pageWidth/2) + radius));
    let textTop = Math.floor((pageHeight/2) - ctx.measureText(text).actualBoundingBoxAscent - radius);
    let textBottom = Math.ceil(ctx.measureText(text).actualBoundingBoxDescent) + (pageHeight/2) + radius;
    ctx.fillText(text, pageWidth/2, pageHeight/2);

    let text2height = ctx.measureText(text2).actualBoundingBoxDescent + ctx.measureText(text2).actualBoundingBoxAscent;

    ctx.font = "9vmin League Spartan";
    ctx.fillStyle = 'cyan';
    let text1height = ctx.measureText(text1).actualBoundingBoxDescent + ctx.measureText(text1).actualBoundingBoxAscent;
    ctx.fillText(text1, pageWidth/2, textTop);

    ctx.fillStyle = 'white';
    ctx.font = "6vmin League Spartan";
    ctx.fillText(text2, pageWidth/2, textBottom + text2height/2);

    textTop -= text1height;
    textBottom += text2height;

    textLeft = Math.floor((pageWidth/2) - (ctx.measureText(text2).width / 2) - radius);
    textRight = Math.ceil((ctx.measureText(text2).actualBoundingBoxRight + (pageWidth/2) + radius));



    ctx.strokeStyle = 'cyan';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(textLeft, textTop);
    ctx.lineTo(textRight, textTop);
    ctx.lineTo(textRight, textBottom);
    ctx.lineTo(textLeft, textBottom);
    ctx.lineTo(textLeft, textTop);
    ctx.stroke();

    let collide_interbuffer = new Set();
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
    }
    for (let c of firstCircles) {
        let collision = (firstCircles.filter(circ => (Math.sqrt((c.x - circ.x) * (c.x - circ.x) + (c.y - circ.y) * (c.y - circ.y))) < (c.radius + circ.radius)));

        if (collision.length > 1) {
            let index1 = firstCircles.findIndex(i => i.id === c.id);
            let ball1 = firstCircles[index1];
            for (let collide of collision) {

                if(collide.id !== c.id && !collide_buffer.has(collide.id) && !collide_buffer.has(c.id)) {
                    let index2 = firstCircles.findIndex(i => i.id === collide.id);

                    let ball2 = firstCircles[index2];

                    collision_calc(ball1, ball2, index1, index2);

                    collide_interbuffer.add(collide.id);
                    collide_interbuffer.add(c.id);
                }

            }
        }
        //|| (c.x >= textLeft - radius && c.x <= textRight + radius && c.y >= textTop - radius && c.y <= textBottom + radius)

        if(c.x >= textLeft && c.x <= textRight && c.y > textTop - radius && c.y <= pageHeight / 2) {
            c.y = textTop - radius;
        } else if(c.x >= textLeft && c.x <= textRight && c.y < textBottom + radius && c.y > pageHeight / 2) {
            c.y = textBottom + radius;
        }

        if(c.y <= textBottom && c.y >= textTop && c.x > textLeft - radius && c.x <= pageWidth / 2) {
            c.x = textLeft - radius;
        } else if(c.y <= textBottom && c.y >= textTop && c.x < textRight + radius && c.x > pageWidth / 2) {
            c.x = textRight + radius;
        }



        if (c.x >= pageWidth - radius / 2 || c.x <= radius / 2 || (c.y >= textTop - radius && c.y <= textBottom + radius && c.x === textLeft - radius || c.x === textRight + radius)) {
            c.forcex *= -1;
            // c.color = getRndHexColor();
        }

        if (c.y >= pageHeight - radius / 2 || c.y <= radius / 2 || (c.x >= textLeft - radius && c.x <= textRight + radius && c.y === textTop - radius || c.y === textBottom + radius)) {
            c.forcey *= -1;
            // c.color = getRndHexColor();
        }

        c.x = c.x < radius / 2 ? radius / 2 : c.x > pageWidth - radius / 2 ? pageWidth - radius / 2 : c.x;
        c.y = c.y < radius / 2 ? radius / 2 : c.y > pageHeight - radius / 2 ? pageHeight - radius / 2 : c.y;
        // c.radius = radius + getRndInteger(-radius / 10, radius / 10);



    }
    // for (let col_id of collision_set) {
    //
    //     let index = firstCircles.findIndex(i => i.id === col_id);
    //     firstCircles[index].forcex *= -1;
    //     firstCircles[index].forcey *= -1;
    //     // let stochasticity = 0.5 > Math.random() ? 1 : -1;
    //     // firstCircles[index].x += radius * stochasticity;
    //     // stochasticity = 0.5 > Math.random() ? 1 : -1;
    //     // firstCircles[index].y += radius * stochasticity;
    // }


    collide_buffer = collide_interbuffer;
    // k++;
    // if (k > 8) {
    //     j += pageWidth / 100;
    //     i += pageHeight / 100;
    //     k = 0;
    // }

    if (tick === true) {
        j += 0.5;
    } else {
        j -= 0.5;
    }

    animationFrame = window.requestAnimationFrame(update);


}

function resize() {
    window.cancelAnimationFrame(animationFrame);
    pageHeight = window.innerHeight;
    pageWidth = window.innerWidth;

    ctx.canvas.width  = pageWidth;
    ctx.canvas.height = pageHeight;
    firstCircles = [];
    vmin = pageHeight < pageWidth ? pageHeight / 100 : pageWidth / 100;
    vmax = pageHeight >= pageWidth ? pageHeight / 100 : pageWidth / 100;
    firstDraw();
}



window.addEventListener('load', firstDraw);

window.onresize = resize;