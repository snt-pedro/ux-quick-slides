import { SlideLayout, SlideTitle, type SlideProps } from "../SlideLayout";

const cats = [
  { label: "Anúncios intrusivos e dark patterns", n: 6 },
  { label: "Mudança indesejada de interface", n: 4 },
  { label: "Autenticação e onboarding", n: 1 },
  { label: "Navegação e arquitetura da informação", n: 1 },
  { label: "Notificações e interrupções", n: 1 },
];
const max = 6;

const heuristics = [
  { h: "H4 Consistência e padrões", n: 5 },
  { h: "H8 Estética e design minimalista", n: 4 },
  { h: "H3 Controle e liberdade", n: 3 },
];

const quotes = [
  "no meu feed chega a aparecer 6 anúncios seguidos",
  "não tem motivo pra mudar a pesquisa pra baixo, quando era em cima era muito melhor",
  "meter o baixar na imagem no compartilhar agora nem dá pra baixar",
];

export default function Resultados({ index, total }: SlideProps) {
  return (
    <SlideLayout index={index} total={total} kicker="Desk research · resultados">
      <div className="flex flex-1 flex-col" style={{ gap: 36 }}>
        <SlideTitle>
          <span style={{ color: "var(--slide-red)" }}>13 de 30</span> comentários negativos (43%)
          <br />
          relatam problema de interface
        </SlideTitle>

        <div className="flex flex-1" style={{ gap: 72 }}>
          {/* barras */}
          <div className="flex flex-col" style={{ flex: 1.15, gap: 14 }}>
            <span className="slide-kicker" style={{ color: "var(--slide-muted)" }}>
              Ocorrências por categoria
            </span>
            {cats.map((c, i) => (
              <div key={c.label} className="flex flex-col" style={{ gap: 8 }}>
                <span className="slide-caption" style={{ fontWeight: 500 }}>
                  {c.label}
                </span>
                <div className="flex items-center" style={{ gap: 16 }}>
                  <div
                    style={{
                      height: 26,
                      width: `${(c.n / max) * 82}%`,
                      borderRadius: 999,
                      background: i === 0 ? "var(--slide-red)" : i === 1 ? "#111" : "#cfcfcf",
                    }}
                  />
                  <span className="slide-body slide-num" style={{ fontWeight: 700 }}>
                    {c.n}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* citações */}
          <div className="flex flex-col" style={{ flex: 1, gap: 16 }}>
            <span className="slide-kicker" style={{ color: "var(--slide-muted)" }}>
              O que dizem
            </span>
            {quotes.map((q) => (
              <blockquote
                key={q}
                className="slide-pin slide-body"
                style={{ padding: "24px 32px", fontWeight: 500, fontStyle: "italic" }}
              >
                “{q}”
              </blockquote>
            ))}
          </div>
        </div>

        <div className="flex items-center" style={{ gap: 14 }}>
          <span className="slide-kicker" style={{ color: "var(--slide-muted)", marginRight: 10 }}>
            Heurísticas mais violadas
          </span>
          {heuristics.map((h, i) => (
            <span key={h.h} className={i === 0 ? "slide-chip slide-chip-red" : "slide-chip"}>
              {h.h} · {h.n}
            </span>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
