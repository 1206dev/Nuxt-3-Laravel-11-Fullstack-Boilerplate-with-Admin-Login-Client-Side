#!/bin/sh

/etc/init.d/php8.2-fpm start

crontab /etc/cron.d/schedule-cron
/etc/init.d/cron start

service mysql start

cd /var/www/html/base && php artisan migrate --force
cd /var/www/html/base && php artisan queue:listen --tries=3 >/dev/null 2>&1 &

# Load this to get nvm environment, other wise pm2 will gets error
export NVM_DIR="3/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Start nginx foreground
nginx -g 'daemon off;'
