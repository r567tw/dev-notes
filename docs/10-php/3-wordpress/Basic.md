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

```bash
# 可以用以下這個指令進入 wordpress container 做 shell 操作
docker-compose exec -it wordpress /bin/bash
```

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

## Wordpress DB
- https://ithelp.ithome.com.tw/articles/10239113?sc=rss.iron
```php
global $wpdb;
$wpdb->query('query');
$wpdb->get_row('query', output_type, row_offset);
$wpdb->get_results('query', output_type);
$wpdb->insert( $table, $data, $format );
$wpdb->update( $table, $data, $where, $format = null, $where_format = null );
$wpdb->delete($table, $where, $where_format = null );
$sql = $wpdb->prepare( 'query' [, value_parameter, value_parameter ... ] );

```

## WP_Query Class
```php
$homepageEvents = new WP_Query(array(
              "post_type" => "event",
              "posts_per_page" => 2,
            ));

            while ($homepageEvents->have_posts()){
              $homepageEvents->the_post();
              $eventDate = get_field("event_date");
              $evenDateObject = new DateTime($eventDate);
            }
```

- post_type 可以放array : ex `post_type => array('post','page')`
- 如果要查詢可以加一個`s`參數

## WP Custom Post Type
```php
function university_post_type(){
  register_post_type('event', array(
    'supports' => array(
      'title','editor','excerpt','custom-fields'
    ),
    'public' => true,
    'show_in_rest' => true,
    'rewrite' => array('slug' => "events"),
    'has_archive' => true,
    'labels' => array(
      'name' => 'Events',
      'add_new_item' => 'Add New Event',
      'edit_item'    => 'Edit Event',
      'all_items'     => 'All Events',
      'singular_name' => 'Event',
      'add_new'       => 'Add New Event'
    ),
    // https://developer.wordpress.org/resource/dashicons/#sos
    'menu_icon' =>  'dashicons-calendar'
  ));

}
add_action("init","university_post_type");
```

<!-- 
## Woocommerce
https://ithelp.ithome.com.tw/articles/10268171 

wordpress中wp_register_script与wp_enqueue_script的区别
https://zhuanlan.zhihu.com/p/457976482

https://irvinglab.com/blog/wordpress-plugins/

CPU 使用率
https://magazine.cartals.com/articles/2543/22%E5%80%8B%E7%84%A1%E9%9C%80%E5%8D%87%E7%B4%9A%E7%B6%B2%E9%A0%81%E5%AF%84%E5%AD%98%E8%A8%88%E5%8A%83%E5%B0%B1%E8%83%BD%E9%99%8D%E4%BD%8Ewordpress-cpu%E4%BD%BF%E7%94%A8%E7%8E%87%E7%9A%84%E5%A5%BD/

https://studio.mack-j.com/cloudways-cpu-usage-high/
-->
