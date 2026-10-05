import { SlideLayout, SlideTitle, type SlideProps } from "../SlideLayout";

const links = [
  {
    finding: "Anúncios misturados aos pins",
    use: "Roteiro das entrevistas + tarefa no teste",
    task: "“Encontre uma ideia que não seja anúncio”",
  },
  {
    finding: "Mudanças de layout (busca, download)",
    use: "Tarefas do teste de usabilidade",
    task: "“Salve / baixe esta imagem”",
  },
  {
    finding: "Frustração e irritação nos reviews",
    use: "Emoções a evitar no redesign",
    task: "Medidas com a escala SAM",
  },
];

export default function Uso({ index, total }: SlideProps) {
  return (
    <SlideLayout index={index} total={total} kicker="Desk research · próximos passos">
      <div className="flex flex-1 flex-col" style={{ gap: 48 }}>
        <SlideTitle>Do achado ao uso no projeto</SlideTitle>

        <div className="flex flex-1 flex-col justify-center" style={{ gap: 20 }}>
          {links.map((l) => (
            <div
              key={l.finding}
              className="grid items-center"
              style={{ gridTemplateColumns: "1fr 80px 1.3fr", gap: 0 }}
            >
              <div className="slide-pin slide-body-lg" style={{ padding: "34px 40px", fontWeight: 700 }}>
                {l.finding}
              </div>
              <span
                className="slide-subtitle text-center"
                style={{ color: "var(--slide-red)", fontWeight: 700 }}
              >
                →
              </span>
              <div className="slide-pin-outline flex flex-col" style={{ padding: "26px 40px", gap: 6 }}>
                <span className="slide-body" style={{ fontWeight: 600 }}>
                  {l.use}
                </span>
                <span className="slide-caption" style={{ color: "var(--slide-muted)" }}>
                  {l.task}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </SlideLayout>
  );
}
