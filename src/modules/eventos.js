// Este arquivo concentra os eventos com addEventListener.
import {
  adicionarNaLista,
  atualizarNota,
  filtrarPorTitulo,
  getCatalogo,
  getMinhaLista,
  removerFilme,
  toggleAssistido
} from "./filmes.js";
import { atualizarResumo, renderCatalogo, renderMinhaLista } from "./ui.js";

const listaCatalogo = document.querySelector("#lista-filmes");
const listaUsuario = document.querySelector("#lista-usuario");
const busca = document.querySelector("#busca");

function atualizarTela() {
  const termo = busca.value;
  const catalogo = getCatalogo();
  const minhaLista = getMinhaLista();
  const listaFilmes = termo ? filtrarPorTitulo(catalogo, termo) : catalogo;
  const idsNaLista = new Set(minhaLista.map((filme) => filme.id));

  renderCatalogo(listaFilmes, idsNaLista);
  renderMinhaLista(minhaLista);
  atualizarResumo(minhaLista);
}

export function iniciarEventos() {
  // Evento de clique para adicionar no catalogo.
  listaCatalogo.addEventListener("click", (event) => {
    const alvo = event.target;
    const acao = alvo.dataset.acao;
    const id = alvo.dataset.id;

    if (!acao || !id) {
      return;
    }

    if (acao === "adicionar") {
      adicionarNaLista(id);
      atualizarTela();
    }
  });

  // Evento de clique para remover da lista do usuario.
  listaUsuario.addEventListener("click", (event) => {
    const alvo = event.target;
    const acao = alvo.dataset.acao;
    const id = alvo.dataset.id;

    if (!acao || !id) {
      return;
    }

    if (acao === "remover") {
      removerFilme(id);
      atualizarTela();
      return;
    }
  });

  // Evento de mudanca do checkbox assistido.
  listaUsuario.addEventListener("change", (event) => {
    const alvo = event.target;
    if (alvo.dataset.acao === "assistido") {
      toggleAssistido(alvo.dataset.id);
      if (!alvo.checked) {
        atualizarNota(alvo.dataset.id, "");
      }
      atualizarTela();
    }
    if (alvo.dataset.acao === "nota") {
      atualizarNota(alvo.dataset.id, alvo.value);
      atualizarTela();
    }
  });

  // Evento de busca.
  busca.addEventListener("input", () => {
    atualizarTela();
  });

}
