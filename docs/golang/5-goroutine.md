---
title: 'Go 學習筆記(5): 非同步'
date: '2021-05-15 15:44:00+00:00'
tags:
- golang
---
學習Go 也到了一段時間了，來學習這個部分：多執行緒

如同我之前寫道其實如果要做很大量的東西應該要用非同步的方式... 在Go裡面，並發被叫做「Goroutine」，在深入淺出Go 這本書的定義：提供並發，暫停一個工作以啟動另一個工作。而且在有些情境下他們允許並行，同時執行不同的工作

如果你想要用goroutine 其實就在function 前面加一個go 的關鍵字
```golang
func main(){
    go a()
    go b()
}
```

然而，由於我們使用到這個非同步的概念，所以我們無法期待method 可以馬上回傳結果，那是Go 去控制工作的進行與安排，所以Go裡面便多了一個概念：Channels，其實就加一個chan 這個詞就好

```golang
var myChannel chan float64
myChannel = make(chan float64)
```
這時候我們上面得程式可以改寫成這樣
```golang
func a(myChannel chan string){
    myChannel <- "a"
}

func main(){
   myChannel := make(chan string) 
   go a(myChannel)
   fmt.Println(<-myChannel)
}
```
但要注意的是，如果我們make 沒有加第二個參數，那麼我們的Channel 就是個無緩衝的channel ，有就意味著我們必須要每次將資料塞進channel 的時候，每一次都要拉出來，否則會造成channel 被鎖定。

那麼，就讓底下示範一下有緩衝的channel 吧
```golang
func a(myChannel chan string){
    myChannel <- "a"
    myChannel <- "b"
}

func main(){
   myChannel := make(chan string,3) 
   go a(myChannel)
   fmt.Println(<-myChannel)
}
```

> 小君曰：對於非同步的這一塊，我需要學習的還很多.....