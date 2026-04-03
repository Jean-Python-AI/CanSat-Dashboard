# Frontend - Interface React

Le Frontend est l'interface visuelle qui permet de voir les donnees du CanSat.

---

## Lancement rapide

1. Ouvre un terminal
2. Va dans le dossier Frontend_ :

```bash
cd Frontend_
```

3. Si c'est la premiere fois, installe les dependances :

```bash
npm install
```

4. Lance le serveur de developpement :

```bash
npm run dev
```

Le Frontend demarre sur l'adresse : http://localhost:5173

---

## Commandes utiles

### Lancer le serveur de developpement
```bash
npm run dev
```

### Creer une version pour la production
```bash
npm run build
```

### Verifier le code (linter)
```bash
npm run lint
```

### Previsualiser la version production
```bash
npm run preview
```

---

## Utilisation

Ouvre ton navigateur et va sur : http://localhost:5173

Le Frontend doit etre lance **apres** le Backend. Si tu n'as pas lance le Backend, le Frontend ne pourra pas afficher les donnees.

---

## Structure du projet

```
Frontend_/
|-- src/
|   |-- App.tsx              # Application principale
|   |-- main.tsx             # Point d'entree
|   |-- services/api.ts      # Connexion au Backend
|   |-- features/            # Parties de l'interface
|-- public/                  # Fichiers publics
|-- index.html               # Page HTML principale
|-- package.json             # Dependances et scripts
```

---

## Port utilise

Le Frontend utilise le **port 5173** par defaut. Tu peux le voir dans le terminal quand le serveur demarre.

---

## Problemes frequents

### Page blanche
Verifie que le Backend est bien lance sur le port 8000.

### Erreur a l'installation
Essaye de supprimer le dossier `node_modules` et le fichier `package-lock.json`, puis retape `npm install`.
