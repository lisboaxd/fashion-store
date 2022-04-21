.PHONY: help build up export_dev export test stop down run loaddata setup
.DEFAULT_GOAL := help

args = `arg="$(filter-out $@,$(MAKECMDGOALS))" && echo $${arg:-${1}}`

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[32m%-25s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	
build: ## Build container with services
	docker-compose -f compose/docker-compose.yml build $@,$(MAKECMDGOALS))

up: ## Start Up all services
	docker-compose -f compose/docker-compose.yml up --build $(filter-out $@,$(MAKECMDGOALS))

stop: ## Turn off all services without remove containers
	docker-compose -f compose/docker-compose.yml stop

down: ## Turn off all services and remove containers
	docker-compose -f compose/docker-compose.yml down

run: ## <service> <command> Example: -> make run django python manage.py shell
	docker-compose -f compose/docker-compose.yml run --rm $(filter-out $@,$(MAKECMDGOALS))

export_dev: ## Export Developerment dependencies from Poetry. Generate requirements files
	@poetry export -o requirements.dev.txt --dev

export: export_dev ## Export dependencies from Poetry. Generate requirements files
	@poetry export -o requirements.txt

test: ## Run all tests of the application
	docker-compose -f compose/docker-compose.yml run --rm django python manage.py test

loaddata: ## Load necessary data on database for dev enviroment
	docker-compose -f compose/docker-compose.yml run --rm django python manage.py loaddata fixtures/user.json fixtures/seller.json fixtures/category.json fixtures/product.json fixtures/stock.json

setup: # Create diretory logs
	@mkdir src/logs/