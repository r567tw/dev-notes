---
title: Laravel Error and Logging
date: '2019-10-02 16:23:18+00:00'
tags:
- laravel
- ithome
---
今天簡單點、輕鬆一點。

接下來讓我來介紹一下關於 Laravel 的 Log 功能，有時候我們會需要使用到紀錄的功能，需要知道這個 request 到底發了哪些東西，這樣才能方便我們**追蹤**我們寫的程式與網頁

Laravel 的 logs 其實都放在`storage/logs`這個資料夾當中，你會發現有很多以 Laravel 為前綴並且加入`date`的`.log`檔，如果沒有可能剛好只是你的目前的 log 等級還沒有到那裡(預設是 error，也就是有錯誤的時候才會放進去 log 檔裡面)

![https://ithelp.ithome.com.tw/upload/images/20191003/20106999TkOYLOljXr.png](https://ithelp.ithome.com.tw/upload/images/20191003/20106999TkOYLOljXr.png)

其實要弄 log 非常得簡單，使用`Log`這個類別即可完成～現在讓我們以之前創建文章的那裡作為範例，首先先去`ArticleController.php`這個檔案裡面

```
use Log;
....(略)
    public function store(Request $request)
    {
        Log::info('Hi 我們的第一個Log訊息');
        $title = $request->title;
        $content = $request->content;

        $article = new Article();
        $article->title = $title;
        $article->content = $content;
        $article->save();

        return redirect(route('article.index'));
    }
```

當你新增文章之後，你去到最新日期的.log 檔，就會看到一行「Hi 我們的第一個 Log 訊息」囉！
![https://ithelp.ithome.com.tw/upload/images/20191003/20106999mKc259AE6x.png](https://ithelp.ithome.com.tw/upload/images/20191003/20106999mKc259AE6x.png)

# 設定 Log 的設定

其實 Laravl 提供我們很多有關於 Log 的設定，其實我們可以跑到`config/logging.php`裡面，其實就記載了許多不少的設定，順便補充說明一下`env()`這個方法，他其實就是在讀取.env 檔的設定喔，所以當我們回來看到.env 檔會看到一行

```
LOG_CHANNEL=stack
```

為什麼 Laravel 預設 log 都是加入日期，然後一個日期一個日期紀錄呢？**能不能統一紀錄同一個？**

Laravel 聽到你的心聲囉，讓我們把.env 裡面`LOG_CHANNEL`從`stack`改為`single`，其實再一次新增文章之後，你就發現我們的 log 檔就多了一個名叫`laravel.log`的檔案啦！
![https://ithelp.ithome.com.tw/upload/images/20191003/201069999lzk4Jv6B6.png](https://ithelp.ithome.com.tw/upload/images/20191003/201069999lzk4Jv6B6.png)

# Log 到 Slack

接下來我們來玩一個極有趣的功能，就是讓 log 跑到 slack 上面，其實非常簡單，Laravel 早就幫我們準備好了，總之就是在.env 檔案裡面增加一行

```
LOG_SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxxxx
```

這個`LOG_SLACK_WEBHOOK_URL`請自行去[這裏](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks?next_id=0)自行加入到自己的 workspace 來找囉！

然後要去一下`config/logging.php`修改一下 slack 的 log level，把他從原本預設的`critical`改為`debug`

```
        'slack' => [
            'driver' => 'slack',
            'username' => 'Laravel-Bot',
            'emoji' => ':boom:',
            'level' => 'debug',
        ],
```

之後測試一下新增文章，就會在 slack 找到訊息呢！
![https://ithelp.ithome.com.tw/upload/images/20191003/201069998R0HHedUUk.png](https://ithelp.ithome.com.tw/upload/images/20191003/201069998R0HHedUUk.png)

如果想要更加使用 log 功能的可以看看以下參考資料：

- https://laravel.com/docs/6.x/logging
- http://kejyun.github.io/Laravel-5-Learning-Notes-Books/services/errors/services-errors-log-packages-slack-log.html

要看完整程式碼的可以參考這裡:https://github.com/r567tw/Make-PHP-Great-Again/commit/dd0466752a79040420427981c94fc22a9e7189c2
