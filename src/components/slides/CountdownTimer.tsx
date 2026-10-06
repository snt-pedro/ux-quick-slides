import { useCallback, useEffect, useState } from "react";

const TIMER_KEY = "slide-timer-deadline";
const TIMER_DURATION_MS = 10 * 60 * 1000;

// Um recarregamento real da página (F5) deve reiniciar o cronômetro, enquanto a
// navegação entre slides (roteamento SPA) deve preservá-lo. A navegação SPA não
// dispara este módulo novamente, então basta limpar o prazo guardado quando o
// documento foi de fato recarregado.
if (typeof window !== "undefined") {
  const nav = performance.getEntriesByType("navigation")[0] as
    PerformanceNavigationTiming | undefined;
  if (nav?.type === "reload") sessionStorage.removeItem(TIMER_KEY);
}

function getDeadline(): number {
  const stored = sessionStorage.getItem(TIMER_KEY);
  if (stored) {
    const n = parseInt(stored, 10);
    if (!Number.isNaN(n)) return n;
  }
  const deadline = Date.now() + TIMER_DURATION_MS;
  sessionStorage.setItem(TIMER_KEY, String(deadline));
  return deadline;
}

/**
 * Contagem regressiva de 10 minutos. O prazo é guardado em sessionStorage
 * como timestamp absoluto, então o cronômetro continua decrementando
 * corretamente ao trocar de slide (mesmo com a remontagem do componente).
 */
export function CountdownTimer({ className }: { className?: string }) {
  const [remaining, setRemaining] = useState(() =>
    typeof window === "undefined" ? TIMER_DURATION_MS : getDeadline() - Date.now(),
  );

  useEffect(() => {
    const tick = () => setRemaining(getDeadline() - Date.now());
    tick();
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, []);

  const reset = useCallback(() => {
    const deadline = Date.now() + TIMER_DURATION_MS;
    sessionStorage.setItem(TIMER_KEY, String(deadline));
    setRemaining(deadline - Date.now());
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Ignora Ctrl+R / Cmd+R para não interferir no recarregar da página
      if ((e.key === "r" || e.key === "R") && !e.ctrlKey && !e.metaKey && !e.altKey) reset();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reset]);

  const clamped = Math.max(0, remaining);
  const totalSeconds = Math.ceil(clamped / 1000);
  const mm = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const ss = String(totalSeconds % 60).padStart(2, "0");
  const expired = clamped === 0;
  const warning = clamped > 0 && clamped <= 60 * 1000;

  return (
    <button
      onClick={reset}
      title="Aperte R para reiniciar (10:00)"
      className={className}
      style={{ color: expired ? "var(--slide-red)" : warning ? "var(--slide-amber)" : undefined }}
    >
      {mm}:{ss}
    </button>
  );
}
