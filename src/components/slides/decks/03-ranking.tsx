import { SlideLayout, SlideTitle, Todo, type SlideProps } from "../SlideLayout";

const rows = [
  { pos: 1, app: "BB", occ: 15, rev: 12, cats: 5, rank: "65º", out: true },
  { pos: 2, app: "Pinterest", occ: 13, rev: 13, cats: 5, rank: "24º", win: true },
  { pos: 3, app: "Fitness em Casa", occ: 13, rev: 13, cats: 2, rank: "46º" },
  { pos: 4, app: "Yoosee", occ: 13, rev: 12, cats: 5, rank: "84º" },
];

const tiebreaks = [
  {
    n: "1",
    rule: "Mais comentários com problema de UX",
    why: "Quantas pessoas reclamam, não quantas vezes",
    result: "Yoosee sai (12)",
  },
  {
    n: "2",
    rule: "Mais categorias distintas",
    why: "92% do Fitness em Casa é anúncio. Pinterest espalha em 5 tipos",
    result: "Pinterest vence (5 × 2)",
  },
];

export default function Ranking({ index, total }: SlideProps) {
  return (
    <SlideLayout index={index} total={total} kicker="Resultado do ranking">
      <div className="flex flex-1 flex-col" style={{ gap: 44 }}>
        <div className="flex flex-1" style={{ gap: 64 }}>
          {/* tabela */}
          <div className="flex flex-col" style={{ flex: 1.25, gap: 28 }}>
            <table className="slide-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>App</th>
                  <th>Ocorrências</th>
                  <th>Comentários</th>
                  <th>Categorias</th>
                  <th>Play Store</th>
                </tr>
              </thead>
              <tbody className="slide-num">
                {rows.map((r) => (
                  <tr
                    key={r.app}
                    className={r.win ? "is-hl" : undefined}
                    style={{
                      color: r.out ? "var(--slide-muted)" : undefined,
                      fontWeight: r.win ? 700 : 400,
                    }}
                  >
                    <td>{r.pos}</td>
                    <td style={{ textDecoration: r.out ? "line-through" : undefined }}>{r.app}</td>
                    <td>{r.occ}</td>
                    <td>{r.rev}</td>
                    <td>{r.cats}</td>
                    <td>{r.rank}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* desempate */}
          <div className="flex flex-col" style={{ flex: 1, gap: 20 }}>
            {tiebreaks.map((t) => (
              <div key={t.n} className="slide-pin flex flex-col" style={{ padding: "36px 40px", gap: 14 }}>
                <span className="slide-kicker" style={{ color: "var(--slide-muted)" }}>
                  Desempate {t.n}
                </span>
                <span className="slide-body-lg" style={{ fontWeight: 700 }}>
                  {t.rule}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
