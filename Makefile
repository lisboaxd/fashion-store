.PHONY: help build up export_dev export
.DEFAULT_GOAL := help

args = `arg="$(filter-out $@,$(MAKECMDGOALS))" && echo $${arg:-${1}}`

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[32m%-25s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	
build: ## Build container with services
	docker-compose -f compose/docker-compose.yml build

up: build ## Start Up all services
	docker-compose -f compose/docker-compose.yml up

export_dev: ## Export Developerment dependencies from Poetry. Generate requirements files
	@poetry export -o requirements.dev.txt --dev

export: export_dev ## Export dependencies from Poetry. Generate requirements files
	@poetry export -o requirements.txt