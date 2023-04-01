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
    resp,err := http.Get("http://123.com")
    resp,err := http.Post("http://123.com",Header,Body)

    closer := resp.Body
    bytes,err := ioutil.ReadAll(closer)
    fmt.Println(string(bytes))
}
```

## html/template


