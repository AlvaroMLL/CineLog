// Este arquivo guarda a lista e as regras basicas dos filmes.
import { carregarFilmes, salvarFilmes } from "./storage.js";

// Catalogo fixo com 50 filmes disponiveis.
const catalogoBase = [
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
  { titulo: "Spider-Man Into the Spider-Verse", genero: "Animation" },
  { titulo: "Everything Everywhere All at Once", genero: "Sci-Fi" },
  { titulo: "The Godfather", genero: "Crime" },
  { titulo: "Pulp Fiction", genero: "Crime" },
  { titulo: "Fight Club", genero: "Drama" },
  { titulo: "The Shawshank Redemption", genero: "Drama" },
  { titulo: "The Dark Knight", genero: "Action" },
  { titulo: "Se7en", genero: "Thriller" },
  { titulo: "The Prestige", genero: "Drama" },
  { titulo: "The Silence of the Lambs", genero: "Thriller" },
  { titulo: "The Green Mile", genero: "Drama" },
  { titulo: "Gladiator", genero: "Action" },
  { titulo: "The Lord of the Rings: The Fellowship", genero: "Fantasy" },
  { titulo: "The Lord of the Rings: The Two Towers", genero: "Fantasy" },
  { titulo: "The Lord of the Rings: The Return", genero: "Fantasy" },
  { titulo: "Forrest Gump", genero: "Drama" },
  { titulo: "The Lion King", genero: "Animation" },
  { titulo: "Spirited Away", genero: "Animation" },
  { titulo: "Coco", genero: "Animation" },
  { titulo: "Toy Story", genero: "Animation" },
  { titulo: "Your Name", genero: "Animation" },
  { titulo: "The Wolf of Wall Street", genero: "Comedy" },
  { titulo: "The Irishman", genero: "Crime" },
  { titulo: "The Revenant", genero: "Adventure" },
  { titulo: "1917", genero: "War" },
  { titulo: "Oppenheimer", genero: "Drama" },
  { titulo: "Barbie", genero: "Comedy" },
  { titulo: "Django Unchained", genero: "Western" },
  { titulo: "The Hateful Eight", genero: "Western" },
  { titulo: "No Country for Old Men", genero: "Thriller" },
  { titulo: "The Imitation Game", genero: "Drama" }
];

const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;
const TMDB_IMAGE = "https://image.tmdb.org/t/p/w342";
const TMDB_SEARCH = "https://api.themoviedb.org/3/search/movie";
const TMDB_CACHE_KEY = "cinelog-tmdb-cache";

const catalogo = catalogoBase.map((filme, index) => criarFilmeCatalogo(filme, index));

function criarFilmeCatalogo(filme, index) {
  return {
    id: `c${index + 1}`,
    titulo: filme.titulo,
    genero: filme.genero,
    posterUrl: null
  };
}

function gerarPosterUrl(posterPath) {
  if (!posterPath) {
    return null;
  }
  return `${TMDB_IMAGE}${posterPath}`;
}

let minhaLista = carregarFilmes();

if (!Array.isArray(minhaLista)) {
  minhaLista = [];
  salvarFilmes(minhaLista);
}

export function getCatalogo() {
  return catalogo;
}

export function getMinhaLista() {
  return minhaLista;
}

export function adicionarNaLista(catalogoId) {
  if (minhaLista.some((filme) => filme.id === catalogoId)) {
    return;
  }

  const filmeCatalogo = catalogo.find((filme) => filme.id === catalogoId);
  if (!filmeCatalogo) {
    return;
  }

  const novo = {
    id: filmeCatalogo.id,
    titulo: filmeCatalogo.titulo,
    genero: filmeCatalogo.genero,
    nota: null,
    assistido: false,
    posterUrl: filmeCatalogo.posterUrl
  };

  minhaLista = [...minhaLista, novo];
  salvarFilmes(minhaLista);
}

export function atualizarNota(id, nota) {
  minhaLista = minhaLista.map((filme) => {
    if (filme.id === id) {
      if (!filme.assistido) {
        return filme;
      }
      return { ...filme, nota: normalizarNota(nota) };
    }
    return filme;
  });

  salvarFilmes(minhaLista);
}

export function removerFilme(id) {
  // filter: removendo o filme pelo id.
  minhaLista = minhaLista.filter((filme) => filme.id !== id);
  salvarFilmes(minhaLista);
}

export function toggleAssistido(id) {
  minhaLista = minhaLista.map((filme) => {
    if (filme.id === id) {
      return { ...filme, assistido: !filme.assistido };
    }
    return filme;
  });

  salvarFilmes(minhaLista);
}

export function filtrarPorTitulo(lista, termo) {
  const busca = termo.trim().toLowerCase();

  // filter: usado para buscar filmes pelo titulo.
  return lista.filter((filme) => filme.titulo.toLowerCase().includes(busca));
}

export function calcularMediaNotas(lista) {
  if (lista.length === 0) {
    return 0;
  }

  // reduce: somando as notas para calcular a media.
  const soma = lista.reduce((acc, filme) => acc + Number(filme.nota || 0), 0);
  const comNota = lista.filter((filme) => filme.nota !== null);
  if (comNota.length === 0) {
    return 0;
  }
  return soma / comNota.length;
}

function normalizarNota(valor) {
  if (!valor) {
    return null;
  }
  return Number(valor);
}

export async function carregarPostersTMDB() {
  if (!TMDB_KEY) {
    return;
  }

  const cache = carregarCacheTMDB();
  const faltando = catalogo.filter((filme) => !cache[filme.titulo]);

  if (faltando.length === 0) {
    aplicarCache(cache);
    return;
  }

  await Promise.all(
    faltando.map(async (filme) => {
      const url = `${TMDB_SEARCH}?api_key=${TMDB_KEY}&language=pt-BR&query=${encodeURIComponent(
        filme.titulo
      )}`;
      try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        const primeiro = dados.results?.[0];
        if (primeiro?.poster_path) {
          cache[filme.titulo] = primeiro.poster_path;
        }
      } catch {
        // Sem poster, segue com fallback.
      }
    })
  );

  salvarCacheTMDB(cache);
  aplicarCache(cache);
}

function carregarCacheTMDB() {
  const bruto = localStorage.getItem(TMDB_CACHE_KEY);
  if (!bruto) {
    return {};
  }
  try {
    return JSON.parse(bruto) || {};
  } catch {
    return {};
  }
}

function salvarCacheTMDB(cache) {
  localStorage.setItem(TMDB_CACHE_KEY, JSON.stringify(cache));
}

function aplicarCache(cache) {
  catalogo.forEach((filme) => {
    const posterPath = cache[filme.titulo];
    filme.posterUrl = gerarPosterUrl(posterPath);
  });
}
