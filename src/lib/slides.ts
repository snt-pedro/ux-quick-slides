import Capa from "@/components/slides/decks/01-capa";
import Escolha from "@/components/slides/decks/02-escolha";
import Ranking from "@/components/slides/decks/03-ranking";
import Processo from "@/components/slides/decks/04-processo";
import Entregaveis from "@/components/slides/decks/05-entregaveis";
import Resultados from "@/components/slides/decks/07-resultados";
import Uso from "@/components/slides/decks/08-uso";
import Cronograma from "@/components/slides/decks/09-cronograma";
import Encerramento from "@/components/slides/decks/10-encerramento";

export const slides = [
  { title: "Capa", Component: Capa },
  { title: "Como escolhemos o app", Component: Escolha },
  { title: "Ranking e desempate", Component: Ranking },
  { title: "Processo", Component: Processo },
  { title: "Entregáveis", Component: Entregaveis },
  { title: "Desk research: resultados", Component: Resultados },
  { title: "Desk research: uso no projeto", Component: Uso },
  { title: "Cronograma", Component: Cronograma },
  { title: "Encerramento", Component: Encerramento },
];
