
install:
	yarn install

dev: install
	yarn run dev-server --host 0.0.0.0

pub:
	npm run build:prod
	rsync -avze ssh public/ ubuntu@tuskypi:/var/www/html/dice
