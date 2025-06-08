# DesafioHelpDeskAPI - Gabriel de Moura Schramm

Este projeto de automação foi desenvolvido utilizando Cypress para os testes e Allure report para os relatórios. 

## Ferramentas utilizadas no projeto
- Linguagem JavaScript
- Node.js para instalações
- Cypress para testes API
- Allure report para relatórios

## Como executar
Para rodar os testes é preciso instalar todas as dependencias e digitar "npm run test:allure" na pasta do projeto, rodará os testes e gerará o relatório do allure.

É possível executar os testes manualmente por spec acessando a interface do Cypress utilizando o comando "npx cypress open" e acessando a opção de testes e2e.

## Bugs e Melhorias

Durante a criação do projeto foram encontrados Bugs e espaços para melhorias tanto na aplicação quanto na documentação:
- A chamada de lista de usuários não está retornando mensagem de que a lista retornou com sucesso.
- A chamada de busca de usuário por id não está retornando mensagem de que o usuário foi encontrado com sucesso.
- A mensagem de erro ao não enviar os parâmetros corretos na chamada de criação de ticket está diferente da documentação.
- A chamada de criação de ticket não está retornando mensagem de que o ticket foi criado com sucesso.
- A chamada de busca de ticket não está retornando mensagem de que o ticket foi encontrado com sucesso.
