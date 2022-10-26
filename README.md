# flexge-challenge

## API

```
cd api -> entrar na pasta da api

yarn -> instalar dependencias

yarn seed -> criar companies

yarn dev -> rodar o server

Fiz a conexão do banco com o MongoDB Atlas, imagino que vocês já saibam como fazer, mas por via das dúvidas:
- Criar um conta no MongoDB Atlas
- Criar um novo banco
- Criei um .env de exemplo, basta substituir as variaveis de vocês!
```

## WEB

```
cd web -> entrar na pasta da api

yarn -> instalar dependencias

yarn dev -> rodar o server

Acesse a aplicação aqui: http://127.0.0.1:5173/

username: admin
password: admin
```

## End Points

```
Caso usem o postman, dei acesso pra vocês no workspace que utilizei:

https://cloudy-robot-425226.postman.co/workspace/blog~9560c9d5-f181-4836-8e50-06ba58841ee7/collection/14337611-d00b90cb-029e-4d78-840c-88d0d41106b8?action=share&creator=14337611
```

## todo

- [x] Criar login API + Front (pode ser em memória com username e senha fixo)
- [x] As chamadas para a API devem ser autenticadas
- [x] Deve ser utilizado o react context para armazenar a informação do usuário logado
- [x] Deve ser utilizado o react router para definição das rotas do front
- [x] Somente a tela de login deve ser pública
- [ ] Pelo menos uma chamada de api deve ser feita utilizando o redux-saga
- [x] Pelo menos um caso deve ser armazenado no redux
- [x] Pelo menos em um form deve ser utilizado o react-state
- [x] Devem ser criados componentes para o form
- [x] A tela de consulta de contratos deve possuir paginação e ordenação na API e a
consulta deve utilizar mongo aggregators
