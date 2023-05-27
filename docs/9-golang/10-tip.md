---
sidebar_position: 10
---

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