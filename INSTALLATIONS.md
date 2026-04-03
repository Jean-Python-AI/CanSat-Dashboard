# Guide d'installation

Ce guide explique comment installer tout ce qui est necessaire pour faire fonctionner le projet.

---

## 1. Python

Python est le langage utilise pour le Backend et USB_receiver.

### macOS

Python est deja installe sur Mac. Ouvre le Terminal et tape :

```bash
python3 --version
```

Si la version est inferieure a 3.11, installe une version plus recente depuis python.org :

- Va sur https://www.python.org/downloads/
- Telecharge Python 3.11 ou plus recent
- Execute le fichier telecharge

### Windows

- Va sur https://www.python.org/downloads/
- Telecharge Python 3.11 ou plus recent
- Coche la case "Add Python to PATH" pendant l'installation
- Verifie dans le Terminal :

```bash
python --version
```

### Linux

```bash
sudo apt update
sudo apt install python3 python3-pip
python3 --version
```

---

## 2. Node.js et npm

Node.js est necessaire pour le Frontend. npm est inclut avec Node.js.

### macOS et Linux

- Va sur https://nodejs.org/
- Telecharge la version "LTS" (recommandee)
- Execute le fichier telecharge

Verifie l'installation :

```bash
node --version
npm --version
```

### Windows

- Va sur https://nodejs.org/
- Telecharge la version "LTS"
- Execute le fichier telecharge
- Ouvre le Terminal et verifie :

```bash
node --version
npm --version
```

---

## 3. Telecharger le projet depuis GitHub

Si ce n'est pas deja fait, telecharge le projet :

```bash
git clone https://github.com/TON_UTILISATEUR/CanSat-Dashboard.git
cd CanSat-Dashboard
```

Remplace `TON_UTILISATEUR` par le nom d'utilisateur GitHub du projet.

---

## 4. Installer les dependances du Backend

Ouvre un terminal et va dans le dossier Backend :

```bash
cd Backend
cd src
```

Installe les dependances Python :

```bash
pip install -r ../requirements.txt
```

Si `pip` ne fonctionne pas, essaie `pip3`.

---

## 5. Installer les dependances du Frontend

Ouvre un nouveau terminal et va dans le dossier Frontend_ :

```bash
cd Frontend_
npm install
```

Cela va installer toutes les dependances JavaScript.

---

## 6. Installer les dependances de USB_receiver

Ouvre un terminal et va dans le dossier USB_receiver :

```bash
cd USB_receiver
pip install requests
```

---

## Resume des commandes

| Etape | Commande | Dossier |
|-------|----------|---------|
| Python | Voir version | Partout |
| Dependances Backend | `pip install -r ../requirements.txt` | `Backend/src/` |
| Dependances Frontend | `npm install` | `Frontend_/` |
| Dependances USB_receiver | `pip install requests` | `USB_receiver/` |

---

## Problemes frequents

### "pip : commande non trouvee"
Essaye `pip3` a la place de `pip`.

### "npm : commande non trouvee"
Redemarre le Terminal apres avoir installe Node.js.

### Erreur de permission sur macOS/Linux
Ajoute `sudo` devant la commande :
```bash
sudo pip install requests
```
