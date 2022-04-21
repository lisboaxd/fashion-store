### Non-Portuguese speakers

Repository created to demonstrate skills around Python and Django, besides some architectural structures and technologies.

# Fashion Store

Repositorio criado para demonstrar habilidades com relação ao Python e Django, além de arquitetura e tecnologias

## Requirements

-   Backend
    -   Docker
    -   Docker Compose
    -   Makefile compiler
-   Frontend
    -   node >= v16.9.1
    -   npm >= 7.21.1 OU yarn >= 1.22.11

## Iniciando projeto

Clone esse repositório:

```
$ git clone git@github.com:lisboaxd/fashion-store.git
$ cd fashion-store/
$ cp compose/.env.example compose/.env
```

Edite as chaves no arquivo `.env` com a senha do banco de dados e chave secreta do Django

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

#### Enviando arquivo CSV

Acesse `http://localhost:8000/api/v1/csv/product` e faça o upload do arquivo `product.csv`

# INTRUÇÕES RODAR FRONT

-   ## Implementado até aqui
    -   Serviços Containerizados (Django, Postgres, Flower)
    -   API com Django Rest framework
    -   Documentação da API (Django Swagger)
    -   Testes Unidade
    -   Processamento de arquivo CSV em background com Celery e Rabbitmq
    -   Monitoramento da Fila com Flower
    -   Logs em arquivos
    -   Cache com redis
    -   Django Admin restrito para Vendedor (seller)
    -   Listagem de Seller, Category e Product no Front-end

#### Melhorias para implementar no futuro

-   ##### Back-end

    -   Melhor documentação com Mkdocs
    -   Paginação dos endpoints
    -   Incrementar cobertura de tests
    -   Implementar preenchimendo das demais tabelas além de product, no endpoint que recebe arquivo CSV
    -   Criar factory de dados falsos com factory-boy e faker nos tests de unidade, para popular o banco
    -   Implementar container Nginx para loadbalancer dos serviços
    -   Implementar File Storage como o AWS S3 para upload dos arquivos CSV e Imagens
    -   Implementar pipeline de deploy com tests para
    -   Mudar logs de arquivos para serviços como LogStash ou Sentry

-   ##### Front-end
    -   Criar tela de login
    -   Validar se o usuário está logado
    -   Implementar Update de Seller
    -   Implementar Cread e Update Product
    -   Implementar Cread, Read, Update, Delete Stock
    -   Criar pipeline de deploy do front
