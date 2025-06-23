---
title: Laravel 使用心得:用laravel 做一個超簡單的文章CRUD
date: '2018-11-04 13:34:16+00:00'
tags:
- crud
- laravel
- php
---
最近因為工作，嘗試使用Laravel 更新我目前手上的專案網站。恩......這陣子使用心得有二  
(1) 真的好好用阿  
(2) laravel 真是博大精深，因為用一套framwork 就要跟隨那一套framework的規則走，有時候都覺得laravel 怎麼可以設計得這麼活!!! 原來還可以這樣寫XDDD

# 關於小弟的PHP旅程

小弟一開始，是認識到CMS，從而知道當時算是CMS界的霸主(不知道現在還是不是XD)&#8211;WordPress! 當時使用著使用著，還蠻方便的!! 而不知道為甚麼，可能我真的很喜歡寫程式使然~ 記得一開始入坑是因為一支很屌的Yahoo 即時通整人程式(哈哈 超屌的!! 我都覺得厲害)，加上小弟讀資料處理科，當時學習的是Visual Basic，而且學的還不錯 ,基於被整就要整回去的「報復心態」，開始從整人程式起家.......寫一些讓電腦關機、無限迴圈等等超無聊的小把戲....到了大學讀資管系，有一陣子荒廢了這部分.....直到某個時候wordpress ，也不知道為甚麼的，居然開始撰寫wordpress 佈景主題，小弟寫了兩套，分別是 [FangJRdesigner][1] 和本站所使用的[JimmyFDesginer][2] 說真的，前面那一套我已經懶得更新了，或許後面這一套會持續在更新(畢竟是本站在使用的，小弟也不知道會不會有空XD) ，漸漸的，我學習及撰寫PHP 純Script 已經好一段時間，當然這段期間也因為CMS界打滾認識到Jommla 和Drupal 等用php 所寫的cms，但最後我還是選擇用Wordpress 架站。

這幾年藉由認識到Hahow 這個募資課程網站，正好有人在教Laravel ，說來也巧小弟也存了一些錢，加上早以心儀framework已久(一直苦於沒有師傅領進門以及沒有恆心毅力學習)，後來就馬上買了那門課程，在上課的過程，發現Laravel 的好用之處以及為甚麼大家都這麼推framwork~~~

但是聽得看得都比不上實際做的，說真的最近才有時間去用laravel 更新我的專案，藉由實做的過程中，漸漸得認識到底甚麼是MVC 到底甚麼樣的方式可以寫讓人看得懂得程式。 最近因為一些工作上的挫敗以及最近在學Laravel 漸漸體認到 雖然解決問題很重要，但要寫出一個讓人看得懂得程式碼及有藝術的程式碼也是很重要的!

# 使用Laravel 做一個超級簡單的部落格

對我來說，如同前面我寫的文章([傳送門](/簡單的crud-操作/))，不過建議大家還是要對於php 物件導向有個簡單基礎的認識，這樣才大概比較了解我所寫的(可能也不會?!)，這裡不做太難的東西，就單純對文章的CRUD而已，以及使用者的登入登出.....兩個表：User 和 Post

## DB migration

Laravel 的設計者真的很聰明，以前我從沒想到，原來db schema 是可以帶著走的，而且藉由env的設計，就算上傳了git 只要我不上傳真正的env(保護自己的資料)，藉由一些簡單的步驟 也可以無痛轉移! 真的超強!

首先，我們必須先新增一個migration 檔

`php artisan make:migration create_post_table --create=posts`

只要下了這個指令就可以做一個create db table schema，接下來你只要在database 資料夾下migrations 底下  
[日期時間戳記]\_create\_post_table.php 定義好你要的欄位，請參考以下[網址][4]，這樣，你就很簡單的下一條指令

`php artisan migrate`

如果你在env 對db的連線夠正確的話，應該會很成功的在你的資料庫看到你定義的東西  
如果有噴錯的話請不要害怕([解決之道在此][5])，google 和 stackoverflow會是你的好朋友，由於篇幅及小弟太懶就不在此贅述了

再來，我們必須定義文章的db schema，在 up function 裡面定義

我是寫這樣的

