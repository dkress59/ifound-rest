cd /var/www/ifound-rest
/usr/bin/git fetch origin master
/usr/bin/git reset --hard origin/master
rm -rf /var/www/ifound-rest/node_modules /var/www/ifound-rest/package-lock.json
/usr/bin/npm run --silent install