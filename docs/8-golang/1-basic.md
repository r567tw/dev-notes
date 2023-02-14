---
sidebar_position: 1
---

# Basic

## Installation
- windows
下載檔案 msi 安裝
- linux
```shell
$ wget https://golang.org/dl/go1.15.3.linux-amd64.tar.gz
$ tar -zvxf go1.15.3.linux-amd64.tar.gz
$ mv ./go /usr/local
$ sudo vim /etc/profile
export GOROOT=/usr/local/go
export GOPATH=/usr/share/nginx/go
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
```

## First Go Program

第一個 Golang 程式
```go title=main.go
// 套件的宣告
package main

// 套件的匯入
import "fmt"

/*
多行註解
*/
func main() {
    fmt.Println("Hello Go!")
}
```

執行 Golang 程式
```bash
#! 1
$ go run main.go
#! 2
$ go build main.go
$ ./main
```

