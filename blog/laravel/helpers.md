---
title: Laravel Helpers
date: '2019-10-09 17:04:16+00:00'
tags:
- laravel
- ithome
---
寫到這裡，終於剩下最後的5天就可以完成這整個鐵人賽！（撒花

接下來希望自己再接再厲。繼續完成後續幾天的Laravel 教學系列。
今天也是個簡單風（好幾天都是簡單風了QQ）

介紹一下Laravel作為一個全能型的框架，還提供了一些稱為「Helper」的東西幫助我們可以整理程式碼、封裝了一些我們常常會弄到的部分，也可以稱之為「語法糖」，總之幫助我們可以避免「重複造輪子」。而順道一提的是：我們之前也早已用過這些東西了：例如`route()`、`view()`或者`factory()`

如果你看到文件：https://laravel.com/docs/master/helpers

其實大概這些語法可以分類為以下幾種：

1) 陣列及物件類：可以處理陣列與物件的資料等，例如：`Arr::add()`、`Arr::where()`...

2) 路徑類：就是Laravel一些資料夾的路徑，像是`public_path`、`storage_path()`...

3) 字串類：可以處理我們的字串，`Str::camel`或`trans()`，預告一下明天將會討論關於多語系的網站設計，`trans()`便是我們到時會可能會用到的方法～

4) 網址類：像是我們之前會用到的`route()`方法、以及`asset()`方法都是回傳一串的網址。

5) 其他：像是無法歸類以上四類的，之前我們用到的`view()`或者`factory()`都在這個裡面，而這裡我也順道介紹一個我們在debug常常會用到的`dd()`

在你任何想要的地方，如果你想知道這個值到底傳出來是怎麼樣的值、怎麼樣的型態，你可以使用`dd()`，例如我們昨天的分頁：
```
dd(Article::paginate(5))
```

當執行到`dd()`的時候會立刻終止那一段程式，並且`var_dump`回傳被`dd`的值與型態，像是這樣
![https://ithelp.ithome.com.tw/upload/images/20191010/20106999CVvC4sVxvE.png](https://ithelp.ithome.com.tw/upload/images/20191010/20106999CVvC4sVxvE.png)

我覺得Laravel的文件是世界上最好讀的文件，我想剩下的你們應該可以自行探索吧XD

