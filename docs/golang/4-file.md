---
title: Go 學習筆記(4) – 檔案
date: '2021-05-08 00:28:00+00:00'
tags:
- golang
---
寫程式難免都需要與檔案做互動, 甚者還需要與資料庫溝通。這篇文章將紀錄Go 怎麼與檔案互動的部分......

首先是讀取檔案！

```golang
package main

import (
    "bufio"
    "os"
    "fmt"
)

func main(){
    var numbers []string
    file ,_ := os.Open("input.txt") // 使用open 開啟檔案
    scanner := bufio.NewScanner(file) // 必須建立Scanner 這裡讓我有點想起C
    for scanner.Scan(){ // 這裡的意思是逐行讀取
      content := scanner.Text()
	  numbers = append(numbers,content)
	  if scanner.Err() != nil {
	     fmt.Println("scan error")
	  }
    }
	defer file.Close() //defer 會確保函式一定被調用,即便程式提早結束
	fmt.Println(numbers)
}
```
之後，就來示範怎麼寫入檔案吧？
```golang
package main

import (
	"os"
	"fmt"
)

func main() {
	file, _ := os.Create("output.txt")
	// file.WriteString("Hello Write Content")
	_, err := file.Write([]byte("Here is a string...."))
	if (err != nil){
		fmt.Println(err)
		panic("error")
	}
	defer file.Close()
}
```
然後附加檔案的話只要將上面建檔案的改一下即可
```golang
package main

import (
	"os"
	"fmt"
)

func main() {
	// 這裡改成openfile 而且要加後面的flag 和數字參數即可
	file, _ := os.OpenFile("output.txt",os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	// file.WriteString("Hello Write Content")
	_, err := file.Write([]byte("Here is a string...."))
	if (err != nil){
		fmt.Println(err)
		panic("error")
	}
	defer file.Close()
}
```
> 小君曰：這次耍廢點.....