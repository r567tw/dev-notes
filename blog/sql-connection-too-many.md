---
title: 關於 SQL 的那些小坑（2）：DB Connection 爆掉的真實原因與處理策略
date: "2026-01-20 05:27:54+00:00"
tags:
  - sql
---

當 MySQL 連線數爆掉時，常見症狀包括 API timeout、網站卡死，以及 `Too many connections` 錯誤。這通常不是單一 bug，而是系統架構與設定累積的結果。

<!-- truncate -->

:::info
在 Threads 上面看到有人聊到資料庫連線爆掉的問題，以前在做後端工程師的時候也會遇到...於是學會了像是使用`SHOW PROCESSLIST`、或是增加 DBMS 連線數，以下這篇是和 AI 聊天的過程和請 AI 幫忙寫的文章...XD
:::

## 一、確認目前連線數

```sql
SHOW VARIABLES LIKE 'max_connections';
```

---

## 二、找出佔用連線的 Query / Client

```sql
SHOW FULL PROCESSLIST;
```

常見問題包含：

- Query 執行超過數十秒
- 狀態卡在 `Sending data`
- Sleep connection 大量累積

---

## 三、緊急止血（Production）

```sql
KILL <process_id>;
```

---

## 四、常見根本原因

### 1. Connection Leak

程式沒有釋放 DB 連線，導致連線逐漸累積。

### 2. 每個 Request 建立新連線

沒有使用 connection pool，每次 request 都建立新 client。

### 3. Worker / PHP-FPM 開太多

Worker 數量 × DB connection = 真實連線需求。

---

## 五、工程級解法

### 1. 調整 MySQL 連線上限

```sql
SET GLOBAL max_connections = 200;
```

注意：需搭配 RAM 評估，不能無限制提高。

---

### 2. 建立 Connection Pool（應用程式層）

Node.js / ORM 範例：

```js
pool: {
  min: 2,
  max: 10
}
```

---

### 3. 使用 Proxy Layer

- ProxySQL
- MySQL Router

---

### 4. 加 Cache 減少 DB Hit

```php
Cache::remember("user:$id", 60, fn() => User::find($id));
```

---

## 六、小 VPS 建議配置（1GB RAM）

```conf
max_connections = 50
innodb_buffer_pool_size = 256M
```

---

## 七、容量計算觀念

實際連線需求約為：

```text
PHP-FPM workers × DB conn per request
+ Queue workers × DB conn
```

只要需求 > max_connections
→ MySQL 必炸。

---

## 結論

MySQL 連線數問題通常不是資料庫本身，而是**系統架構設計與容量規劃問題**。
能預先設計 connection usage 的工程師，已具備 Senior Backend / SRE 等級的系統思維。

> 小君曰：真是很懶得寫文章XD
