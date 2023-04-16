---
sidebar_position: 7
---
# Goroutine

## Concurrent v.s Parallel

- Concurrent : 同一個時刻在CPU中只能執行一個指令，但使用多個處理程序快速的輪換執行，看起來像在多個處理程序同時執行
- Parallel: 同一時刻在多個處理器中同時執行多個命令

## Goroutine
```go
package main

import "fmt"

func main(){
    messages := make(chan string)

    go func() {
        messages <- "ping"
    }()

    msg := <- messages
    fmt.Println(msg)
}
```

### keyword `go`
### channel


