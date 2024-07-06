---
title: Redis筆記
type: post
date: 2021-03-13T04:00:00+00:00
categories:
  - learning
tags:
  - redis
url: posts/redis
---
最近在玩Redis, 記錄起來才不會忘！
# 關於 Redis 的簡介
一種 in-memory 的 nosql 資料庫。常作為cache或queue做使用。
因為是用記憶體作為處理，所以處理速度當然會比較快。

> 複習一下電腦概論...記憶體讀取速度：暫存器 > 快取記憶體 > 隨機存取記憶體（RAM） > 硬碟 > 光碟


- 參考來源： https://sites.google.com/site/gaoerzixunke/ke-cheng/ch4-cpu-yuram/4-2-ji-yi-ti
- 參考來源： https://web.mit.edu/rhel-doc/4/RH-DOCS/rhel-isa-zh_tw-4/s1-memory-spectrum.html
- 參考來源： https://hackmd.io/@Xpz2MX78SomsO4mV3ejdqg/Hk-KZ_lVQ?type=view
# 利用Docker 迅速起一個redis container
你可以去官網按照他的說明下載redis, 但我這裡選擇用docker 來起一個簡單的redis 服務首先我的dokcer-compose.yml 是這樣寫：

```yaml
# ...(略)
## Redis Container ##############
    redis:
        image: redis:alpine
        ports:
            - "6379:6379"
# ...(略)
```
然後使用 `docker-compose up -d` 就可以起一個簡單的redis server, 你可以使用[Another Redis Desktop Manager][1] 去連線它看看狀況
# 指令與相關說明
簡單來說，redis 就是一個key-value 的 in-memory 資料庫。  
首先，我們需要進去一下redis cli...只要`docker exec -it {你docker-composer.yml 所在的資料夾名稱}\_redis\_1 sh\`就可以進入redis container 裡面，之後在container 裡面執行\`redis-cli\`即可

## GET/SET

最簡單你一定要學到的redis 指令就是：`SET`和 `GET`!
```shell
127.0.0.1:6379> SET name Jimmy
OK
127.0.0.1:6379> GET name
"Jimmy"
```
## MGET/MSET

每次只能設定一個那怎麼行？你可以一次設定多個

```shell
127.0.0.1:6379> MSET first "Hello" second "World"
OK
127.0.0.1:6379> MGET second first
1) "World"
2) "Hello"
```
## EXPIRE

既然是一個key-value 的 in-memory 資料庫，他就不像一般Relational database 一樣，只能永久保存資料，你可以設定這個key 的保留期間

```shell
127.0.0.1:6379> SET session "HelloWorld"
OK
127.0.0.1:6379> EXPIRE session 10
(integer) 1
127.0.0.1:6379> GET session
"HelloWorld"
127.0.0.1:6379> GET session
(nil)
```
## EXIST / DEL

你也可以判斷這個key 存在不存在, 以及刪除那個key

```shell
127.0.0.1:6379> EXISTS name
(integer) 1
127.0.0.1:6379> DEL name
(integer) 1
127.0.0.1:6379> EXISTS name
(integer) 0
```
## INCR / DECR

redis 還自帶遞增和遞減的指令。

```shell
127.0.0.1:6379> SET counter 100
OK
127.0.0.1:6379> INCR counter
(integer) 101
127.0.0.1:6379> GET counter
"101"
127.0.0.1:6379> DECR counter
(integer) 100
127.0.0.1:6379> GET counter
"100"
```
## INCRBY / DECRBY

每次只能遞增和遞減一個那怎麼可行？
```shell
127.0.0.1:6379> SET counter 100
OK
127.0.0.1:6379> INCRBY counter 100
(integer) 200
127.0.0.1:6379> GET counter
"200"
127.0.0.1:6379> DECRBY counter 100
(integer) 100
127.0.0.1:6379> GET counter
"100"
```
## keys *

這個指令可以讓你看到目前設定在redis 裡面所有的key

```shell
127.0.0.1:6379> keys *
1) "first"
2) "counter"
3) "second"
```
# Redis 的資料型態

redis 支援以下型態，上面已經充分示範出string 這個簡單的型態。接下來展示其他沒有在上面示範過的型態！
1. string(字串)
2. hash(雜湊)
3. list(串列)
4. set(群集)
5. sorted set(有序群集)
# Hash
就像HMSET 的說明一樣：`HMSET key field value [field value ...]`以底下的說明來說，就像產生了這樣的資料型態：`{id: 45, name: Jimmy}`

```shell
127.0.0.1:6379> HMSET user id 45 name "Jimmy"
OK
127.0.0.1:6379> HGET user id
"45"
127.0.0.1:6379> HGET user name
"Jimmy"
127.0.0.1:6379> HGETALL user
1) "id"
2) "45"
3) "name"
4) "Jimmy"
```
# List

和javascript 的想法很像，有push 和pop , L代表左邊, R代表右邊啊那個如果要列出清單可以用`LRANGE`指令

```shell
127.0.0.1:6379> LPUSH mylist 10 "Hello"
(integer) 2
127.0.0.1:6379> LRANGE mylist 0 1
1) "Hello"
2) "10"
127.0.0.1:6379> RPUSH mylist "World" 20
(integer) 4
127.0.0.1:6379> LRANGE mylist 0 3
1) "Hello"
2) "10"
3) "World"
4) "20"
127.0.0.1:6379> LPOP mylist
"Hello"
127.0.0.1:6379> LRANGE mylist 0 3
1) "10"
2) "World"
3) "20"
127.0.0.1:6379> RPOP mylist
"20"
127.0.0.1:6379> LRANGE mylist 0 3
1) "10"
2) "World"
```
# Set & Sorted Set

1. set 沒有排序得權重，而且不可以增加重複的值
```shell
127.0.0.1:6379> SADD myset 1 2 3 4 5 
(integer) 5
127.0.0.1:6379> SMEMBERS myset
1) "1"
2) "2"
3) "3"
4) "4"
5) "5"
127.0.0.1:6379> SISMEMBER myset 5
(integer) 1
127.0.0.1:6379> SISMEMBER myset 50
(integer) 0
127.0.0.1:6379> SADD myset 1 
(integer) 0
127.0.0.1:6379> SADD myset 10
(integer) 1
127.0.0.1:6379> SMEMBERS myset
1) "1"
2) "2"
3) "3"
4) "4"
5) "5"
6) "10"
```
2. sorted set 有排序得權重
```shell
127.0.0.1:6379> ZADD mysortedset 1 Jimmy
(integer) 1
127.0.0.1:6379> ZADD mysortedset 0 Jim
(integer) 1
127.0.0.1:6379> ZRANGE mysortedset 0 1
1) "Jim"
2) "Jimmy"
127.0.0.1:6379> ZRANK mysortedset Jimmy
(integer) 1
```
# 同場加映：pub/sub
laravel broadcast 如果你的driver 設定的是 redis , 你會看到文件會寫道使用redis 的pub/sub 來實現，但這個其實很難透過GUT 去看，首先，你需要開兩個redis-cli

A. Redis cli
```shell
127.0.0.1:6379> SUBSCRIBE mychannel
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "mychannel"
3) (integer) 1
```
B. Redis Cli
在這裡你可以用`PUBLISH` 指令
```shell
127.0.0.1:6379> PUBLISH mychannel "HelloWorld"
(integer) 1
```
這時你回到Ａ 來看，奇蹟發生了！底下多了`message`, `mychannel`, `HelloWorld` !

```shell
127.0.0.1:6379> SUBSCRIBE mychannel
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "mychannel"
3) (integer) 1
1) "message"
2) "mychannel"
3) "HelloWorld"
```
有趣吧？

[影片學習](https://www.youtube.com/watch?v=WgpP7-XAI5Y)

## Basic
### Key-Value

```bash
keys *
set name "jimmy"
set name "jimmy" NX
get name 
append name "hello"
incr key
decr key
incrby key n
decrby key n
del key
```

### Hash
```bash
hset key field value
hmset key field value [field2 value2]
hget key field
hmget key field1 [field2]
hgetall key
HEXISTS key field
hlen key
```

### List
```
lpush key value
rpush key value
llen key
lrange key [begin] [end]
lpop key
rpop key
```

> 小君曰：redis 一日遊

 [1]: https://github.com/qishibo/AnotherRedisDesktopManager