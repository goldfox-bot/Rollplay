# Le Fléau de la Balance
Compagnon de jeu de Philippa Rougetoison. Site statique sans dépendances ni compilation.

## GitHub Pages
1. Créer un dépôt `le-fleau-de-la-balance`.
2. Décompresser l’archive et envoyer **le contenu** du dossier à la racine du dépôt.
3. Settings > Pages > Build and deployment > Deploy from a branch > main > / (root) > Save.
4. Ouvrir l’adresse indiquée par GitHub Pages.

## Structure
- index.html : corpus statique et navigation native, utilisables même sans JavaScript.
- assets/style.css : thème mobile.
- assets/app.js : recherche, favoris, copie et notes locales.
- assets/corpus.json : données de référence issues de la V3 condensée. Le HTML est la version affichée ; synchroniser les deux lors des modifications.
- assets/grande-balance.jpg : illustration fournie.

Les 163 entrées reprennent la V3 condensée, sans validation mécanique supplémentaire. Les seuils de CA sont des conventions narratives. Les frappes ordinaires (+3/+4) ne disposent pas de variantes dédiées. Les notes et favoris dépendent du navigateur. Aucun tirage aléatoire.
