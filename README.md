# CanSat-Dashboard

Application pour afficher et enregistrer les donnees collectees par un CanSat.

---

## Structure du projet

```
CanSat/
|-- Backend/          # Serveur qui stocke les donnees (Python/Django)
|-- Frontend_/        # Interface visuelle pour voir les donnees (React)
|-- USB_receiver/     # Simulation qui envoie des donnees (Python)
|-- INSTALLATIONS.md  # Guide d'installation complet
|-- README.md         # Ce fichier
```

## Comment ca marche

Le projet est compose de 3 parties qui fonctionnent ensemble :

1. **Backend** - Reçoit et stocke les donnees (port 8000)
2. **USB_receiver** - Envoie des donnees simulées au Backend
3. **Frontend** - Affiche les donnees du Backend (port 5173)

## Ordre de demarrage

Pour lancer le projet, ouvre 3 terminaux :

1. Lancer le Backend :
   - Va dans le dossier `Backend`
   - Lis `README.md` dans ce dossier

2. Lancer USB_receiver (ou le vrai CanSat) :
   - Va dans le dossier `USB_receiver`
   - Lis `README.md` dans ce dossier

3. Lancer le Frontend :
   - Va dans le dossier `Frontend_`
   - Lis `README.md` dans ce dossier

## Liens vers les guides

- [Guide d'installation](./INSTALLATIONS.md)
- [Backend](./Backend/README.md)
- [Frontend](./Frontend_/README.md)
- [USB_receiver](./USB_receiver/README.md)
