
install:
	yarn install

dev: install
	yarn run dev-server --host 0.0.0.0

pub:
	npm run build:prod
	rsync -avz public/ /var/www/html/dice
