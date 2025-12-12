# 🎵 BeatsClash - Guide d'Installation et de Démarrage

Guide complet pour installer et lancer le projet BeatsClash/MusicDuel sur votre machine locale.

---

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé sur votre machine :

- **Node.js** (version 18 ou supérieure) - [Télécharger Node.js](https://nodejs.org/)
- **npm** (inclus avec Node.js) ou **yarn**
- **Git** - [Télécharger Git](https://git-scm.com/)
- Un éditeur de code (recommandé : [VS Code](https://code.visualstudio.com/))

### ⚠️ Vérifier les installations (IMPORTANT)

Ouvrez un terminal et exécutez les commandes suivantes pour vérifier les versions :

```bash
node --version    # Devrait afficher v18.x.x ou supérieur
npm --version     # Devrait afficher 9.x.x ou supérieur
git --version     # Devrait afficher 2.x.x ou supérieur
```

**❌ Si vous avez Node.js v12, v14 ou v16** : Votre version est **trop ancienne** et le projet ne fonctionnera pas. Consultez la section [Mettre à jour Node.js](#problème--version-de-nodejs-trop-ancienne-critique) ci-dessous avant de continuer.

---

## 🚀 Installation

### Étape 1 : Cloner le projet

Ouvrez un terminal et naviguez vers le dossier où vous souhaitez installer le projet :

```bash
# Cloner le repository
git clone https://github.com/PhyesGG/BeatsClash.git

# Accéder au dossier du projet
cd BeatsClash
```

### Étape 2 : Installer les dépendances

Installez toutes les dépendances npm nécessaires au projet :

```bash
npm install
```

⏱️ **Note** : Cette étape peut prendre quelques minutes (environ 1-2 minutes).

Vous devriez voir un message similaire à :
```
added 418 packages, and audited 419 packages in 11s
```

### Étape 3 : Configuration de l'environnement

Le projet est prêt à être lancé ! Aucune configuration supplémentaire n'est nécessaire pour le développement local.

**Note** : Si vous souhaitez activer les fonctionnalités Tempo (optionnelles), créez un fichier `.env` à la racine du projet :

```bash
# Créer le fichier .env
touch .env
```

Ajoutez cette ligne dans le fichier `.env` :
```
VITE_TEMPO=true
```

---

## 💻 Lancer le projet

### Mode Développement (recommandé)

Pour lancer le projet en mode développement avec rechargement automatique :

```bash
npm run dev
```

✅ **Le serveur est maintenant lancé !**

Vous devriez voir un message similaire :
```
  VITE v5.3.1  ready in 342 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

🌐 **Ouvrez votre navigateur** et accédez à : **http://localhost:5173/**

Le projet se rechargera automatiquement à chaque modification du code.

### Arrêter le serveur

Pour arrêter le serveur de développement :
- Appuyez sur `Ctrl + C` dans le terminal
- Confirmez avec `Y` si demandé

---

## 🏗️ Build pour la production

Si vous souhaitez créer une version optimisée pour la production :

```bash
# Compiler le projet
npm run build
```

Les fichiers compilés seront générés dans le dossier `dist/`.

### Prévisualiser le build de production

Pour tester le build de production localement :

```bash
npm run preview
```

Accédez ensuite à l'URL affichée dans le terminal (généralement `http://localhost:4173/`).

---

## 📦 Commandes disponibles

Voici la liste complète des commandes npm disponibles :

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement avec hot-reload |
| `npm run build` | Compile le projet pour la production |
| `npm run preview` | Prévisualise le build de production |
| `npm run lint` | Vérifie la qualité du code avec ESLint |
| `npm run storybook` | Lance Storybook (documentation des composants UI) |
| `npm run build-storybook` | Compile Storybook pour la production |

---

## 🔧 Résolution des problèmes

### ❌ Problème : Version de Node.js trop ancienne (CRITIQUE)

**Symptômes :**
- Erreurs `EBADENGINE` lors de `npm install`
- Erreur `SyntaxError: Unexpected reserved word` avec `await`
- Erreur `SyntaxError: Unexpected token '?'` avec `??`
- Message : `current: { node: 'v12.22.9' }` ou version inférieure à v18

**Cause :** Votre version de Node.js est trop ancienne. Ce projet nécessite **Node.js v18 ou supérieur**.

**Solution : Mettre à jour Node.js**

#### Option 1 : Utiliser NVM (Recommandé - Linux/Mac)

NVM (Node Version Manager) permet de gérer facilement plusieurs versions de Node.js.

1. **Installer NVM :**
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   ```

2. **Redémarrer le terminal** ou exécuter :
   ```bash
   source ~/.bashrc
   # Ou sur Mac :
   source ~/.zshrc
   ```

3. **Installer Node.js v20 (LTS) :**
   ```bash
   nvm install 20
   nvm use 20
   nvm alias default 20
   ```

4. **Vérifier la version :**
   ```bash
   node --version  # Devrait afficher v20.x.x
   npm --version   # Devrait afficher 10.x.x
   ```

5. **Retourner dans le dossier du projet et réinstaller :**
   ```bash
   cd ~/Téléchargements/BeatsClash-main
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

#### Option 2 : Installation directe depuis le site officiel

1. **Désinstaller l'ancienne version :**
   ```bash
   # Ubuntu/Debian
   sudo apt remove nodejs npm

   # Nettoyer les résidus
   sudo apt autoremove
   ```

2. **Télécharger Node.js v20 LTS :**
   - Visitez : https://nodejs.org/
   - Téléchargez la version **LTS (Long Term Support)** - v20.x.x ou v22.x.x

3. **Installer via NodeSource (Ubuntu/Debian) :**
   ```bash
   # Configuration du repository NodeSource pour Node.js 20.x
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

   # Installation
   sudo apt-get install -y nodejs

   # Vérification
   node --version  # Devrait afficher v20.x.x
   npm --version   # Devrait afficher 10.x.x
   ```

4. **Retourner dans le dossier du projet et réinstaller :**
   ```bash
   cd ~/Téléchargements/BeatsClash-main
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

#### Option 3 : Utiliser n (Alternative à NVM)

```bash
# Installer n
sudo npm install -g n

# Installer la dernière version LTS
sudo n lts

# Vérifier
node --version
```

**✅ Après la mise à jour :**
- Supprimez `node_modules` et `package-lock.json`
- Réexécutez `npm install`
- Lancez le projet avec `npm run dev`

---

### Problème : Port déjà utilisé

Si le port 5173 est déjà utilisé, Vite utilisera automatiquement le port suivant disponible (5174, 5175, etc.).

Vous pouvez aussi spécifier un port personnalisé :
```bash
npm run dev -- --port 3000
```

### Problème : Erreurs lors de `npm install`

1. **Supprimez le dossier `node_modules` et le fichier `package-lock.json` :**
   ```bash
   rm -rf node_modules package-lock.json
   ```

2. **Réinstallez les dépendances :**
   ```bash
   npm install
   ```

3. **Si le problème persiste, nettoyez le cache npm :**
   ```bash
   npm cache clean --force
   npm install
   ```

### Problème : Le navigateur affiche une page blanche

1. Ouvrez la console du navigateur (F12)
2. Vérifiez s'il y a des erreurs JavaScript
3. Essayez de vider le cache du navigateur (Ctrl + Shift + R)
4. Redémarrez le serveur de développement

### Problème : Erreurs TypeScript lors du build

Vérifiez que vous êtes sur la bonne branche :
```bash
git branch
```

Si vous avez modifié des fichiers, restaurez-les :
```bash
git restore .
```

---

## 📁 Structure du projet

```
BeatsClash/
├── src/                      # Code source
│   ├── components/          # Composants React
│   │   ├── room/           # Composants de salle de jeu
│   │   └── ui/             # Composants UI réutilisables
│   ├── hooks/              # Hooks React personnalisés
│   ├── lib/                # Utilitaires et helpers
│   ├── mocks/              # Données de test
│   ├── types/              # Types TypeScript
│   ├── App.tsx             # Composant principal
│   └── main.tsx            # Point d'entrée
├── public/                  # Fichiers statiques
├── dist/                    # Build de production (généré)
├── node_modules/           # Dépendances (généré)
├── package.json            # Configuration npm
├── tsconfig.json           # Configuration TypeScript
├── vite.config.ts          # Configuration Vite
└── README.md               # Documentation principale
```

---

## 🎮 Utilisation de l'application

Une fois l'application lancée :

1. **Page d'accueil** : Créez une nouvelle salle ou rejoignez une salle existante
2. **Saisir un pseudo** : Entrez votre nom de joueur
3. **Code de salle** : Partagez le code avec vos amis pour qu'ils vous rejoignent
4. **Jouer** :
   - Le leader lance la partie
   - La roue sélectionne un thème musical
   - Deux joueurs sont sélectionnés pour le duel
   - Les duelistes soumettent leurs URLs YouTube
   - Tous les participants votent
   - Le gagnant est déclaré !

---

## 🔐 Technologies utilisées

- **React 18.2** - Framework JavaScript
- **TypeScript 5.2** - Typage statique
- **Vite 5.2** - Build tool ultra-rapide
- **Tailwind CSS** - Framework CSS utility-first
- **shadcn/ui** - Composants UI modernes
- **Framer Motion** - Animations fluides
- **React Hook Form + Zod** - Gestion et validation de formulaires
- **Lucide React** - Bibliothèque d'icônes

---

## 📚 Ressources supplémentaires

- **Documentation React** : https://react.dev/
- **Documentation Vite** : https://vitejs.dev/
- **Documentation Tailwind CSS** : https://tailwindcss.com/
- **Documentation shadcn/ui** : https://ui.shadcn.com/

---

## 💡 Prochaines étapes

Après avoir lancé le projet avec succès :

1. ✅ Explorez l'interface utilisateur
2. ✅ Testez les différentes fonctionnalités
3. ✅ Consultez le fichier `README.md` pour plus de détails
4. ✅ Commencez à développer de nouvelles fonctionnalités !

---

## 🆘 Besoin d'aide ?

Si vous rencontrez des problèmes non couverts dans ce guide :

1. Vérifiez les [Issues GitHub](https://github.com/PhyesGG/BeatsClash/issues)
2. Créez une nouvelle issue en décrivant votre problème
3. Consultez la documentation des technologies utilisées

---

**Bon développement ! 🎵🎮**
