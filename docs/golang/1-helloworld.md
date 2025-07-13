---
title: 'Go學習筆記(1): HelloWorld'
date: '2021-04-10 10:53:00+00:00'
tags:
- golang
---

在之前寫到[今年的計劃][1]當中，我就說到我想要學 Go 語言。同時我自己也買了一本有關於 Go 的書：深入淺出 Go , 希望藉此督促自己有個比較完整性的學習......

以下是我讀這本書以及學習的心得與筆記，可能有點無聊，高手請跳過、不過如果有看到錯的也請不吝指正！

首先，你要先去安裝好 Go.......

# 程式組成

Go 語言的組成通常有三個部分：

1. 套件子句(`package main`)
2. import 相關陳述句 (`import "fmt"`)
3. 主要的程式碼 (`func main(){......}`)

# Hello World 程式！

讓我們先建立一個名為 hello.go 的檔案... 然後在裡面寫這些東西...

```golang
package main
import "fmt"

func main(){
	fmt.Println("Hello World")
	// 這裡請務必使用 " 否則很容易跳出 invalid character literal (more than one character) 的問題
}
```

接下來讓我們對這個檔案做 go run hello.go 就可以看到 Hello World 的字眼啦！

# Go 的資料型態類別

1. 字串：用雙引號所框起來的任意數量字元
2. 符文(runes) : 用單引號所匡著的單一字元, ex. 'A' , 'B'
3. boolean (bool)
4. numbers
   1. float32 , float64
   2. int8 ,int16 ,int32 ,int64
   3. uint
   4. uint8 , uint16 ,uint32 ,uint64
5. byte (檔案專用)

**tips: 可以透過 reflect 這個套件裡面的 TypeOf 方法得知資料的型別**

```golang
package main

import (
  "fmt"
  "reflect"
)

func main() {
	fmt.Println(reflect.TypeOf("Hello World")) //string
	fmt.Println(reflect.TypeOf(true)) // bool
}
```

# 宣告變數

- `var q int`
- `var q int = 4`
- `p,q = 4,5` (居然有像 Python 一樣的多重賦值！)
- `p :=4` (快速寫法, 連型別都不用！)

# 命名規則

1. 開頭必須是字母
2. **如果開頭字母是大寫，表示他是可以被匯出的**

# 陣列

在 Go 裡面要宣告陣列，請用以下的 code 得形式

```golang
// 第一種
var todos [2]string
todos[0]= "learning go !"
todos[1]= "use go to write an app"
// 第二種
var grades [3]int = [3]int{90,98,93}

// 第三種
heights := [3]int{90,98,93}

// go 裡面的foreach , 陣列/map資料型態都適用！
for index,note := range notes{
    fmt.Println(index,note)
}
```

# 切片

這是我在深入淺出 Go 這本書裡面的某一個章節，他裡面寫道 Go 宣告切片就像是宣告陣列變數, 只是不需要指定大小！for example:

```golang
var mySlice []int
mySlice = make([]int,7) // 設定七個數字的切片
fmt.Printf("%v",mySlice) //[0 0 0 0 0 0 0]
// 增加
newSlice := append(mySlice, 5,9) // 回傳新的, 增加完的切片
fmt.Printf("%v",newSlice) //[0 0 0 0 0 0 0 5 9]
```

# 錯誤處理

說真的，最近在學著 Go 都覺得他的語言調性和其他語言差很多，**像是 if/for 的區域範圍變數無法用在 if/for 後面(但之前的宣告可以使用)、陣列的宣告是很獨樹一幟的**，**他也不像傳統程式語言那種 try...catch 的敘述，而是你要分成你自己去處理或者直接 error 中斷給你看這樣**！

像是這樣, 你必須用參數去接下可能會 error 的地方，然後用 if 去判斷, 控制壞掉之後的流程這樣。詳細你可以參考此連結：

- https://michaelchen.tech/golang-programming/error-handling/

或者你也可以使用 `panic` 這個關鍵字 或 用 `recover` 這個關鍵字讓他從 panic 的狀態中恢復, 另外也筆記一下 `defer` 可以添加到任何地方，用來暫緩該調用直到目前程式結束

詳細可以參考此網址：

