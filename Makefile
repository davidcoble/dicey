
install:
	yarn install

dev: install
	yarn run dev-server --host 192.168.12.177

pubi:
	npm install


clean:
	rm -rf node_modules


pub: clean pubi
	npm run build:prod
	rsync -avz public/ /var/www/html/dice

never:
	nvm use 12.22.12
