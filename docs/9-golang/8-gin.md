---
sidebar_position: 8
---
<!-- https://ithelp.ithome.com.tw/articles/10243831 -->
# Gin
## 安裝
```bash
go get -u github.com/gin-gonic/gin
```

## First Example
```go
package main

import (
    "github.com/gin-gonic/gin"
)

func main(){
    r := gin.Default()

    r.GET("/hello",func(c *gin.Context){
        c.JSON(200, gin.H{
            "message": "Hello, World!",
        })
    })

    r.Run()
}
```

## Mode
- gin.ReleaseMode
- gin.TestMode
- gin.DebugMode

```go
// 可以在go裡面使用：
gin.SetMode(gin.DebugMode)
```
Ref: https://blog.csdn.net/wohu1104/article/details/126689099

## csrf

## cors

## 限制API請求的頻率

## JWT Token

## Validator
- `github.com/go-playground/validator`

Ref: https://www.readfog.com/a/1637366423504392192
