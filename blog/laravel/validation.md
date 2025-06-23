---
title: Laravel Validation
date: '2019-10-01 22:33:54+00:00'
tags:
- laravel
- ithome
---
接下來我們來談一下 Laravel 關於驗證的部分，作為一個全能型的框架 Laravel，到底會讓 Validation 會如何好寫呢！ 以下請跟著我走就知道，check out~。

# 為什麼需要驗證

因為我們要~~當使用者就是笨蛋啊~~，不是啦，是為了防止使用者輸入到錯的資訊以至於讓我們系統崩潰，別忘了 Garbage in，Garbage out 喔～

# Laravel 提供給我們的驗證規則

還記得我們第十二天做的[綜合應用(4) 使用 Laravel 做一個簡單的部落格：複習-下](https://ithelp.ithome.com.tw/articles/10221374)嗎？如果沒看過的可以回去複習一下，在那裡面，有 update\create 的表單，其實那是非常粗糙的，完全沒有驗證可言，所以接下來我將以 update 的表單為例子，順便也說明 Laravel 本身到底提供了哪些驗證給我們。

先上一下文件：

- [中文](https://docs.laravel-dojo.com/laravel/5.5/validation)
- [英文](https://laravel.com/docs/6.x/validation)

如果你滑倒底下有一個地方叫做`Available Validation Rules`，沒錯，Laravel 就是內建提供我們這麼多規則喔～
![https://ithelp.ithome.com.tw/upload/images/20191002/20106999bAyhdUc8KE.png](https://ithelp.ithome.com.tw/upload/images/20191002/20106999bAyhdUc8KE.png)

**不過在這之前，我們先在 blade 那裡放有關於驗證訊息的版面**
首先到`layouts/layout.blade.php`，放這一段程式碼

```blade
    @if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif
```

完成，可以回去加入驗證囉 XD

有很多種方法可以讓我們使用這些驗證規則，以下將簡單的小小帶過：

1. 在 Controller 直接驗證
   我們可以直接改寫`update`的部分，增加`$request->validate`即可

```
public function update(Request $request, Article $article)
    {
        //method 1. in controller
        $request->validate([
            'title' => 'required',
        ]);

        $title = $request->title;
        $content = $request->content;

        $article->title = $title;
        $article->content = $content;
        $article->save();

        return redirect(route('article.index'));
    }
```

之後如果你在編輯的那個表單故意沒有填寫而送出的話就會送上一些訊息，就會導回去頁面，並且增加了一段訊息「The title field is required.
」像是這樣
![https://ithelp.ithome.com.tw/upload/images/20191002/20106999lfWkzEBw0G.png](https://ithelp.ithome.com.tw/upload/images/20191002/20106999lfWkzEBw0G.png)

2. 使用 Request 類別(推薦，之後我將會介紹一個專案:[Larvel Best Practice](https://github.com/alexeymezenin/laravel-best-practices))

這裡介紹一個製作 Request 的方法，實際上這也是比較推薦的做法～

```
$ php artisan make:request UpdateArticleRequest
```

`UpdateArticleRequest.php`出現在`app/Http/requests`資料夾當中，然後我們開始處理它
![https://ithelp.ithome.com.tw/upload/images/20191002/20106999kJj9UFVrMo.png](https://ithelp.ithome.com.tw/upload/images/20191002/20106999kJj9UFVrMo.png)

```
    public function authorize()
    {
        return true;
    }
```

`authorize()`這個方法是判斷是否可以處理，原本的預設值是`false`，我們肯定是需要改成`true`的。

之後增加 rules，

```
    public function rules()
    {
        return [
            'title' => 'required'
        ];
    }
```

好了，接下來就是使用它了。

```
use App\Http\Requests\UpdateArticleRequest;
...(略)
public function update(UpdateArticleRequest $request, Article $article)
    {
        $title = $request->title;
        $content = $request->content;

        $article->title = $title;
        $article->content = $content;
        $article->save();

        return redirect(route('article.index'));
    }
```

其實就是這麼簡單，把原本的`Request`類別改成`UpdateArticleRequest`即可，效果一樣

# 自己做一個驗證規則

如果當 Laravel 的預設驗證規則都沒有符合我們的需要呢？沒問題，這一切還是可以解決的。

有很多方法可以使用，其實文件裡面早已寫得清清楚楚，~~不愧是史上最好看的官方文件~~，分別有 Rule 類別的方式、Closures 以及 Extensions 的方式，不過我個人偏好使用 Rule 的方式（不要害怕很多檔案或者建立資料夾～）

```
$ php artisan make:rule CustomRule
```

![https://ithelp.ithome.com.tw/upload/images/20191002/20106999IBIAGod1fb.png](https://ithelp.ithome.com.tw/upload/images/20191002/20106999IBIAGod1fb.png)
然後到`CustomRule.php`裡面調整程式。

- 建立 Rule 的邏輯過程

```
public function passes($attribute, $value)
{
    return  strlen($value) > 10;
}
```

- 自訂訊息

```
public function message()
{
    return '字串長度必須大於10';
}
```

# 如何使用我們的驗證

自訂訊息`CustomRule`做好了，接下來該如何使用它呢？
到`UpdateArticleRequest.php`那裡

```
use App\Rules\CustomRule;
...(略)
public function rules()
{
    return [
        'title' => ['required', new CustomRule]
    ];
}
```

其實就是把原本字串的方式改成以陣列的模式，然後使用 new 關鍵字把她實例化出來。

這時候如果你發現我們如果標題沒有填入超過 10 個字送出去後就會回傳「字串長度必須大於 10」囉
![https://ithelp.ithome.com.tw/upload/images/20191002/20106999cpKF91KaU9.png](https://ithelp.ithome.com.tw/upload/images/20191002/20106999cpKF91KaU9.png)

要看完整程式碼的可以參考這裡: https://github.com/r567tw/Make-PHP-Great-Again/commit/502ad5aeeaf43e074b1ce76ce54ffaddc1ea8899
