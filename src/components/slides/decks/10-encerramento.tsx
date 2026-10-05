import { SlideLayout, type SlideProps } from "../SlideLayout";

export default function Encerramento({ index, total }: SlideProps) {
  return (
    <SlideLayout index={index} total={total} bare>
      <div className="flex flex-1 flex-col items-center justify-center text-center" style={{ gap: 40 }}>
        <span
          style={{ width: 28, height: 28, borderRadius: 999, background: "var(--slide-red)" }}
        />
        <h1 className="slide-display slide-title-lg" style={{ fontWeight: 800 }}>
          Obrigado!
        </h1>
        <span className="slide-subtitle" style={{ color: "var(--slide-muted)", fontWeight: 500 }}>
          Dúvidas?
        </span>
      </div>
    </SlideLayout>
  );
}
