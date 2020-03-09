var boutonCentrer = document.getElementById('btnCentrer');
var boutonCharger = document.getElementById('btnCharger');
var boutonAide = document.getElementById('btnAide');

var aide = document.getElementById('fenetreAide');
var nuage = document.getElementById('nuage');
var bibli = document.getElementById('bibliotheque');

var boutonAvion = document.getElementById('btnAvion');
var boutonFlocon = document.getElementById('btnFlocon');
var boutonCoeur = document.getElementById('btnCoeur');

boutonCentrer.addEventListener('click', function () {
    console.log('Centrer');
    if (recentrer) {
        boutonCentrer.classList = '';
        recentrer = false;
    } else {
        cercles = cercles.filter(cercle => cercle.frequence != 0);
        shape = [];
        boutonCentrer.classList = 'active';
        recentrer = true;
    }
});

boutonCharger.addEventListener('click', function() {
    console.log('charger');
    
    aide.classList = "";
    boutonAide.classList = "";
    nuage.classList = "";
    
    bibli.classList.toggle('visible');
    boutonCharger.classList.toggle('active');
});

boutonAide.addEventListener('click', function() {
    console.log('Aide');
    
    bibli.classList = "";
    boutonCharger.classList = "";
    
    aide.classList.toggle('visible');
    nuage.classList.toggle('visible');
    
    boutonAide.classList.toggle('active');
});

boutonAvion.addEventListener('click', function() {
    console.log('Avion');
    
    boutonAvion.classList = "active";
    boutonCoeur.classList = "";
    boutonFlocon.classList = "";
    positions = pointsAvion;
    mouseReleased();
});

boutonFlocon.addEventListener('click', function() {
    console.log('Flocon');
    
    boutonFlocon.classList = "active";
    boutonCoeur.classList = "";
    boutonAvion.classList = "";
    positions = pointsFlocon;
    mouseReleased();
});

boutonCoeur.addEventListener('click', function() {
    console.log('Coeur');
    
    boutonCoeur.classList = "active";
    boutonFlocon.classList = "";
    boutonAvion.classList = "";
    positions = pointsCoeur;
    mouseReleased();
});