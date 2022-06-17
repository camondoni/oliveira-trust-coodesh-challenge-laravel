#!/bin/sh
composer install
#php artisan migrate:fresh
#php artisan db:seed --class=CotationFeeSeeder
nohup php artisan serve --host=0.0.0.0 &
cd /var/www/react
npm install
nohup npm start &
