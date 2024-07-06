# WordPress

## WordPress Packagist
https://wpackagist.org

## WordPress CLI
> 可以用 CLI interface 控制 WordPress
- https://wp-cli.org/

## WordPress REST API
<!-- 投影片：
https://docs.google.com/presentation/d/1MIyX72XxbYfEI2ZDpuL8pe9VUhsC-AFRco7PEdtnipY/edit#slide=id.p -->
:::info
- `?rest_route=`
- `wp-json`
:::
- 參考：
    - https://www.yannyann.com/2018/09/wp-rest-api-create-new-post-and-upload-image/
    - https://developer.WordPress.org/rest-api/extending-the-rest-api/routes-and-endpoints/
    - https://kinsta.com/blog/WordPress-rest-api/
    - https://bloggingwizard.com/WordPress-rest-api/

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
      MYSQL_ROOT_PASSWORD: someWordPress
      MYSQL_DATABASE: WordPress
      MYSQL_USER: WordPress
      MYSQL_PASSWORD: WordPress
  WordPress:
    depends_on:
      - db
    image: WordPress:latest
    volumes:
      - ./WordPress:/var/www/html
      - ./plugins:/var/www/html/wp-content/plugins
    ports:
      - "8000:80"
    restart: always
    environment:
      WordPress_DB_HOST: db:3306
      WordPress_DB_USER: WordPress
      WordPress_DB_PASSWORD: WordPress
      WordPress_DB_NAME: WordPress

```
- https://dev.to/daniloab/how-to-run-WordPress-woocommerce-locally-with-docker-42cd

```bash
# 可以用以下這個指令進入 WordPress container 做 shell 操作
docker-compose exec -it WordPress /bin/bash
```

<!-- https://cloudwp.pro/  -->

## WordPress CICD
- https://www.hostinger.com/tutorials/WordPress-continuous-integration-and-deployment

## WordPress MVC
- http://wpmvc.org/documentation/routing/

## Close PHP Notice & Mu-plugin
- https://audilu.com/2020/11/12/WordPress-debug-log-turn-off-notice/
```php
# mu-plugin (Must use plugin) (wp-content/mu-plugins/debug_log_setting.php)
<?php
// debug_log_setting.php 裡只要放這行
error_reporting(E_ALL &  ~( E_USER_NOTICE | E_NOTICE ));
```

## WordPress Hook
-  https://ithelp.ithome.com.tw/articles/10242112 
-  https://WordPress.sig.tw/action_reference/
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

## WordPress DB
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
    // https://developer.WordPress.org/resource/dashicons/#sos
    'menu_icon' =>  'dashicons-calendar'
  ));

}
add_action("init","university_post_type");
```

## WordPress Optimization
- https://gtmetrix.com/WordPress-optimization-guide.html

## WordPress Frontend
> headless cms , use WP REST API + Frontity
- https://frontity.org/

## Use WordPress Deploy Server
> 這實在是太狂了，居然有這種 WordPress Plugin ~
- https://wpclouddeploy.com/screen-shots-and-videos/ 

## Serverless WordPress
> 放在之後來研究～
- https://blog.ymirapp.com/serverless-WordPress-aws/

## WordPress Deploy Plugin
- https://www.smashingmagazine.com/2015/08/deploy-wordpress-plugins-with-github-using-transients/

<!-- 
## Woocommerce
https://ithelp.ithome.com.tw/articles/10268171 

WordPress中wp_register_script与wp_enqueue_script的区别
https://zhuanlan.zhihu.com/p/457976482

https://irvinglab.com/blog/WordPress-plugins/

CPU 使用率
https://magazine.cartals.com/articles/2543/22%E5%80%8B%E7%84%A1%E9%9C%80%E5%8D%87%E7%B4%9A%E7%B6%B2%E9%A0%81%E5%AF%84%E5%AD%98%E8%A8%88%E5%8A%83%E5%B0%B1%E8%83%BD%E9%99%8D%E4%BD%8EWordPress-cpu%E4%BD%BF%E7%94%A8%E7%8E%87%E7%9A%84%E5%A5%BD/

https://studio.mack-j.com/cloudways-cpu-usage-high/
-->


# Plugin
## wordpress plugin
https://gist.github.com/lucasmshepherd/993e1b4177574d0abfabd9977264c580
## Create widget
https://rapidapi.com/blog/how-to-call-an-api-from-wordpress/

## Redis Object Cache
- https://wetopi.com/redis-object-cache-for-wordpress/#how-does-object-cache-work-with-wordpress
- https://blog.runcloud.io/wordpress-object-caching/

## Plugin: WP Memory Usage
- https://www.minwt.com/website/wordpress/23579.html

## Unit Testing
> 正在研究中...
- https://wp-mock.gitbook.io/documentation/getting-started/introduction

## ManageWP
- https://wordpress.blog.tw/wordpress-plugin-managewp-worker/
- https://managewp.com/

## Ref:
- https://ithelp.ithome.com.tw/articles/10236734
- https://blog.yuyansoftware.com.tw/2017/11/wordpress-plugin-development/





# FAQ
## https 通常 導向過多 
- 可能是 cloudflare 的原因...請進去 Cloudflare SSL 裡面調整為「完全(嚴格)」
> [參考](https://weblai.co/err-too-many-redirects/)