---
title: 關於 SQL 的那些小坑(1)
date: "2025-11-01 16:33:55+08:00"
hide_table_of_contents: false
tags:
  - side-project
  - sql
---

在開發時，遇到一個問題

```
SQLSTATE[HY000]: General error: 1 HAVING clause on a non-aggregate query
```

看起來，我的 SQL 語法並沒有問題呀！

後來才熊熊發現，網路上教學的那是`MySQL`！！！

<!-- truncate -->

:::info
其實只是想記錄一下我自己在開發時遇到的這個小問題，原來是資料庫不同的差異...然後我是透過和 ChatGPT 合作 Debug 所以才知道有這個小坑坑，所以也請 ChatGPT 幫我生成這樣的一篇部落格文章，整篇有點 AI 感請多多見諒ㄎㄎ
:::

這個錯誤在 **SQLite** 或 **PostgreSQL** 上就出現，但在 **MySQL** 上卻可能完全沒問題。這背後的原因其實跟 SQL 標準有關。

原來是因為我想玩**PostgreSQL** 才會蹦出這個問題呀！

---

## 1. 為什麼會出錯？

`HAVING` 主要是用來過濾 **聚合結果**，例如：

```sql
SELECT team_id, COUNT(*) as total
FROM users
GROUP BY team_id
HAVING total > 5;
```

如果你對普通欄位使用 `HAVING`，但沒有 `GROUP BY` 或聚合函數，資料庫會報錯：

- **SQLite**：嚴格要求 `HAVING` 只能用在聚合結果 → 報 `HAVING clause on a non-aggregate query`
- **PostgreSQL**：同樣要求 SQL 標準 → 報 `column must appear in the GROUP BY clause or be used in an aggregate function`
- **MySQL**：寬鬆，允許對普通欄位用 `HAVING`（雖然不是標準做法）

---

## 2. 正確的做法

### 普通欄位過濾 → 用 `WHERE`

```php
$users = DB::table('users')
    ->where('age', '>', 18)
    ->get();
```

### 聚合結果過濾 → 用 `HAVING` + `GROUP BY`

```php
$users = DB::table('users')
    ->select('team_id', DB::raw('COUNT(*) as total'))
    ->groupBy('team_id')
    ->having('total', '>', 5)
    ->get();
```

---

## 3. 小結

- **沒有 `GROUP BY` 的情況下不要用 `HAVING`**，使用 `WHERE` 過濾普通欄位。
- **跨資料庫開發時**，建議遵循 SQL 標準寫法，避免 MySQL 的寬鬆行為造成 PostgreSQL 或 SQLite 出錯。
