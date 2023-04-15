---
sidebar_position: 4
---

# Database
:::tip
這裡簡單以部分程式碼片段去做說明, 所有操作另開專案做說明
:::

## Mysql
- database/sql
- github.com/go-sql-driver/mysql
```go
package main

import (
    "database/sql"
    "fmt"
    _ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

func initDB() (err error) {
    db, _ = sql.Open("mysql","root:{password}@tcp(127.0.0.1:3306)/{db}")
    return db.Ping()
}

func main() {
    err := initDB()
}
```


## Redis
- github.com/gomodule/redigo/redis

## MongoDB
- go.mongodb.org/mongo-driver/mongo

## ORM
- Gorm: github.com/jinzhu/gorm
- Beego ORM