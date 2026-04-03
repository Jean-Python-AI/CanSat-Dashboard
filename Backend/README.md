# Backend - Serveur Django

Le Backend est le serveur qui recoit les donnees du CanSat et les stocke.

---

## Lancement rapide

1. Ouvre un terminal
2. Va dans le dossier Backend :

```bash
cd Backend
```

3. Lance l'environnement python

sur Mac :
```bash
source .env/bin/activate
```

4. Lance le serveur :

```bash
python manage.py runserver
```

Le serveur demarre sur l'adresse : http://localhost:8000

---

## Commandes utiles

### Demarrer le serveur
```bash
python manage.py runserver
```

### Preparer la base de donnees (premiere utilisation)
```bash
python manage.py makemigrations
python manage.py migrate
```

### Creer un compte administrateur (optionnel)
```bash
python manage.py createsuperuser
```
Cela permet d'acceder a l'interface admin : http://localhost:8000/admin/

---

## Utilisation

Une fois le serveur lance, tu peux acceder a :

- Interface principale : http://localhost:8000/data/view/
- Interface admin : http://localhost:8000/admin/

Le serveur doit etre lance **avant** de lancer USB_receiver ou le Frontend.

---

## Structure du projet

```
Backend/
|-- src/
|   |-- manage.py           # Point d'entree du serveur
|   |-- CanSat/             # Configuration du projet
|   |-- DATA_API/           # L'application principale
|   |-- db.sqlite3          # La base de donnees
|-- requirements.txt           # Les dependances Python
```

---

## Port utilise

Le Backend utilise le **port 8000**. Si ce port est deja pris, tu peux en utiliser un autre :

```bash
python manage.py runserver 8080
```

---

## Besoin d'aide

Pour voir toutes les commandes disponibles :

```bash
django-admin help
```
