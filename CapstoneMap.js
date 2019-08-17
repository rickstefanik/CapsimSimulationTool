/* eslint-disable space-before-function-paren */
/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable semi */
const canvasId = 'myCanvas';
const backgroundColor = 'white';
const foregroundColor = 'black';

let curYear = 2020;
const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
const circles = [
    {
        name: 'traditional',
        x: 5,
        y: 15,
        r1: 2.5,
        r2: 4,
        driftX: 0.7 / 12,
        driftY: -1 * (0.7 / 12),
        offsetX: 0,
        offsetY: 0
    },
    {
        name: 'low-end',
        x: 2.5,
        y: 17.5,
        r1: 2.5,
        r2: 4,
        driftX: 0.5 / 12,
        driftY: -1 * (0.5 / 12),
        offsetX: -0.8,
        offsetY: 0.8
    },
    {
        name: 'high-end',
        x: 7.5,
        y: 12.5,
        r1: 2.5,
        r2: 4,
        driftX: 0.9 / 12,
        driftY: -1 * (0.9 / 12),
        offsetX: 1.4,
        offsetY: -1.4
    },
    {
        name: 'size',
        x: 3,
        y: 12,
        r1: 2.5,
        r2: 4,
        driftX: 0.7 / 12,
        driftY: -1 * (1 / 12),
        offsetX: 1,
        offsetY: -1.4
    },
    {
        name: 'performance',
        x: 8,
        y: 17,
        r1: 2.5,
        r2: 4,
        driftX: 1 / 12,
        driftY: -1 * (0.7 / 12),
        offsetX: 1.4,
        offsetY: -1
    }
];

let products = [];
let curMonth = 0;

const redraw = () => {
    const c = document.getElementById(canvasId);
    const ctx = c.getContext('2d');

    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = foregroundColor;
    const drawLine = (x, y, x1, y1) => {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x1, y1);
        ctx.stroke();
    };

    const map = (xVal, yVal) => {
        return {
            x: xVal * 25 + 50,
            y: 552 - yVal * 25
        };
    };

    const getRad = r => r * 25;

    ctx.font = '20px Arial';
    for (let i = 0; i <= 10; i++) {
        const xGrid = 40 + 50 * i;
        ctx.fillText((i * 2).toString(), xGrid, 575);
        drawLine(xGrid + 10, 552, xGrid + 10, 50);
    }

    for (let i = 11; i >= 1; i--) {
        const yGrid = 10 + 50 * i;
        ctx.fillText(((10 - i + 1) * 2).toString(), 20, yGrid);
        drawLine(50, yGrid - 8, 550, yGrid - 8);
    }
    ctx.fillText(MONTHS[curMonth] + ' ' + curYear, 250, 25);

    const drawCircle = (x, y, r) => {
        ctx.fillStyle = foregroundColor;
        const radius = getRad(r);
        const q = map(x, y);
        const centerX = q.x;
        const centerY = q.y;

        ctx.fillStyle = foregroundColor;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.stroke();
    };

    const drawDottedCircle = (cX, cY, r) => {
        ctx.fillStyle = foregroundColor;
        const radius = getRad(r);
        const q = map(cX, cY);
        const centerX = q.x;
        const centerY = q.y;

        const canvas = document.getElementById(canvasId);
        const context = canvas.getContext('2d');

        const dotsPerCircle = 75;

        const interval = (Math.PI * 2) / dotsPerCircle;
        for (let i = 0; i < dotsPerCircle; i++) {
            const desiredRadianAngleOnCircle = interval * i;
            const x = centerX + radius * Math.cos(desiredRadianAngleOnCircle);
            const y = centerY + radius * Math.sin(desiredRadianAngleOnCircle);

            context.beginPath();
            context.arc(x, y, 1, 0, Math.PI * 2);
            context.closePath();
            context.fill();
        }
    };

    const drawPoint = (cX, cY, color, text) => {
        ctx.fillStyle = foregroundColor;
        const q = map(cX, cY);
        const x = q.x;
        const y = q.y;

        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.font = '15px Arial';
        ctx.fillText(text, x - 15, y - 10);
    };

    circles.forEach(circle => {
        drawCircle(circle.x, circle.y, circle.r1);
        drawPoint(
            circle.x + circle.offsetX,
            circle.y + circle.offsetY,
            circle.color,
            circle.name
        );
        drawDottedCircle(circle.x, circle.y, circle.r2);
    });

    products.forEach(product => {
        drawPoint(product.x, product.y, product.color, product.name);
    });

    let pListString = '';
    products.forEach(product => {
        const { name, x, y } = product;
        pListString += `<div class="card text-white bg-secondary my-1">  
                            <div style="padding: .25rem;"class="card-body">
                                <h4 style="display: inline">
                                    <span class="badge badge-pill badge-dark badge-large">
                                        ${name}
                                    </span>
                                </h4>
                                - Performance: ${x}
                                <div class="btn-group mx-2" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn-sm btn-primary pfmnDecButton" id="pfmnDec${
                                        name
                                    }">
                                        -
                                    </button> 
                                    <button type="button" class="btn btn-sm btn-primary pfmnIncButton" id="pfmnInc${
                                        name
                                    }">
                                        +
                                    </button> 
                                </div>
                                Size: ${y}
                                <div class="btn-group mx-2" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn-sm btn-primary sizeDecButton" id="sizeDec${
                                        name
                                    }">
                                        -
                                    </button> 
                                    <button type="button" class="btn btn-sm btn-primary sizeIncButton" id="sizeInc${
                                        name
                                    }">
                                        +
                                    </button> 
                                </div>
                                <button class="deleteProductButton btn btn-danger mx-2" id="${
                                    name
                                }"> 
                                    Delete 
                                </button>
                            </div>
                        </div>`;
    })
    document.getElementById('productDiv').innerHTML = pListString;
};
redraw();

