---
title: "Go 學習筆記(5): 非同步"
date: "2021-05-15 15:44:00+00:00"
tags:
  - golang
---

## 概述

在 Go 裡面，並發被叫做「Goroutine」。根據《深入淺出 Go》的定義：提供並發，暫停一個工作以啟動另一個工作。而且在有些情境下他們允許並行，同時執行不同的工作。如同我之前寫道，如果要做很大量的東西應該要用非同步的方式。

## 1. Goroutine：輕量級並發

Goroutine 是 Go 的輕量級執行單位，比作業系統線程更輕量、更廉價。

### 基本使用

使用 `go` 關鍵字啟動一個 Goroutine：

```golang
func main(){
    go a()
    go b()
}
```

### 重要注意事項

**主 Goroutine 結束，所有其他 Goroutine 也會結束。** 這意味著如果主函數執行完畢，即使子 Goroutine 還未完成，程式也會立即終止。

```golang
func worker(id int) {
    fmt.Printf("Worker %d started\n", id)
    time.Sleep(2 * time.Second)
    fmt.Printf("Worker %d finished\n", id)
}

func main(){
    go worker(1)
    go worker(2)
    // 主函數立即結束，worker 不會執行
}
```

## 2. Channel：通訊管道 (CSP 模型)

Channel 是 Go 中 Goroutine 之間安全通訊的方式，遵循 CSP (Communicating Sequential Processes) 模型。

> 「不要共享記憶體來通信，而是通過通信來共享記憶體」

### 宣告和初始化

```golang
var myChannel chan float64           // 宣告
myChannel := make(chan float64)      // 創建無緩衝 Channel
myChannel := make(chan string, 3)    // 創建有緩衝 Channel (容量為 3)
```

### 基本操作

- **傳送**： `ch <- data` (發送方阻塞直到有接收方)
- **接收**： `data := <-ch` (接收方阻塞直到有資料)

```golang
func a(myChannel chan string){
    myChannel <- "a"
}

func main(){
   myChannel := make(chan string)
   go a(myChannel)
   fmt.Println(<-myChannel)  // 輸出：a
}
```

## 3. Channel 類型

### 無緩衝 Channel (Unbuffered)

```golang
ch := make(chan int)
```

特性：

- 傳送和接收必須同時準備好，形成同步點
- 用於同步操作，確保兩個 Goroutine 的協調
- 傳送操作會阻塞，直到有 Goroutine 準備接收

```golang
func main(){
    ch := make(chan string)

    go func(){
        ch <- "hello"  // 阻塞，直到有人接收
    }()

    msg := <-ch        // 接收，解除發送方的阻塞
    fmt.Println(msg)   // 輸出：hello
}
```

### 有緩衝 Channel (Buffered)

```golang
ch := make(chan int, 3)  // 容量為 3
```

特性：

- 緩衝區未滿時傳送不阻塞，緩衝區非空時接收不阻塞
- 用於解耦/非同步操作，生產者和消費者可以以不同速度運作
- 可以緩存多個值

```golang
func a(myChannel chan string){
    myChannel <- "a"
    myChannel <- "b"
    myChannel <- "c"
}

func main(){
   myChannel := make(chan string, 3)   // 容量為 3
   go a(myChannel)

   fmt.Println(<-myChannel)  // a
   fmt.Println(<-myChannel)  // b
   fmt.Println(<-myChannel)  // c
}
```

## 4. 關閉 Channel

### 基本操作

使用 `close(ch)` 關閉 Channel：

```golang
close(ch)
```

重要規則：

- 只有發送方才能關閉 Channel
- 關閉後，可繼續接收剩餘資料，但**不能再傳送**（會 panic）
- 向已關閉的 Channel 發送會導致 panic

### 檢查 Channel 是否已關閉

使用 `v, ok := <-ch` 檢查：

- 當 `ok` 為 `true` 時，成功接收到資料
- 當 `ok` 為 `false` 時，Channel 已關閉且無資料

