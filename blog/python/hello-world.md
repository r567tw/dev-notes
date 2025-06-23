---
title: Python 起手式：寫個Hello World吧！
date: '2018-10-02 13:45:22+00:00'
tags:
- python
- ithome
---
# 安裝Python
    
工欲善其事，必先利其器！ 要學習寫Python，當然就是要先安裝Python啦！

首先，你要先安裝Python，這裡我就不贅述了，你首先要去[https://www.Python.org/]
找到可以downloads 這裏找到你目前用的作業系統適合的安裝檔，下載後執行它，按照畫面的提示一一去安裝～
這樣就可以囉！

然後請打開你任何一種的command line，無論是windows 的命令提示字元還是mac os 的terminal 或者zsh (我個人是使用zsh 啦)，key 上

```shell
python3 --version
```

接下來如果你看到有個Python 的字樣後面接版本號，那就表示：我們可以開始寫Python囉！
    
# 使用文字編輯器和Python的IDLE
    
你可以選擇vs-code、或是subl 甚至是記事本也可以，來撰寫你的Python程式。

我這裏通常用的都是vs-code, 而這裡，你也可以在command line 裡打上`Python3`，進入Python的Shell，有點像是下圖：

![圖片1](https://i0.wp.com/ithelp.ithome.com.tw/upload/images/20181002/20106999MdQGwWAIj9.png)

    
有點像是laravel 的artisan tinker 或者 php -a 或者ruby 的irb呢！Tips:如何離開這個IDLE呢？ 打上exit()就可以!
  
# HelloWorld 程式
好了，我們可以開始寫Python程式了，請再任意一個目錄之下，創造一個名為helloworld.py的檔案（Python的執行副檔名基本上都是以py為結尾），然後放入

```Python
print('hello world')
```
然後，回到你放helloworld.py的目錄之下，使用

```shell
python3 helloworld.py
```

一下子，你就會看到這個`hello world`這個字樣了

![圖片1](https://i1.wp.com/ithelp.ithome.com.tw/upload/images/20181002/20106999EugkOXt2Nj.png)

當然爾，你也可以使用Python的Shell，那更為簡單，就是直接打下`print("helloworld")`就可以直接看到hello world啦！

# 寫個問答小遊戲

如果只是一個hello world 真的還不是很夠味，所以就來寫個簡單的小問答，程式之所以叫做程式就是有input，也有output，所以，我們來寫個可以輸入些東西，然後也會輸出點東西的小程式

``` Python
ans = input('what is your favorite programming language? ')
print('your favorite programming language is '+ ans)
```

說明：

Input 是一個小函數，他可以接受從command line輸入的任何文字，ans 這個變數接下input所收到的輸入，最後用print 把它印出來，在Python中，文字串接就只要用'+'就可以了！
執行結果如下圖

![圖片2](https://i2.wp.com/ithelp.ithome.com.tw/upload/images/20181002/20106999IjmR49vPGr.png?width=840px)
