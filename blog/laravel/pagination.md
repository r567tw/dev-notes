---
title: Laravel Pagination
date: '2019-10-08 18:21:24+00:00'
tags:
- laravel
- ithome
---
沒想到寫這麼多天以來，我居然漏掉一個這麼重要的環節：「分頁」。在網頁的世界中，讓資料作出排序及分頁絕對是必要做到的一件事情，Laravel作為一個全能框架，這項功能肯定是有放在裡面的。讓我們以文章列表作為範例，其實就是將原本的`Article::all()`改為`Article::paginate(5)`就好囉，至於那個`5`看你想換哪個數字都可以，那個意思是`你要幾個項目為一頁`。
![https://ithelp.ithome.com.tw/upload/images/20191009/20106999Z6OiqOOMo9.png](https://ithelp.ithome.com.tw/upload/images/20191009/20106999Z6OiqOOMo9.png)

然而我知道，你會想問如果底下沒有一個可以點連結的頁數頁尾那怎麼行，超簡單，在`article/index.blade.php`這個檔案下面放至一行程式碼
```
{{ $articles->links() }}
```

這樣你就看到囉
![https://ithelp.ithome.com.tw/upload/images/20191009/20106999STow0Pnjq3.png](https://ithelp.ithome.com.tw/upload/images/20191009/20106999STow0Pnjq3.png)

這樣這個分頁是不是很簡單？當然，如果你想要客製化，可以使用這個指令
```
php artisan vendor:publish --tag=laravel-pagination
```

你會在views/vendor/pagination裡面看到很多的類似樣板的分頁檔案，`bootstrap-4.blade.php`是預設的分頁樣板，如果你想要客製化，可以修改那個檔案！
![https://ithelp.ithome.com.tw/upload/images/20191009/20106999x8iTwr5lyz.png](https://ithelp.ithome.com.tw/upload/images/20191009/20106999x8iTwr5lyz.png)

當然既然給了我們這麼多的分頁樣板，當然可以用其他的囉，讓我們來修改一下預設的分頁樣板。
來到`app/Providers/AppServiceProvider.php`這個檔案，use Paginator，之後在boot裡面加入`Paginator::defaultView('vendor.pagination.semantic-ui');`就可以從`bootstrap-4.blade.php`改成`semantic-ui.blade.php`囉
```
use Illuminate\Pagination\Paginator;
...（略）
public function boot()
{
    Paginator::defaultView('vendor.pagination.semantic-ui');
}
```

另外補充一下：如果你想只是有上一頁或下一頁的連結的話，可以使用`simplePaginate`這個方式。然後按照上面的方式去客製化你的分頁按鈕，他只是在檔案加入`simple`的前綴而已。

想要更多研究可以看此文件：https://laravel.com/docs/6.x/pagination

要看完整程式碼的可以參考這裡:https://github.com/r567tw/Make-PHP-Great-Again/commit/f3ab7fb7816555dce91df98ea242114b4f477a2e
