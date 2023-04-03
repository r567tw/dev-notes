---
sidebar_position: 6
---

# File
- os
- path

## mkdir
```go
err := os.Mkdir("test", 0777)
err := os.MkdirAll("dir1/dir2/dir3", 0777)
```

## rename dir
```go
err := os.Rename(oldName,newName)
```

## delete dir
```go
err := os.Remove("dir1")

err := os.MkdirAll("dir1/dir2/dir3", 0777)
err := os.RemoveAll("dir1")
```

## walk dir
```go
// path/filepath
package main

import (
    "fmt"
    "os"
    "path/filepath"
)

func scan(path string, f os.FileInfo, err error) error {
    fmt.Printf("Scan: %s\n",path)
    return nil
}

func main(){
    // ...
    err := filepath.Walk("./dir",scan)
}
```

## Create file
```go
fp, err := os.Create("./demo.txt")

defer fp.Close()
```

## Open & Close
```go
file,err := os.Open("open.txt")
file.Close()

fp,err := os.OpenFile("open.txt",os.O_CREATE|os.O_APPEND,0666)
defer fp.Close()
```

## Read & Write
### Read
```go
package main

import (
    "bufio",
    "fmt"
    "io"
    "os"
)

func main(){
    file, _ := os.Open("read.txt")
    defer file.Close()

    //bufio.NewReader(rd io.Reader) *Reader
    reader := bufio.NewReader(file)


    for {
        line,err := reader.ReadString("\n")
        if err == io.EOF {
            break
        }
        fmt.Print(line)
    }

    // 直接讀：
    // import io/ioutil
    // content,err := ioutil.ReadFile(filepath) 
    // fmt.Printf("%v\n",content)
    // fmt.Printf("%v\n",string(content))
}
```

### Write
```go
package main

import (
    "os"
)

func main(){
    file, _ := os.OpenFile("write.txt",os.O_CREATE|os.O_ROWR,0666)
    defer file.Close()

    content := []byte("Hello World!")
    file.Write(content)
    // file.WriteString("HelloWorld")
}
```

## Copy
```go
func Copy(dst Writer, src Reader) (written int64,err err)
```

## XML & JSON
- XML
```go
package main

import (
    "encoding/xml"
    "fmt"
    "io/ioutil"
    "os"
)

type EmailConfig struct (
    XMLName xml.Name `xml:"config"`
)

func main() {
    // ...
    v := EmailConfig{}
    err = xml.Unmarshal(data, &v)
    // ...

    // 生成
    // output, err := xml.MarshalIndent(v," "," ")
}
```
- JSON
```go
package main

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "os"
)

type EmailConfig struct (
    XMLName xml.Name `xml:"config"`
)

func main() {
    // ...
    v := EmailConfig{}

    err = json.Unmarshal(data, &v)
    // ...

    // 生成
    // output, err := json.Marshal(v," "," ")
}
```

## Regex
- Package `regexp`


## Log
- func Print
- func Panic
- func Fatal
