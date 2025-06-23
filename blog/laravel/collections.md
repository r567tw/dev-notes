---
title: Laravel Collections
date: '2019-10-11 16:16:46+00:00'
tags:
- laravel
- ithome
---
接下來，我想要分享關於Laravel 的一個比較特別的類別：Collections
他有點像是陣列的概念，但更像是一個`集合`的概念。

相信如果你還記得前面教學談到幾行的程式碼，裡面不是有`Article::all`和`$article->tags`這幾段嗎？如果你去`dd()`它，你會發現他們都是同一種類別：`Illuminate\Database\Eloquent\Collection`

當然，如果你有在之前`helper`的章節發現到`collect()`這個方法，他其實回傳的也是`Collection`，但是他是`Illuminate\Support\Collection`

兩者在使用上會有一些差異，基本上他們也是大部分使用上也蠻像的，所以我就在這裡把他們放在一起講。

兩者使用差異可以參考這篇文章：https://medium.com/@lynnlin827/two-types-of-collections-in-laravel-888d43858c4e


Laravel為Collection這個類別提供許多的方法，例如`map()`或者`avg()`等等，其實和`helper()`那裏一樣，其實文件也大部分都寫的清清楚楚了。
https://laravel.com/docs/6.x/collections#available-methods

是不是有點像是在寫JavaScript在處理呢！沒錯，我也有這樣的感覺。但這樣似乎程式變得更好讀了呢！

另外Laravel在6.0也推出`Lazy Collections`的類別，是為了處理我們有時候會有大量的資料時候，避免一次全部讀進記憶體，使用到比較現代化的PHP技巧：yield 和 generator，而開發的一個新類別。其實使用方法很簡單，就是將我們原本使用的`all()`改成`cursor()`就完成囉！
