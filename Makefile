
install:
	yarn install

dev: install
	yarn run dev-server

pub:
	npm run build:prod
	rsync -avze ssh public/ coble@ori:/var/www/html/dice
