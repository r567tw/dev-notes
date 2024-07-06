# Golang
<!--  參考：https://github.com/shirdonl/goWebActualCombat -->

# Installation
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

# First Go Program

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

# Data Structure
## common
- bool
- integer
- string
- *rune
- 複合：array , slice, map , struct

## rune
一個特別的資料結構，處理用來像是"A","B"這種的“字節”
```go
s := "golang"
fmt.Println(s[:3])

s := "中文中文"
res := []rune(s)
fmt.Println(string(res[:2]))
```
Ref: https://learnku.com/articles/23411/the-difference-between-rune-and-byte-of-go

## define
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

## pointer
變數儲存一個記憶體位址的變數類型, 可以使用`&`
```go
var b int = 66
var p *int = &b
// 如果是要放在類型請使用'*', 如果是變數是使用'&'
```

## array
```go
var array[10] int
var numbers = [...]int{1,2,3}
```

## slice
```go
package main

import (
	"fmt"
)

func main() {
	var a []string
	a = make([]string, 3, 5)
	a[0] = "test"
	a[1] = "abc"
	a[2] = "def"
	fmt.Printf("%#v\n", a)
}
```
Ref: https://ithelp.ithome.com.tw/articles/10203043

## struct
```go
type 類型名稱 struct {
    欄位1 類型1
    欄位2 類型2
}
```
- 大寫能公開在其他套件使用
- 小寫只能在套件內使用

## map
```go
var name map[key_type]value_type
map := make(map[string]int,100)
```

## function
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

## anonymous function
```go
f := func(a int){
    fmt.Println(a)
}(x)

f(5)
```

## defer
延遲敘述：
> 用來在程式結束之前最後執行的動作。當程式看到`defer`時不會馬上執行，而是存入專門的堆疊中，最後程式結束前：先進去的最後執行、最後進去的最先執行


# Control Flow

## if-else
```go
if b > 10 {
    return 1
} else if b > 15 {
    return 2
} else {
    return 3
}
```

## for
```go
p := 1
for i :=1; i<5; i++ {
    p *= i
}
// continue
// break
```

## for-range
```go
for key,val := range []int{1,2,3}{
    fmt.Printf("Key:%d value:%d",key,val)
}
```

## switch-case
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

## break , continue
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

# Object
## 封裝
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

## interface
```go
type Engine interface {
    Run()
}

```
- Ref: https://ithelp.ithome.com.tw/articles/10204662
- Ref: https://pjchender.dev/golang/interfaces/


## 繼承
```go
type Engine interface {
    Run()
}

type Bus struct {
    Engine
}
```
## 多型

# Reflect
```
reflect.TypeOf()
reflect.ValueOf()
```

# Goroutine
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
```

# 單元測試
- `go test`
- `*_test.go`
```go
package twID

import (
	"testing"
)

func TestFunction(t *testing.T) {
	want := true
	msg := Func()
	if msg != want {
		t.Fatalf("Error")
	}
}
```


# 關於Golang 的那些命令們
- `Go build`
```bash
go build -ldflags "-X main.VERSION=1.0.0 -X" # 在build 時代入內容
go build --tags prod # 在golang 裡面的檔案可以加入+build prod 等等
```

- Ref: https://ithelp.ithome.com.tw/articles/10224843
- Ref: https://islishude.github.io/blog/2019/08/20/golang/Go-%E4%BD%BF%E7%94%A8-build-tag-%E6%9D%A5%E8%87%AA%E5%AE%9A%E4%B9%89%E6%9E%84%E5%BB%BA%E9%85%8D%E7%BD%AE/

# 新手會採的坑
https://github.com/0voice/Introduction-to-Golang/blob/main/Golang%20%E6%96%B0%E6%89%8B%E5%8F%AF%E8%83%BD%E4%BC%9A%E8%B8%A9%E7%9A%84%2050%20%E4%B8%AA%E5%9D%91.md


# init func
在`Main`之前會被呼叫的func。按照字母順序、檔案內順序執行，**且不可被呼叫**
```go
func init(){
    // init function ...
}
```

Ref: https://blog.wu-boy.com/2018/04/init-func-in-golang/

# Struct Tag
```golang
type Person struct {
    FirstName  string `json:"first_name"`
    LastName   string `json:"last_name"`
    MiddleName string `json:"middle_name,omitempty"`
}
```
Ref: https://zhuanlan.zhihu.com/p/32279896

# String
## Title func被棄用
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

## Concat 字串串結
可以透過`+`串接字串
```go
package main

import "fmt"

func main(){
    fmt.Println("a"+"b")
}
```

# Web
## First Web Program
```go title="HelloWeb.go"
package main

import (
    "fmt"
    "net/http"
)

func hello(w http.ResponseWriter, r *http.Request){
    fmt.Fprintf(w,"Hello World")
}

func main(){
    server := &http.Server{
        Addr: "0.0.0.0:80"
    }

    http.HandleFunc("/", hello)
}
```

## net/http
```go
package main

import (
    "net/http"
)

func hello(w http.ResponseWriter, r *http.Request){
    w.Write([]byte("Hello"))
}

func main(){
    http.HandleFunc("/hello", hello)
    http.ListenAndServe(":8080", nil)
    // 創建 HTTPS
    // http.ListenAndServeTLS(certFile,keyFile)

    // 創建各種request
    resp,err := http.NewRequest(Method,URI,Payload)
    // http.NewRequest("PUT",url,payload)
    resp,err := http.Get("http://123.com")
    resp,err := http.Post("http://123.com",Header,Body)

    closer := resp.Body
    bytes,err := ioutil.ReadAll(closer)
    fmt.Println(string(bytes))
}
```

## net/http/client.go
```go
var DefaultClient = &Client{}

