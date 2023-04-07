---
sidebar_position: 1
---
# Mysql/Mariadb

## Configuration
- SQL Mode
- group_concat_max_len

Ref: https://vocus.cc/article/615ffe32fd8978000126804a

## Helper
- GROUP_CONCAT

## JSON Function
- JSON_OBJECT
- JSON_QUOTE

## Lock
```sql
-- Tab1
START TRANSACTION;

SELECT * FROM brand WHERE name = 'Gottone' FOR UPDATE;
SELECT SLEEP(20);

COMMIT

-- Tab2
update brand set contact = 'yy' WHERE name = 'Gottone' 
-- 會等前面卡住20秒完成之後才能執行成功
-- 因為前面`for update` 會形成row級lock
```
