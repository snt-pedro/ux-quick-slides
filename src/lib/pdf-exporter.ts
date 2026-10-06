export interface ExportOptions {
  filename?: string;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

function waitForImages(document: Document): Promise<void> {
  return Promise.all(
    Array.from(document.images).map((image) => {
      if (image.complete) return Promise.resolve();
      return new Promise<void>((resolve) => {
        image.addEventListener("load", () => resolve(), { once: true });
        image.addEventListener("error", () => resolve(), { once: true });
      });
    }),
  ).then(() => undefined);
}

export async function exportSlidesToPdf(options: ExportOptions = {}): Promise<void> {
  const { filename = "Redesign-do-Pinterest.pdf", onProgress, onComplete, onError } = options;
  let printWindow: Window | null = null;

  try {
    onProgress?.(10);

    const url = new URL(window.location.href);
    url.searchParams.set("print", "true");
    url.searchParams.delete("slide");
    url.searchParams.set("filename", filename);

    printWindow = window.open(url, "_blank");
    if (!printWindow) {
      throw new Error(
        "Não foi possível abrir a janela de impressão. Permita pop-ups e tente novamente.",
      );
    }

    const printDocument = printWindow.document;
    const print = async () => {
      await waitForImages(printDocument);
      if (printDocument.fonts?.ready) await printDocument.fonts.ready;
      printWindow?.focus();
      onProgress?.(80);

      window.setTimeout(() => {
        printWindow?.print();
        onProgress?.(100);
        onComplete?.();
      }, 150);
    };

    printWindow.addEventListener("afterprint", () => printWindow?.close(), { once: true });
    if (printDocument.readyState === "complete") await print();
    else printWindow.addEventListener("load", () => void print(), { once: true });
  } catch (err) {
    printWindow?.close();
    const error = err instanceof Error ? err : new Error(String(err));
    console.error("Erro ao exportar PDF:", error);
    onError?.(error);
    throw error;
  }
}

export function exportCurrentSlideToPdf(slideIndex: number, totalSlides: number): Promise<void> {
  return exportSlidesToPdf({
    filename: `Pinterest-Slide-${String(slideIndex).padStart(2, "0")}-de-${totalSlides}.pdf`,
  });
}
