// Este arquivo guarda a lista e as regras basicas dos filmes.
import { carregarFilmes, salvarFilmes } from "./storage.js";

// Lista inicial simples para nao ficar vazio no primeiro uso.
// Aqui os filmes ja aparecem, mas a nota fica vazia para o usuario avaliar.
const filmesBase = [
  { titulo: "Inception", genero: "Sci-Fi" },
  { titulo: "Interstellar", genero: "Sci-Fi" },
  { titulo: "Whiplash", genero: "Drama" },
  { titulo: "Arrival", genero: "Sci-Fi" },
  { titulo: "Parasite", genero: "Thriller" },
  { titulo: "The Batman", genero: "Action" },
  { titulo: "The Social Network", genero: "Drama" },
  { titulo: "Get Out", genero: "Horror" },
  { titulo: "Blade Runner 2049", genero: "Sci-Fi" },
  { titulo: "Mad Max Fury Road", genero: "Action" },
  { titulo: "Dune", genero: "Sci-Fi" },
  { titulo: "The Grand Budapest Hotel", genero: "Comedy" },
  { titulo: "Black Swan", genero: "Drama" },
  { titulo: "Her", genero: "Drama" },
  { titulo: "Joker", genero: "Drama" },
  { titulo: "La La Land", genero: "Musical" },
  { titulo: "The Truman Show", genero: "Drama" },
  { titulo: "The Matrix", genero: "Sci-Fi" },
  { titulo: "Knives Out", genero: "Mystery" },
  { titulo: "Spider-Man Into the Spider-Verse", genero: "Animation" }
].map((filme, index) => criarFilmeBase(filme, index));

function criarFilmeBase(filme, index) {
  return {
    id: `f${index + 1}`,
    titulo: filme.titulo,
    genero: filme.genero,
    nota: null,
    assistido: false,
    posterUrl: gerarPosterUrl(filme.titulo)
  };
}

function gerarPosterUrl(titulo) {
  // Fotos simples via URL (nao depende de API).
  const seed = encodeURIComponent(titulo.toLowerCase().replace(/\s+/g, "-"));
  return `https://picsum.photos/seed/${seed}/320/480`;
}

let filmes = carregarFilmes();

if (filmes.length === 0) {
  filmes = filmesBase;
  salvarFilmes(filmes);
}

export function getFilmes() {
  return filmes;
}

export function adicionarFilme(dados) {
  const novo = {
    id: Date.now().toString(),
    titulo: dados.titulo,
    genero: dados.genero,
    nota: Number(dados.nota),
    assistido: dados.assistido,
    posterUrl: gerarPosterUrl(dados.titulo)
  };

  filmes = [...filmes, novo];
  salvarFilmes(filmes);
  return novo;
}

export function atualizarFilme(id, dados) {
  // map: criando uma nova lista com o filme atualizado.
  filmes = filmes.map((filme) => {
    if (filme.id === id) {
      return { ...filme, ...dados, nota: Number(dados.nota) };
    }
    return filme;
  });

  salvarFilmes(filmes);
}

export function removerFilme(id) {
  // filter: removendo o filme pelo id.
  filmes = filmes.filter((filme) => filme.id !== id);
  salvarFilmes(filmes);
}

export function toggleAssistido(id) {
  filmes = filmes.map((filme) => {
    if (filme.id === id) {
      return { ...filme, assistido: !filme.assistido };
    }
    return filme;
  });

  salvarFilmes(filmes);
}

export function buscarPorId(id) {
  return filmes.find((filme) => filme.id === id);
}

export function filtrarPorTitulo(termo) {
  const busca = termo.trim().toLowerCase();

  // filter: usado para buscar filmes pelo titulo.
  return filmes.filter((filme) => filme.titulo.toLowerCase().includes(busca));
}

export function calcularMediaNotas(lista) {
  if (lista.length === 0) {
    return 0;
  }

  // reduce: somando as notas para calcular a media.
  const soma = lista.reduce((acc, filme) => acc + Number(filme.nota || 0), 0);
  return soma / lista.length;
}
