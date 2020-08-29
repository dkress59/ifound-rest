cd /var/www/ifound-rest
/usr/bin/git fetch origin master
/usr/bin/git reset --hard origin/master
/usr/bin/npm install
#/usr/local/bin/pm2 restart ifound-rest