import { useState, useEffect } from "react";
import { FileDown, Loader } from "lucide-react";
import { exportSlidesToPdf } from "@/lib/pdf-exporter";

export function PdfExportButton() {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const checkFullscreen = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    checkFullscreen();
    document.addEventListener("fullscreenchange", checkFullscreen);
    return () => document.removeEventListener("fullscreenchange", checkFullscreen);
  }, []);

  if (isFullscreen) {
    return null;
  }

  const handleExport = async () => {
    if (isExporting) return;

    setIsExporting(true);
    setProgress(0);

    try {
      await exportSlidesToPdf({
        onProgress: setProgress,
        onComplete: () => {
          setProgress(100);
          setTimeout(() => {
            setIsExporting(false);
            setProgress(0);
          }, 500);
        },
        onError: (error) => {
          console.error("Erro na exportação:", error);
          alert("Erro ao exportar PDF: " + error.message);
          setIsExporting(false);
          setProgress(0);
        },
      });
    } catch (error) {
      setIsExporting(false);
      setProgress(0);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200"
      style={{
        background: isExporting ? "rgba(239, 68, 68, 0.1)" : "rgba(239, 68, 68, 0.1)",
        color: "var(--slide-red)",
        opacity: isExporting ? 0.7 : 1,
        cursor: isExporting ? "not-allowed" : "pointer",
        border: "1px solid rgba(239, 68, 68, 0.2)",
      }}
      title="Exportar apresentação para PDF (P)"
    >
      {isExporting ? (
        <>
          <Loader size={16} className="animate-spin" />
          <span className="text-xs">{progress}%</span>
        </>
      ) : (
        <>
          <FileDown size={16} />
          <span>PDF</span>
        </>
      )}
    </button>
  );
}
