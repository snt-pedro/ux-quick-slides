import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const doc = new PDFDocument({
  size: [1920, 1080],
  margin: 0,
  bufferPages: true,
});

const slidesInfo = [
  { num: 1, title: 'Capa', desc: 'Redesign do Pinterest' },
  { num: 2, title: 'Como escolhemos o app', desc: '100 → 30 → 13 → 1º' },
  { num: 3, title: 'Ranking e desempate', desc: 'Resultado do ranking' },
  { num: 4, title: 'Processo', desc: 'Double Diamond' },
  { num: 5, title: 'Entregáveis', desc: 'Planejamento de entregáveis' },
  { num: 6, title: 'Desk research: resultados', desc: '13 de 30 comentários' },
  { num: 7, title: 'Desk research: uso no projeto', desc: 'Do achado ao uso' },
  { num: 8, title: 'Cronograma', desc: 'Outubro a dezembro' },
  { num: 9, title: 'Encerramento', desc: 'Obrigado! Dúvidas?' },
];

slidesInfo.forEach((slide, idx) => {
  doc.fontSize(72).font('Helvetica-Bold').text(slide.title, 80, 300);
  doc.fontSize(40).font('Helvetica').text(slide.desc, 80, 450);
  doc.fontSize(24).font('Helvetica').fillColor('#999').text(`Slide ${slide.num}/9`, 80, 900);

  if (idx < slidesInfo.length - 1) {
    doc.addPage();
  }
});

const filePath = path.join(__dirname, 'Redesign-do-Pinterest.pdf');
doc.pipe(fs.createWriteStream(filePath));
doc.end();

console.log(`PDF gerado em: ${filePath}`);