```golang
func main(){
    ch := make(chan string, 2)
    ch <- "a"
    ch <- "b"
    close(ch)

    v, ok := <-ch
    fmt.Printf("v=%s, ok=%v\n", v, ok)  // v=a, ok=true

    v, ok = <-ch
    fmt.Printf("v=%s, ok=%v\n", v, ok)  // v=b, ok=true

    v, ok = <-ch
    fmt.Printf("v=%s, ok=%v\n", v, ok)  // v=, ok=false (Channel 已關閉)
}
```

### 使用 for...range 接收

`for...range` 會自動檢測 Channel 關閉：

```golang
func main(){
    ch := make(chan string, 3)
    ch <- "a"
    ch <- "b"
    ch <- "c"
    close(ch)

    for msg := range ch {
        fmt.Println(msg)  // a, b, c
    }
    // 當 Channel 關閉時，for 循環自動退出
}
```

## 5. 同步機制：sync.WaitGroup

當需要等待多個 Goroutine 完成時，使用 `sync.WaitGroup`：

```golang
import "sync"

func main(){
    var wg sync.WaitGroup

    wg.Add(2)  // 期望 2 個 Goroutine

    go func(){
        defer wg.Done()  // Goroutine 完成時調用
        fmt.Println("Worker 1 finished")
    }()

    go func(){
        defer wg.Done()
        fmt.Println("Worker 2 finished")
    }()

    wg.Wait()  // 等待所有 Goroutine 完成
    fmt.Println("All workers done")
}
```

### 常見模式：工作池

```golang
func worker(id int, jobs <-chan int, results chan<- string, wg *sync.WaitGroup) {
    defer wg.Done()
    for job := range jobs {
        fmt.Printf("Worker %d processing job %d\n", id, job)
        results <- fmt.Sprintf("Result of job %d", job)
    }
}

func main(){
    jobs := make(chan int, 5)
    results := make(chan string, 5)
    var wg sync.WaitGroup

    // 啟動 3 個 worker
    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go worker(i, jobs, results, &wg)
    }

    // 發送任務
    for j := 1; j <= 5; j++ {
        jobs <- j
    }
    close(jobs)

    wg.Wait()  // 等待所有 worker 完成

    // 接收結果
    for i := 0; i < 5; i++ {
        fmt.Println(<-results)
    }
}
```

## 6. select 語句

`select` 用於多路複用 Channel 操作，類似於 switch，但專門處理 Channel：

```golang
select {
case v := <-ch1:
    // 當從 ch1 接收到資料時執行
    fmt.Println("Received from ch1:", v)
case ch2 <- data:
    // 當成功向 ch2 發送資料時執行
    fmt.Println("Sent to ch2")
case <-time.After(2 * time.Second):
    // 2 秒超時
    fmt.Println("Timeout")
default:
    // 沒有 Channel 準備好時執行
    fmt.Println("No channel ready")
}
```

### 實例：超時控制

```golang
func fetchData(url string) (string, error) {
    ch := make(chan string)

    go func(){
        // 模擬網路請求
        time.Sleep(3 * time.Second)
        ch <- "data from " + url
    }()

    select {
    case result := <-ch:
        return result, nil
    case <-time.After(2 * time.Second):
        return "", fmt.Errorf("timeout fetching %s", url)
    }
}

func main(){
    result, err := fetchData("http://example.com")
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Result:", result)
    }
}
```

### 實例：多 Channel 監聽

```golang
func main(){
    ch1 := make(chan string)
    ch2 := make(chan string)

    go func(){
        time.Sleep(1 * time.Second)
        ch1 <- "from ch1"
    }()

    go func(){
        time.Sleep(2 * time.Second)
        ch2 <- "from ch2"
    }()

    for i := 0; i < 2; i++ {
        select {
        case msg := <-ch1:
            fmt.Println(msg)
        case msg := <-ch2:
            fmt.Println(msg)
        }
    }
}
```

## 總結

| 概念               | 用途                    |
| ------------------ | ----------------------- |
| **Goroutine**      | 輕量級並發執行單位      |
| **Channel**        | Goroutine 間的安全通訊  |
| **無緩衝 Channel** | 同步操作，用於協調      |
| **有緩衝 Channel** | 異步操作，用於解耦      |
| **sync.WaitGroup** | 等待多個 Goroutine 完成 |
| **select**         | 多路複用 Channel 操作   |

> 小君曰：對於非同步的這一塊，確實需要在實踐中不斷學習和應用......