const drift = () => {
    for (let i = 0; i < circles.length; i++) {
        circles[i].x += circles[i].driftX;
        circles[i].y += circles[i].driftY;
    }
    curMonth += 1;
    if (curMonth === 12) {
        curMonth = 0;
        curYear++;
    }
    redraw();
};

const backDrift = () => {
    for (let i = 0; i < circles.length; i++) {
        circles[i].x -= circles[i].driftX;
        circles[i].y -= circles[i].driftY;
    }
    curMonth -= 1;
    if (curMonth === -1) {
        curMonth = 11;
        curYear--;
    }
    redraw();
};

$('body').on('click', '.deleteProductButton', function() {
    for (let i = products.length - 1; i >= 0; i--) {
        if (products[i].name === $(this)[0]['id']) {
            products.splice(i, 1);
        }
    }
    if (products.length === 0) {
        document.getElementById('deleteAllButton').style.visibility = 'hidden';
    }
    redraw();
});

$('body').on('click', '.pfmnDecButton', function() {
    console.log('clicked');
    for (let i = products.length - 1; i >= 0; i--) {
        console.log($(this));
        if (products[i].name === $(this)[0]['id'].substring(7)) {
            products[i].x = (
                Math.round((parseFloat(products[i].x) - 0.1) * 10) / 10
            ).toString();
        }
    }
    redraw();
});

$('body').on('click', '.pfmnIncButton', function() {
    for (let i = products.length - 1; i >= 0; i--) {
        if (products[i].name === $(this)[0]['id'].substring(7)) {
            products[i].x = (
                Math.round((parseFloat(products[i].x) + 0.1) * 10) / 10
            ).toString();
        }
    }
    redraw();
});

$('body').on('click', '.sizeDecButton', function() {
    for (let i = products.length - 1; i >= 0; i--) {
        if (products[i].name === $(this)[0]['id'].substring(7)) {
            products[i].y = (
                Math.round((parseFloat(products[i].y) - 0.1) * 10) / 10
            ).toString();
        }
    }
    redraw();
});

