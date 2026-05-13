// ESM: aqui usamos import/export para organizar o codigo em modulos.
import "./style.css";
import { iniciarEventos } from "./modules/eventos.js";
import { carregarPostersTMDB, getCatalogo, getMinhaLista } from "./modules/filmes.js";
import { atualizarResumo, renderCatalogo, renderMinhaLista } from "./modules/ui.js";

// Inicio simples da aplicacao.
const catalogoInicial = getCatalogo();
const minhaListaInicial = getMinhaLista();
const idsNaLista = new Set(minhaListaInicial.map((filme) => filme.id));
renderCatalogo(catalogoInicial, idsNaLista);
renderMinhaLista(minhaListaInicial);
atualizarResumo(minhaListaInicial);

carregarPostersTMDB().then(() => {
	const catalogoAtualizado = getCatalogo();
	const minhaListaAtualizada = getMinhaLista();
	const idsAtualizados = new Set(minhaListaAtualizada.map((filme) => filme.id));
	renderCatalogo(catalogoAtualizado, idsAtualizados);
	renderMinhaLista(minhaListaAtualizada);
});

// Eventos ficam separados para deixar o main mais limpo.
iniciarEventos();
