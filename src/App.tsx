/**
 * App Component
 * Root component with routing
 *
 * CORRECTIONS APPLIED (Phase 2):
 * - ✅ Integrated ErrorBoundary to prevent full app crashes
 * - ✅ Uniformized VITE_TEMPO checks (using === "true")
 * - ✅ Proper import structure
 */

import { Suspense } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import Home from "./components/home";
import ErrorBoundary from "./components/ErrorBoundary";
import routes from "tempo-routes";

function App() {
  // ✅ FIXED: Check VITE_TEMPO consistently with === "true"
  const isTempoEnabled = import.meta.env.VITE_TEMPO === "true";

  return (
    // ✅ FIXED: Wrap entire app with ErrorBoundary to catch all React errors
    <ErrorBoundary>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          {isTempoEnabled && <Route path="/tempobook/*" />}
        </Routes>
        {isTempoEnabled && useRoutes(routes)}
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