```
## html/template, text/template
```html title="template_example.tmpl"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Template</title>
</head>
<body>
    <p> Hello World {{ . }}</p>
</body>
</html>
```

```go
package main

import (
    "html/template"
    "net/http"
)

func Hello(w http.ResponseWriter, r *http.Request){
    t, _ := template.ParseFiles("./template_example.tmpl")

    name := "Jimmy"

    t.Execute(w,name)
}

func main(){
    http.HandleFunc("/",Hello)
    http.ListenAndServe(":8080",nil)
}
```

- 參數名稱
```go
// in Program
type User struct {
    Name string
}

user := User{
    Name: "Jimmy"
}

t.Execute(w,user)

// template
{{ .Name }}
```
- 註釋
```
{{/* */}}
```
- pipeline
```
{{ .Name | {{func}} }}
```

- 條件
```
{{ if condition }} T1 {{ end} }
```

- range
```
{{ range list}} T1 {{ end }}
```

## Cookie
- SetCookie
```go
package main

import (
	"fmt"
	"net/http"
)

func test(w http.ResponseWriter, r *http.Request) {
	// c, err := r.Cookie("test") // 這兩行是可以取得cookies的資料
	// fmt.Println("cookie %#v, err: %v", c, err)
	cookie := &http.Cookie{
		Name:   "test",
		Value:  "aaaaaa",
		MaxAge: 360,
		Domain: "localhost",
		Path:   "/",
	}

	http.SetCookie(w, cookie)
	w.Write([]byte("helloworld"))
}

func main() {
	http.HandleFunc("/", test)
	http.ListenAndServe(":8080", nil)
}
```

- GetCookie
```go
func (r *Request) Cookies() []*Cookie
func (r *Request) Cookie(name string) (*Cookie, error)
```

## Session

## REf
- https://willh.gitbook.io/build-web-application-with-golang-zhtw/09.0/09.6


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


# File
- os
- path

## mkdir
```go
err := os.Mkdir("test", 0777)
err := os.MkdirAll("dir1/dir2/dir3", 0777)
```

## rename dir
```go
err := os.Rename(oldName,newName)
```

## delete dir
```go
err := os.Remove("dir1")

err := os.MkdirAll("dir1/dir2/dir3", 0777)
err := os.RemoveAll("dir1")
```

## walk dir
```go
// path/filepath
package main

import (
    "fmt"
    "os"
    "path/filepath"
)

func scan(path string, f os.FileInfo, err error) error {
    fmt.Printf("Scan: %s\n",path)
    return nil
}

func main(){
    // ...
    err := filepath.Walk("./dir",scan)
}
```

## Create file
```go
fp, err := os.Create("./demo.txt")

defer fp.Close()
```

## Open & Close
```go
file,err := os.Open("open.txt")
file.Close()

fp,err := os.OpenFile("open.txt",os.O_CREATE|os.O_APPEND,0666)
defer fp.Close()
```

## Read & Write
### Read
```go
package main

import (
    "bufio",
    "fmt"
    "io"
    "os"
)

func main(){
    file, _ := os.Open("read.txt")
    defer file.Close()

    //bufio.NewReader(rd io.Reader) *Reader
    reader := bufio.NewReader(file)


    for {
        line,err := reader.ReadString("\n")
        if err == io.EOF {
            break
        }
        fmt.Print(line)
    }

    // 直接讀：
    // import io/ioutil
    // content,err := ioutil.ReadFile(filepath) 
    // fmt.Printf("%v\n",content)
    // fmt.Printf("%v\n",string(content))
}
```

### Write
```go
package main

import (
    "os"
)

func main(){
    file, _ := os.OpenFile("write.txt",os.O_CREATE|os.O_ROWR,0666)
    defer file.Close()

    content := []byte("Hello World!")
    file.Write(content)
    // file.WriteString("HelloWorld")
}
```

## Copy
```go
func Copy(dst Writer, src Reader) (written int64,err err)
```

## XML & JSON
- XML
```go
package main

import (
    "encoding/xml"
    "fmt"
    "io/ioutil"
    "os"
)

type EmailConfig struct (
    XMLName xml.Name `xml:"config"`
)

func main() {
    // ...
    v := EmailConfig{}
    err = xml.Unmarshal(data, &v)
    // ...

    // 生成
    // output, err := xml.MarshalIndent(v," "," ")
}
```
- JSON
```go
package main

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "os"
)

type EmailConfig struct (
    XMLName xml.Name `xml:"config"`
)

func main() {
    // ...
    v := EmailConfig{}

    err = json.Unmarshal(data, &v)
    // ...

    // 生成
    // output, err := json.Marshal(v," "," ")
}
```

## Regex
- Package `regexp`


## Log
- func Print
- func Panic
- func Fatal

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
- https://blog.csdn.net/hg_zhh/article/details/122511079

## cors

## 限制API請求的頻率

## JWT Token

## Validator
- `github.com/go-playground/validator`

Ref: https://www.readfog.com/a/1637366423504392192


# Beego
## Installation
```bash
$ go get github.com/beego/bee
$ bee new project
```


# Tip

## isset
Ref: https://asanchez.dev/blog/from-php-to-go-isset/

## 自动取引用和自动解引用
- https://juejin.cn/post/7167566924929318919

## iota
```golang
package main

import "fmt"

func main() {
	const (
		_ = iota
		TypeA
		TypeB
	)

	fmt.Println(TypeA)
	fmt.Println(TypeB)
}
```

Ref: https://www.readfog.com/a/1657316285844918272

## Option
https://pjchender.dev/golang/note-design-pattern/

# GRPC

Ref: https://ithelp.ithome.com.tw/articles/10255470

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