---
sidebar_position: 1
---
# Docker

## Docker 是什麼
:::info
Docker 是一個開放原始碼軟體，是一個開放平台，用於開發應用、交付應用、執行應用。 Docker 允許使用者將基礎設施中的應用單獨分割出來，形成更小的顆粒，從而提高交付軟體的速度。 Docker 容器與虛擬機器類似，但二者在原理上不同。 (維基百科)
:::

- Docker 是一個可隔離資料、程式的工具

```sh
$ docker info
```

## Container & Docker Engine
### Container：容器
- Container 的執行本質上可以被視為進程（process），一個 Docker 容器可以被視為一個或多個運行在隔離環境中的進程
```
1. 隔離性: Docker 容器利用 Linux 核心的特性，如 cgroups 和 namespaces，來實現操作系統層級的隔離。這意味著每個容器都在自己的隔離環境中運行，擁有獨立的檔案系統、網絡配置、進程空間等。
2. 進程運行：當你啟動一個 Docker 容器時，你實際上是在啟動一個主進程（通常是你指定的應用程序或服務）。這個進程運行在其隔離的環境中。從操作系統的角度來看，這個進程與宿主機上的其他進程沒有本質上的不同。
3. 資源管理: Docker 透過 cgroups 控制容器可以使用多少系統資源（如 CPU、記憶體）。雖然容器內可以運行多個進程，但它們都屬於同一個 cgroup，並共享分配給該容器的資源。
```

> 然而，這種觀點可能過於簡化了 Docker 的強大功能和它所提供的廣泛特性集。Docker 容器提供了比單個進程更豐富的功能，例如映像管理、網絡設置、存儲卷、以及跨多個容器的協作。這些功能超出了傳統進程所能提供的範疇。

- Container 其實是一個 Linux 上的技術，對於 Mac 和 Windows 而言，desktop 通常會替他們加入一個輕量化的虛擬機
```
例如：Docker Desktop 使用的 HyperKit for macOS 或 WSL 2 for Windows
```

### Engine
為 C/S 架構
- Server
- REST API
- Client (Docker CLI)

## Docker Image
```bash
docker image ls
```
- `read-only` template
- Docker Engine 建立容器時，會由 Image 的容器要素來建立！

### Layer
```bash
docker image inspect ...

# custom layer
docker container run -it --name nginx-a nginx /bin/bash
# 裡面的操作之後...
docker container commit nginx-a mynginx:A
```

### OverlayFS
- 使用 UnionFS 的技術將許多 layer 聯合


## Overview
- `images`  相當於物件導向程式語言裡面的 `class`, 是 run container 的核心與映像檔
    - `Dockerfile` 是 `Docker` 用來 build 檔案，如果單純的 `docker pull` 無法滿足你的需求，你可以在 `Dockerfile` 裡面撰寫一行一行的指令將 `image` 建立起來，從而建立容器。
- `container` 相當於物件導向程式語言裡面的 `object`、`object = new class ()`, 是實際跑在機器上的實際單位
- 快速 QA: https://www.ithome.com.tw/news/91847
- `Repository` 集中存放 image 的場所。分 public/private 兩種
- `Server`: 提供某種服務的裝置 - Serve Service

## 運作機制
- 作業系統得先安裝 Docker, 在上面運行容器：類 Linux 系統
- 容器是建立用完即捨棄... 容器的生命週期
- 可隔離容器是最根本的性質
- 向全員提供一致的開發環境、方便測試新的版本、容易建置多個相同的伺服器

## By Linux 方便 Tip
```shell
- sudo systemctl start docker
- sudo systemctl stop docker
- sudo systemctl enable docker # 設定自動啟動 Docker
```

## 容器的基本操作
> docker 指令 對象

```shell
docker version
docker container start/stop/create/run/rm/exec/ls/cp/commit
docker image pull/rm/ls/build
docker volume create/inspect/ls/prune/rm
docker network connect/disconnect/create/inspect/ls/prune/rm

docker checkpoint
docker node
docker plugin
docker secret
docker service
docker stack
docker swarm
docker system
```

- `-i`、`-t`: 如果容器需要有鍵盤輸入時
- `-d`: 在背後執行

```shell
docker ps : 顯示運行中的容器清單
docker ps -a 顯示存在的容器清單
```

## 以建立 Apache 為例
```shell
docker run --name apa000ex1 -d httpd
docker ps
docker ps -a
docker stop apa000ex1
docker rm apa000ex1
```

## 常見的 images
```shell
- ubuntu
- centos
- debian
- fedora
- busybox => BizyBox
- alpine
- httpd => apache
- nginx
- mysql
- postgres
- mariadb
- obenjdk : Java
- python : Python
- php
- ruby
- perl
- gcc C/C++ 編譯器
- node
- registry : Docker Registry
- wordpress
- nextcloud
- redmine
```

## 其他例子
```shell
docker run -it alpine ash
docker run --name mysql000ex7 -itd -e MYSQL_ROOT_PASSWORD=root mysql
```

## 刪除 image
```shell
docker image rm
docker image ls
```

## 建立 WordPress & Redmine ＆ MySQL 容器
```shell
docker network create wordpressNet1
# MySQL
docker run --name wpdb -itd --net=wordpressNet1 -e MYSQL_ROOT_PASSWORD=root  -e MYSQL_DATABASE=wordpress -e MYSQL_USER=user -e MYSQL_PASSWORD=user mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --default-authentication-plugin=mysql_native_password

# WordPress
docker run --name wp -itd --net=wordpressNet1 -p 8085:80 -e WORDPRESS_DB_HOST=wpdb -e WORDPRESS_DB_NAME=wordpress -e WORDPRESS_DB_USER=user -e WORDPRESS_DB_PASSWORD=user wordpress

# Redmine
docker run -itd --name redmine000ex --network wordpressNet1 -p 8086:3000 -e REDMINE_DB_MYSQL=wpdb -e REDMINE_DB_DATABASE=redmine -e REDMINE_DB_USERNAME=redmine -e REDMINE_DB_PASSWORD=user redmine
```

