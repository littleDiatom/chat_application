# Messagerie en ligne [en cours]

L'objectif du projet est d'élaborer une application de messagerie simple et sans connexion.
Le stack technique de l'application est le suivant :

- Back-end : Python, Django et Django channels
- Front-end : React, ViteJS

## Utilisation locale

# Back-end

Premièrement, ouvrir un terminal depuis le dossier `backend/chatProject/`.
Créer un environnement virtuel avec la commance suivante :

```shell
virtualenv env_name
```

Puis, installer les librairies nécessaires au projet :

```shell
pip install --no-cache-dir -r requirements.txt
```

Pour les échanges de messages, le serveur websocket utilise un serveur Redis pour envoyer et recevoir des messages en temps réel entre les clients et le serveur. Pour faire tourner Redis, utiliser la commande suivante :

```shell
docker run -p 6379:6379 -d redis:5
```

Ensuite, lancer la commande suivante pour démarrer le projet Django :

```shell
python manage.py runserver
```

# Front-end

En parallèle, ouvrir dans un autre terminal depuis le dossier `frontend/`, et lancer Vite avec les commandes suivantes :

- pour installer l'environnement :

  ```shell
  npm i
  ```

- pour démarrer le serveur de développement pour le Front-end:

  ```shell
  npm run dev
  ```
