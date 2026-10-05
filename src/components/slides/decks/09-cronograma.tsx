import { SlideLayout, SlideTitle, type SlideProps } from "../SlideLayout";

const timeline = [
  { when: "Out · 1ª quinzena", phase: "Descobrir", what: "Entrevistas" },
  { when: "Out · 2ª quinzena", phase: "Definir", what: "Persona + jornada" },
  { when: "Nov", phase: "Desenvolver", what: "Wireframes + protótipo" },
  { when: "Início de dez", phase: "Entregar", what: "Teste de usabilidade" },
  { when: "07–09/12", phase: "Final", what: "Apresentação + artefatos", last: true },
];

export default function Cronograma({ index, total }: SlideProps) {
  return (
    <SlideLayout index={index} total={total} kicker="Cronograma">
      <div className="flex flex-1 flex-col" style={{ gap: 48 }}>
        <SlideTitle>Outubro a dezembro</SlideTitle>

        <div className="relative flex flex-1 items-center">
          <div
            className="absolute left-0 right-0"
            style={{ top: "50%", height: 4, background: "var(--slide-line)", borderRadius: 4 }}
          />
          <div className="relative grid w-full grid-cols-5" style={{ gap: 20 }}>
            {timeline.map((t, i) => (
              <div key={t.when} className="flex flex-col items-start" style={{ gap: 24 }}>
                <span className="slide-caption slide-num" style={{ color: "var(--slide-muted)", height: 60, display: "flex", alignItems: "flex-end" }}>
                  {t.when}
                </span>
                <span
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 999,
                    background: t.last ? "var(--slide-red)" : i === 0 ? "#111" : "#fff",
                    border: t.last || i === 0 ? "none" : "4px solid #111",
                  }}
                />
                <div className="slide-pin flex w-full flex-col" style={{ padding: "28px 32px", gap: 8 }}>
                  <span
                    className="slide-kicker"
                    style={{ color: t.last ? "var(--slide-red)" : "var(--slide-fg)" }}
                  >
                    {t.phase}
                  </span>
                  <span className="slide-body" style={{ fontWeight: 600 }}>
                    {t.what}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
