# Apresentacao do CineLog

## Programacao funcional
- Usei map() para transformar a lista de filmes em cards no DOM.
- Usei filter() para buscar filmes pelo titulo.
- Usei reduce() para somar as notas e calcular a media.

## ESM (ECMAScript Modules)
- Separei o codigo em arquivos pequenos.
- Usei import/export para ligar os modulos, deixando o main.js mais limpo.

## LocalStorage
- Criei salvarFilmes() e carregarFilmes() no arquivo de storage.
- Os filmes ficam guardados no navegador, mesmo depois de fechar a pagina.

## Manipulacao do DOM
- Os cards de filmes sao criados com createElement e appendChild.
- A lista e limpa com replaceChildren para evitar innerHTML.

## Eventos
- Usei addEventListener no formulario, botoes e campo de busca.
- Usei delegacao de eventos nos cards para editar e remover.

## Uso do Vite
- O projeto foi criado no formato do template vanilla.
- O Vite serve a aplicacao e atualiza automaticamente quando salvo.
- O build fica pronto com npm run build.
