// Este arquivo cuida apenas do LocalStorage.
const CHAVE = "cinelog-minha-lista";

// Salva a lista no LocalStorage.
export function salvarFilmes(lista) {
  // LocalStorage: gravando os dados como string.
  localStorage.setItem(CHAVE, JSON.stringify(lista));
}

// Carrega a lista do LocalStorage.
export function carregarFilmes() {
  // LocalStorage: lendo e convertendo de volta para objeto.
  const salvo = localStorage.getItem(CHAVE);
  if (!salvo) {
    return [];
  }
  return JSON.parse(salvo);
}
