---
title: laravel-migration筆記
date: '2018-11-05 13:36:22+00:00'
tags:
- laravel
---
# 資料庫的設定
- 修改env 檔
```env
...(略)
DB_CONNECTION={填入你的db 類型}
DB_HOST= {填入你的db server}
DB_PORT={填入你的db server port}
DB_DATABASE={填入你的db name}
DB_USERNAME={填入你的db user name}
DB_PASSWORD={填入你的db password}
...（略）
```
# 關於migration 的指令

```shell
php artisan make:migration {name} (--create={table}/--table={table})
php artisan migrate # 執行migrate
php artisan migrate:rollback #恢復上一版本得migration
php artisan migrate:reset #重新reset
php artisan migrate:refresh #重新建立

```

補充：除了make migrate 的指令其他都可以在加入 `--seed` 以順便一起跑seeder