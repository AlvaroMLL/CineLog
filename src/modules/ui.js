// Este arquivo monta a interface e mexe no DOM.
import { calcularMediaNotas } from "./filmes.js";

const listaEl = document.querySelector("#lista-filmes");
const totalEl = document.querySelector("#total-filmes");
const mediaEl = document.querySelector("#media-notas");
const modoEdicaoEl = document.querySelector("#modo-edicao");

// DOM: criando os cards com createElement e appendChild.
export function renderFilmes(lista) {
  listaEl.replaceChildren();

  if (lista.length === 0) {
    const vazio = document.createElement("p");
    vazio.textContent = "Nenhum filme encontrado.";
    vazio.className = "aviso";
    listaEl.appendChild(vazio);
    return;
  }

  // map: transformando cada filme em um card.
  const cards = lista.map((filme) => criarCard(filme));
  cards.forEach((card) => listaEl.appendChild(card));
}

function criarCard(filme) {
  const card = document.createElement("article");
  card.className = "filme";

  const poster = document.createElement("div");
  poster.className = "poster";

  if (filme.posterUrl) {
    const img = document.createElement("img");
    img.src = filme.posterUrl;
    img.alt = `Poster de ${filme.titulo}`;
    img.className = "poster-img";
    poster.appendChild(img);
  } else {
    poster.classList.add(pegarClassePoster(filme.titulo));
    poster.textContent = filme.titulo.slice(0, 1);
  }

  const conteudo = document.createElement("div");
  conteudo.className = "filme-conteudo";

  const titulo = document.createElement("h3");
  titulo.textContent = filme.titulo;

  const info = document.createElement("div");
  info.className = "info";

  const genero = document.createElement("span");
  genero.textContent = `Genero: ${filme.genero}`;

  const nota = document.createElement("span");
  const textoNota = filme.nota ? `${filme.nota}/5` : "Sem nota";
  nota.textContent = `Nota: ${textoNota}`;

  const assistido = document.createElement("span");
  assistido.textContent = filme.assistido ? "Assistido" : "Quero ver";

  info.appendChild(genero);
  info.appendChild(nota);
  info.appendChild(assistido);

  const acoes = document.createElement("div");
  acoes.className = "acoes-filme";

  const btnEditar = document.createElement("button");
  btnEditar.textContent = "Editar";
  btnEditar.dataset.id = filme.id;
  btnEditar.dataset.acao = "editar";

  const btnRemover = document.createElement("button");
  btnRemover.textContent = "Remover";
  btnRemover.className = "remover";
  btnRemover.dataset.id = filme.id;
  btnRemover.dataset.acao = "remover";

  const linhaCheck = document.createElement("label");
  linhaCheck.className = "linha-check";

  const check = document.createElement("input");
  check.type = "checkbox";
  check.checked = filme.assistido;
  check.dataset.id = filme.id;
  check.dataset.acao = "assistido";

  const checkTexto = document.createElement("span");
  checkTexto.textContent = "Assistido";

  linhaCheck.appendChild(check);
  linhaCheck.appendChild(checkTexto);

  acoes.appendChild(btnEditar);
  acoes.appendChild(btnRemover);

  conteudo.appendChild(titulo);
  conteudo.appendChild(info);
  conteudo.appendChild(linhaCheck);
  conteudo.appendChild(acoes);

  card.appendChild(poster);
  card.appendChild(conteudo);

  return card;
}

function pegarClassePoster(titulo) {
  const paletas = ["a", "b", "c", "d"];
  const indice = titulo.length % paletas.length;
  return paletas[indice];
}

export function atualizarResumo(lista) {
  totalEl.textContent = String(lista.length);
  mediaEl.textContent = calcularMediaNotas(lista).toFixed(1);
}

export function preencherForm(filme) {
  document.querySelector("#filme-id").value = filme.id;
  document.querySelector("#titulo").value = filme.titulo;
  document.querySelector("#genero").value = filme.genero;
  document.querySelector("#nota").value = filme.nota ? String(filme.nota) : "1";
  document.querySelector("#assistido").checked = filme.assistido;
  modoEdicaoEl.textContent = "Modo: editando";
}

export function limparForm() {
  document.querySelector("#form-filme").reset();
  document.querySelector("#filme-id").value = "";
  modoEdicaoEl.textContent = "Modo: adicionando";
}
