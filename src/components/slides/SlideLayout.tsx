import type { ReactNode } from "react";
import { CountdownTimer } from "./CountdownTimer";

type Props = {
  children: ReactNode;
  index: number;
  total: number;
  kicker?: string;
  /** Esconde cabeçalho e rodapé (capa e encerramento). */
  bare?: boolean;
};

export type SlideProps = { index: number; total: number };

export function SlideLayout({ children, index, total, kicker, bare = false }: Props) {
  return (
    <div className="slide-content">
      {/* header */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between"
        style={{ padding: "56px 96px 0 96px" }}
      >
        <div className="flex items-center" style={{ gap: 18 }}>
          <span
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              background: "var(--slide-red)",
              display: bare ? "none" : "block",
            }}
          />
          {!bare && (
            <span className="slide-kicker" style={{ color: "var(--slide-fg)" }}>
              {kicker}
            </span>
          )}
        </div>
        <div className="slide-page slide-num flex items-center" style={{ gap: 24 }}>
          <span style={{ color: "var(--slide-muted)" }}>
            {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <CountdownTimer className="slide-page slide-num" />
        </div>
      </div>

      {/* body */}
      <div className="absolute inset-0 flex flex-col" style={{ padding: "150px 96px 110px 96px" }}>
        {children}
      </div>

      {/* footer */}
      {!bare && (
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-between"
          style={{ padding: "0 96px 48px 96px", color: "var(--slide-muted)" }}
        >
          <span className="slide-footer">Redesign do Pinterest</span>
          <span className="slide-footer">QXD0211 · UFC Quixadá</span>
        </div>
      )}
    </div>
  );
}

/** Título padrão dos slides internos. */
export function SlideTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="slide-display slide-title" style={{ fontWeight: 800 }}>
      {children}
    </h2>
  );
}

/** Marcador para conteúdo que a equipe ainda precisa preencher. */
export function Todo({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        background: "#fff4d6",
        color: "var(--slide-amber)",
        borderRadius: 8,
        padding: "0 10px",
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  );
}
