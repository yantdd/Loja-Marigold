# Projeto Poções e Soluções

## Descrição do Sistema
Este trabalho prático é um sistema web desenvolvido para a loja Poções e Soluções. A arquitetura contempla um backend em Node.js utilizando Express e Sequelize acoplado a um banco de dados SQLite operando em modo memória. O frontend foi desenvolvido em Vanilla JS aproveitando todo o potencial nativo das tecnologias estruturais e de estilo visual.

## Pré requisitos
Para rodar este projeto é necessário ter o ambiente Node.js instalado na máquina.

## Instalação e Configuração
Abra o terminal na raiz do projeto e execute o comando a seguir para baixar todas as bibliotecas necessárias:

```text
npm install
```

Este comando instala todas as três dependências declaradas no arquivo `package.json`:

| Pacote | Finalidade |
|---|---|
| `express` | Framework para criação do servidor HTTP e das rotas REST |
| `sequelize` | ORM responsável pela comunicação com o banco de dados |
| `sqlite3` | Driver nativo do SQLite, obrigatório para o Sequelize operar em modo memória |

## Execução
Com o ambiente configurado inicie o servidor backend executando o comando correto no terminal:

```text
node index.js
```

## Guia de Testes
Para validar todas as funcionalidades do sistema execute os seguintes passos:

* Abra o navegador e acesse a rota local na porta 3000 para abrir a página http://localhost:3000/index.html. Verifique a renderização dos cartões visuais das poções carregadas diretamente do banco de dados na tela.
* Em outra aba do navegador acesse a rota local da página de administração abrindo http://localhost:3000/admin.html.
* Na página de administração preencha o formulário para criar uma nova poção. Salve os dados e verifique imediatamente se o item recém criado apareceu na lista inferior.
* Teste a exclusão de uma poção clicando no botão de remover ao lado de algum item da tabela. Confirme a decisão e verifique que o produto sumiu da lista com sucesso.
