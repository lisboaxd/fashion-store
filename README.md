### Non-Portuguese speakers

Repository created to demonstrate skills around Python and Django, besides some architectural structures and technologies.

# Fashion Store

Repositorio criado para demonstrar habilidades com relação ao Python e Django, além de arquitetura e tecnologias

## Requirements

-   Docker
-   Docker Compose
-   Makefile compiler

## Iniciando projeto

Clone esse repositório:

```
$ git clone git@github.com:lisboaxd/fashion-store.git
$ cd fashion-store/
$ cp compose/.env.example compose/.env
```

Edite as chaves no arquivo `.env`com a senha do banco de dados e chave secreta do Django

```
#compose/.env
...

POSTGRES_PASSWORD=<senha_do_banco_aqui>
DJANGO_SECRET_KEY=<chave_secreta_aqui>

...
```

Após as alterações feitas no arquivo `.env`

```
$ make setup
$ make up
```

Acesse o sistema em `http://localhost:8000/`

##### Comandos auxiliares

Para carregar dados básicos:

```
$ make loaddata
```

Para rodar os testes:

```
$ make test
```

##### Documentação dos endpoints da aplicação

Documentação da api `http://localhost:8000/docs`

##### Serviços

| Nome        | Endpoint               |
| ----------- | ---------------------- |
| Aplicação   | http://localhost:8000  |
| Flower      | http://localhost:8889  |
| RabbitMQ UI | http://localhost:15672 |
