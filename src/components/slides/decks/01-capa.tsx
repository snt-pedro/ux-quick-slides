import { SlideLayout, type SlideProps } from "../SlideLayout";

// Mosaico abstrato no estilo do feed (colunas com alturas alternadas).
const columns = [
  [260, 380, 220],
  [420, 240, 300],
  [200, 340, 360],
];

export default function Capa({ index, total }: SlideProps) {
  return (
    <SlideLayout index={index} total={total} bare>
      <div className="flex flex-1 items-stretch" style={{ gap: 96 }}>
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex flex-col justify-between" style={{ gap: 40 }}>
            <h1 className="slide-display slide-title-lg" style={{ fontWeight: 800 }}>
              Redesign do
              <br />
              <span style={{ color: "var(--slide-red)" }}>Pinterest</span>
            </h1>

            <div className="flex flex-col" style={{ gap: 10 }}>
              <span className="slide-kicker" style={{ color: "var(--slide-muted)" }}>
                Equipe
              </span>
              <span className="slide-body-lg" style={{ fontWeight: 600 }}>
                Pedro, Maria, Jonatan e Vitor
              </span>
            </div>
          </div>
        </div>

        <div className="flex" style={{ gap: 20, marginTop: -94, marginBottom: -110 }}>
          {columns.map((col, c) => (
            <div key={c} className="flex flex-col" style={{ gap: 20, marginTop: c === 1 ? -120 : 0 }}>
              {col.map((h, r) => (
                <div
                  key={r}
                  style={{
                    width: 200,
                    height: h,
                    borderRadius: 32,
                    background: c === 1 && r === 1 ? "var(--slide-red)" : "var(--slide-soft)",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
