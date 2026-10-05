import { SlideLayout, SlideTitle, type SlideProps } from "../SlideLayout";

// Geometria do Double Diamond (coordenadas do SVG)
const W = 1600;
const H = 400;
const mid = H / 2;
const q = W / 4;

const phases = [
  { label: "Descobrir", sub: "divergir", x: q },
  { label: "Definir", sub: "convergir", x: q * 2 },
  { label: "Desenvolver", sub: "divergir", x: q * 2 },
  { label: "Entregar", sub: "convergir", x: q * 4 },
];

export default function Processo({ index, total }: SlideProps) {
  return (
    <SlideLayout index={index} total={total} kicker="Processo">
      <div className="flex flex-1 flex-col" style={{ gap: 40 }}>
        <SlideTitle>Double Diamond</SlideTitle>

        <div className="flex flex-col items-center" style={{ gap: 16 }}>
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Double Diamond">
            {/* 1º diamante — problema */}
            <polygon
              points={`0,${mid} ${q},0 ${q * 2},${mid} ${q},${H}`}
              fill="var(--slide-red-soft)"
              stroke="var(--slide-red)"
              strokeWidth={4}
              strokeLinejoin="round"
            />
            {/* 2º diamante — solução */}
            <polygon
              points={`${q * 2},${mid} ${q * 3},0 ${q * 4},${mid} ${q * 3},${H}`}
              fill="var(--slide-soft)"
              stroke="#111"
              strokeWidth={4}
              strokeLinejoin="round"
            />
            <line x1={q} y1={14} x2={q} y2={H - 14} stroke="var(--slide-red)" strokeWidth={2} strokeDasharray="6 10" />
            <line x1={q * 3} y1={14} x2={q * 3} y2={H - 14} stroke="#111" strokeWidth={2} strokeDasharray="6 10" />
            {phases.map((p) => (
              <g key={p.label}>
                <text x={p.x} y={mid - 4} textAnchor="middle" fontSize={38} fontWeight={700} fill="#111" fontFamily="Inter">
                  {p.label}
                </text>
                <text x={p.x} y={mid + 36} textAnchor="middle" fontSize={22} fill="#767676" fontFamily="Inter">
                  {p.sub}
                </text>
              </g>
            ))}
          </svg>
          <div className="flex slide-kicker" style={{ width: W, color: "var(--slide-muted)" }}>
            <span style={{ flex: 1, textAlign: "center", color: "var(--slide-red)" }}>Problema certo</span>
            <span style={{ flex: 1, textAlign: "center" }}>Solução certa</span>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
