---
sidebar_position: 8
---

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
