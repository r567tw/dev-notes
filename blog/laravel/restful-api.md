---
title: 綜合應用(1)：Laravel RESTFul API
date: '2019-09-24 11:13:03+00:00'
tags:
- laravel
- ithome
---

前面幾天我們大概導覽了一下整個Laravel 的結構、以及分別M-model、V-view、C-Controller，並且也講到Database的部分還有Route，基本上我們可以算是學會Laravel 的一半了，剩下的就是真的是***遇到需求再說***，例如event、middleware 還是auth之類的，如果有需要在自行加入即可。 
    
所以在這裡我想要以一個簡單的Laravel 部落格的簡單應用，部落格不外乎就是新增文章、刪除文章、看文章以及修改文章，暫時我們先不用處理登入登出的問題，這個我覺得可以以後再談談
    
在正式進入環境之前我們仍然要過一下概念的部分，在網頁的世界中，尤其是後端的角度來看，URL(網址)的組成分為兩個

- domain name
- path或者檔名之類的詳細的說明可以參考維基百科：https://zh.wikipedia.org/wiki/统一资源定位符
    
其實網頁上我們的任何一個動作的`對象`都可以被視為一種`資源`以樓上維基百科的網址為例，`https://zh.wikipedia.org`是domain name，也就是網頁的家，而`wiki/统一资源定位符`就是一種`資源`，翻成白話來說就是當你打上這串網址，就是告訴瀏覽器我要找一個在`https://zh.wikipedia.org` 底下有一個叫做`wiki`的地方，裡面有一個`统一资源定位符`的資源，***請把它拿給我***
    
瀏覽器也是一種`軟體`，當他拿到`统一资源定位符`這個資源的時候，發現他是一個HTML文檔，就使用他的css引擎、讀取HTML的工具以及運行JS的東西去讀取這個資源給你看
    
所以這樣你有比較理解我所講的是什麼嗎？我們一切在網路上所做的就是`資源`，而對於資源來說最常做的就是CRUD，也就是

- C-創建新資源
- R-讀取資源
- U-更新資源
- D-刪除資源
      
於是RESTful 的概念因應而生，他建議了URL的形式以及溝通方法、架構，***分別就是Get、Post、Put/Patch以及Delete***
    
如果想更了解RESTFul API的話請到這裡來：https://zh.wikipedia.org/wiki/%E8%A1%A8%E7%8E%B0%E5%B1%82%E7%8A%B6%E6%80%81%E8%BD%AC%E6%8D%A2
    
話不多說，Laravel 也對RESTFul 有一定程度上的支援，首先，讓我們先使用一個指令

```shell
$ php artisan make:controller ArticleController --resource
```
 
***請記得加`--resource`喔***
然後你看到ArticleController 在Controller這個資料夾裡面，讓我們來看看它

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}


```
    
前幾天我們有對Controller做了一段簡單的敘述，這裡我就不多說，你看到有很多的方法，其實他們分別就是對應好關於RESTFul API的模式...
    
    
| 動詞      | 路徑                    | 行為(對應到Controller的方法) | 路由名稱（可以放在`route()`的參數，之後會詳解） |
|-----------|-------------------------|------------------------------|-------------------------------------------------|
| GET       | /article                | index                        | article.index                                   |
| GET       | /article/create         | create                       | article.create                                  |
| POST      | /article                | store                        | article.store                                   |
| GET       | /article/{article}      | show                         | article.show                                    |
| GET       | /article/{article}/edit | edit                         | article.edit                                    |
| PUT/PATCH | /article/{article}      | update                       | article.update                                  |
| DELETE    | /article/{article}      | destroy                      | article.destroy                                 |

    
    
然後我們該怎麼用Route去對應這些function呢？難道要一行一行打嗎？類似這樣

```php
Route::get('articles', 'ArticleController@index');
//...(略)
Route::delete('article','ArticleController@destroy')
```
***其實你可以不用這麼累，Laravel都幫你想到了！***
    
接下來請看仔細了，一行解決：

```php
Route::resource('articles', 'ArticleController');
```

打完收工，明天我還是會從網站一開始(Laravel new)開始約有2~3天從頭到尾簡單實作，敬請期待！
    
如果你想要更深入研究的話可以參考這裡：

https://laravel.tw/docs/5.2/controllers#restful-resource-controllers
https://laravel.com/docs/6.x/eloquent-resources#generating-resources

    
    
      