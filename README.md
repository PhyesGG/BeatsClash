# 🎵 MusicDuel

Challenge your friends to epic music battles! Who has the best taste for each theme?

## 🎶 About

MusicDuel is a competitive music game where players go head-to-head to find the best song for a given theme. Battle it out with friends and prove your superior music taste!

## 🛠️ Built With

- **React** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool with HMR

## 🚧 Status

**Work in Progress** - Currently in development

## ✨ Features (Planned)

- 🎯 Theme-based music battles
- 🎤 Multiplayer duels
- 🏆 Vote for the best track
- 🎸 Multiple music genres and themes
- 📊 Leaderboards and stats

## 🎮 How To Play

1. Join a music duel
2. Receive a theme (e.g., "Best Summer Vibes", "Ultimate Workout Song")
3. Submit your best track for that theme
4. Vote on your opponent's choice
5. May the best music taste win!

## 🚀 Getting Started

This project uses React + TypeScript + Vite for fast development with Hot Module Replacement (HMR).

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## ⚙️ Technical Setup

### Available Vite Plugins

Currently using one of these official plugins:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) - Uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) - Uses [SWC](https://swc.rs/) for Fast Refresh

### ESLint Configuration

For production applications, enable type-aware lint rules:

1. Configure the top-level `parserOptions`:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

2. Replace `plugin:@typescript-eslint/recommended` with:
   - `plugin:@typescript-eslint/recommended-type-checked` or
   - `plugin:@typescript-eslint/strict-type-checked`

3. Optionally add `plugin:@typescript-eslint/stylistic-type-checked`

4. Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

---

🎵 Show the world your music taste is unmatched!
