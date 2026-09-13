# MonTube

Site statique avec lecteur YouTube IFrame API.

## Ajouter une vidéo

Ouvre `script.js` et ajoute un objet dans `videos`.

Exemple :

{
  videoId: "IDENTIFIANT_YOUTUBE",
  title: "Titre de ma vidéo",
  description: "Description de ma vidéo"
}

L'identifiant est la partie située après `v=` dans une URL YouTube.

## Mise en ligne avec GitHub Pages

1. Crée un nouveau dépôt GitHub.
2. Ajoute `index.html`, `style.css` et `script.js`.
3. Dans Settings > Pages, choisis le déploiement depuis la branche principale.
4. GitHub Pages fournira l'adresse du site.

Les vidéos restent diffusées par YouTube via son lecteur intégré.
