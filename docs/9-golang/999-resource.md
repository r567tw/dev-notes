---
sidebar_position: 999
---
# Resource

## Go 學習
https://blog.canopas.com/1-min-guide-to-golang-development-best-practices-in-2022-b50d846fd6c

別人的筆記：https://easonwang.gitbook.io/golang/
https://www.tenlong.com.tw/products/9787115576613?fbclid=IwAR1UWY0L7jBn99iPXITJqvw8McuVL4sefqo_AHLF2DhE1f9Yp4MILxlJOLA

https://draveness.me/golang/
https://mileslin.github.io/2020/08/Golang/%E5%88%B0%E5%BA%95-go-get-%E7%9A%84%E7%89%88%E8%99%9F%E6%80%8E%E9%BA%BC%E9%81%8B%E4%BD%9C%E7%9A%84/

## Go web gitbook
https://willh.gitbook.io/build-web-application-with-golang-zhtw/

## 知道執行多久
[來源](https://blog.csdn.net/lanyang123456/article/details/79178956)
```go=
package main

import (
	"time"
    "log"
)

func main() {
	t := time.Now()
	elapsed := time.Since(t)
	log.Println(elapsed)
}
```

## Go 語言工具
- go build
- go run
- go fmt
- go vet 靜態分析工具
- go doc 產生文件
- go get
- go mod

## Go package
### 5 Golang modules
- https://bdijkhuizen.medium.com/5-golang-modules-packages-that-every-developer-should-know-c945f40ea173
1. Goose: db migration
2. Go Kit — Microservices
3. Authboss — Modular Authentication.
4. Gingko — Testing Framework.
5. NSQ — Messaging Platform

### Other
- graphql: https://github.com/99designs/gqlgen
https://www.yuanlin.dev/posts/628c87a6113d85275a89dcba

## Golang module
- flag


## Go Web Framework
- Fiber: https://github.com/gofiber/fiber
- Echo: https://echo.labstack.com/

## Module
https://www.liwenzhou.com/posts/Go/import-local-package/
https://www.digitalocean.com/community/tutorials/how-to-write-packages-in-go
https://go.dev/doc/modules/publishing
https://pkg.go.dev/about#adding-a-package
https://medium.com/geekculture/release-your-go-package-on-pkg-go-dev-886ec42fbc77

## Container
- `heap`
- `list`
- `ring`

Ref: https://www.readfog.com/a/1644907362392313856