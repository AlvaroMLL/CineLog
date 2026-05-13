// Este arquivo concentra os eventos com addEventListener.
import {
  adicionarFilme,
  atualizarFilme,
  buscarPorId,
  filtrarPorTitulo,
  getFilmes,
  removerFilme,
  toggleAssistido
} from "./filmes.js";
import { atualizarResumo, limparForm, preencherForm, renderFilmes } from "./ui.js";

const form = document.querySelector("#form-filme");
const lista = document.querySelector("#lista-filmes");
const busca = document.querySelector("#busca");
const btnCancelar = document.querySelector("#btn-cancelar");

function atualizarTela() {
  const termo = busca.value;
  const listaFilmes = termo ? filtrarPorTitulo(termo) : getFilmes();
  renderFilmes(listaFilmes);
  atualizarResumo(listaFilmes);
}

export function iniciarEventos() {
  // Evento de submit do formulario.
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const id = document.querySelector("#filme-id").value;
    const dados = {
      titulo: document.querySelector("#titulo").value.trim(),
      genero: document.querySelector("#genero").value.trim(),
      nota: document.querySelector("#nota").value,
      assistido: document.querySelector("#assistido").checked
    };

    if (id) {
      atualizarFilme(id, dados);
    } else {
      adicionarFilme(dados);
    }

    limparForm();
    atualizarTela();
  });

  // Evento de clique para editar/remover (delegacao simples).
  lista.addEventListener("click", (event) => {
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

    if (acao === "editar") {
      const filme = buscarPorId(id);
      if (filme) {
        preencherForm(filme);
      }
    }
  });

  // Evento de mudanca do checkbox assistido.
  lista.addEventListener("change", (event) => {
    const alvo = event.target;
    if (alvo.dataset.acao === "assistido") {
      toggleAssistido(alvo.dataset.id);
      atualizarTela();
    }
  });

  // Evento de busca.
  busca.addEventListener("input", () => {
    atualizarTela();
  });

  // Evento do botao cancelar.
  btnCancelar.addEventListener("click", () => {
    limparForm();
  });
}
