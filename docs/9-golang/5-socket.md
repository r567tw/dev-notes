---
sidebar_position: 5
---

# Advanced Web

## Socket
Socket 是網際網路中用於節點內發送、接收資料的內部端點。位於應用層＆傳輸層之間
```go title=socket-client-read.go
package main

import (
    "bytes"
    "fmt"
    "io"
    "net"
    "os"
)

func main(){
    if len(os.Args) != 2 {
        fmt.Fprintf(os.Stderr,"Usage: %s host:port", os.Args[0])
        os.Exit(1)
    }

    service := os.Args[1]
    conn,__ := net.Dial("tcp",service)

    //.... 處理結果

}
```

## Go RPC
RPC 是一種不需要了解底層網路技術就可以透過網路從遠端電腦程式上請求服務的協定

> RPC --(Register)--> Registry --(Notify)--> RPC Client --(Subscribe)--> Registry
- net/rpc
> func(t *T) MethodName(argType T1,replyType T2) error

## 微服務
一種用於建構應用的架構方案，有別於傳統，他將應用拆分成多個核心功能與服務。並且分別可以被單獨建構、部署。