## 複製
```shell
docker cp 主機端 容器：容器端路徑
docker cp 容器：容器端路徑 主機端
docker cp 複製源頭 複製目的地
```

以 Apache 為例
```shell
docker run --name apa000ex19 -d -p 8089:80 httpd
docker cp /User/user/Documents/index.html apa000ex19:/usr/local/apache2/htdocs/
docker cp apa000ex19:/usr/local/apache2/htdocs/index.html /User/user/Documents/
```

## Volume
- 卷宗掛載 (無法直接操作，適合臨時資料) v.s 繫結掛載 (需要頻繁使用的資料)
三種差異：簡不簡單、可不可由底層電腦操作、想不想排除對系統環境的依賴

> 還有另外一種暫存檔案系統 (tmpfs) 掛載，對象不是磁碟而是記憶體... 隨著 Engine、主機重開而消滅

```shell
# 卷宗掛載
docker volume create 卷宗名稱
docker volume rm 卷宗名稱
docker volume inspect 卷宗名稱
docker run -v 卷宗名稱：容器的儲存空間

# 繫結掛載
docker run -v 實際儲存空間：容器的儲存空間
docker run --name apa000ex20 -d -p 8090:80 -v /user/user/documents/apa:/usr/local/apache2/htdocs httpd 
```

## 容器建立 Image
- Commit
```shell
docker commit 容器名稱 映像檔名稱
```
- Dockerfile
```shell
docker build -t 建立的映像檔 材料資料夾
```

## 搬運映像檔
```shell
docker save -o 檔案名稱.tar 映像檔名稱
docker load 檔案名稱.tar
```

## 改造容器
```shell
docker exec 選項 容器名稱 /bin/sh
docker exec -it apa000ex23 /bin/bash

docker run --name apa000ex23 -it -p 8089:80 httpd /bin/bash
```
> 為何啟動 bash 就會停用 apache: 因為啟動 bash 之後視同已經運行了 bash 這個軟體無法在運行 apache 這個軟體了。

## Docker hub
 
```bash
docker tag apa000ex22 zoozoo.coomm/nyapacchi:13
docker push zoozoo.coomm/nyapacchi:13

docker run -d -p 5000:5000 registry
```

## Docker Compose
> k8s 是 「管理容器」的工具，而 docker-compose 是創建容器

```bash
docker-compose up 
docker-compose down
# docker-compose.yaml
```

### os Linux
```bash
sudo apt install -y python3 python3-pip
sudo pip3 install docker-compose
```

### docker-compose.yaml
```yaml
version:
services:
networks:
volumes:
```

- 以 WordPress 為例
```yaml
version: "3"
services:
    mysql:
        image: mysql:5.7
        networks: 
            - net1
        volumes:
            - vol1:/var/lib/mysql
        restart: always
        environment:
            MYSQL_ROOT_PASSWORD: root
            MYSQL_DATABASE: wordpress
            MYSQL_USER: wordpress
            MYSQL_PASSWORD: wordpress
    wordpress:
        depends_on:
            - mysql
        image: wordpress
        networks:
            - net1
        volumes:
            - vol2:/var/www/html
        ports:
            - 8085:80
        restart: always
        environment:
            WORDPRESS_DB_HOST: mysql
            WORDPRESS_DB_NAME: wordpress
            WORDPRESS_DB_USER: wordpress
            WORDPRESS_DB_PASSWORD: wordpress
networks:
    net1:
volumes:
    vol1:
    vol2:
```



<!-- ## Docker Networking (Single host)
:::info
Docker 網路類型 
- None
- Host
- Bridge
- Contaienr:$ID
:::
- linux network space
    - `sudo ip netns list`
    - `sudo ip netns add/delete <name>`
    - `sudo ip netns exec <name> ip a`
- docker network ls

## Docker Container Network
```sh
docker network create {{name}}
```

container 模式：
Ref： 
- https://ithelp.ithome.com.tw/articles/10193457
- https://www.hwchiu.com/docker-network-model.html
- https://www.hwchiu.com/docker-network-model-lab.html
- https://www.hwchiu.com/docker-network-model-snat.html
- https://www.hwchiu.com/docker-network-model-lab-dnat.html  -->

<!-- 
最好能照上面，實作操作過
按照順序看這 1~4 篇

特別是第 2 篇
要有能力按照步驟做完且完全理解
=>
建出 bridge
建出 virtual 網卡 vethx
把 vethx 黏到 container 端
把 vethx 綁定到剛建立的 bridge
設定 container IP

另外，第 3 篇一樣重要

要了解封包 從 container -> host ethx -> 外部網路 的原因
也要了解封包 從外部網路 -> host ethx -> 轉進 container 內 的原因 -->

## 其他可以參考的完整教程
- [鐵人賽](https://ithelp.ithome.com.tw/users/20103456/ironman/1320)
- https://askie.today/docker-dockerfile-dockercompose-intro/
- [cheat-sheet](https://swissarmydevops.com/wp-content/uploads/2020/11/Docker_Cheat_Sheet-1.pdf)
- [Docker Network 參考網址](https://hwchiu.com/docker-network-model.html)
- Ref: https://renehernandez.io/snippets/cleaning-local-docker-cache/