```php
Schema::create('posts', function (Blueprint $table) {
  $table->increments('id');
  $table->string('title'); //文章標題`
  $table->text('content'); //文章內容`
  $table->timestamps();
}
```

接下來，在下`php artisan migrate`就可以了，你應該可以在你的database 看到post table
## 使用者的登入登出

太沒想到了! Laravel 居然可以這麼輕鬆的做到使用者登入登出還加上了註冊!! 一條指令就能解決

`php artisan make:auth`

接下來在你的controllers 和 view 及model 都會出現一些小變化哦~ 可以去看看

如果想要擋有使用者的輸入輸出可以用middleware !!!

## MVC

mvc 其實說明非常的複雜，我的理解是 Model 是對於資料庫的"連接層"；Controller 處理過程的邏輯；View 則是頁面上的呈現

laravel 製作mvc的指令分別如下  
`php artisan make:controller [controller_name]`  
(--resource)` 加上resource 可以將laravel 原生的資料庫CRUD function 都會幫你宣告進去，至於要製作model 指令為

`php artisan make:model [model_name]`

最後 view 的部分 請在view 的資料夾 裡新增 [view_name].blade.php 吧! 你必須先學會一點blade 語法，可以幫助你撰寫laravel 的 view。

## 關於資料的CRUD

Laravel 對資料的CRUD 採用了ORM 的方式，我簡單來說就是使用物件的方式管理資料庫  
如同前面我寫有關於資料的CRUD ，用純PHP 的方式我們必須同時也要了解SQL語法，這還不打緊，一不小心寫錯了SQL語法....還會噴一堆錯誤Trace code trace了半天

關於詳細得CRUD 我覺得Laravel 的[文件][6]其實也寫的很清楚，歡迎去翻閱看看

首先，前面我說過MVC的架構，在Laravel 就是使用這樣的架構，所以我們先建立與資料庫密切相關的Model

`php artisan make:model Post`

接下來你就會看到在App 資料夾底下會有一個 Post.php。

Laravel 很聰明，為了防止別人惡意的大量新增，所以我們必須先設計哪些欄位可以做大量賦值的動作。在Post.php  class 裡增加這一句話：

```php
protected  $fillable= ['title', 'content'];
````

之後，要建立controller 與model 串連

`php artisan make:controller PostController --resource`

接下來你就會在`app/Http/Controllers/` 看到`PostController.php`

MVC 的架構讓我們在實做文章的增刪改查上會有點複雜和麻煩，但好處是可以分隔所謂的邏輯和頁面。

在`PostController.php`最上面先宣告使用的Model`Use App\Post;`

接下來就進入CRUD的邏輯世界了，我這裡簡單的寫一下，可以的話請直接參考[這裏](https://github.com/r567tw/laravel-blog/blob/master/app/Http/Controllers/PostController.php)


總而言之，在Laravel 裡有個Routes 的資料夾，分別有api.php web.php 等等檔案，有點類似說要定義laravel 這個程式該"怎麼走"，例如post/ 就會到post 的首頁，要把post 裡所有的資料都列出來。

之後請在`Routes/web.php`裡面添加這一行:

```php
Route::resource("posts",PostController);
```
resource 的方法就是讓在這個地方底下，添加對於PostController 的CRUD 等功能。

(這裡我就姑且不寫驗證了......)


- 新增
呈現頁面為create function ；真正寫入資料庫的邏輯為store function
```php
$post=Post::create($request->all());
return redirect('post');
```
- 查詢
```php
return view('show')->withPost(Post::find($id));
```
- 修改
呈現頁面的為edit function ；真正更新的邏輯為update function
```php
$post=Post::find($id);
$post->update($request->all());
return redirect('post');
```
- 刪除
在destroy function 中
```php
$post=Post::find($id);
$post->delete();
return redirect('post');
```

另外在頁面實作中，請在resource/view 資料夾當中新增 以.blade.php 為附檔名的檔案，注意REST_Ful URL 的規則。在form 裡面要記得呼叫 method_field(`接PUT 或者 Delete`) 以及 csrf_field()，這裡我就真的不繼續詳述了，因為都是HTML 和CSS 以及Blade 的用法
# 總結

好吧! 我個人其實覺得我寫得很不像一個教學文章....我自己以後會好好學習寫一個教學文章的，只是對Laravel 的一個學習及筆記吧(可能只有我看得懂哈哈XDDDD)

這裡是[原始碼][7]，請大家服用!

Laravel 的世界很廣，真的有好多好多需要學習的喔，最後還是要詳看文件 看文件 看文件  很重要所以說三遍

> 小君曰：Laravel也有一個很不錯的CMS 教做 October-CMS 超酷的!!! 或許改天我就跳坑了吧XD

&nbsp;

 [1]: https://github.com/r567tw/FangJRdesigner
 [2]: https://github.com/r567tw/JimmyFDesginer
 [4]: https://laravel.com/docs/5.4/migrations#columns
 [5]: https://laravel-news.com/laravel-5-4-key-too-long-error
 [6]: https://laravel.com/docs/5.4/eloquent
 [7]: https://github.com/r567tw/laravel-blog