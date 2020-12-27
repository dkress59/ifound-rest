cd /var/www/ifound-rest
/usr/bin/git checkout -- .
/usr/bin/git pull
yarn --pure-lockfile
pm2 restart ecosystem.config.js --env production
