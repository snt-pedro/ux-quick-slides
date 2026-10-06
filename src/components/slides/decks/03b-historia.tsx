import { Fragment } from "react";
import { SlideLayout, type SlideProps } from "../SlideLayout";

const stages = [
  { when: "Começo (2009)", name: "Tote", note: "App de compras da Cold Brew Labs" },
  { when: "Março de 2010", name: "Pinterest", note: "10 mil usuários depois de 9 meses", highlight: true },
  { when: "Hoje", name: "Pinterest, Inc.", note: "NYSE: PINS · 500 mi+ usuários/mês" },
];

const founders = [
  { name: "Ben Silbermann", initials: "BS", photo: "/founders/ben-silbermann.webp", position: "30% 30%", zoom: 1.3 },
  { name: "Paul Sciarra", initials: "PS", photo: "/founders/paul-sciarra.webp", position: "47% 40%", zoom: 1.1 },
  { name: "Evan Sharp", initials: "ES", photo: "/founders/evan-sharp.webp", position: "30% 0%", zoom: 1.6 },
];

const PHOTO_SIZE = 400;

export default function Historia({ index, total }: SlideProps) {
  return (
    <SlideLayout index={index} total={total} kicker="A história do Pinterest">
      <div className="flex flex-1 flex-col" style={{ gap: 56 }}>
        <div className="flex items-stretch" style={{ gap: 20 }}>
          {stages.map((s, i) => (
            <Fragment key={s.name}>
              <div className="slide-pin flex flex-1 flex-col" style={{ padding: "40px 48px", gap: 14 }}>
                <span className="slide-kicker" style={{ color: "var(--slide-muted)" }}>
                  {s.when}
                </span>
                <span
                  className="slide-display"
                  style={{
                    fontSize: 64,
                    lineHeight: 1,
                    fontWeight: 800,
                    letterSpacing: "-0.035em",
                    whiteSpace: "nowrap",
                    color: s.highlight ? "var(--slide-red)" : "var(--slide-fg)",
                  }}
                >
                  {s.name}
                </span>
                <span className="slide-caption" style={{ color: "#444" }}>
                  {s.note}
                </span>
              </div>
              {i < stages.length - 1 && (
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

        <div className="flex flex-1 items-center justify-center" style={{ gap: 120 }}>
          {founders.map((f) => (
            <div key={f.name} className="flex flex-col items-center" style={{ gap: 24 }}>
              <div
                className="relative flex items-center justify-center overflow-hidden"
                style={{
                  width: PHOTO_SIZE,
                  height: PHOTO_SIZE,
                  borderRadius: 999,
                  background: "var(--slide-soft)",
                }}
              >
                <span className="slide-subtitle" style={{ fontWeight: 700, color: "var(--slide-muted)" }}>
                  {f.initials}
                </span>
                {/* alt vazio: o nome já aparece abaixo; se a foto faltar, as iniciais ficam visíveis */}
                <img
                  src={f.photo}
                  alt=""
                  className="absolute inset-0"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: f.position,
                    transform: `scale(${f.zoom})`,
                    transformOrigin: f.position,
                  }}
                />
              </div>
              <span className="slide-body" style={{ fontWeight: 600 }}>
                {f.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
