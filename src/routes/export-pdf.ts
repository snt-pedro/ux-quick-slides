import { createFileRoute } from "@tanstack/react-router";
import PDFDocument from "pdfkit";

export const Route = createFileRoute("/export-pdf")({
  loader: async () => {
    const doc = new PDFDocument({
      size: [1920, 1080],
      margin: 0,
    });

    const filename = "Redesign-do-Pinterest.pdf";

    // Set response headers
    const chunks: Buffer[] = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => {
      // Will be handled by server
    });

    // Add pages for each slide
    const slides = [
      { num: 1, title: "Capa" },
      { num: 2, title: "Como escolhemos o app" },
      { num: 3, title: "Ranking e desempate" },
      { num: 4, title: "Processo" },
      { num: 5, title: "Entregáveis" },
      { num: 6, title: "Desk research: resultados" },
      { num: 7, title: "Desk research: uso no projeto" },
      { num: 8, title: "Cronograma" },
      { num: 9, title: "Encerramento" },
    ];

    slides.forEach((slide, idx) => {
      if (idx > 0) doc.addPage();
      doc.fontSize(48).text(slide.title, 100, 100);
      doc.fontSize(24).text(`Slide ${slide.num}/9`, 100, 200);
    });

    doc.end();

    return new Promise((resolve) => {
      doc.on("end", () => {
        resolve({
          pdf: Buffer.concat(chunks),
          filename,
        });
      });
    });
  },
  component: () => null,
});
