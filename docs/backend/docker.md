---
title: Docker
sidebar_position: 5
---
# Docker

## Docker 是什麼
:::info
Docker 是一個開放原始碼軟體，是一個開放平台，用於開發應用、交付應用、執行應用。 Docker 允許使用者將基礎設施中的應用單獨分割出來，形成更小的顆粒，從而提高交付軟體的速度。 Docker 容器與虛擬機器類似，但二者在原理上不同。 (維基百科)
:::

- Docker 是一個可隔離資料、程式的工具
- Container 兩大核心：`namespace`: 隔離，`cgroups`: 資源限制

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
docker system prune --volumes
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

## Networks
- bridge
- none
- container:name|id
- host
- network-name | network-id

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

# Kubernetes

## Intro
- 容器的調度管理工具、統籌整個系統、管理多個容器的工具
- 以多台實體主機、多個容器(Cluster)為前提
- 常態保持「理想狀態」
- 一個用於自動部署、擴展和管理容器化應用程序的系統。它提供了一個框架來運行分佈式系統，並支持跨多個主機的容器協調。

## 特點
1. 容器管理：Kubernetes 使得容器化的應用程序部署和管理更加容易和高效。它支持多種容器運行時，例如 Docker。
2. 跨主機管理：它允許跨一組主機（稱為「節點」）協調容器的部署和運行，這些節點可以是物理機或虛擬機。
3. 自動擴展：Kubernetes 可以根據負載自動擴展或縮減應用程序的實例數量。
4. 自我修復：它具有自我修復的能力，可以自動重啟失敗的容器、替換和重新部署異常節點的容器、殺死不響應的容器，並在容器準備就緒之前不會向它們發送流量。
5. 負載均衡：Kubernetes 可以自動分配網絡流量，以便集群中的容器應用獲得穩定的流量分佈。
6. 服務發現和負載均衡：Kubernetes 可以公開容器應用程序並分配流量，使得部署跨多個容器的應用程序變得容易。
7. 統一配置管理：它提供了統一的機制來管理和存儲配置資訊，方便集中管理和分發。

## 節點
- 主要節點 Master node
    - CNI 虛擬網路
    - etcd 資料庫
- 工作節點 Worker node

## 構成與用語
- Pod : 容器組 k8s 管理容器的單位
- Service: 統籌管理 Pod 的功能，管束 Pod 的班長, 即使 Pod 分散於多個工作節點(實體主機)也可以管理
- Deployment :  管理 Pod 的部署、配置展開
- ReplicaSet : 管理 Pod 數量的班長, 很少單獨使用,常和 Deployment 一起使用

### Service v.s Deployment
```
Deployment
目的：Deployment 負責定義和控制 Pod 的創建和更新。它確保指定數量的 Pod 副本始終在運行。
功能：當你需要部署一個應用程式或服務時，Deployment 管理一組 Pod 的創建和擴展。它也處理更新和回滾。
範例：在一個 Deployment 中，你可以定義使用 Apache 鏡像的 Pod，設置需要運行的 Pod 副本數量，並定義更新策略。
Service
目的：Service 定義了如何訪問一組特定的 Pod，提供一個穩定的接口來與 Pod 進行交互。
功能：它通常用於內部或外部網路流量的路由到 Pod。Service 確保即使 Pod 背後的 IP 地址變化，訪問點也保持不變。
範例：如果你想讓 Deployment 管理的 Apache Pod 可以接收網路請求，你會創建一個 Service 來指定如何將流量路由到這些 Pod。如果 Service 設定為 NodePort 或 LoadBalancer，則還可以從集群外部訪問這些 Pod。
總結
Deployment：定義和管理 Pod，確保應用程式或服務的副本正常運行。
Service：提供一個穩定的方式來訪問這些 Pod，不論是在集群內部還是從外部。它是與外界交互的接口，無論是瀏覽器還是其他服務。
```

### Service 的 Types
Kubernetes 中的 Service 有幾種主要的類型，每種都用於不同的用途：

- ClusterIP：默認類型，分配一個集群內部的 IP，只能在集群內部訪問。
- NodePort：在集群的所有節點上開放一個端口，允許從集群外部通過 `<節點IP>:<nodePort>` 訪問。
- LoadBalancer：在支持的雲平台上，提供一個外部負載均衡器，自動分配一個外部 IP 地址來路由流量到集群內部。
- ExternalName：允許將 Service 映射到一個外部 DNS 名稱，而不是一組特定的 Pod。


## 安裝與用法
### 安裝
- 雲端的 K8s
- 桌面版 與 Minikube

## 定義檔
```
apiVersion:
kind:
metadata:
spec:
```

### 以 Apache 為例的 Deployment 定義檔
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: apache-deployment
spec:
  replicas: 2 # 創建兩個副本
  selector: # 在 Kubernetes 中，Pod 被賦予標籤（labels），這些標籤是鍵值對，用於識別和組織 Pod。selector 在 Deployment 定義中用來選擇具有特定標籤的 Pod。換句話說，它告訴 Deploymen
    matchLabels:
      app: apache
  template:
    metadata:
      labels:
        app: apache
    spec:
      containers:
      - name: apache
        image: httpd:latest # 使用最新版本的 Apache 鏡像
        ports:
        - containerPort: 80 # 容器對外暴露的端口號

```

### 以 Apache 為例的 Service 定義檔
```yaml
# 僅在集群內部提供訪問
apiVersion: v1
kind: Service
metadata:
  name: apache-service
spec:
  selector:
    app: apache
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: ClusterIP

# 當 Service 的 type 設定為 NodePort 時，這意味著 Kubernetes 會在集群的每個節點上開放一個特定的端口，從而使得外部流量能夠通過這個端口訪問 Pod。
apiVersion: v1
kind: Service
metadata:
  name: apache-service
spec:
  selector:
    app: apache
  ports:
    - protocol: TCP
      port: 8099 # 這是 Service 對內部（Kubernetes 集群內）暴露的端口。
      targetPort: 80 # 這是流量最終被轉發到的 Pod 的端口
      nodePort: 30080 # 節點端口，僅在 NodePort Service 中
  type: NodePort
```
## 指令
```shell
kubectl 指令 選項

kubectl apply -f /Users/user/apa000dep.yml
kubectl get pods
kubectl get services
kubectl get deployment

kubectl delete pod xxxx
kubectl delete -f /Users/user/apa000dep.yml
```

# Memo
:::info
這裡記錄幾個我工作中會常用的指令 Memo 用，我就不愛背東西...
:::

## Clean
```
$ docker system prune --volumes
```

## Tips
```bash
# 使用 Docker 快速架設 DB
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password --name mysql mysql
# 啟動 composer install
docker run --rm -v $(pwd):/app composer "composer install"

# 移除很多沒有用的 container
docker container prune
docker rm $(docker ps --filter status=exited -q)
```

## Docker-Compose tips
> 使用 Docker-compose 快速架設 mongodb、redis、mysql，因為就懶得使用手動下載安裝，用 docker 比較快

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

