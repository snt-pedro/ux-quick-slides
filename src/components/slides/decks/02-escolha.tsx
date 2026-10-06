import { Fragment } from "react";
import { SlideLayout, SlideTitle, type SlideProps } from "../SlideLayout";

const steps = [
  { n: "100", label: "Universo", desc: "Top 100 apps da Play Store BR" },
  { n: "30", label: "Amostra", desc: "Avaliações 1–2★ mais recentes de cada app" },
  {
    n: "13",
    label: "Classificação",
    desc: "Só conta o que um redesign de interface resolveria. 13 categorias + heurística de Nielsen",
  },
  { n: "1º", label: "Ranking", desc: "Apps ordenados por ocorrências de problemas de UX" },
];

export default function Escolha({ index, total }: SlideProps) {
  return (
    <SlideLayout index={index} total={total} kicker="Como escolhemos o app">
      <div className="flex items-stretch" style={{ gap: 20, height: 600, marginTop: 80 }}>
        <div className="flex items-stretch" style={{ gap: 20, height: 600 }}>
          {steps.map((s, i) => (
            <Fragment key={s.label}>
              <div className="slide-pin flex flex-1 flex-col" style={{ padding: 48, gap: 20 }}>
                <span
                  className="slide-display slide-num"
                  style={{
                    fontSize: 120,
                    lineHeight: 1,
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    color: i === steps.length - 1 ? "var(--slide-red)" : "var(--slide-fg)",
                  }}
                >
                  {s.n}
                </span>
                <span className="slide-subtitle" style={{ fontWeight: 700 }}>
                  {s.label}
                </span>
                <span className="slide-body" style={{ color: "#444" }}>
                  {s.desc}
                </span>
              </div>
              {i < steps.length - 1 && (
                <span
                  className="slide-subtitle self-center"
                  style={{ color: "var(--slide-muted)", fontWeight: 400 }}
                >
                  →
                </span>
              )}
            </Fragment>
          ))}
        </div>

      </div>
    </SlideLayout>
  );
}
