import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { ScaledSlide } from "@/components/slides/ScaledSlide";
import { slides } from "@/lib/slides";

export const Route = createFileRoute("/slides/$index")({
  head: ({ params }) => {
    const i = Math.max(1, Math.min(slides.length, parseInt(params.index, 10) || 1));
    const s = slides[i - 1];
    return {
      meta: [
        { title: `${i}/${slides.length} — ${s.title} · Redesign do Pinterest` },
        {
          name: "description",
          content:
            "Apresentação inicial do projeto de UX: redesign do Pinterest (QXD0211).",
        },
      ],
    };
  },
  component: SlidePage,
});

function SlidePage() {
  const { index } = Route.useParams();
  const navigate = useNavigate();
  const [fsHint, setFsHint] = useState(true);

  const i = Math.max(1, Math.min(slides.length, parseInt(index, 10) || 1));
  const slide = slides[i - 1];
  const total = slides.length;

  const go = useCallback(
    (next: number) => {
      const target = Math.max(1, Math.min(total, next));
      if (target !== i) navigate({ to: "/slides/$index", params: { index: String(target) } });
    },
    [i, total, navigate],
  );

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        go(i + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(i - 1);
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      } else if (e.key === "Home") go(1);
      else if (e.key === "End") go(total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, i, total, toggleFullscreen]);

  useEffect(() => {
    const t = setTimeout(() => setFsHint(false), 3500);
    return () => clearTimeout(t);
  }, []);

  const Slide = slide.Component;

  return (
    <div className="relative h-screen w-screen overflow-hidden" style={{ background: "#ffffff" }}>
      <ScaledSlide>
        <Slide index={i} total={total} />
      </ScaledSlide>

      {fsHint && (
        <div
          className="pointer-events-none absolute right-6 top-6 rounded-full px-4 py-2 font-mono text-xs text-black/60 transition-opacity"
          style={{ background: "rgba(0,0,0,0.06)" }}
        >
          ← → para navegar · F para tela cheia · clique no tempo para reiniciar
        </div>
      )}
    </div>
  );
}
