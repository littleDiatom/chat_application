# Messagerie en ligne [en cours]

L'objectif du projet est d'élaborer une application de messagerie simple et sans connexion.
Le stack technique de l'application est le suivant :

- Back-end : Python, Django et Django channels
- Front-end : React, ViteJS

## Utilisation

Pour démarrer l'API, ouvrir un terminal depuis le dossier `backend/chatProject/` et lancer la commande suivante pour démarrer le serveur.

```shell
docker run -p 6379:6379 -d redis:5
python manage.py runserver
```

En parallèle, ouvrir dans un autre terminal depuis le dossier `frontend/`, et lancer Vite avec les commandes suivantes :

```shell
npm i
python manage.py runserver
```

## Fonctionnement
