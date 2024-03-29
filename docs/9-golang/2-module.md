---
sidebar_position: 2
---
# Module

<!-- - https://ithelp.ithome.com.tw/articles/10206579
- https://ithelp.ithome.com.tw/articles/10206858
https://ithelp.ithome.com.tw/articles/10207167

 -->

## init func
在`Main`之前會被呼叫的func。按照字母順序、檔案內順序執行，**且不可被呼叫**
```go
func init(){
    // init function ...
}
```

Ref: https://blog.wu-boy.com/2018/04/init-func-in-golang/

## Struct Tag
```golang
type Person struct {
    FirstName  string `json:"first_name"`
    LastName   string `json:"last_name"`
    MiddleName string `json:"middle_name,omitempty"`
}
```
Ref: https://zhuanlan.zhihu.com/p/32279896

## String
### Title func被棄用
> 因為 Title 無法正確使用 Unicode 標點符號和其他語言
golang 1.18 之後請改用

```go
package main 

import (
	"fmt"
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
)

func main() {
    foo := "hello"
	bar := cases.Title(language.Und).String(foo)
	
	fmt.Println(bar)
}
```
- Ref: https://segmentfault.com/a/1190000041413266

### Concat 字串串結
可以透過`+`串接字串
```go
package main

import "fmt"

func main(){
    fmt.Println("a"+"b")
}
```

### Pat
- https://github.com/bmizerany/pat

### Chi
- https://github.com/go-chi/chi
