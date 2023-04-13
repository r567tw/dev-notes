---
sidebar_position: 1
---
# Intro

## Docker是什麼
:::info
Docker 是一個開放原始碼軟體，是一個開放平台，用於開發應用、交付應用、執行應用。 Docker允許使用者將基礎設施中的應用單獨分割出來，形成更小的顆粒，從而提高交付軟體的速度。 Docker容器與虛擬機器類似，但二者在原理上不同。 (維基百科)
:::

## Engine
為 C/S 架構
- Server
- REST API
- Client (Docker CLI)

## 概念初探
- `images`  相當於物件導向程式語言裡面的`class`,是run container的核心與映像檔
    - `Dockerfile` 是`Docker`用來build檔案,如果單純的`docker pull` 無法滿足你的需求, 你可以在`Dockerfile`裡面撰寫一行一行的指令將`image` 建立起來,從而建立容器。
- `container` 相當於物件導向程式語言裡面的`object`、`object = new class()`, 是實際跑在機器上的實際單位
- 快速QA: https://www.ithome.com.tw/news/91847
- `Repository` 集中存放image 的場所。分public/private兩種


## 其他可以參考的完整教程
- [鐵人賽](https://ithelp.ithome.com.tw/users/20103456/ironman/1320)
- https://askie.today/docker-dockerfile-dockercompose-intro/

## Docker Networking (Single host)
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

## Docker Container Network篇
```sh
docker network create {{name}}
```

container 模式：
Ref： 
- https://ithelp.ithome.com.tw/articles/10193457
- https://www.hwchiu.com/docker-network-model.html
- https://www.hwchiu.com/docker-network-model-lab.html
- https://www.hwchiu.com/docker-network-model-snat.html
- https://www.hwchiu.com/docker-network-model-lab-dnat.html

<!-- 
最好能照上面, 實作操作過
按照順序看這 1~4篇

特別是第 2 篇
要有能力按照步驟做完且完全理解
=>
建出 bridge
建出 virtual 網卡 vethx
把 vethx 黏到 container 端
把 vethx 綁定到剛建立的 bridge
設定 container IP

另外,第 3 篇一樣重要

要了解封包 從 container -> host ethx -> 外部網路 的原因
也要了解封包 從外部網路 -> host ethx -> 轉進 container 內 的原因 -->

## For Example: 
```bash
# 使用 Docker 起
# 快速架設DB
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password --name mysql mysql
# 啟動 composer install
docker run --rm -v $(pwd):/app composer "composer install"
```