# 📋 TODO - Phase 2 (Corrections Restantes)

## 🔴 Critiques à Implémenter

### 1. DuelInterface.tsx - Validation YouTube + Sandbox
**Fichier:** `src/components/room/DuelInterface.tsx`

**Modifications à apporter:**

```typescript
// 1. Ajouter imports
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitMusicSchema, getYouTubeEmbedUrl } from "@/lib/validators";

// 2. Remplacer état local par React Hook Form
const { register, handleSubmit, formState: { errors }, reset } = useForm({
  resolver: zodResolver(submitMusicSchema),
  mode: "onBlur",
});

// 3. Modifier handleLinkSubmit
const onSubmit = (data) => {
  const embedUrl = getYouTubeEmbedUrl(data.youtubeUrl);
  if (embedUrl) {
    onSubmitLink(data.youtubeUrl);
    setSubmittedLinks([...submittedLinks, embedUrl]);
    reset();
  }
};

// 4. Mettre à jour le formulaire
<form onSubmit={handleSubmit(onSubmit)}>
  <Input
    {...register("youtubeUrl")}
    placeholder="Paste YouTube link here"
  />
  {errors.youtubeUrl && (
    <p className="text-red-500">{errors.youtubeUrl.message}</p>
  )}
</form>

// 5. Ajouter sandbox à l'iframe (ligne 94)
<iframe
  sandbox="allow-scripts allow-same-origin allow-presentation"
  // ... autres props
/>
```

---

### 2. App.tsx - Intégrer Error Boundary
**Fichier:** `src/App.tsx`

**Modifications à apporter:**

```typescript
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </Suspense>
    </ErrorBoundary>
  );
}
```

**Raison:** Empêcher le crash complet de l'app en cas d'erreur

---

## 🟠 Majeures à Implémenter

### 3. VotingSystem.tsx - Corriger Logique de Vote
**Fichier:** `src/components/room/VotingSystem.tsx`

**Problème actuel:** Le gagnant est déclaré après un seul vote

**Solution:**

```typescript
// Ajouter props pour nombre total de joueurs
interface VotingSystemProps {
  duelists?: [Duelist, Duelist];
  totalPlayers: number; // NOUVEAU
  onVoteComplete?: (winnerId: string) => void;
  onAllVotesComplete?: (winnerId: string) => void; // NOUVEAU
  isVotingOpen?: boolean;
}

// État pour tracker les votes
const [votesReceived, setVotesReceived] = useState<Set<string>>(new Set());

// Modifier handleVote
const handleVote = (duelistId: string, voterId: string) => {
  if (hasVoted || !isVotingOpen) return;

  setSelectedDuelist(duelistId);
  setVotes(prev => ({
    ...prev,
    [duelistId]: prev[duelistId] + 1
  }));
  setVotesReceived(prev => new Set([...prev, voterId]));
  setHasVoted(true);

  onVoteComplete(duelistId); // Vote individuel

  // Vérifier si tous les votes sont reçus
  if (votesReceived.size + 1 >= totalPlayers - 2) { // -2 pour les duelists
    const winner = getWinner();
    if (winner) {
      onAllVotesComplete(winner.id);
    }
  }
};
```

---

### 4. PlayerSelection.tsx - Corriger Race Condition
**Fichier:** `src/components/room/PlayerSelection.tsx`

**Problème:** `setTimeout` sans cleanup peut causer des bugs

**Solution:**

```typescript
useEffect(() => {
  if (!isSpinning) return;

  const timeoutIds: NodeJS.Timeout[] = [];
  const startTime = Date.now();

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const randomIndex = Math.floor(Math.random() * players.length);
    setHighlightedIndex(randomIndex);

    if (elapsed < duration) {
      const id = setTimeout(animate, interval);
      timeoutIds.push(id);
    } else {
      finalizeSelection();
    }
  };

  animate();

  // ✅ CLEANUP
  return () => {
    timeoutIds.forEach(clearTimeout);
  };
}, [isSpinning, players.length]);
```

---

### 5. RoomView.tsx - Types Centralisés
**Fichier:** `src/components/room/RoomView.tsx`

**Modifications:**

```typescript
// Remplacer interface locale
import type { Player, GameState } from "@/types";
import { mockParticipants } from "@/mocks/data";

// Utiliser mockParticipants au lieu de données inline
const [participants, setParticipants] = useState<Player[]>(mockParticipants);

// Props avec types stricts
interface RoomViewProps {
  roomCode: string;
  isRoomLeader: boolean;
  currentUser: Player;
  onLeaveRoom: () => void;
  onCopyRoomCode: () => void;
}

// Pas de valeurs par défaut complexes
const RoomView: React.FC<RoomViewProps> = ({
  roomCode,
  isRoomLeader,
  currentUser,
  onLeaveRoom,
  onCopyRoomCode,
}) => {
  // ...
};
```

---

## 🟡 Mineures (Optionnelles)

### 6. ThemeWheel.tsx - Utiliser Données Centralisées
```typescript
import { musicThemes } from "@/mocks/data";

// Remplacer const themes = [...] par import
```

### 7. Leaderboard.tsx - Division par Zéro
```typescript
const winRate = totalDuels > 0
  ? ((wins / totalDuels) * 100).toFixed(1)
  : "0.0";
```

### 8. ParticipantsList.tsx - Types Centralisés
```typescript
import type { Player } from "@/types";
```

---

## 📝 Script de Vérification

Après avoir appliqué toutes les corrections, exécuter:

```bash
# 1. Vérifier que le build fonctionne
npm run build

# 2. Vérifier TypeScript
npx tsc --noEmit

# 3. Vérifier le linter (si configuré)
npm run lint

# 4. Tester manuellement
npm run dev
```

---

## ✅ Checklist de Validation

- [ ] Aucune erreur TypeScript
- [ ] Build réussit
- [ ] Création de salle fonctionne (UUID valide)
- [ ] Copie du code de salle fonctionne (toast s'affiche)
- [ ] Validation formulaire fonctionne (messages d'erreur)
- [ ] YouTube URL invalide est rejetée
- [ ] iframe YouTube a l'attribut sandbox
- [ ] Error Boundary catch les erreurs (tester en lançant une erreur)

---

**Priorité:** Compléter les items 1 et 2 (CRITIQUES) avant tout déploiement
**Temps estimé:** 2-3 heures pour compléter toutes les corrections
