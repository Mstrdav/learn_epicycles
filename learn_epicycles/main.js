// VARIABLES
var utilisateurDessine; // Booléen qui indique si l'utilisateur est en train de dessiner ou pas
var recentrer; // Booléen qui indique si le dessin doit être recentré ou pas

var x, y;
var positions = [];
var temps;
var shape = [];

var DEMI_LARGEUR;
var DEMI_HAUTEUR;

var cercles = [];

var précision;
var skip;
var vitesse;

var formula = '';

var bgColor;
var textColor;

function enregistrerDessin() {
    if ((pmouseX - mouseX) ^ 2 > 4) {
        text("user is moving", 100, 150);
        positions.push({
            x: mouseX,
            y: mouseY
        });
    }
    
    if(positions.length > 5) {
        bibli.classList = "";
        boutonCharger.classList = "";
        boutonAvion.classList = "";
        boutonFlocon.classList = "";
        boutonCoeur.classList = "";
    }

    for (i = 1; i < positions.length; i++) {
        xPrecedent = positions[i - 1].x;
        yPrecedent = positions[i - 1].y;
        x = positions[i].x;
        y = positions[i].y;

        stroke(textColor);
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

    if (cercles.length > precision && precision > 0) {
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
        temps += vitesse * skip;
    } else {
        temps += 0.05;
    }

    if (Math.abs(temps) > Math.PI * 4) {
        shape = [];
        temps = 0;
    }
}

function dessinerForme() {
    strokeWeight(2);
    stroke(255, 100, 100);
    beginShape();
    for (i = 0; i < shape.length; i++) {
        vertex(shape[i].x, shape[i].y);
    }
    endShape();
    strokeWeight(1);
}

function calculerCercles() {
    shape = [];
    temps = 0;
    cercles = transformeeDeFourier(positions);
    skip = Math.PI * 2 / cercles.length;

    if (recentrer) {
        cercles = cercles.filter(cercle => cercle.frequence != 0);
    }
    
    formConteneur.innerHTML = formula;
}

// Calcul des cercles via la transformée de Fourier. Fonction écrite à l'aide de The CodingTrain.

// TODO: A changer et/ou compléter.
function transformeeDeFourier(x) {
    // On initialise la valeur de retour
    let nouveauxCercles = [];
    formula = '';

    for (i = 0; i < x.length; i++) {
        var re = 0;
        var im = 0;
        for (j = 0; j < x.length; j++) {
            var phi = (TWO_PI * i * j) / x.length;
            re += (x[j].x - document.body.clientWidth / 2) * cos(phi) + (x[j].y - document.body.clientHeight / 2) * sin(phi);
            im += (x[j].x - document.body.clientWidth / 2) * -sin(phi) + (x[j].y - document.body.clientHeight / 2) * cos(phi);
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
        if (formula == '') {
            formula += r + '*e^[iπ*(t+' + phase +')*' + freq + ']'
        } else {
            formula += '+' + r + '*e^[iπ*(t+' + phase +')*' + freq + ']'
        }
    }
    nouveauxCercles.sort((a, b) => b.rayon - a.rayon);
    return nouveauxCercles;
}

// SETUP
function setup() {
    // La page est vide, on crée donc un canva qui a la taille de la page.
    createCanvas(document.body.clientWidth, document.body.clientHeight);
    utilisateurDessine = false;
    recentrer = false;

    noStroke();
    fill(255);

    temps = 0;
    precision = 50;
    skip = 0;
    vitesse = 1;
    
    bgColor = 20;
    textColor = 255;

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
            frequence: 2,
            phase: Math.PI / 2,
            red: random(0, 1) * 255,
            green: random(0, 1) * 255,
            blue: random(0, 1) * 255
        },
    ];
}

// DRAW
function draw() {
    background(bgColor);
    noStroke();
    fill(textColor);

    if (utilisateurDessine) {
        text("L'utilisateur dessine...", 100, 100);
        enregistrerDessin();

    } else {
        text("L'ordinateur dessine...", 100, 100);
        if (precision == 0) {
            text("* précision maximum", 100, 120);
        } else {
            text("* précision : " + precision, 100, 120);
        }
        if (vitesse == 0) {
            text("* pause", 100, 140);
        } else {
            text("* vitesse : " + vitesse, 100, 140);
        }
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
}

function touchStarted() {
    mousePressed();
}

function touchEnded() {
    mouseReleased();
}

function mouseReleased() {
    if (positions.length > 5) {
        calculerCercles();
    }
    // Quand l'utilisateur relache la souris, l'ordi calcule les coefficients des cercles
    utilisateurDessine = false;
}

function mouseWheel(e) {
    let delta = -e.deltaY;

    if (keyIsPressed) {
        console.log(key);
        if (delta > 0) {
            vitesse += 1;
        } else {
            vitesse -= 1;
            if (vitesse < 0) {
                vitess = 0;
            }
        }
    } else {
        if (precision == 0) {
            if (delta > 0) {

            } else {
                precision = 500 - 10;
            }
        } else if (precision < 20) {
            if (delta > 0) {
                precision += 1;
            } else {
                precision -= 1;
            }
            if (precision < 2) {
                precision = 2;
            }
        } else {
            if (delta > 0) {
                precision += 10;
            } else {
                precision -= 10;
            }
            if (precision > 500) {
                precision = 0
            }
        }
        temps = 0;
        shape = [];
    }
}