https://openhome.cc/Gossip/Go/DeferPanicRecover.html

```golang
file, err := os.Open("file.txt")
 if err != nil {
     ....
 }
defer file.Close()
```

# Maps

有點像是 Python 裡的 dictionary , 或者 php 的 association array......

```golang
var myMap map[string]float64 // 宣告出以字串型態為index, float64型態的值
myMap = make(map[string]float64)

// 又或者可以做更簡單的宣告
myMap := make(map[string]float64)


// 如何把東西放進去...
myMap["Jimmy"] = 12.4
myMap["Bob"] = 15.3

// 如果已經知道要建立怎麼樣的map
myMap := map[string]float64{"Jimmy":12.4 , "Bob":15.3}

// 另外如果取得一個沒有被指派的index 會根據型態而回傳不同的值
// 數字：0
// 字串：""
// * 如果沒有make 它則會是一個nil 的 map, 而nil 的 map 無法被指派值
// 可以視情況給予第二個參數，好讓map 可以判斷是否有這個index
var value string
var exist bool
value , exist = myMap["Andy"] // return 0, false

// 移除
myMap["Jim"] = 999
delete(myMap,"Jim")
```

# 結構 struct

```golang
var myStruct struct {
    name string
    grade int
}
myStruct.name = "Jimmy"
myStruct.grade = 10

// 自訂型別, 前面使用type 這個關鍵字
type myStruct struct {
    name string
    grade int
}

// 自訂型別也能加入method
func (m myStruct) hello() string {
    return "hello"
}
// 自訂型別也可以加入getter /setter 封裝裡面的資料結構
func (m *myStruct) SetName(name string){
   m.name = name
}

func (m *myStruct) Name() string {
   return m.name
}


// 透過指標存取結構
func applyDiscount(s *subscriber){
    s.rate = 4.99
}

func main() {
    var s subscriber
    applyDiscount(&s)
}
```

結構裡面可以有另外一個結構，而 Go 另外還支援了匿名結構欄位，不用特別設定名稱也可以直接帶進去結構裡

```golang
type Employee struct {
    Name string
    Salary float64
    Address
}

type Address struct {
     ......
}
```

# 介面 interface

在 Go 裡面也有介面的概念，定義某些特定得值與某些特定的行為。

```golang
type myInterface interface {
   methodOne()
   methodTwo(float64)
   method() string
}
```

# 測試

在 Go 裡面，我們可以使用 testing 這個套件，首先是要讓我們在同樣的套件底下建立一個\_test 結尾的 Go 檔案，話不多說，show you some code !

```golang
func TestFunction(t *testing.T){
    ......(略)
    if ...(略)
    t.Errorf("......")
}
```

# function programming

在 Go 裡面， function 本身也能夠被視為變數, 型別處理，像是

```golang
// 此範例來自深入淺出Go p.439
func callFunction(passedFunction func()){
  passedFunction()
}

func callTwice(passedFunction func()){
  passedFunction()
  passedFunction()
}

func callWithArguments(passedFunction func(string, bool)){
  passedFunction("this sentence is",false)
}

func printReturnValue(passedFunction func() string){
  fmt.Println(passedfunction())
}

func functionA(){
  fmt.Println("function called")
}

func functionB() string{
    fmt.Println("function called")
    return "Returning from function"
}

func functionC(a string , b bool){
    fmt.Println("function called")
    fmt.Println(a,b)
}

func sayHi(){
  fmt.Println("Hi")
}

func main(){
    var myFunction = func()
    myFunction = sayHi
    myFunction()

    callFunction(functionA)
    callTwice(functionA)
    callWithArguments(functionC)
    printReturnValue(functionB)
}
```

# 相關指令

- `go build` ：編譯成二進位
- `go run` ：編譯及執行
- `go fmt` ：格式化原始碼
- `go version` ：go 的版本
- `go test` : 測試 go
- `go doc` : 說明文件
<!-- > 小君曰：來學Go 啦， go ! -->

[1]: https://tech.r567tw.tw/%e4%bb%8a%e5%b9%b4%e7%9a%84%e5%9b%9e%e9%a1%a7%e8%88%87%e6%9c%aa%e4%be%86%e8%a6%8f%e5%8a%83-2020/
