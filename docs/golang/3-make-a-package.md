---
title: 'Go 學習筆記(3): 做套件給別人用'
date: '2021-05-01 14:34:00+00:00'
tags:
- golang
---
來到學習Go 的第三篇文章，在深入淺出Go 裡面有介紹套件的開發方式，要把他放到GOPath 裡面... 不過，那好像是很久以前Go的版本了... 現在，出現了go.mod 和 go.sum , 似乎就沒有那麼麻煩...

這裡簡介簡單兩個指令：  
1. `go mod init {package name}` 這個指令會建立go.mod 的檔案  
2. `go mod tidy` 這個指令會去找你目前寫的go 檔案所引用的package, 去修改go.mod

go.mod 有點像是composer.json 和 package.json 記錄著目前所引用的package  
而 go.sum 是個天書，像composer.lock 和 package.lock 去鎖住目前的版本...

然後開一個Go 的Package 有點簡單，但寫與維護應該很複雜，而且我也有點還是搞不太清楚還在學習中.... 網路上和書中的資源實在有點讓我混亂...... 可能等我再稍微釐清一下我再回來更新這一篇文章.... 請大家勿參考此文章，但如果有指教請大家多多教導我～

總之，我就在github 上面開了一個簡易的[greeting repo](https://github.com/r567tw/greeting)...

只要你記得，可以匯出的參數與方法是要大寫開頭，就可以輕輕鬆鬆自己寫一個package 啦

然後在我go run/go install / go build 的時候就能跑了... 真的好妙....

另外啊，可以用註解當成文件，然後人家跑`go doc {套件名} /go doc -all {套件名}`就可以看到怎麼使用套件，真的蠻方便的，但有一些注意事項
1. package 的註解必須要在package這個關鍵字以後
2. function / 變數等等需要在註解前面增加與他同名的名稱
```golang
// Package greeting echo Hello or echo Hi message.
package greeting

// Ha return "Ha"
const Ha = "Ha"

// Hello return Hello message.
/* test */
func Hello() string {
	return "Hello"
}

// Hi return Hi message.
func Hi() string {
	return "Hi"
}
```
> 小君曰：天哪... 這篇完全寫得好差