$('body').on('click', '.sizeIncButton', function() {
    for (let i = products.length - 1; i >= 0; i--) {
        if (products[i].name === $(this)[0]['id'].substring(7)) {
            products[i].y = (
                Math.round((parseFloat(products[i].y) + 0.1) * 10) / 10
            ).toString();
        }
    }
    redraw();
});

const makeNewProduct = (
    performanceInput,
    sizeInput,
    nameInput,
    colorInput
) => {
    products.push({
        x: performanceInput,
        y: sizeInput,
        name: nameInput,
        color: colorInput
    });
    document.getElementById('deleteAllButton').style.visibility = 'visible';

    redraw();
};

const dButton = document.getElementById('driftButton');
dButton.onclick = () => {
    drift();
};

const dyButton = document.getElementById('driftYearButton');
dyButton.onclick = () => {
    for (let i = 0; i < 12; i++) {
        drift();
    }
};

const dbButton = document.getElementById('driftBackButton');
dbButton.onclick = () => {
    backDrift();
};

const dbyButton = document.getElementById('driftBackYearButton');
dbyButton.onclick = () => {
    for (let i = 0; i < 12; i++) {
        backDrift();
    }
};

const pButton = document.getElementById('newProductButton');
pButton.onclick = () => {
    const nameInput = document.getElementById('nameInput').value;
    const performanceInput = document.getElementById('performanceInput').value;
    const sizeInput = document.getElementById('sizeInput').value;
    const colorInput = document.getElementById('colorInput').value;

    makeNewProduct(performanceInput, sizeInput, nameInput, colorInput);
};

const importButton = document.getElementById('importProductsButton');
importButton.onclick = () => {
    const typeImport = document.getElementById('importTypeInput').value;
    const cString = document.getElementById('capstoneInput').value;
    const colorInput = document.getElementById('colorInput2').value;

    const flaggedWords = [
        'Andrews',
        'Baldwin',
        'Chester',
        'Digby',
        'Erie',
        'Ferris',
        'Name',
        'Pfmn',
        'Size',
        'Revised'
    ];

    const d = cString
        .split(/(\s+)/)
        .filter(a => /\S/.test(a))
        .filter(a => {
            for (let j = 0; j < flaggedWords.length; j++) {
                if (a === flaggedWords[j]) {
                    return false;
                }
            }
            return a.indexOf('/') === -1;
        });

    if (typeImport === 'From Capstone') {
        let i = 0;
        while (i < d.length) {
            if (d[i].length > 0 && d[i][0] === 'D') {
                makeNewProduct(d[i + 1], d[i + 2], d[i], colorInput);
            }
            i++;
        }
    } else if (typeImport === 'From Courier') {
        for (let i = 0; i < d.length; i += 3) {
            makeNewProduct(d[i + 1], d[i + 2], d[i], colorInput);
        }
    }
};

const getCursorPosition = (c, event) => {
    const rect = c.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const xClickPos = (x - 50) / 25;
    const yClickPos = (-1 * (y - 552)) / 25;

    document.getElementById('xClickSpan').innerHTML =
        'X: ' + xClickPos.toString();
    document.getElementById('yClickSpan').innerHTML =
        'Y: ' + yClickPos.toString();
};

$(`#${canvasId}`).click(e => {
    const canv = document.getElementById(canvasId);
    getCursorPosition(canv, e);
});

const clearNewFields = () => {
    document.getElementById('nameInput').value = '';
    document.getElementById('sizeInput').value = '';
    document.getElementById('performanceInput').value = '';
};

$('#nameInput, #sizeInput, #performanceInput').on('keyup', e => {
    if (e.keyCode === 13) {
        $('#newProductButton').click();
        clearNewFields();
    }
});

$('#deleteAllButton').click(() => {
    products = [];
    document.getElementById('deleteAllButton').style.visibility = 'hidden';
    redraw();
});
