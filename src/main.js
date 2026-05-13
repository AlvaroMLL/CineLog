// ESM: aqui usamos import/export para organizar o codigo em modulos.
import "./style.css";
import { iniciarEventos } from "./modules/eventos.js";
import { getFilmes } from "./modules/filmes.js";
import { atualizarResumo, renderFilmes } from "./modules/ui.js";

// Inicio simples da aplicacao.
const filmesIniciais = getFilmes();
renderFilmes(filmesIniciais);
atualizarResumo(filmesIniciais);

// Eventos ficam separados para deixar o main mais limpo.
iniciarEventos();
