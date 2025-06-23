---
title: 'Go學習筆記(2): make a game'
date: '2021-04-17 05:17:00+00:00'
tags:
- golang
---
來到學習Go 的第二篇文章了，來學習一些控制流以及一些基礎東西吧！
# 條件式
在 Golang 寫條件式很簡單，就是寫個if 加個大括號就好
```golang
// 這裡請記得 "{" 和 if 要同一行，之前自由慣了常常被這件事情雷到！
if true {
    // ......
} else if false {
    // .....
}

// 或者你可以使用 if  更短的初始化陳述句
if count := 5; count>4 {
   fmt.Println("count is ",count)
}
```
另外有一個比較特別的是，if 區塊裡面的區域變數(使用到`:=`)是不能使用在if 外面的喔～

請讓我用以下程式碼來做進一步陳述
詳細可以去看 這裏：https://github.com/r567tw/go-practice/blob/master/HelloWorld/if.go

```golang
package main

import (
  "fmt"
)

// var x = 999 // go 裡面也可以宣告一個超越main範圍以外的超全域變數, 但不建議這麼做

func main() {
	fmt.Println("Hello World")
	x := 10

	if x > 0 {
		y := 10
		// x := 100 // 這個等同在裡面宣告新的位置x , 所以外面的x仍然是10
		x = 100 // 這個會污染外面宣告的x , 所以外面的x 會等於 100
		fmt.Printf("x = %d\n", x) // x =100
		fmt.Printf("%d in if statement\n", y) //10 in if statement
	}

	// fmt.Sprintf("%d out of if statement", y) // error
	fmt.Printf("x = %d out of if statement\n", x) // x = 100 out of if statement
}
```
值得再拿出來說嘴的是，`x`變數在外面的宣告，如果在`if 陳述句範圍`裡面使用單純的`=` ，在`main` 範圍內的`x` 是會被更動的，可是如果使用`:=` , main 裡面的x 不會被影響。

```golang
if number,err := strconv.ParseFloat("3.14",64); err != nil{
    log.Fatal(err)
}

fmt.Println(number) // <= 這裡會出現錯誤，因為number 屬於if 區塊裡面的範圍，go 語言的if 裡面變數不得共享
```
# Switch 陳述句
```golang
switch rand.Intn(3)+1 {
    case 1 : ...
    case 2 : ...
    case 3 : ...
    default : ...
}
```
# 迴圈

話不多說, show you the code

```golang
for x:= 0; x<=6; x++ {
    ......
}

// 或者只是條件式得處理
x:=0
for x<=6 {
    x++
}
// 迴圈裡面也可以使用 continue 和 break ...
```
和 if 一樣，使用到`:=` 所宣告的變數是沒辦法使用在for 外面的。

# function
```golang
package main

import (
	"fmt"
)

type bigger = func(int) bool // function 也可以作為型態的一種！

func main() {
	handleFn()

	anonymous := func() {
		fmt.Println("anonymous function")
	} // go 也支援匿名funciton
	anonymous()

	origin := []int{1, 2, 3, 4, 5}
	change := filter(origin, func(el int) bool {
		return el > 3
	})
	fmt.Println(change)
}

func handleFn() {
	fmt.Println("test function")
}

func filter(data []int, big bigger) []int {
	filtered := []int{}
	for _, element := range data {
		if big(element) {
			filtered = append(filtered, element)
		}
	}
	return filtered
}
```

# Make A Game !

接下來，讓我們試著應用以上這些東西，來寫個簡單的猜數字遊戲吧！

```golang
package main

import (
	"bufio"
	"fmt"
	"os"
	"math/rand"
	"strconv"
	"strings"
	"time"
)

func main() {
	r := rand.New(rand.NewSource(time.Now().UnixNano())) // 這一行帶入現在的時間,好讓每一次遊戲隨機產生的數字都不一樣, 原來亂數的原理其實是有一個小技巧和規則的
	result := r.Intn(100) // 其實這裡可以隨機產生數字
	
	loop := true // 設定遊戲開始的條件
	for (loop) {
		fmt.Printf("Please Enter a number(1-100): ")
		reader := bufio.NewReader(os.Stdin) // 其實這裏就是類似Python 的input 而已
		input, _ := reader.ReadString('\n')
		number,_ := strconv.Atoi(strings.TrimSpace(input)) // 一定要用trimspace, 否則 strconv轉出來的數字不一定取得出來
		switch {
			case (result < number):
				fmt.Printf("smaller than %d\n",number)
			case (result > number):
				fmt.Printf("bigger than %d\n",number)
			case (result == number):
				fmt.Println("Bingo")
				fmt.Printf("result is %d\n",result)
				loop = false
				break
			default:
				loop = true
		}
	}

	fmt.Println("Game is over!")
}
```

有興趣看程式碼的可以來這裡：https://github.com/r567tw/go-practice/blob/master/makeGame/main.go

> 小君曰：猜數字遊戲好像可以作為每個程式語言的入門磚，相對於前端的Todo list 呵呵