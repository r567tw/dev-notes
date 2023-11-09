---
sidebar_position: 3
---
# Memo
:::info
這裡記錄幾個我工作中會常用的指令Memo用，我就不愛背東西...
:::

## Clean
```
$ docker system prune --volumes
```

## Tips
```bash
# 使用 Docker 快速架設DB
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password --name mysql mysql
# 啟動 composer install
docker run --rm -v $(pwd):/app composer "composer install"
```

## Docker-Compose tips
> 使用 Docker-compose 快速架設 mongodb、redis、mysql，因為就懶得使用手動下載安裝, 用docker比較快

```yaml
version:  '3.7'
services:
  mongo:
    image: mongo
    # restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: root
    ports:
      - 27017:27017
    volumes:
      - './data/mongo:/data/db'
  redis:
    image: redis
    # restart: always
    ports:
      - 6379:6379
    volumes:
      - './data/redis:/data' 
  mysql:
    image: mysql:5.7
    # restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: oin
      MYSQL_USER: oin
      MYSQL_PASSWORD: oin
    ports:
      - 3308:3306
    volumes:
      - './configuration/my.cnf:/etc/my.cnf'
      - './data/mysql:/var/lib/mysql'
```