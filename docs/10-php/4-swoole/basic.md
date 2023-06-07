# Swoole 

[投影片連結](http://slides.com/albertcht/swoole-redefine-php#/)
[程式碼](https://github.com/albertcht/php-the-day-33?fref=gc&dti=118228608891680)

- 一個php extention 用C 語言撰寫
- PHP 效能慢的原因在於Sync IO. 與Node.js Async IO 有很大的不一樣......
- 其他類似Swoole 的：icicle\.io /kraken php/ Workerman/ ReactPHP ......
- Swoole 的需求 非Linux knernal 不可....windows (x)
> pecl install swoole
> brew install swoole(Mac)
> 另外還需要編譯一些東西....(Mac 不用)
```batch=
php -m|grep swoole 
//如果有東西就代表安裝成功,,,,,,
```

> 補充:
> wrk-- 壓力測試工具 [說明](http://zjumty.iteye.com/blog/2221040)

Swoole 的用途
- WebSocket server (websocket v.s socket.io)
- Http server
- Database connection pooling
- speed up Laravel app

> 文章：
https://laravel-news.com/laravel-swoole?fbclid=IwAR0uYuLNcgUZxZgpb9elz8D0S4YYOgHY-osN7ezqN7aCopflBqn71g6nvxg


