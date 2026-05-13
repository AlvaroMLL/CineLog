import { calcularMediaNotas } from "./filmes.js";

const listaEl = document.querySelector("#lista-filmes");
const listaUsuarioEl = document.querySelector("#lista-usuario");
const totalEl = document.querySelector("#total-filmes");
const mediaEl = document.querySelector("#media-notas");

export function renderCatalogo(lista, idsNaLista) {
  listaEl.replaceChildren();

  if (lista.length === 0) {
    const vazio = document.createElement("p");
    vazio.textContent = "Nenhum filme encontrado.";
    vazio.className = "aviso";
    listaEl.appendChild(vazio);
    return;
  }

  const cards = lista.map((filme) => criarCardCatalogo(filme, idsNaLista));
  cards.forEach((card) => listaEl.appendChild(card));
}

export function renderMinhaLista(lista) {
  listaUsuarioEl.replaceChildren();

  if (lista.length === 0) {
    const vazio = document.createElement("p");
    vazio.textContent = "Sua lista esta vazia.";
    vazio.className = "aviso";
    listaUsuarioEl.appendChild(vazio);
    return;
  }

  const cards = lista.map((filme) => criarCardLista(filme));
  cards.forEach((card) => listaUsuarioEl.appendChild(card));
}

function criarCardCatalogo(filme, idsNaLista) {
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

  info.appendChild(genero);

  const acoes = document.createElement("div");
  acoes.className = "acoes-filme";

  const btnAdicionar = document.createElement("button");
  const jaNaLista = idsNaLista.has(filme.id);
  btnAdicionar.textContent = jaNaLista ? "Na sua lista" : "Adicionar";
  btnAdicionar.dataset.id = filme.id;
  btnAdicionar.dataset.acao = "adicionar";
  btnAdicionar.disabled = jaNaLista;

  acoes.appendChild(btnAdicionar);

  conteudo.appendChild(titulo);
  conteudo.appendChild(info);
  conteudo.appendChild(acoes);

  card.appendChild(poster);
  card.appendChild(conteudo);

  return card;
}

function criarCardLista(filme) {
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

  const notaSelect = document.createElement("select");
  notaSelect.className = "nota-select";
  notaSelect.dataset.id = filme.id;
  notaSelect.dataset.acao = "nota";
  notaSelect.disabled = !filme.assistido;

  const opVazia = document.createElement("option");
  opVazia.value = "";
  opVazia.textContent = "Sem nota";

  const op1 = document.createElement("option");
  op1.value = "1";
  op1.textContent = "1";

  const op2 = document.createElement("option");
  op2.value = "2";
  op2.textContent = "2";

  const op3 = document.createElement("option");
  op3.value = "3";
  op3.textContent = "3";

  const op4 = document.createElement("option");
  op4.value = "4";
  op4.textContent = "4";

  const op5 = document.createElement("option");
  op5.value = "5";
  op5.textContent = "5";

  notaSelect.appendChild(opVazia);
  notaSelect.appendChild(op1);
  notaSelect.appendChild(op2);
  notaSelect.appendChild(op3);
  notaSelect.appendChild(op4);
  notaSelect.appendChild(op5);
  notaSelect.value = filme.nota ? String(filme.nota) : "";

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

  acoes.appendChild(notaSelect);
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

