


install:
	yarn install

dev: install
	yarn run dev-server

buildprod:
	yarn build:prod

publish: buildprod
	rsync -avze ssh public/ ubuntu@tuskypi:/var/www/html/dice
	rsync -avze ssh .hz ubuntu@tuskypi:/var/www/html/dice
