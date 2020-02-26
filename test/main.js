// VARIABLES
var userIsDrawing;
var x, y;
var positions = [];
var temps;

var DEMI_LARGEUR;
var DEMI_HAUTEUR;

function recordDraw() {
    if ((positions[positions.length - 1].x - mouseX) ^ 2 > 10) {
        text("user is moving", 200, 250);
        positions.push({
            x: mouseX,
            y: mouseY
        });
    }

    for (i = 1; i < positions.length; i++) {
        xPrecedent = positions[i - 1].x;
        yPrecedent = positions[i - 1].y;
        x = positions[i].x;
        y = positions[i].y;

        stroke(255);
        line(xPrecedent, yPrecedent, x, y);
        noStroke();
    }
}

function drawCircles() {
    var x = DEMI_LARGEUR;
    var y = DEMI_HAUTEUR;
    var xPrecedent;
    var yPrecedent;

    var circles = [
        {
            rayon: 100,
            frequence: 1,
            phase: 0
        },
        {
            rayon: 50,
            frequence: 2,
            phase: 0
        }
    ];

    for (i = 0; i < circles.length; i++) {
        xPrecedent = x;
        yPrecedent = y;
        x += circles[i].rayon * Math.cos((circles[i].frequence * temps + circles[i].phase) % (Math.PI * 2));
        y += circles[i].rayon * Math.sin((circles[i].frequence * temps + circles[i].phase) % (Math.PI * 2));

        noFill();
        stroke(255);
        circle(xPrecedent, yPrecedent, 2 * circles[i].rayon);
        stroke(255, 0, 0);
        line(xPrecedent, yPrecedent, x, y);
        noStroke();
    }



    temps += 0.05;
}

// SETUP
function setup() {
    // La page est vide, on crée donc un canva qui a la taille de la page.
    createCanvas(document.body.clientWidth, document.body.clientHeight);
    userIsDrawing = false;
    noStroke();
    fill(255);

    temps = 0;

    DEMI_LARGEUR = document.body.clientWidth / 2;
    DEMI_HAUTEUR = document.body.clientHeight / 2;
}

// DRAW
function draw() {
    background(20);
    noStroke();
    fill(255);

    if (userIsDrawing) {
        text("user is drawing", 200, 200);
        recordDraw();

    } else {
        text("user is not drawing", 200, 200);
        drawCircles();
    }
}

function mousePressed() {
    // Quand l'utilisateur appuie sur la souris, c'est pour dessiner un chemin,
    // on passe en 'mode user', et on vide le chemin actuel
    userIsDrawing = true;
    positions = [
        {
            x: mouseX,
            y: mouseY
        }
    ];
}

function mouseReleased() {
    // Quand l'utilisateur relache la souris, l'ordi calcule les coefficients de
    userIsDrawing = false;
    console.log(positions);
}
