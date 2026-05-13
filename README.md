# CineLog

CineLog e uma aplicacao web simples para organizar filmes. O usuario escolhe filmes de um catalogo e monta sua propria lista, podendo marcar como assistido e dar notas. O projeto foi feito com Vite e JavaScript puro, pensando em um aluno iniciante/intermediario.

## Funcionalidades
- Catalogo fixo com 50 filmes disponiveis
- Adicionar filmes do catalogo na lista do usuario
- Marcar filme como assistido
- Dar nota de 1 a 5 (apenas quando assistido)
- Remover filme da lista
- Buscar filmes pelo titulo
- Calcular a media das notas da lista
- Salvar e carregar dados com LocalStorage
- Posters via TMDB (com cache no navegador)

## Tecnologias usadas
- HTML
- CSS
- JavaScript (ESM)
- Vite
- TMDB API (posters)

## Como instalar
1. Tenha o Node.js instalado (ele inclui o npm).
2. Abra o terminal na pasta do projeto.
3. Rode o comando:

```bash
npm install
```

## Como executar
Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

Depois, abra o link que o Vite mostrar no terminal.

> Para os posters do TMDB, crie um arquivo `.env.local` na raiz com:
> 
> `VITE_TMDB_KEY=SUA_CHAVE_AQUI`

## Como usar
1. Escolha um filme no catalogo e clique em "Adicionar".
2. Na sua lista, marque "Assistido" quando ja tiver visto.
3. Se estiver assistido, selecione a nota de 1 a 5.
4. Use "Remover" para tirar o filme da sua lista.
5. Use a busca para filtrar por titulo.

## Requisitos da atividade (resumo)
- CRUD basico na lista do usuario (adicionar, atualizar nota/assistido e remover)
- Programacao funcional com map, filter e reduce
- LocalStorage para persistencia
- Manipulacao do DOM sem frameworks
- Eventos com addEventListener
- ESM com import/export
- Interface simples, responsiva e com tema escuro

## Atribuicao TMDB
This product uses the TMDB API but is not endorsed or certified by TMDB.

## GitHub Pages
Link para publicacao: https://alvaromll.github.io/CineLog/
