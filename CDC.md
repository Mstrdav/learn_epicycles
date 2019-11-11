# Cahier des charges

> " Une régression affine demande 2 paramètres, une régression parabolique en demande 3, et il semblerait qu'un régression pachidermique en demande 4. "  
> &mdash; ```El JJ```

### I] Présentation générale

#### Avant-propos
L'idée de ce projet m'est venue d'une vidéo formidable d'El JJ, vidéaste qui fait de la vulgarisation mathématique sur Youtube. Cette vidéo, intitulée [Deux (deux ?) minutes pour l'éléphant de Fermi & Neumann](https://www.youtube.com/watch?v=uazPP0ny3XQ), aborde les épicycles et la transformée de Fourier d'une façon réellement inédite. Véritable petit déclic pour moi, j'ai décidé de me rensigner plus. C'est une vidéo de 3Blue1Brown qui m'a convaincu que je pouvais, moi aussi, faire quelque chose pour démocratiser les concepts de mathématiques, physique ou SVT les plus beaux, étranges ou fascinants. J'ai commencé dans un premier temps à donner des cours de soutien en mathématiques. J'avais envie d'aborder le programme, avec ceux qui en avait besoin, d'une façon moins scolaire. J'ai donné mon premier cours sur les nombres complexes et les ensembles de Julia et Mandelbrot en Octobre 2019. J'ai cependant vite réalisé mes difficultés à enseigner ; je me suis beaucoup réfugié derrière des exercices et des dessins. Comme de bilan a été finalement positif, j'ai décidé de recommencer, en parlant des ondes, de leur superposition et de la transformée de Fourier.

#### ID Card du projet

**Nom du projet** : Learn Epicycles  
**Format** : Site internet 

**Description** : 
Le projet serait un site Internet permettant d'apprendre et de comprendre les _épicycles_ et la _transformée de Fourier_. Il s'agit de reprendre un point rapidement évoqué dans le programme de physique de Terminale, et de proposer une autre vision du phénomène. Au moyen d'exemples historiques et surtout d'une **aire de jeu** (canva), le site exposerait les nombreuses possibilités de la transformée de Fourier.

### II] Arborescence du site
Il s'agit de garder le site le plus simple et le plus épuré possible. Il n'y aura donc que deux pages.

* La page de présentation
* La page _aire de jeu_

#### Page de présentation
La page de présentation a pour vocation d'expliquer les concepts d'épycicles et la transformée de Fourier au visiteur du site. Pour expliquer ces principes compliqués d'une façon accessible à n'importe qui, élève, professeur ou retraité, le site utiliserait des animations. Il n'y aura néanmoins pas besoin d'interaction UI/User. Cette page n'est pas la page _phare_ du site, la grande majorité des efforts doit être concentrée sur la page du canva.

#### Page aire de jeu
La page aire de jeu est celle que j'ai véritablement envie de développer. Elle doit être intuitive et épurée, et mener directement l'utilisateur au canva sur lequel se dessineront, au moyen d'épicycles, les courbes voulues. Voici la charte graphique de l'aire de jeu :

* Le canva doit être **centré** (ou un peu décalé sur la droite).
* Le canva doit présenter un certain nombre de bouton pour paramétrer les épicycles, qui seront soit sur le coté, soit superposés sur le canva.
* Autrement, le canva pourra prendre toute la page (à la manière du site d'[Euclidea](www.euclidea.xyz)), mais comme c'est plus difficile il ne s'agit que d'un plus.

### III] Fonctionnalité détaillées.
Cette partie décrit les fonctionnalités de la page aire de jeu en particulier, le site en lui même n'ayant pas de réelle fonctions.

#### 1. Calculer les paramètres de l'épicycle
Avec un certain chemin (suite de points) donné, l'algorithme doit être capable de calculer les paramètre des épicycles. Il utilisera pour ça une des transformées de Fourier, sans doute la transformée rapide.

#### 2. Dessiner l'épicycle avec ses paramètres
Une fois les calculs réalisés, l'algorithme doit dessiner la courbe. Ce sera sans doute la partie la plus difficile à coder.

#### 3. Enregistrer un chemin dessiné par l'utilisateur
L'utilisateur doit pouvoir tracer un courbe sur le canva, et les points de cette courbe seront utilisé pour faire les calculs.

#### 4. Permettre le choix de la précision
L'utilisateur doit pouvoir choisir, dans une certaine mesure, la précision souhaitée (nombre de cercles).

#### 5. Galerie de modèles
A nous d'implémenter une galerie de modèles déjà calculés, historiques, intéressants ou juste jolis.