import { SlideLayout, SlideTitle, type SlideProps } from "../SlideLayout";

type Item = { n: number; t: string; done?: boolean };

const plan: { phase: string; items: Item[]; why: string }[] = [
  {
    phase: "Descobrir",
    items: [
      { n: 1, t: "Desk research (análise de reviews)", done: true },
      { n: 2, t: "Matriz CSD" },
    ],
    why: "Levantar problemas reais e confirmar o que os reviews mostram",
  },
  {
    phase: "Definir",
    items: [
      { n: 3, t: "Persona" },
      { n: 4, t: "Jornada do usuário com curva emocional" },
    ],
    why: "Quem usa, onde dói e o que sente",
  },
  {
    phase: "Desenvolver",
    items: [
      { n: 5, t: "Wireframes" },
      { n: 6, t: "Protótipo navegável (Figma)" },
    ],
    why: "Explorar soluções e materializar a melhor",
  },
  {
    phase: "Entregar",
    items: [{ n: 7, t: "Teste de usabilidade: tarefas + SUS + SAM" }],
    why: "Avaliar o redesign com usuários",
  },
];

export default function Entregaveis({ index, total }: SlideProps) {
  return (
    <SlideLayout index={index} total={total} kicker="Planejamento de entregáveis">
      <div className="flex flex-1 flex-col justify-center">
        <div className="grid grid-cols-4" style={{ gap: 28, height: 600 }}>
          {plan.map((p, i) => (
            <div
              key={p.phase}
              className="flex flex-col"
              style={{
                padding: "48px 44px",
                gap: 28,
                borderRadius: 32,
                background: i < 2 ? "var(--slide-red-soft)" : "var(--slide-soft)",
              }}
            >
              <span
                className="slide-kicker"
                style={{ color: i < 2 ? "var(--slide-red)" : "var(--slide-fg)" }}
              >
                {p.phase}
              </span>
              <div className="flex flex-col flex-1" style={{ gap: 20 }}>
                {p.items.map((it) => (
                  <div key={it.n} className="flex" style={{ gap: 16 }}>
                    <span
                      className="slide-num flex shrink-0 items-center justify-center"
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 999,
                        background: it.done ? "var(--slide-red)" : "#fff",
                        color: it.done ? "#fff" : "var(--slide-fg)",
                        fontWeight: 700,
                        fontSize: 24,
                      }}
                    >
                      {it.done ? "✓" : it.n}
                    </span>
                    <span className="slide-body" style={{ fontWeight: 600, alignSelf: "center" }}>
                      {it.t}
                    </span>
                  </div>
                ))}
              </div>
              <span className="slide-caption" style={{ color: "#444" }}>
                {p.why}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
