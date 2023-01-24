---
sidebar_position: 2
---

# Variable

## 宣告
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

## 運算子

### if-else
```go
if b > 10 {
    return 1
} else if b > 15 {
    return 2
} else {
    return 3
}
```

### for
```go
p := 1
for i :=1; i<5; i++ {
    p *= i
}
// continue
// break
```

### for-range
```go
for key,val := range []int{1,2,3}{
    fmt.Printf("Key:%d value:%d",key,val)
}
```

### switch-case
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

