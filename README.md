# POST to lemmy :mouse:
---

Une extension pour Mozilla firefox :fox_face: qui permet de poster un lien dans une instance de lemmy.

# Installation
1. Clonez le répertoire :file_folder:
2. Rendez vous sur la page about:debugging dans Mozilla firefox :bug:
3. Dans la section 'Ce Firefox' de la sidebar, cliquez sur 'Charger un module complémentaire temporaire...' :heavy_plus_sign:
4. Rendez vous dans le dossier du répertoire cloné et sélectionnez le fichier 'manifest.json' :open_file_folder:
5. Ouvrez l'extension via son icone dans le coin supérieur gauche du navigateur et entrez les informations de connexions à votre instance de lemmy :mouse:

# Utilisation
1. Rendez vous sur la page de votre choix
2. Sélectionnez une partie du texte à partager
3. Ouvrez l'extension en cliquant sur son icone dans le navigateur
4. Modifiez le texte à votre convenance et choisissez une catégorie
5. Postez ! :envelope:

# Fonctionalités
[x] Remplissage automatique des champs
[x] Sélectionner du texte dans la page pour qu'il soit ajouté au commentaire du post.
[x] Dark theme (beta)

## A venir
[ ] Editeur markdown pour le commentaire
[ ] Prévisualiseur markdown

# Améliorer POST to lemmy
Les sources sont directement modifiables, installez le package npm 'web-ext'
```bash
npm i -g web-ext
```
Faites vos modifications, pour compiler le fichier d'extension faites la commande (pas nécessaire pour utiliser l'extension)
```bash
web-ext build
```

# Contributions

* Développement : [Loys Caucheteux](https://cv.loys.me)  étudiant à [EPITECH](https://epitech.eu) en stage chez [PG3](https://pg3.io). [GitHub](https://github.com/gummyWalrus) / [Linkedin](https://www.linkedin.com/in/loys-caucheteux-a99655205/)
* Design UI  : Jeanne Sala [Linkedin](https://www.linkedin.com/in/jeanne-sala-846a55208/)
 
* [Mozilla firefox](https://developer.mozilla.org/fr/firefox)
* [Lemmy](https://join-lemmy.org)
* [Bulma](https://bulma.io/)
* [Jquery](https://jquery.com/)
* [Axios](https://www.npmjs.com/package/axios)
* [Font Awesome](https://www.fontawesome.com)
