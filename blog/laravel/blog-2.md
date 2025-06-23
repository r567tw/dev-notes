---
title: 綜合應用(3) 使用 Laravel 做一個簡單的部落格：複習-中
date: '2019-09-26 10:55:20+00:00'
tags:
- laravel
- ithome
---
昨天我們小部落格專案已經準備好資料庫、Seeder、Route和Model了。

如果錯過的可以看看昨天的：[綜合應用(2) 使用 Laravel 做一個簡單的部落格：複習-上](https://ithelp.ithome.com.tw/articles/10220383)

現在剩下最後的Controller和View我們就可以將這個小專案完成囉，Check out~

# 建立Controller

首先就是Controller拉，既然我們Route/web.php 裡面新增了`Route::resource('article', 'ArticleController');`

**我們當然就是要把ArticleController生出來啊**

一個指令就能~~結束這一個回合~~～
```
$ php artisan make:controller ArticleController --resource
```

接下來你會看到ArticleController.php 在`App\Http\Controller\`這個資料夾底下囉

![https://ithelp.ithome.com.tw/upload/images/20190926/20106999WBdIgaNJRN.png](https://ithelp.ithome.com.tw/upload/images/20190926/20106999WBdIgaNJRN.png)

# 建立View
接下來，我們必須要建立一些可以用的view檔案。不過這些檔案沒辦法用指令產生，~~真是可惜~~
而這個地方其實最為繁瑣，所以我才臨時決定將這篇簡單部落格專案教程分成上下兩部，~~才不是因為昨天我想要耍廢~~

其實撰寫blade其實就像寫html一樣好玩，你可以參考之前我寫的第八天文章自行發揮創意：[Laravel View](https://ithelp.ithome.com.tw/articles/10219687)

然後為了專注於Laravel 的開發，以下對於view的撰寫會盡量簡潔及陽春，css的部分也就只是隨便套套css framework這樣喔～～

所以讓我們開始吧！ Go!Go!Go!
來到`resources\view`這個資料夾，建立一個`layouts`的子資料夾
讓我們建立一個`layout.blade.php`吧，如下圖
![https://ithelp.ithome.com.tw/upload/images/20190926/20106999Rl7wDRzsqL.png](https://ithelp.ithome.com.tw/upload/images/20190926/20106999Rl7wDRzsqL.png)

在`layout.blade.php`填入以下程式碼：
```
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>FirstLaravelProject</title>
        <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="container mx-auto">
            @yield('content')
        </div>
    </body>
</html>
```
- 在此專案中我選擇使用TailwindCSS ，你可以自行選擇你喜歡的css ，~~我是想要順便學習TailwindCSS拉~~
- 不是在第八天早就說了嗎，blade可以讓你用類似繼承、模板的方式，讓你很清晰清楚的開發php～讓大家見識`@yield`的厲害！

## 開始串Articles的小前言
接下來讓我們邊把controller的function填一填，順便一起建立起view吧！以下為了極度簡潔程式碼，所以我會用很多Laravel附帶的magic method，你可能在其他人的文章看到不同的寫法，但基本上都是大同小異喔！

另外當然拉，既然ArticleController要使用到Article的資料表，理所當然的**就要用到它的model**了喔，所以讓我們先到ArticleController.php裡面，使用`use`這個關鍵字(這就是現在php奧義)，將`App\Article`引入進來～

像是底下這樣
```
<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Article; //將Model引入進來，這樣我們才可以在Controller裡面使用它

class ArticleController extends Controller
{
  //...略...
}
```

## ArticleController@index()
在RESTFul API裡面，通常index 是所謂的`首頁` ，就`資源`的角度來看，是一種`列表`。

當我們利用`--resource`的參數時，ArticleController裡面就有了`index`方法，讓我們在`index`裡面加入一下他要做的功能：列表
```
public function index()
{
    return view('articles.index')->withArticles(Article::all());
}
```

嘿嘿，這裡用到Laravel的一個Magic Method ，將後面的with加上英文字母，就可以把參數傳到view的部分....當然，或許你比較常見的應該是這樣：
```
public function index()
{
    $articles = Article::all();
    return view('articles.index')->with('articles',$articles);
}
```

這也是可以～不過我喜歡簡潔漂亮的程式碼，所以喜歡使用前者。
還記得我們第四天講到的Laravel Route的部分嗎？沒看過的請到這裡來：[Laravel Route](https://ithelp.ithome.com.tw/articles/10217731)，裡面關於web.php的部分是不是Laravel給了我們有一段關於`view()`這敘述，沒錯拉，這個也可以在controller裡面用喔～所以**我上面填充的程式碼代表請到`articles/index.blade.php`這個檔案來，並且也帶上名為$articles的參數**

所以我們當然就要建立`articles/index.blade.php` 囉，但是裡面總不能空空的吧？這時候就用到前幾天的blade技巧，繼承來自剛剛建立的layout.blade.php，順便我們也用表格來呈現文章列表～
```
@extends('layouts.layout')

@section('content')
    <h1>文章列表</h1>
    <a href="{{ route('article.create') }}">新增文章</a>
    <table class="table border border-black">
        <td class="border border-black">標題</td>
        <td class="border border-black">內容</td>
        <td class="border border-black">動作</td>
        @foreach($articles as $article)
        <tr class="border border-black">
            <td class="border border-black">{{ $article->title }}</td>
            <td class="border border-black">{{ $article->content }}</td>
            <td class="border border-black">
                <a href="{{ route('article.show',$article->id ) }}">查看</a>
                <a href="{{ route('article.edit',$article->id ) }}">編輯</a>
                <a href="{{ route('article.destroy',$article->id ) }}">刪除</a>
            </td>
        </tr>
        @endforeach
    </table>
@endsection
```

在我們利用`php artisan server`之後，使用`http://127.0.0.1:8000/article`
就會看到我們完成的列表頁囉，像是這樣
![https://ithelp.ithome.com.tw/upload/images/20190926/20106999fpDY4WaXd8.png](https://ithelp.ithome.com.tw/upload/images/20190926/20106999fpDY4WaXd8.png)

`說明一下關於這個articles/index.blade.php`:
- 我們用到了blade語法： @foreach 和 ＠endforeach
- route()這個方法他可以填入`route name`，從而call出我們想要的網址，當我們在Route裡面使用到`Route::resource('article', 'ArticleController');`之時，他的名稱就會冠上一些RESTFulAPI的一些名稱，例如Article的`create`就是`article.create`，以此類推......。而像是有些事需要參數的例如show 或edit等，可以在`route()`這個方法加入**第二個參數**，也就是正被foreach迭代的`$article->id`，如此便能方便的呼叫到應該對上的網址。至於name的部份我們更可以使用`php artisan route list`作出查詢。
![https://ithelp.ithome.com.tw/upload/images/20190926/20106999xxdEkJhmKM.png](https://ithelp.ithome.com.tw/upload/images/20190926/20106999xxdEkJhmKM.png)

## ArticleController@show()
show()這個function 所對應到的就是RESTful Api的概念就是索取資源，以文章的意思來說就是我要看某一個文章。所以在show()裡面我們就要傳給他他所點選的文章還有單頁文章的頁面。如下
```
   public function show($id)
    {
        return view('articles.show')->withArticle(Article::find($id));
    }
```

請注意是`withArticle`不是`withArticles`喔，有沒有加`s`傳過去給view讀到的參數很不一樣

另外Laravel 很厲害的也支援Route Model binding，詳細的情節可以參考文件:https://laravel.com/docs/5.8/routing#route-model-binding

所以show()可以再改得更藝術一點～
```
   public function show(Article $article)
    {
        // 把原本的$id改成Article $article ，他會把Route傳過來的id與Article Model做出mapping，可以視為Article::find($id)
        return view('articles.show')->withArticle($article);
    }
```

想看這次完整的程式碼可以看此：
https://github.com/r567tw/Make-PHP-Great-Again/commit/9fc8db207cb0af6ca5f7aa33012ed1735a484aed

這時候如果你到`http://127.0.0.1:8000/article/1`就會看到我們要的結果
由於Create、Edit、Update 和 Delete等方法有點小複雜，讓我們明天繼續討論吧！我們明天見

