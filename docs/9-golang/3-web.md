---
sidebar_position: 3
---

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