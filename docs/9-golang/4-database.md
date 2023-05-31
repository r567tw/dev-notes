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
:::info
trace detail:

1. 在 database/sql 的 open 裡面有個讀取`drivers`陣列的資料
2. `_ "github.com/go-sql-driver/mysql"` 這一行 裡 `driver.go` 有`init()`function 會註冊 `database/sql` 裡面的driver
3. 如果你呼叫`sql.Drivers()` 應該就只有`mysql`這一行
4. 所以Open的Error 只是呈現有沒有驅動driver connect 是否成立。**是否有連線仍需要`ping()`**
:::


## Redis
- github.com/gomodule/redigo/redis
```golang
package main

import (
	"fmt"
	"github.com/gomodule/redigo/redis"
)

func main() {
	c, _ := redis.Dial("tcp", "localhost:6379")
	res, _ := redis.String(c.Do("GET", "hh"))
	// c.Do("expire","name",10)
	fmt.Println(res)
	defer c.Close()
}
```

## MongoDB
- go.mongodb.org/mongo-driver/mongo

## ORM
- Gorm: github.com/jinzhu/gorm
- Beego ORM