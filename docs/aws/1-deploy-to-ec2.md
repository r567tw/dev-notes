---
sidebar_position: 1
---
# EC2
## How to deploy laravel project to ec2
```
apt-get update && apt-get upgrade
apt-get install nginx
apt-get install php
apt-get install php-mysql
apt-get install php-mysql php-fpm php-xml php-gd php-opcache php-mbstring
apt-get install php-curl
apt-get install composer
chown -R www-data:www-data test/
chmod -R 775 test/
cd /etc/nginx/sites-available
vim laravelapp.conf
ln -s  /etc/nginx/sites-available/laravelapp.conf /etc/nginx/sites-enabled
nginx -t
```

```title=laravelapp.conf
server {
    listen 80 default_server;
    listen [::]:80 default_server;
 
    root /var/www/html/open-course/public;

    index index.php index.html;
 
    server_name _;
 
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
 
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;

        # With php-fpm (or other unix sockets);
        fastcgi_pass unix:/var/run/php/php-fpm.sock;
        # With php-fpm (or other unix sockets);
    }
}

```

### about nginx
```
$ sudo service nginx start/stop/restart
```

ref: https://www.clickittech.com/tutorial/deploy-laravel-on-aws-ec2/