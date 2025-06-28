
install:
	npm install

dev: 
	npm run dev-server

pub:
	npm run build:prod
	rsync -avze ssh public/ ubuntu@tuskypi:/var/www/html/dice

clean:
	rm -rf ./node_modules

never:
	npm use 12.22.22
