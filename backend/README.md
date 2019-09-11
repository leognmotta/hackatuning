# Hackathon

- [Como executar o projeto](#Como-executar-o-projeto)
  - [Sem docker](#sem-docker)
  - [Com docker](#com-docker)
- [Migrations](#migration)
  - [Criar nova tabela](#Criar-nova-tabela)
  - [Acrescentando colunas nas tabelas](#Acrescentando-colunas-nas-tabelass)
  - [Deletando ou revertendo tabelas](#Deletando-ou-revertendo-tabelas)

# Como executar o projeto

Primeiramente, certifique-se de ter um arquivo .env na rota raiz do projeto, contendo todas as Informações necessárias como no arquivo .env.example

## Sem docker

Para executar o projeto, preimeiro instale as dependências com o comando:

```
yarn
```

E seguida inicia o servidor com o comando:

```
yarn dev
```

E também inicia as tarefas em background do Redis com o comando:

```
yarn queue
```

## Com docker

Breve ...

# Migrations

Aqui estão algumas regras e atalhos para ajudar a trabalhar com PostgreSQL.

**Nunca delete o arquivo de uma migration que ja tenha sido feito merge com outra branch, crie novas migrations para solucionar o problema ou reverta a migration pela CLI do Sequelize, revertendo a última migration ou executando o método down**

## Criar nova tabela

Toda nova tabela, deve obrigatoriamente conter as colunas de id, created_at, updated_at exatamente como demonstrado abaixo. Para criar uma nova migration, execute o comando `yarn migration:g nome-da-migration`.

Ao criar uma nova tabela no método `createTable('tableName')` passe o nome, como string, da tabela e no método `dropTable('tableName')` passe o nome, como string, da tabela exatamente igual a que esta sendo criada. segue abaixo exemplo de como criar uma migration.

```js
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('files', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('files');
  },
};
```

## Acrescentando colunas nas tabelas

Ao acrescentar novas colunas, crie uma nova migration com o comando `yarn migration:g nome-da-migration`. Nessa migration use os métodos `addColumn()` passando como string o nome da tabela que sera alterada como primeiro parâmetro e nome da coluna que sera criada como segundo parâmetro, segue exemplo abaixo.

Dentro do método down usar `removeColumn()` passando como string o nome da tabela que sera alterada como primeiro parâmetro e nome da coluna que sera deletada como segundo parâmetro, segue exemplo abaixo.

```js
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'avatar_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
```

## Deletando ou revertendo tabelas

Sempre que for preciso reverter uma tabela, execute o comando `yarn migrate:undo` para desfazer a última migration, esse comando vai executar o método down da última migration.

Para reverter uma migration específica, use o comando `yarn migrate:to XXXXXXXXXXXXXX-nome-da-migration.js`, esse comando vai executar o método down da migration passada como argumento.
