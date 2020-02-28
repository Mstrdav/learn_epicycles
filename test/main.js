// VARIABLES
var utilisateurDessine;
var x, y;
var positions = [];
var temps;
var shape = [];

var DEMI_LARGEUR;
var DEMI_HAUTEUR;

var cercles = [];

var précisionss = 10;
var skip;

function enregistrerDessin() {
    if ((positions[positions.length - 1].x - mouseX) ^ 2 > 4) {
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

function dessinerCercles() {
    var x = DEMI_LARGEUR;
    var y = DEMI_HAUTEUR;
    var xPrecedent;
    var yPrecedent;
    var repetitions;

    if (cercles.length > precision) {
        repetitions = precision;
    } else {
        repetitions = cercles.length;
    }

    for (i = 0; i < repetitions; i++) {
        // Les x et y précédents sont stockés dans une variable.
        xPrecedent = x;
        yPrecedent = y;

        // Puis on calcule les coordonnées du cercle suivant
        x += cercles[i].rayon * Math.cos((cercles[i].frequence * temps + cercles[i].phase) % (Math.PI * 2));
        y += cercles[i].rayon * Math.sin((cercles[i].frequence * temps + cercles[i].phase) % (Math.PI * 2));

        // On dessine enfin le cercle et son rayon
        noFill();
        stroke(120);
        circle(xPrecedent, yPrecedent, 2 * cercles[i].rayon);
        stroke(cercles[i].red, cercles[i].green, cercles[i].blue);
        line(xPrecedent, yPrecedent, x, y);
    }

    shape.push({
        x: x,
        y: y
    });

    if (skip != 0) {
        temps += skip;
    } else {
        temps += 0.05;
    }

    if (temps > Math.PI * 4) {
        shape = [];
        temps = 0;
    }
}

function dessinerForme() {
    beginShape();
    for (i = 0; i < shape.length; i++) {
        vertex(shape[i].x, shape[i].y);
    }
    endShape();
}

function calculerCercles() {
    console.log(positions);
    temps = 0;
    forme = [];

    cercles = transformeeDeFourier(positions);
}

// Calcul des cercles via la transformée de Fourier. Fonction écrite à l'aide de The CodingTrain.

// TODO: A changer et/ou compléter.
function transformeeDeFourier(x) {
    // On initialise la valeur de retour
    let nouveauxCercles = [];

    for (i = 0; i < x.length; i++) {
        var re = 0;
        var im = 0;
        for (j = 0; j < x.length; j++) {
            var phi = (TWO_PI * i * j) / x.length;
            re += (x[j].x - document.body.clientWidth/2) * cos(phi) + (x[j].y - document.body.clientHeight/2) * sin(phi);
            im += (x[j].x - document.body.clientWidth/2) * -sin(phi) + (x[j].y - document.body.clientHeight/2) * cos(phi);
        }
        re = re / x.length;
        im = im / x.length;

        var freq = i;
        var r = sqrt(re * re + im * im);
        var phase = atan2(im, re);
        nouveauxCercles[i] = {
            rayon: r,
            frequence: freq,
            phase: phase,
            red: random(0, 1) * 255,
            green: random(0, 1) * 255,
            blue: random(0, 1) * 255
        };
    }
    nouveauxCercles.sort((a, b) => b.rayon - a.rayon);
    return nouveauxCercles;
}

// SETUP
function setup() {
    // La page est vide, on crée donc un canva qui a la taille de la page.
    createCanvas(document.body.clientWidth, document.body.clientHeight);
    utilisateurDessine = false;
    noStroke();
    fill(255);

    temps = 0;
    precision = 10;
    skip = 0;

    DEMI_LARGEUR = document.body.clientWidth / 2;
    DEMI_HAUTEUR = document.body.clientHeight / 2;

    // Pour l'instant, on a des cercles prédéfinis
    cercles = [
        {
            rayon: 100,
            frequence: 1,
            phase: Math.PI / 2,
            red: random(0, 1) * 255,
            green: random(0, 1) * 255,
            blue: random(0, 1) * 255
        },
        {
            rayon: 50,
            frequence: 3,
            phase: Math.PI / 2,
            red: random(0, 1) * 255,
            green: random(0, 1) * 255,
            blue: random(0, 1) * 255
        },
    ];
}

// DRAW
function draw() {
    background(20);
    noStroke();
    fill(255);

    if (utilisateurDessine) {
        text("user is drawing", 200, 200);
        enregistrerDessin();

    } else {
        text("user is not drawing", 200, 200);
        dessinerCercles();
        dessinerForme();
    }
}

function mousePressed() {
    // Quand l'utilisateur appuie sur la souris, c'est pour dessiner un chemin,
    // on passe en 'mode user', et on vide le chemin actuel
    utilisateurDessine = true;
    positions = [
        {
            x: mouseX,
            y: mouseY
        }
    ];
    shape = [];
    temps = 0;
}

function touchStarted() {
    mousePressed();
}

function touchEnded() {
    mouseReleased();
}

function mouseReleased() {
    calculerCercles();
    // Quand l'utilisateur relache la souris, l'ordi calcule les coefficients de
    utilisateurDessine = false;
    skip = Math.PI * 2 / cercles.length;
}
