---
title: Laravel Artisan 以及 Command
date: '2019-09-29 04:41:13+00:00'
tags:
- laravel
- ithome
---
接下來讓我們來討論關於 Command 的部分，Laravel 本身提供了一些類似 CLI 的部分，許多強大的現代框架大部分也都會有類似的功能。對了，補充一下，CLI 全名是：`Command-line interface`，意思是他有別於圖形化介面，以不倚靠滑鼠、大部分倚靠鍵盤，key 進一連串的文字及指令。

Laravel 的 CLI 名為`Artisan`，他的使用方式就是在`artisan`前面加上`php`，意思是我用 php 去執行`Artisan`這個檔案，讓我們來看看 Laravel 的資料夾，是不是果真就有一個 Artisan 的檔案呢？
![https://ithelp.ithome.com.tw/upload/images/20190929/20106999diDv0i4K86.png](https://ithelp.ithome.com.tw/upload/images/20190929/20106999diDv0i4K86.png)

然後其實`Artisan`本身也就是一個 php 的檔案，基本上就是和`public/index.php`有點像，就是啟動核心來 Handle 我們的輸入及輸出。只是這個 kernal 是從 HTTP 的部分換成 Console，不過沒關係，如果你對 Laravel 的源碼非常有興趣，可以自行研究。我們其實只要怎麼用，~~知道出問題找誰就好了。~~

# Laravel 提供的指令

其實在你建立 Laravel 的時候，Laravel 就附帶很多的指令供我們操作，之前我們不是常常建立那些 Controller、Migration 或者 Model 之類的檔案嗎，都可以透過 Artisan 為我們建立看來，你可以下`php artisan list`就知道到底 Laravel 為我們提供了哪些指令。
![https://ithelp.ithome.com.tw/upload/images/20190929/20106999NCrZ70kb1P.png](https://ithelp.ithome.com.tw/upload/images/20190929/20106999NCrZ70kb1P.png)

其實這個圖片後面還有很多指令，我們之前也常用這些指令，像是`php artisan serve`或者`php artisan migrate`等等。其實有些我在前幾天的文章都會統一整理在`Artisan 相關指令`這個小章節，但之後我們也會繼續補充，乾脆許願一下如果本篇訂閱人數在 30 天結束前超過 20 人就來寫一篇`超完整Artisan 指令CheetSheet`好了～ ~~不過其實你用前面的 php artisan list 就好了啊~~

# 產生新的指令-Scafford 指令

還記得我們在第四天講到 Route 路由的部分嗎？如果忘記的可以到這裡複習:[Laravel Route(路由)](https://ithelp.ithome.com.tw/articles/10217731)

其實啊，在 routes 這個資料夾底下就有一個名為`console.php`這個檔案，如果你有舉一反三的能力應該會清楚，我們在 web.php 那時使用`function`的部分嗎？之後我們很少在`web.php`裡面在寫類似`function`這種呼叫模式了，基本上我們都用 Controller 替代，相對 Console.php 而言，Command 其實就是對應像是 Controller 的角色。讓我們之後用舉例來做說明：
首先，我們先開始執行`make`的指令

```
$ php artisan make:command FirstCommand
```

註：其實啊，這個 FirstCommand 這一串字你可以替換任何你想替歡的字串。

之後你會在 app\Console\Command 的資料夾裡看到`FirstCommand.php`這個檔案囉
這也表示我們**成功一半了**

# 產生新的指令-寫指令裡面的功能

接下來讓我們來看看這個幫我們產生出來的`FirstCommand.php`到底做了什麼事情，讓我們先來打開他看看

```
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class FirstCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:name';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        //
    }
}

```

我們發現這個 FirstCommand 繼承了 Command 這個類別，而 Command 這個類別其實就是 Laravel 本身提供的類別，你會發現在之後我們常用他的方法～

哦~ 我們發現他裡面有一個`signature`的屬性，其實這就是我們在 CLI 所要放的字串，舉例來說我們常常會用到`php artisan serve`，那麼這個`signature`就是`serve`。

現在讓我們在`signature`為其賦予一串文字吧，我先以`HelloWorld`作為起頭。

```
// 修改一下protected $signature = 'command:name';
protected $signature = 'HelloWorld';
```

然後之後要在`handle()`裡開始寫我們的執行流程和邏輯，在這裏其實很簡單，

```
public function handle()
{
    $this->info('HelloWorld');
}
```

接下來神奇海螺的事情發生了，在 Command line 打上`php artisan HelloWorld`就會出現`HelloWorld`的字樣呢！

![https://ithelp.ithome.com.tw/upload/images/20190929/20106999vlqOFnweB4.png](https://ithelp.ithome.com.tw/upload/images/20190929/20106999vlqOFnweB4.png)

不過我知道你會疑惑 Laravel 給我們的形式`Command:name`是什麼意思，呵呵，有時候我們打指令不是也會加入一些參數或引數嗎？`name`就是這樣的用法~ 讓我們來改造一下 HelloWorld 來做示範看看

- 將 \$signature 改成`HelloWorld:name {name}`
  註：如果你還記得我之前教的 route 嗎？其實參數就是這麼簡單加入的喔～

```
protected $signature = 'HelloWorld:name {name}';
```

- 之後再`Handle()`可以用這樣的方式接下`$name`

```
public function handle()
{
    $name = $this->argument('name');
    $this->info('Hello ' . $name);
}
```

之後我們自製的指令就可以這樣更加進階：`php artisan HelloWorld:name {NAME}`
像是下圖：
![https://ithelp.ithome.com.tw/upload/images/20190929/20106999Xj3GF5LBci.png](https://ithelp.ithome.com.tw/upload/images/20190929/20106999Xj3GF5LBci.png)

另外，Laravel 的 Console 可不只有`info`這種只會顯示資料的方法喔，他還有很多的功能，例如問答

```
$framework = $this->ask('What is your favorite framework?');
$this->info($framework);
```

如果希望對 Command 有更多的研究可以參考文件：https://laravel.com/docs/5.8/artisan

之後我們會談到 Schedule 的部分，也就是 Cron Job 的相關，可以讓電腦為我們做一些例行公事的概念，會與 Command 有密切的相關，所以希望你能先將 Command 這個特色有ㄧ些基礎的概念

要看完整程式碼的可以參考這裡: https://github.com/r567tw/Make-PHP-Great-Again/commit/7a46a36355f31d3789db26c3e0e713d4ae324c52
