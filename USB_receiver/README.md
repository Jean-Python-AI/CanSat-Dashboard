# USB_receiver - Simulation CanSat

USB_receiver est un programme qui simule les donnees d'un CanSat et les envoie au Backend.

---

## Lancement rapide

1. Verifie que le Backend est bien lance (voir Backend/README.md)
2. Ouvre un terminal
3. Va dans le dossier USB_receiver :

```bash
cd USB_receiver
```

4. Lance la simulation :

```bash
python MainSimulation.py
```

Le programme envoie des donnees au Backend toutes les secondes. La simulation dure environ 30 secondes.

---

## Ce que fait le programme

Le programme simule un CanSat en vol et envoie :

- L'altitude
- La temperature
- La pression
- La position GPS (latitude et longitude)

Une fois la simulation terminee (quand le CanSat a atterri), le programme s'arrete automatiquement.

---

## Parametres modifiables

Tu peux modifier certains parametres dans le fichier `MainSimulation.py` :

| Parametre | Description | Valeur par defaut |
|-----------|-------------|-------------------|
| `LAUNCH_NAME` | Nom de la mission | "CanSat_Mission" |
| `ALTITUDE_MAX` | Altitude maximale simulee (en metres) | 500.0 |
| `TERMINAL_VELOCITY` | Vitesse de chute (en m/s) | -8.0 |
| `BAUDRATE` | Vitesse de communication serie | 115200 |

Pour modifier un parametre, ouvre le fichier `MainSimulation.py` avec un editeur de texte et change la valeur.

---

## Structure du projet

```
USB_receiver/
|-- MainSimulation.py          # Programme principal
|-- AltitudeSimulation.py      # Calcul de l'altitude
|-- TemperatureSimulation.py   # Calcul de la temperature
|-- PressureSimulation.py      # Calcul de la pression
|-- PositionSimulation.py      # Calcul de la position GPS
```

---

## Problemes frequents

### "requests" non trouve
Installe la bibliotheque requests :

```bash
pip install requests
```

### Le programme ne se connecte pas au Backend
Verifie que le Backend est bien lance sur http://127.0.0.1:8000

### La simulation s'arrete tout de suite
Cela peut arriver si le Backend n'est pas accessible. Lance d'abord le Backend.
