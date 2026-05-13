import "./style.css";
import { iniciarEventos } from "./modules/eventos.js";
import { carregarPostersTMDB, getCatalogo, getMinhaLista } from "./modules/filmes.js";
import { atualizarResumo, renderCatalogo, renderMinhaLista } from "./modules/ui.js";

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
iniciarEventos();
