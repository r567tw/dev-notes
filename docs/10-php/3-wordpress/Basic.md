---
sidebar_position: 1
---
# Wordpress

## Wordpress Packagist
https://wpackagist.org

## Wordpress CLI
> 可以用 CLI interface 控制 Wordpress
- https://wp-cli.org/

## Wordpress REST API
<!-- 投影片：
https://docs.google.com/presentation/d/1MIyX72XxbYfEI2ZDpuL8pe9VUhsC-AFRco7PEdtnipY/edit#slide=id.p -->
:::info
- `?rest_route=`
- `wp-json`
:::
- 參考：
    - https://www.yannyann.com/2018/09/wp-rest-api-create-new-post-and-upload-image/
    - https://developer.wordpress.org/rest-api/extending-the-rest-api/routes-and-endpoints/
    - https://kinsta.com/blog/wordpress-rest-api/
    - https://bloggingwizard.com/wordpress-rest-api/

## Use Docker
```yaml
version: "3.9"
services:
  db:
    image: mysql:5.7
    volumes:
      - ./db_data:/var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: somewordpress
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress
  wordpress:
    depends_on:
      - db
    image: wordpress:latest
    volumes:
      - ./wordpress:/var/www/html
      - ./plugins:/var/www/html/wp-content/plugins
    ports:
      - "8000:80"
    restart: always
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: wordpress

```
- https://dev.to/daniloab/how-to-run-wordpress-woocommerce-locally-with-docker-42cd

<!-- https://cloudwp.pro/  -->

## Wordpress CICD
- https://www.hostinger.com/tutorials/wordpress-continuous-integration-and-deployment

## Wordpress MVC
- http://wpmvc.org/documentation/routing/

## Close PHP Notice & Mu-plugin
- https://audilu.com/2020/11/12/wordpress-debug-log-turn-off-notice/
```php
# mu-plugin (Must use plugin) (wp-content/mu-plugins/debug_log_setting.php)
<?php
// debug_log_setting.php 裡只要放這行
error_reporting(E_ALL &  ~( E_USER_NOTICE | E_NOTICE ));
```

## Wordpress Hook
-  https://ithelp.ithome.com.tw/articles/10242112 
-  https://wordpress.sig.tw/action_reference/
```php
do_action( '動作勾點名稱' );
add_action( '動作勾點名稱', '函式名稱', '優先度 (整數，選填)', '接受參數 (整數，選填)' );

apply_filters( '篩選器勾點名稱' );
add_filter( '篩選器勾點名稱', '函式名稱', '優先度 (整數，選填)', '接受參數 (整數，選填)' );


add_action( 'shutdown', function(){
  foreach( $GLOBALS['wp_actions'] as $action => $count ){
    printf( '%s (%d) <br/>' . PHP_EOL, $action, $count );
  }
});
```



<!-- 
## Woocommerce
https://ithelp.ithome.com.tw/articles/10268171 

wordpress中wp_register_script与wp_enqueue_script的区别
https://zhuanlan.zhihu.com/p/457976482

-->