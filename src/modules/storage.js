const CHAVE = "cinelog-minha-lista";

export function salvarFilmes(lista) {
  localStorage.setItem(CHAVE, JSON.stringify(lista));
}

export function carregarFilmes() {
  const salvo = localStorage.getItem(CHAVE);
  if (!salvo) {
    return [];
  }
  return JSON.parse(salvo);
}
