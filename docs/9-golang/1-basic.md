---
sidebar_position: 1
---

# Basic
<!--  參考：https://github.com/shirdonl/goWebActualCombat -->
## Installation
- windows : 下載檔案 msi 安裝
- mac : 在官網下載 pkg 安裝
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

```shell
go version
```

## First Go Program

第一個 Golang 程式
```go title=main.go
// 套件的宣告
package main

// 套件的匯入
import "fmt"

// 單行註解
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

## Data Structure
### common
- bool
- integer
- string
- *rune
- 複合：array , slice, map , struct

#### rune
一個特別的資料結構，處理用來像是"A","B"這種的“字節”
```go
s := "golang"
fmt.Println(s[:3])

s := "中文中文"
res := []rune(s)
fmt.Println(string(res[:2]))
```
Ref: https://learnku.com/articles/23411/the-difference-between-rune-and-byte-of-go

### define
```go
// var name type 
// const name type 常數

// 1 標準
var age int
// 2 批次
var (
    age int
    name string
    balance float32
)
// 3 簡短格式 名字:=運算式
age := 18
name,age := "jimmy",18
```

- 變數分為區域變數、全域變數

### pointer
變數儲存一個記憶體位址的變數類型, 可以使用`&`
```go
var b int = 66
var p *int = &b
// 如果是要放在類型請使用'*', 如果是變數是使用'&'
```

### array
```go
var array[10] int
var numbers = [...]int{1,2,3}
```

### struct
```go
type 類型名稱 struct {
    欄位1 類型1
    欄位2 類型2
}
```
- 大寫能公開在其他套件使用
- 小寫只能在套件內使用

### map
```go
var name map[key_type]value_type
map := make(map[string]int,100)
```

### function
```go
func function_name(parameter parameter_type)[return return_type]{

}

func min(arr []int)(m int){
    m = arr[0]
    for _,v := range arr {
        if v < m {
            m = v
        }
    }

    return m
}

```

### anonymous function
```go
f := func(a int){
    fmt.Println(a)
}(x)

f(5)
```

### defer
延遲敘述：
> 用來在程式結束之前最後執行的動作。當程式看到`defer`時不會馬上執行，而是存入專門的堆疊中，最後程式結束前：先進去的最後執行、最後進去的最先執行


## Control Flow

### if-else
```go
if b > 10 {
    return 1
} else if b > 15 {
    return 2
} else {
    return 3
}
```

### for
```go
p := 1
for i :=1; i<5; i++ {
    p *= i
}
// continue
// break
```

### for-range
```go
for key,val := range []int{1,2,3}{
    fmt.Printf("Key:%d value:%d",key,val)
}
```

### switch-case
```go
switch option {
    case "a":
        fmt.Println("a")
    case "b":
        fmt.Println("b")
    case "c":
        fmt.Println("c")
    default:
        fmt.Println("default")
}
```

### break , continue
```go
package main

import "fmt"

func main(){
    for i:=0; i<2; i++ {
        switch i {
            case 0:
                break
            case 1:
                continue
        }
    }
}
```

## Object
### 封裝
```go
type Triangle struct {
    Bottom float32
    Height float32
}

func (t *Triangle) Area() float32 {
    return (t.Bottom * t.Height)/2
}
```
- 大寫能公開在其他套件使用
- 小寫只能在套件內使用

### interface
```go
type Engine interface {
    Run()
}

```

### 繼承
```go
type Engine interface {
    Run()
}

type Bus struct {
    Engine
}
```
### 多型

## Reflect
```
reflect.TypeOf()
reflect.ValueOf()
```

<!-- ## Goroutine
```go
package main

import (
    "fmt"
    "time"
)

func HelloWorld(){
    fmt.Println("Hello")
}

func main() {
    go HelloWorld()
    time.Sleep(1*time.Second)
    fmt.Println("End")
}

// Output: 
// End
// Hello
``` -->

## 單元測試


## 關於Golang 的那些命令們
- `Go build`
```bash
go build -ldflags "-X main.VERSION=1.0.0 -X" # 在build 時代入內容
go build --tags prod # 在golang 裡面的檔案可以加入+build prod 等等
```

- Ref: https://ithelp.ithome.com.tw/articles/10224843
- Ref: https://islishude.github.io/blog/2019/08/20/golang/Go-%E4%BD%BF%E7%94%A8-build-tag-%E6%9D%A5%E8%87%AA%E5%AE%9A%E4%B9%89%E6%9E%84%E5%BB%BA%E9%85%8D%E7%BD%AE/

