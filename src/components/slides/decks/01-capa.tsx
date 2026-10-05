import { SlideLayout, type SlideProps } from "../SlideLayout";

export default function Capa({ index, total }: SlideProps) {
  return (
    <SlideLayout index={index} total={total} bare>
      <div className="flex flex-1 items-center justify-between" style={{ gap: 120, paddingRight: 80 }}>
        <div className="flex flex-1 flex-col justify-between h-full">
          <div className="flex flex-col" style={{ gap: 40, paddingTop: 60 }}>
            <h1 className="slide-display slide-title-lg" style={{ fontWeight: 800, lineHeight: 1.1, whiteSpace: "nowrap" }}>
              Redesign do<br />
              <span style={{ color: "var(--slide-red)" }}>Pinterest</span>
            </h1>
          </div>

          <div className="flex flex-col" style={{ gap: 20, paddingBottom: 0 }}>
            <div className="flex flex-col" style={{ gap: 8 }}>
              <span className="slide-kicker" style={{ color: "var(--slide-muted)" }}>
                Equipe
              </span>
              <span className="slide-body" style={{ fontWeight: 600 }}>
                Pedro, Maria, Jonatan e Vitor
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center" style={{ flex: 0.6, height: "100%", marginLeft: -100 }}>
          <img src="/pinterest.png" alt="Pinterest" style={{ maxWidth: 1200, maxHeight: 1400, objectFit: "contain" }} />
        </div>
      </div>
    </SlideLayout>
  );
}
