import { carregarFilmes, salvarFilmes } from "./storage.js";

const catalogoBase = [
  { titulo: "A Origem", genero: "Sci-Fi", tmdbQuery: "Inception" },
  { titulo: "Interestelar", genero: "Sci-Fi", tmdbQuery: "Interstellar" },
  { titulo: "Whiplash: Em Busca da Perfeicao", genero: "Drama", tmdbQuery: "Whiplash" },
  { titulo: "A Chegada", genero: "Sci-Fi", tmdbQuery: "Arrival" },
  { titulo: "Parasita", genero: "Thriller", tmdbQuery: "Parasite" },
  { titulo: "The Batman", genero: "Action", tmdbQuery: "The Batman" },
  { titulo: "A Rede Social", genero: "Drama", tmdbQuery: "The Social Network" },
  { titulo: "Corra!", genero: "Horror", tmdbQuery: "Get Out" },
  { titulo: "Blade Runner 2049", genero: "Sci-Fi", tmdbQuery: "Blade Runner 2049" },
  { titulo: "Mad Max: Estrada da Furia", genero: "Action", tmdbQuery: "Mad Max Fury Road" },
  { titulo: "Duna", genero: "Sci-Fi", tmdbQuery: "Dune" },
  { titulo: "O Grande Hotel Budapeste", genero: "Comedy", tmdbQuery: "The Grand Budapest Hotel" },
  { titulo: "Cisne Negro", genero: "Drama", tmdbQuery: "Black Swan" },
  { titulo: "Ela", genero: "Drama", tmdbQuery: "Her" },
  { titulo: "Coringa", genero: "Drama", tmdbQuery: "Joker" },
  { titulo: "La La Land: Cantando Estacoes", genero: "Musical", tmdbQuery: "La La Land" },
  { titulo: "O Show de Truman", genero: "Drama", tmdbQuery: "The Truman Show" },
  { titulo: "Matrix", genero: "Sci-Fi", tmdbQuery: "The Matrix" },
  { titulo: "Entre Facas e Segredos", genero: "Mystery", tmdbQuery: "Knives Out" },
  { titulo: "Homem-Aranha no Aranhaverso", genero: "Animation", tmdbQuery: "Spider-Man Into the Spider-Verse" },
  { titulo: "Tudo em Todo o Lugar ao Mesmo Tempo", genero: "Sci-Fi", tmdbQuery: "Everything Everywhere All at Once" },
  { titulo: "O Poderoso Chefao", genero: "Crime", tmdbQuery: "The Godfather" },
  { titulo: "Pulp Fiction: Tempo de Violencia", genero: "Crime", tmdbQuery: "Pulp Fiction" },
  { titulo: "Clube da Luta", genero: "Drama", tmdbQuery: "Fight Club" },
  { titulo: "Um Sonho de Liberdade", genero: "Drama", tmdbQuery: "The Shawshank Redemption" },
  { titulo: "O Cavaleiro das Trevas", genero: "Action", tmdbQuery: "The Dark Knight" },
  { titulo: "Seven: Os Sete Crimes Capitais", genero: "Thriller", tmdbQuery: "Se7en" },
  { titulo: "O Grande Truque", genero: "Drama", tmdbQuery: "The Prestige" },
  { titulo: "O Silencio dos Inocentes", genero: "Thriller", tmdbQuery: "The Silence of the Lambs" },
  { titulo: "A Espera de um Milagre", genero: "Drama", tmdbQuery: "The Green Mile" },
  { titulo: "Gladiador", genero: "Action", tmdbQuery: "Gladiator" },
  { titulo: "O Senhor dos Aneis: A Sociedade do Anel", genero: "Fantasy", tmdbQuery: "The Lord of the Rings: The Fellowship" },
  { titulo: "O Senhor dos Aneis: As Duas Torres", genero: "Fantasy", tmdbQuery: "The Lord of the Rings: The Two Towers" },
  { titulo: "O Senhor dos Aneis: O Retorno do Rei", genero: "Fantasy", tmdbQuery: "The Lord of the Rings: The Return" },
  { titulo: "Forrest Gump", genero: "Drama", tmdbQuery: "Forrest Gump" },
  { titulo: "O Rei Leao", genero: "Animation", tmdbQuery: "The Lion King" },
  { titulo: "A Viagem de Chihiro", genero: "Animation", tmdbQuery: "Spirited Away" },
  { titulo: "Coco", genero: "Animation", tmdbQuery: "Coco" },
  { titulo: "Toy Story", genero: "Animation", tmdbQuery: "Toy Story" },
  { titulo: "Your Name", genero: "Animation", tmdbQuery: "Your Name" },
  { titulo: "O Lobo de Wall Street", genero: "Comedy", tmdbQuery: "The Wolf of Wall Street" },
  { titulo: "O Irlandes", genero: "Crime", tmdbQuery: "The Irishman" },
  { titulo: "O Regresso", genero: "Adventure", tmdbQuery: "The Revenant" },
  { titulo: "1917", genero: "War", tmdbQuery: "1917" },
  { titulo: "Oppenheimer", genero: "Drama", tmdbQuery: "Oppenheimer" },
  { titulo: "Barbie", genero: "Comedy", tmdbQuery: "Barbie" },
  { titulo: "Django Livre", genero: "Western", tmdbQuery: "Django Unchained" },
  { titulo: "Os Oito Odiados", genero: "Western", tmdbQuery: "The Hateful Eight" },
  { titulo: "Onde os Fracos Nao Tem Vez", genero: "Thriller", tmdbQuery: "No Country for Old Men" },
  { titulo: "O Jogo da Imitacao", genero: "Drama", tmdbQuery: "The Imitation Game" }
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
    tmdbQuery: filme.tmdbQuery,
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
  const faltando = catalogo.filter((filme) => !cache[getChaveTMDB(filme)]);

  if (faltando.length === 0) {
    aplicarCache(cache);
    return;
  }

  await Promise.all(
    faltando.map(async (filme) => {
      const url = `${TMDB_SEARCH}?api_key=${TMDB_KEY}&language=pt-BR&query=${encodeURIComponent(
        filme.tmdbQuery || filme.titulo
      )}`;
      try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        const primeiro = dados.results?.[0];
        if (primeiro?.poster_path) {
          cache[getChaveTMDB(filme)] = primeiro.poster_path;
        }
      } catch {
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
    const posterPath = cache[getChaveTMDB(filme)];
    filme.posterUrl = gerarPosterUrl(posterPath);
  });
}

function getChaveTMDB(filme) {
  return filme.tmdbQuery || filme.titulo;
}
