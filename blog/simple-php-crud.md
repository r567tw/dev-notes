---
title: 簡單的CRUD 操作
date: "2018-10-04 13:28:52+00:00"
tags:
  - php
---

# 緣起

我們公司最近要徵募新人，說到要給新人出怎麼樣的題目....談到出個簡單的部落格實做(包含登入登出)....說真的這個題目的範圍可大可小....對我來說就只是要考所謂 CRUD 的操作-就是新增-查詢-更新-刪除。於是就問我這個非常菜的菜鳥能不能在這短時間內做出來.....說真的我是有點躍躍欲試...於是便開啟這樣的練習....

所有程式碼都在這裡：[https://github.com/r567tw/easy_blog_practice][1]

<!-- truncate -->

這裡我應用了 PDO 的技術，並且也記錄一些筆記......

# Initial

```php
$db = new PDO($dsn, $user,$password );
```

# Create

```php
$insert=$db->prepare("insert into posts (title,post) values (:title,:post)");
$insert->bindParam(":title",$_POST['title']);
$insert->bindParam(":post",$_POST['posts']);
$insert->execute();
```

# Review

```php
$sql="select * from posts";
$posts=$db->query($sql);
$posts=$posts->fetchAll();
```

# Update

```php
$update=$db->prepare("update posts set title=:title,post=:post,update_time=:update where id=:id");
$update->bindParam(":title",$_POST['title']);
$update->bindParam(":post",$_POST['posts']);
$update->bindParam(":update",date("Y:m:d H:i:s"));
$update->bindParam(":id",$_POST['id']);
$update->execute();
```

# Delete

```php
$delete=$db->prepare("delete from posts where id=:id");
$delete->bindParam(":id",$_GET['id']);
$delete->execute();
```

判斷是否有成功執行

```php
$delete->rowCount()>0
```

# 登入登出

首先必須先開啟 Session

```php
session_start();
```

當登入時必須宣告一個 session 的參數

```php
$_SESSION[index]=Value
```

之後就判斷這個 session 實數就能時做出登入登出啦

這麼簡單的東西我花了一個半小時做完~ 是不是有點久阿哈哈?

# 工作上學習到的小技巧

1 簡單輸出成 Excel 的程式碼

```php
header("Content-type:application/vnd.ms-excel"); header("Content-Disposition:filename=filename.xls");
```

接下來只要在此段程式碼底下宣告 HTML 的 Table，只要打開這個網頁就會輸出 Excel 檔案

2.MySQL 應用 CASE 子句

```php
SELECT count(CASE ("欄位名") WHEN "條件1" THEN  1 ELSE NULL  END) FROM "表格名";
```

可以在同一條 SQL 查詢出來這個欄位在這個條件下所出來的個數...

這樣如果要計算另外一個條件就不用再用另外的 SQL 查詢這麼蠢的操作了

# 未來展望

說真的! 這些都是很多 Native php 的東西，做多了就是一直在重複造輪子....這種叫做練功哈哈，這網路上有很多人做了很多東西，就像是框架，一下子東西就出來了! 這都是我應該要學習的地方~~

> 小君曰：為自己加油，希望可以越來越強！！

[1]: https://github.com/r567tw/easy_blog_practice
