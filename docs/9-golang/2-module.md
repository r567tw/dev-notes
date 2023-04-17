---
sidebar_position: 2
---
# Module
## init func
在`Main`之前會被呼叫的func。按照字母順序、檔案內順序執行，**且不可被呼叫**
```go
func init(){
    // init function ...
}
```

Ref: https://blog.wu-boy.com/2018/04/init-func-in-golang/


## String
### Concat 字串串結
可以透過`+`串接字串
```go
package main

import "fmt"

func main(){
    fmt.Println("a"+"b")
}
```
