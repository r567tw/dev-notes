---
title: Laravel Middleware
date: '2019-09-30 16:26:56+00:00'
tags:
- laravel
- ithome
---
接下來我們來說明關於 Laravel 的 Middleware，什麼是 Middleware 呢？中文名稱稱呼是「中介層」，我是想像他有點像是防火牆的概念，可以在每一次 request 進入 controller 的流程當中，做一層過濾、驗證的部分，而當 Response 出來之後，也會經過這樣一層層程序回應給使用者。

- 在這裏也提供一些參考資料：https://laravel.tw/docs/5.2/middleware

舉例來說，還記得我們第 12 天綜合應用嗎？如果沒看過記得回去複習一下[使用 Laravel 做一個簡單的部落格：複習-下](https://ithelp.ithome.com.tw/articles/10221374)

在我們撰寫關於`create`、`edit`和`destroy`的表單當中，不是都有帶一個`@csrf`嗎？其實這個`csrf`就是一種 Middleware，他就藏在 Laravel 的`app\Http\Middleware`這個資料夾，有一個名為`VerifyCsrfToken.php`的檔案喔～
![https://ithelp.ithome.com.tw/upload/images/20191001/20106999Na8w6qHWEn.png](https://ithelp.ithome.com.tw/upload/images/20191001/20106999Na8w6qHWEn.png)

# 補充一下關於 CSRF 的科普:順便淺談一下 Laravel 為我們帶上哪些 Middleware

這裡插播一些小知識好了，為什麼會需要驗證是否有一個`CSRF`的 token，原因是因為 HTTP 其實他是很好被偽造的，同時更是因為`HTTP`是一種`無狀態`協定，其實你以為你登入的那些資料其實都是`瀏覽器幫忙`，所以你才可以一開始就不用什麼登入就有資料、或者看到你那些資訊～

總之請求很容易被偽造，CSRF 就是`可以在不同的 domain 底下卻能夠偽造出「使用者本人發出的 request」`

討論 CSRF 也不是本篇的重點，總之如果你想要更多理解可以參考底下連結：

- [讓我們來談談 CSRF](https://blog.techbridge.cc/2017/02/25/csrf-introduction/)
- [wiki-跨站請求偽造](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)

所以聰明的 Laravel 就自動幫我們附帶了一個`VerifyCsrfToken.php`囉，~~不過你要關閉也是可以啦~~，不建議這麼做～

有兩個方法：一種是全域的，另外一種是局部性的

A. 局部性的：
先談一下局部性的關閉 CSRF，當你跑去打開`VerifyCsrfToken.php`的時候，有沒有發現`$except`這個地方呢？裡面填一下相關的 URL 就可以囉，我以前面我們做的`Create`表單作為例子。（根據我們 RESTFul API 的概念，`Create`就是`article`~）

```
    protected $except = [
        'article'
    ];
```

之後你就可以在`article/create.blade.php`把`@csrf`拿掉囉，之後新增文章就不在需要經過 CSRF 的部分了

B. 全域的
另外一個方法就是我們直接全部關閉 CSRF，就是我們要到`HTTP/Kernel.php`裡面，有一個`$middlewareGroups`的地方，直接註解掉`web`裡面的`\App\Http\Middleware\VerifyCsrfToken::class,`這一行就好啦，這樣全站都不會經過 CSRF 了，同時，你也發現了，其實 Laravel 也提供了我們一些預設的`Middleware`，例如`\App\Http\Middleware\EncryptCookies::class,`等等等，有興趣的話可以去看這些檔案都做了哪些事情～。

# 製作自己的 Middleware

現在我們來設定一下簡單的情境，只有 email 為`example@example.com`才能進來我們指定的地方，所以我們就必須**先確定資料庫 User 有一個 email 為`example@example.com`的人**

讓我們開始來建立自己的 MiddleWare 吧！！沒錯，正如你想的那樣，Laravel 也提供了我們類似的建立指令喔～

```
$ php artisan make:middleware FirstMiddleware
```

接下你就會看到`FirstMiddleware.php`這個檔案。
![https://ithelp.ithome.com.tw/upload/images/20191001/20106999mxUCBEqSoX.png](https://ithelp.ithome.com.tw/upload/images/20191001/20106999mxUCBEqSoX.png)

在`FirstMiddleware.php`這個檔案裡面`handle()`做出改寫

```
    public function handle($request, Closure $next)
    {
        if (!Auth::check()) {
            return redirect(route('login'));
        }

        if (auth()->user()->email === "example@example.com") {
            return $next($request);
        } else {
            return response('You can not access this page!');
        }
    }
```

說明：
`auth()`其實就是 Laravel 內建的驗證 user 的方法，他裡面提供 user()和 check()的方法檢查 user 及提取 user 資料，在這個範例當中，如果他沒有登入就導向到登入的地方，另外確定登入好後繼續處理流程，也就是確認 user 的 email 這樣。

但可不是建立好 Middleware 這麼簡單，我們還需要告訴 Http/kernal 有這個 Middleware，到`Http/Kernel.php`裡面找到`$routeMiddleware`補充一行

```
'FirstMiddleware' => \App\Http\Middleware\FirstMiddleware::class,
```

# 如何使用自己做的 Middleware

有兩種方式，一個是在 Controller ，另一個是在 Route。

- Controller

一個是在 Controller 裡面使用`__construct`將 Middleware 引入，像是這樣

```
public function __construct()
{
    $this->middleware('auth');
}
```

`auth`這個名稱其實就是我們剛剛在`http/Kernel.php`註冊的`$routeMiddleware`那裡喔～
![https://ithelp.ithome.com.tw/upload/images/20191001/201069999inAN5Bgwu.png](https://ithelp.ithome.com.tw/upload/images/20191001/201069999inAN5Bgwu.png)

- Route
  另一個則是在 route 直接做宣告，這裡我們使用這個策略
  到`routes/web.php`加入一個新規則

```
Route::get('middlewareTest', function () {
    return 'Hello example@example.com';
})->middleware('FirstMiddleware');
```

完成囉！
以下如果想要知道 Middleware 可以還有什麼樣的變化可以直接看看文件：

- https://laravel.com/docs/6.x/middleware

要看完整程式碼的可以參考這裡: https://github.com/r567tw/Make-PHP-Great-Again/commit/7aba3963ee4d66473c13b97afceebb434dbb4938
