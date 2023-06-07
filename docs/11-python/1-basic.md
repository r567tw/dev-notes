---
sidebar_position: 1
---
# Basic

## 認識python
- 直譯式語言、物件導向、具有垃圾回收

- 註解符號：`#`,`'''`
- Python 彩蛋：`import this`, `import antigravity`
- 等號的多重指定
```
x , y ,z = 10,20,30
```

## 基本輸入與輸出
```
input()
eval() #處理數學運算
>>> eval("1+3")
4

//help(print)
print(value,sep="",end="\n",file=sys.stdout,flush=False)
print("%s的物理成績是%d"%(name,grade))
print("{}的物理成績是{}".format(name,grade))
print()

//file
open()

dir(__builtins__)

```

## if 敘述
```
and / or / nor
if (...):
    ...
elif (...)
    ...
else:
    ...
```

## 6.串列(list)
- list 可以被更改內容的資料型態
- list 可以放不同的資料
```
name_list = [item1,item2....itemN]
list[0]
list[1]
list[1:3]
list[-2]

max(list)
min(list)
sum(list)
len(list)
list*5 // 這個數字會是串列元素的重複次數
ex: [1,2]*2 => [1,2,1,2]
len(list) = 0 //empty list
del list
list.append(NEWitem)
list.insert(index,NEWitem)
list.pop()
list.remove(item)
list.reverse()
list.sort()
sorted(list) // 不會改變原本list
list.index(item)
list.count(item)
```

- 多重指定與串列
```
a,b,*c = 1,2,3,4,5
print(a,b,c)
// 1,2,[3,4,5]

a,*b,c = 1,2,3,4,5
print(a,b,c)
// 1,[2,3,4],5
```
- 字串常用方法
```
lower()
upper()
title()
rstrip()
lstrip()
strip()
center()
rjust()
ljust()
id(list) //取得記憶體位址
newlist = list // 深拷貝，連位址一起複製，所以增加的時候會一起
newlist = list[:] // 淺拷貝，位址會不一樣，所以增加不同步
```
- is & is not / in & not in
```
boolean_value = obj1 is obj2
boolean_value = obj1 is not obj2
```
- enumerate 物件

## 7.迴圈設計
```
for / while
range()
```
## Module
### Crawler
- beautifulsoup4
- request-html https://github.com/psf/requests-html

### Subprocess
- run

```python
import subprocess

result = subprocess.run(["ls", "-l"], capture_output=True, text=True)
print(result.stdout)
```
- Popen

```python
import subprocess

process = subprocess.Popen(["ls", "-l"], stdout=subprocess.PIPE, text=True)
output, _ = process.communicate()
print(output)
```
- check_output

```python
import subprocess

output = subprocess.check_output(["ls", "-l"], text=True)
print(output)
```

:::info
golang 類似 subprocess 的模組："os/exec"
- Ref: https://stackoverflow.com/questions/54269243/golang-equivalent-of-creating-a-subprocess-in-python
:::

## 爬蟲 BeautifulSoup
```=python
import requests
from bs4 import BeautifulSoup

request=requests.get(url)
content=request.content
soup=BeautifulSoup(content,"html.parser")
print(soup)
```

- find():只會找第一個找到的值並返回，假如沒有符合的並返回None
ex. soup.find("div",{"class","yt-lockup-video"})
- find_all():會找到所有符合的並返回一個 list ，假如沒有符合的並返回"[ ]"。
- select()
soup.select(".yt-lockup-video")
    - **class 用.** 
    - **id用#**
- get()

```python
#範例檔 抓取youtube 周杰倫的MV
import requests
from bs4 import BeautifulSoup

url = "https://www.youtube.com/results?search_query=%E5%91%A8%E6%9D%B0%E5%80%AB"
request = requests.get(url)
content = request.content
soup = BeautifulSoup(content, "html.parser")

for all_mv in soup.select(".yt-lockup-video"):
    # 抓取 Title & Link
    data = all_mv.select("a[rel='spf-prefetch']")
    print("名稱: {}".format(data[0].get("title")))
    print("連結: https://www.youtube.com{}".format(data[0].get("href")))

    # 抓取觀看時間與人數
    data = all_mv.select(".yt-lockup-meta-info")
    time = data[0].get_text("#").split("#")[0]
    see = data[0].get_text("#").split("#")[1]
    print("發佈時間: {}".format(time))
    print("觀看人數: {}".format(see))

    # 抓取Img
    data = all_mv.select("a[rel='spf-prefetch']")
    img = all_mv.select("img")
    if img[0].get("src") != "/yts/img/pixel-vfl3z5WfW.gif":
        print("照片: {}".format(img[0].get("src")))
    else:
        print("照片: {}".format(img[0].get("data-thumb")))
    print("-------------------")

```

## Python 的GUI 選擇
[連結](http://xdean.pixnet.net/blog/post/41253597-python%E4%BD%9Cgui%E9%96%8B%E7%99%BC%E7%9A%84%E9%81%B8%E6%93%87%EF%BC%BB%E8%BD%89%EF%BC%BD)
1.**Tkinter**
2.WxPython
3.PyGtk
4.**PyQT**
5.Jython
6.MFC
7.PythonCard
8.Dabo
9.AnyGui
10.WPY
11.**IroPython (.net)**

## 將python 打包成exe
[連結](http://mf99coding.logdown.com/posts/206237-package-your-python-script-into-exe-executable)
1.Py2Exe
- 先至 Py2Exe 官網 下載安裝檔，並安裝在電腦中
- 接著在你要轉換的 Python script 的目錄底下新增一個 setup.py
- 開啟 Terminal 並移動到 set.py 所在的目錄，並執行以下指令
> python setup.py py2exe

2.pyinstaller
- http://www.pyinstaller.org/

```shell=
pip install pyinstaller
pyinstaller yourprogram.py
```
**完成的結果會在 dist 資料夾中！**

## PYTHON 測試框架 PYTEST
https://docs.pytest.org/en/latest/


## Poetry
poetry 套件管理器 教學 https://blog.kyomind.tw/python-poetry/

## TCP
```python
# client.py 
import socket

host = '127.0.0.1'
port = 3434

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((host, port))

data = s.recv(1024)
print(f'Received: {data}')
s.close()
```

```python
# server.py 
import socket
import datetime

host = '0.0.0.0'
port = 3434

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((host, port))
s.listen(1)

while True:
    conn, addr = s.accept()
    print(f'Client {str(addr)} connect')
    dt = datetime.datetime.now()
    message = f'Now: {str(dt)}'
    conn.send(message.encode('utf-8'))
    # print(f'sent : {message}')
    conn.close()
```

## UDP
```python
# client.py
import socket

host = '127.0.0.1'
port = 3434

s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

data = 'Hello World'
s.sendto(data.encode('utf-8'), (host, port))
s.close()

```

```python
# server.py
import socket
import datetime

host = '0.0.0.0'
port = 3434

s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.bind((host, port))

while True:
    data, addr = s.recvfrom(1024)
    print(f'Received {data} from {str(addr)}')

s.close()

```

## 一行指令輸出大心
- https://cheng-min-i-taiwan.blogspot.com/2019/11/python.html
```
print('\n'.join([''.join([('Love'[(x-y) % len('Love')]if ((x*0.05)**2+(y*0.1)**2-1)**3-(x*0.05)**2*(y*0.1)**3 <= 0 else ' ')for x in range(-30, 30)])for y in range(30, -30, -1)]))
```
