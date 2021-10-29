# POST to lemmy :mouse:

Une extension de navigateur qui permet de poster un lien dans une instance de lemmy.

# Installation
1. Télécharger la dernière release de [l'extension packagée](https://github.com/NiceOpenSource/posttolemmy/releases/tag/0.1) :file_folder:
2. Rendez vous sur la page about:debugging dans Mozilla firefox :bug:
3. Dans la section 'Ce Firefox' de la sidebar, cliquez sur 'Charger un module complémentaire temporaire...' :heavy_plus_sign:
4. Sélectionnez le package de l'extension :open_file_folder:
5. Ouvrez l'extension via son icone dans le coin supérieur gauche du navigateur et entrez les informations de connexions à votre instance de lemmy :mouse:

# Utilisation
1. Rendez vous sur la page de votre choix
2. Sélectionnez une partie du texte à partager
3. Ouvrez l'extension en cliquant sur son icone dans le navigateur
4. Modifiez le texte à votre convenance et choisissez une catégorie
5. Postez ! :envelope:

# Fonctionalités
- [x] Remplissage automatique des champs
- [x] Sélectionner du texte dans la page pour qu'il soit ajouté au commentaire du post.
- [x] Dark theme (beta)

## A venir
- [ ] Editeur markdown pour le commentaire
- [ ] Prévisualiseur markdown

# Améliorer POST to lemmy
* Installez l'extension en mode dev : [Documentation officielle de  Firefox](https://developer.mozilla.org/fr/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing)
* Les sources sont directement modifiables et en mode dev, la plupart des modifications seront appliqués à l'extension sans avoir a la recharger depuis la page 'about:debugging' de Firefox, contrairement au .zip ou .xpi qu'il faut repackager et réactualiser.
* Pour build le fichier .zip ou .xpi, installez le package npm 'web-ext';
```bash
npm i -g web-ext
```
* Faites vos modifications ensuite pour compiler le fichier d'extension :
```bash
web-ext build
```

# Contributions
* Développement : [Loys Caucheteux](https://cv.loys.me)  étudiant à [EPITECH](https://github.com/Epitech) en stage chez [PG3](https://github.com/pg3io). [GitHub](https://github.com/gummyWalrus) / [Linkedin](https://www.linkedin.com/in/loys-caucheteux-a99655205/)
* Design UI : Jeanne Sala [Linkedin](https://www.linkedin.com/in/jeanne-sala-846a55208/)
 
* [Mozilla firefox](https://developer.mozilla.org/fr/firefox)
* [Lemmy](https://join-lemmy.org)
* [Bulma](https://bulma.io/)
* [Jquery](https://jquery.com/)
* [Axios](https://www.npmjs.com/package/axios)
* [Font Awesome](https://www.fontawesome.com)
