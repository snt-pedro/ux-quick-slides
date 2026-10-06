import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { ScaledSlide } from "@/components/slides/ScaledSlide";
import { PdfExportButton } from "@/components/slides/PdfExportButton";
import { slides } from "@/lib/slides";
import { exportSlidesToPdf } from "@/lib/pdf-exporter";

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
  const [isPrint, setIsPrint] = useState(false);

  useEffect(() => {
    setIsPrint(new URLSearchParams(window.location.search).get("print") === "true");
  }, []);

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

  const exportToPdf = useCallback(() => {
    exportSlidesToPdf({
      onError: (error) => {
        console.error("Erro ao exportar PDF:", error);
        alert("Erro ao exportar para PDF: " + error.message);
      },
    });
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
      } else if (e.key === "p" || e.key === "P") {
        exportToPdf();
      } else if (e.key === "Home") go(1);
      else if (e.key === "End") go(total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, i, total, toggleFullscreen, exportToPdf]);

  useEffect(() => {
    const t = setTimeout(() => setFsHint(false), 3500);
    return () => clearTimeout(t);
  }, []);

  if (isPrint) {
    const filename = new URLSearchParams(window.location.search).get("filename");
    document.title = filename?.replace(/\.pdf$/i, "") || "Redesign do Pinterest - Impressão";
    return (
      <div className="print-deck">
        {slides.map(({ Component }, index) => (
          <div key={index} className="print-slide-wrapper">
            <Component index={index + 1} total={total} />
          </div>
        ))}
      </div>
    );
  }

  const Slide = slide.Component;

  return (
    <div className="relative h-screen w-screen overflow-hidden" style={{ background: "#ffffff" }}>
      <ScaledSlide>
        <Slide index={i} total={total} />
      </ScaledSlide>

      {/* Controles de exportação e navegação */}
      <div className="absolute left-6 top-6 flex items-center gap-3 z-50">
        <PdfExportButton />
      </div>

      {/* Dica de atalhos */}
      {fsHint && (
        <div
          className="pointer-events-none absolute right-6 top-6 rounded-full px-4 py-2 font-mono text-xs text-black/60 transition-opacity"
          style={{ background: "rgba(0,0,0,0.06)" }}
        >
          ← → para navegar · F para tela cheia · P para PDF · clique no tempo para reiniciar
        </div>
      )}

      {/* Indicador de progresso de exportação */}
      <div className="absolute bottom-6 left-6 right-6 h-1 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.1)", display: "none" }}>
        <div className="h-full bg-red-500 transition-all duration-300" style={{ width: "0%" }}></div>
      </div>
    </div>
  );
}
