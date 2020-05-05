var boutonCentrer = document.getElementById('btnCentrer');
var boutonCharger = document.getElementById('btnCharger');
var boutonAide = document.getElementById('btnAide');
var boutonFormule = document.getElementById('btnFormule');
var boutonTheme = document.getElementById('btnTheme');

var aide = document.getElementById('fenetreAide');
var nuage = document.getElementById('nuage');
var bibli = document.getElementById('bibliotheque');

var boutonAvion = document.getElementById('btnAvion');
var boutonFlocon = document.getElementById('btnFlocon');
var boutonCoeur = document.getElementById('btnCoeur');

var formule = document.getElementById('formule');
var btnCopier = document.getElementById('btnCopier');
var formConteneur = document.getElementById('formuleConteneur');

btnCopier.addEventListener('click', function () {
    console.log('Copier');
    console.log(formula);
    navigator.clipboard.writeText(formula);
});

formConteneur.addEventListener('click', function () {
    console.log('Copier');
    console.log(formula);
    navigator.clipboard.writeText(formula);
});

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
    formule.classList = "";
    boutonFormule.classList = "";
    
    bibli.classList.toggle('visible');
    boutonCharger.classList.toggle('active');
});

boutonFormule.addEventListener('click', function() {
    console.log('formule');
    
    aide.classList = "";
    boutonAide.classList = "";
    nuage.classList = "";
    bibli.classList = "";
    boutonCharger.classList = "";
    
    formule.classList.toggle('visible');
    boutonFormule.classList.toggle('active');
});

boutonTheme.addEventListener('click', function () {
    console.log('theme');
    
    if(boutonTheme.classList == 'active') {
        textColor = 255;
        bgColor = 20;
    } else {
        textColor = 20;
        bgColor = 240;
    }

    boutonTheme.classList.toggle('active');
});

boutonAide.addEventListener('click', function() {
    console.log('Aide');
    
    bibli.classList = "";
    boutonCharger.classList = "";
    formule.classList = "";
    boutonFormule.classList = "";
    
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