// fonction dft(x)!

/*  dft pour discrete fourier transform

    x est une liste de valeurs.
    Pour chaque valeur de la liste, on calcule une approximation
    de la partie réelle et la partie imaginaire du paramètre, à
    l'aide de la formule de Fourier.

    La valeur renvoyée, X, est une liste de liste, comprenant pour
    chaque valeur de x (entrée) :
    - la partie réelle
    - la partie imaginaire
    - la fréquence (vitesse)
    - l'amplitude (taille)
    - la phase (décalage à l'origine)
*/

function dft(x) {
    // On initialise la valeur de retour
    var X = [];

    for (i = 0; i < x.length; i++) {
        var re = 0;
        var im = 0;
        for (j = 0; j < x.length; j++) {
            var phi = (TWO_PI * i * j) / x.length;
            re += x[j] * cos(phi);
            im -= x[j] * sin(phi);
        }
        re = re / x.length;
        im = im / x.length;

        var freq = i;
        var amp = sqrt(re * re + im * im);
        var phase = atan2(im, re);
        X[i] = {
            re,
            im,
            freq,
            amp,
            phase
        };
    }
    return X;
}
