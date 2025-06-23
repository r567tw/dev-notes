---
title: Python 走入現實：圖形化介面
date: '2018-10-19 14:45:13+00:00'
tags:
- python
- ithome
---
哈！ 結果到現在十點多才回到家沒有研究到多媒體資源到底該如何提取爬蟲過來，抱歉！ 趁著週末時間來好好研究，希望可以明天和大家分享一下怎麼爬多媒體資源（又或者鐵人賽之前吧？！趕不上的話....我不會學世堅跳海，只會和大家說聲抱歉啦哈） 
    
這裏再用圖形化介面幫我代打啊哈這裏我使用的圖形化介面module是tkinter。

你會發現，原來Python這麼簡單！！！
```python
import tkinter as tk #哎這也是一種遺珠之憾，module也可以用別名，使用as加入你想改的名字也可以喔

root = tk.Tk()
root.title('Hello World Application') #介面的標題是'Hello World Application'

root.mainloop()
```
只要import tkinter這個module, 接下來請呼叫他的Tk()方法記得，最後的mainloop方法也要，這樣你就呼叫出一個圖形化介面囉！
    
當然啦，只是這樣我這篇也太偷懶了XD昨天都這麼偷懶今天怎麼可以還這樣呢（昨天偷懶真的不是故意的啊！差點要熬夜隔天爬不起來上班啊）
    
所以，我來做一個可以按下按鈕，呼叫‘Hello World’訊息框的應用範例吧！    
```python
import tkinter as tk
import tkinter.messagebox as messagebox

def HelloWorldMsgBox():
    print('hello world')
    messagebox.showinfo("Hello World Application", "Hello World!") #呼叫hello world的訊息框

root = tk.Tk()
root.title('Hello World Application')

buttonHelloWorld = tk.Button(root, text='SayHello', width=25, command=HelloWorldMsgBox)
buttonHelloWorld.pack() #按下去啟動上面定義好的HelloWorldMsgBox方法

buttonClose = tk.Button(root, text='Close', width=25, command=root.destroy)
buttonClose.pack() #按下去啟動root.destroy，也就是關閉視窗
root.mainloop()
```

其實你只要會google，把tkinter的元件叫出來就好，所以這裡我宣告了兩個button，一個是跳出提示窗hello world，另外一個則是關閉視窗。

然後每個元件記得也要加入pack方法喔～就像最後的mainloop一樣
    
如果要出現提示窗請引入tkinter的messagebox，然後就可以調用了，當我們在button裡面command屬性宣告等於我們某個方法名稱，你就可以使用囉！
    
若要學習更多tkinter請到此：
- https://www.Python-course.eu/Python_tkinter.php
- https://Pythonspot.com/tk-window-and-button/