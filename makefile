dev-up:
	sudo docker compose -f docker-compose.dev.yml up
dev-up-traefik:
	mkdir -p data
	touch data/acme.json
	chmod 600 data/acme.json
	sudo docker compose -f docker-compose.dev.yml -f docker-compose.dev.traefik.yml up

dev-down:
	sudo docker compose -f docker-compose.dev.yml down

dev-down-traefik:
	sudo docker compose -f docker-compose.dev.yml -f docker-compose.dev.traefik.yml down