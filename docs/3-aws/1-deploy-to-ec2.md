---
sidebar_position: 1
---
# EC2
## How to deploy laravel project to ec2

### Pre-requirement
```bash
apt-get update && apt-get upgrade
apt-get install nginx
apt-get install php
apt-get install php-mysql
apt-get install php-mysql php-fpm php-xml php-gd php-opcache php-mbstring
apt-get install php-curl
apt-get install php-sqlite3
apt-get install composer
```
### In Laravel Project Foder
```bash
#! Ready Laravel App (git clone or ftp upload...etc)
$ chown -R www-data:www-data ./
$ chmod -R 775 ./
$ cd /etc/nginx/sites-available
$ vim laravelapp.conf
$ ln -s  /etc/nginx/sites-available/laravelapp.conf /etc/nginx/sites-enabled
```

```conf title="laravelapp.conf"
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

### Nginx Command
```bash
#! command about nginx command 
$ sudo service nginx start/stop/restart
#! test nginx configuration command
$ nginx -t
```

### REF
https://www.clickittech.com/tutorial/deploy-laravel-on-aws-ec2/