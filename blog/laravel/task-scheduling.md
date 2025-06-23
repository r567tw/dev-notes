---
title: Laravel Task Scheduling
date: '2019-10-07 16:24:11+00:00'
tags:
- laravel
- ithome
---
接下來我想要分享一些關於 CronJob 的一些事情，有時候，我們會有一些日常的工作需要在每天某一個時間固定執行，像是網頁世界最常見的就是`發電子報`，這只是最常見的例子，當然還有其他類似的例子，例如`會員卡收費`、`清Log`之類的，我們可以透過 Laravel 的 Task Scheduling 來做這些事情，管你想新增多少項、要做什麼，只要能用程式寫得出來，都可以來做喔！

還記得我們前幾天談到的[Laravel Artisan 以及 Command](https://ithelp.ithome.com.tw/articles/10222395)嗎？當然，寫 Task Schedule 可以有很多種不同的方式，但我個人建議是使用先建立 Command 的方式可以讓我們比較好的管理程式碼。當然，其他方法我也會分享的喔～

# 把 Laravel 加入 CronJob

不知道什麼是 Cron Job 嗎？我剛剛都解釋那麼清楚了：就是一到某個時間，電腦(如果還是開啟的狀態下)就會執行的工作。相對於我們網頁必須要透過`request`才能發動`response`的情況下，`Cron Job`主動多了。

如果你是 Mac 或者 Linux 系統，可以使用這個指令，如果你是 windows 的話，~~建議你換一個作業系統~~，開玩笑的，是可以參考網路上說在 windows 建立 cron job 的流程。

```
$ crontab -e
```

這個指令會讓你進入到一個`vim`的模式，你可以參考[即將失傳的古老技藝 Vim](https://ithelp.ithome.com.tw/users/20065770/ironman/2866)，總之我們先按一個`i`按鍵，加入底下這行

```
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

`path-to-your-project`只是個例子，請使用你所在的 Laravel 的主目錄
這個部分就是告訴電腦`每分鐘都到我那個Laravel專案的目錄，執行php artisan schedule:run 這個指令`

貼完那一行之後，你可以按`esc`,之後使用`:wq`，離開`vim`的模式。
之後你會看到這個結果就表示你成功了啦

```
crontab: installing new crontab
```
![https://ithelp.ithome.com.tw/upload/images/20191008/20106999mFLGgm4RvV.png](https://ithelp.ithome.com.tw/upload/images/20191008/20106999mFLGgm4RvV.png)
你也可以用`crontab -l`做進一步的確認。
![https://ithelp.ithome.com.tw/upload/images/20191008/20106999v9xBJ99Fkk.png](https://ithelp.ithome.com.tw/upload/images/20191008/20106999v9xBJ99Fkk.png)

# 定義要被 schedule 的指令或流程

該在哪裡定義 schedule 呢？其實很簡單喔，就是在`app/Console/Kernel.php`這個檔案裡啦，你會發現有一段被註解的

```
        // $schedule->command('inspire')
```

沒錯喔，他的意思就是每一個小時執行`inspire`這個指令，也就是`php artisan inspire`

你可以參考這個文件：https://laravel.com/docs/6.x/scheduling#schedule-frequency-options

這也就是為什麼我要說這部分也和`artisan 和 command`有所關係，把前面的`php artisan` 去掉就可以加入 command 的參數作為執行。

為了方便，我們可以改成

```
$schedule->command('inspire')
        ->everyMinute()
        ->appendOutputTo('inspire.log');
```

之後你就會看到 laravel 專案有一個`inspire.log`，裡面每一分鐘就會增加一句 inspire 的話語呢！

當然除了`command`的方式，你也可以使用其它方式呢～讓我做個簡單的示範

```
        $schedule->call(function () {
            file_put_contents('time.log', \Carbon\Carbon::now());
        })->everyMinute();
```

這個例子就是每分鐘將每一次時間記錄在`time.log`～

如果有想要學習更多可以看看這個：https://laravel.com/docs/6.x/scheduling

要看完整程式碼的可以參考這裡:https://github.com/r567tw/Make-PHP-Great-Again/commit/49f53d4e3f6b2b89883c905d7f55248a627c910c
