
install:
	yarn install

dev: install
	yarn run dev-server --host 0.0.0.0

pubi:
	npm install


clean:
	rm -rf node_modules


pub: clean pubi
	npm run build:prod
	rsync -avz public/ /var/www/html/dice
