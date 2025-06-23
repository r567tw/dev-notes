---
title: Laravel Controller
date: '2019-09-22 13:27:14+00:00'
tags:
- laravel
- ithome
---
接下來讓我們分享在 MVC 裡面的 Controller，不像 Laravel 沒有一個專門的
Model 資料夾，Controller 在 Laravel App 資料夾裡面有一個 app/Http 的子資料夾，在 Http 底下有個 Controllers 的資料夾
![https://ithelp.ithome.com.tw/upload/images/20190922/20106999yNCD2JryXh.png](https://ithelp.ithome.com.tw/upload/images/20190922/20106999yNCD2JryXh.png)
在 Controllers 這個資料夾裡面，就有各式各樣 Controller.php 的檔案。

接下來，讓我們從新建一個 Controller 開始，首先讓我們使用指令

```
$ php artisan make:controller ArticleController
```

之後你會看到在 Http 資料夾底下會有一個 ArticleController 這個檔案, Laravel 為我們簡單寫了一段
![https://ithelp.ithome.com.tw/upload/images/20190922/20106999U0zWmiNdu0.png](https://ithelp.ithome.com.tw/upload/images/20190922/20106999U0zWmiNdu0.png)
```
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ArticleController extends Controller
{
    //
}

```

其實就是這麼簡單，他就只是繼承了 Controller 這個類別，而 Controller 這個類別在哪裡呢？他就是在 App\Http\Controllers 資料夾底下的 Controller.php 這個檔案，讓我們繼續接著看看裡面寫了什麼東西：

```
<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
}

```

在 BaseController 這個檔案裡，`Illuminate`就是 Laravel 的 namespace ，然後裡面用到了幾個簡單的 trait: `AuthorizesRequests`、`DispatchesJobs`和 `ValidatesRequests`，就這樣構成了我們 Controller 這個檔案。

現在讓我們藉由 Route 來試玩一下 Controller 吧，首先到 routes/web.php 讓我們新增一行

```
Route::get('articles', 'ArticleController@first');
```

在之前 Route 那一篇說到 Route 的後面可以接 function......
但是我們也可以接 Controller 然後使用`@`加上 function 名稱。而這樣就符合了一個 MVC 的標準流程，Controller 控制這整個應用程式的流程，並且分開了 Model 封裝商業與資料庫的邏輯以及 View 呈現的前端頁面。

不好意思在這裡囉唆了一下，因為是想要講解一些概念。

所以如底下範例，請在 ArticleController.php 裡面新增底下這一段

```
    public function first()
    {
        return 'Hi 我們的第一個Controller';
    }
```

![https://ithelp.ithome.com.tw/upload/images/20190922/20106999AhJQIpUQXt.png](https://ithelp.ithome.com.tw/upload/images/20190922/20106999AhJQIpUQXt.png)

撒花～