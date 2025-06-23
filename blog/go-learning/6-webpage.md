---
title: 'Go 學習筆記(6): 寫一個網頁吧！'
date: '2021-06-05 03:35:00+00:00'
tags:
- golang
---

我自己是 PHP 後端工程師，常常在寫網頁、常碰 Javascript , html , css 等等，所以，在學這個 Go 的過程當中，也來學習用 go 寫一個網頁吧！

Go 與網頁常常有用到的一個套件就叫做 net/http , 他同時也可以做網頁的爬蟲，等等讓我娓娓道來～

# 網頁版 HelloWorld !

```golang
package main
import (
  "log"
  "net/http"
)

func viewHandler(writer http.ResponseWriter, request *http.Request){
  message := []byte("Hello World")
  _,err := writer.Write(message)
  if err != nil {
    log.Fatal(err)
  }
}

func main(){
  http.HandleFunc("/hello",viewHandler)
  err := http.ListenAndServe("localhost:8080",nil)
  log.Fatal(err)
}
```

# Template

如果網頁只是簡單的 HelloWorld 怎麼行？在 Go 裡面還有另外一個套件：html/template , 而使用 Execute 的第二個參數可以將資料塞入樣板中。而樣板中很重要的是可以使用`{{.}}` 等符號

```golang
package main
import (
  "log"
  "net/http"
  "html/template"
)

type TemplateData struct {
	Name string
}

func viewHandler(writer http.ResponseWriter, request *http.Request){
  html, err := template.ParseFiles("view.html")

  if err != nil {
    log.Fatal(err)
  }
  data := TemplateData{Name:"Jimmy"}
  err = html.Execute(writer,data)

 if err != nil {
    log.Fatal(err)
  }
}

func main(){
  http.HandleFunc("/",viewHandler)
  err := http.ListenAndServe("localhost:8080",nil)
  log.Fatal(err)
}
```

上面我們有一段`template.ParseFiles("view.html")` ，而 view.html 就像以下這樣寫

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>Hello World</h1>
    #Name: {{.Name}}
  </body>
</html>
```

接下來，讓這裡筆記一下樣板中常見的樣式

1. `{{.Name}}` : 塞入名稱為 Name
2. `{{ if .Paid }} ... {{ end }}`: if paid 為 true , 才能執行 if 的區塊
3. `{{ range .Charges }} ... {{ . }}... {{ end}}`: for 迴圈的區塊，根據 Charges 裡面的項目依序列出資料

# 最後，寫個 Todolist 吧！

完整程式碼請參考我的 github : https://github.com/r567tw/golang-simple-todolist
首先是主程式：

```golang
package main

import (
	"bufio"
	"html/template"
	"log"
	"net/http"
	"os"
	"fmt"
)

type TodoList struct {
	Todos []string
}

func getTodos(fileName string) []string {
	var todos []string
	file, err := os.Open(fileName)
	if os.IsNotExist(err) {
		return nil
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		todos = append(todos, scanner.Text())
	}
	return todos
}

func viewHandler(writer http.ResponseWriter, request *http.Request) {
	html, err := template.ParseFiles("view.html")
	todos := getTodos("todolist.txt")
	if err != nil {
		log.Fatal(err)
	}

	todolist := TodoList{
		Todos:  todos,
	}

	err = html.Execute(writer, todolist)

	if err != nil {
		log.Fatal(err)
	}
}

func todoCreateHandler(writer http.ResponseWriter, request *http.Request) {
	task := request.FormValue("task")

	file, _ := os.OpenFile("todolist.txt", os.O_WRONLY | os.O_APPEND | os.O_CREATE , os.FileMode(0600))
	fmt.Fprintln(file, task)
	defer file.Close()
	http.Redirect(writer, request, "/", http.StatusFound)
}

func main() {

	http.HandleFunc("/", viewHandler)
	http.HandleFunc("/todo/create", todoCreateHandler)

	err := http.ListenAndServe("localhost:8080", nil)
	log.Fatal(err)
}
```

我將 Todo 存在檔案 todolist.txt 當中

之後就是簡單地建立一下我的呈現畫面，因為我將創建的表單也放進同一頁，所以我就只要單一個檔案：`view.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>Golang Simple Todo list</h1>

    <form action="/todo/create" method="post">
      <input type="text" name="task" />
      <button>Create Todo</button>
    </form>
    <ul>
      {{range .Todos}}
      <li>{{.}}</li>
      {{end}}
    </ul>
  </body>
</html>
```

> 小君曰：我要學習的還很多咧
