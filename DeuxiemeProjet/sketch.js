/*

    P5.js transpose le fonctionnement de processing 5 en javascript,
    Il faut donc déclarer les variables et les fonctions, puis la
    fonction setup(), qui est appelée en première, et enfin la fonction
    draw, qui est appelée en boucle.

*/

// VARIABLES

var cheminX = [];
var cheminY = [];
var fourierX;
var fourierY;
var time = 0;
var path = [];
var precision = 2;

// SETUP

function setup() {
    // La page est vide, on crée donc un canva qui a la taille de la page.
    createCanvas(document.body.clientWidth, document.body.clientHeight);

    // La constante skip définit la précision (plus skip est grande, moins le tracé est précis)
    const skip = 10;
    var selectedDraw = drawing; // la variable qui stocke le chemin a dessiner.
    for (i = 0; i < selectedDraw.length; i += skip) {
        // On sépare les x et les y dans deux tableaux différents.
        cheminX.push(selectedDraw[i].x);
        cheminY.push(selectedDraw[i].y);
    }
    // On calcule les transformée de Fourier pour x et y.
    fourierX = dft(cheminX);
    fourierY = dft(cheminY);

    fourierX.sort((a, b) => b.amp - a.amp);
    fourierY.sort((a, b) => b.amp - a.amp);
}

function epiCycles(x, y, rotation, fourier) {
    for (let i = 0; i < fourier.length / precision; i++) {
        let prevx = x;
        let prevy = y;
        let freq = fourier[i].freq;
        let radius = fourier[i].amp;
        let phase = fourier[i].phase;
        x += radius * cos(freq * time + phase + rotation);
        y += radius * sin(freq * time + phase + rotation);

        // Dessin des cercles sur le coté
        stroke(255, 100);
        noFill();
        stroke(255, 0, 0);
        // Les cercles des épicycles, en haut et à gauche.
        ellipse(prevx, prevy, radius * 2);
        stroke(0, 255, 0);
        // Les lignes dans les cercles.
        line(prevx, prevy, x, y);
        stroke(255);
    }
    return createVector(x, y);
}

// DRAW

function draw() {
    background(20);

    let xVector = epiCycles(width / 2 + 100, 100, 0, fourierX);
    let yVector = epiCycles(200, height / 2 + 100, HALF_PI, fourierY);
    let v = createVector(xVector.x, yVector.y);
    path.unshift(v);
    stroke(200, 200, 0); // jaune
    //Les deux lignes
    line(xVector.x, xVector.y, v.x, v.y);
    line(yVector.x, yVector.y, v.x, v.y);

    beginShape();
    noFill();
    for (let i = 0; i < path.length; i++) {
        vertex(path[i].x, path[i].y);
    }
    stroke(0, 0, 255);
    endShape(); // C'est cette ligne qui affiche tout le dessin.
    stroke(255);

    const dt = TWO_PI / fourierY.length;
    time += dt;

    if (time > TWO_PI * 2) {
        // noLoop();
        time = 0;
        path = [];
    }
}
