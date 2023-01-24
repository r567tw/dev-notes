---
sidebar_position: 3
---

# Data Structure
- bool
- integer
- string
- 複合：array , slice, map , struct

## 指標
變數儲存一個記憶體位址的變數類型, 可以使用`&`
```
var b int = 66
var p *int = &b
```

## array
```go
var array[10] int
var numbers = [...]int{1,2,3}
```

## struct
```go
type 類型名稱 struct {
    欄位1 類型1
    欄位2 類型2
}
```

## map
```go
var name map[key_type]value_type
map := make(map[string]int,100)
```

## function
```go
func function_name(parameter parameter_type)[return return_type]{

}

func min(arr []int)(m int){
    m = arr[0]
    for _,v := range arr {
        if v < m {
            m = v
        }
    }

    return m
}

```

## 匿名函數
```go
f := func(a int){
    fmt.Println(a)
}(x)

f(5)
```

## defer
延遲敘述