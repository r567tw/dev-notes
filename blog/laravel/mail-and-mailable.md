---
title: Laravel Mail and Mailable
date: '2019-09-30 03:30:40+00:00'
tags:
- laravel
- ithome
---
接下來我們要講講關於 Laravel 的 Email 的功能，其實所謂的現代框架，尤其是像 Laravel 本身這樣「全能型」的框架，基本上都會有相關寄信、送信的功能。現在讓我們～開始囉～

# 介紹 MailTrap 服務

要讓程式寄送電子郵件，首先一定是要有個`SMTP`的 SERVER 才可以，不可能無緣無故就讓你用幾行程式簡簡單單就寄送出去，當然要有一個從什麼發出來的東西啊～如果不太了解什麼是 SMTP 沒關係，你先將它當作類似 Apache 或者 Nginx 提供 HTTP 服務的東西，只是它是提供`Email寄送`的服務。

**但我們又不是 MIS，哪裡來的 SMTP 啊**

沒關係，你只要知道，現代網路上基本上你的問題絕對不是第一個發生的，如果可以，一定有解決方案，如果沒有解決方案，~~那就解決提出問題的人~~

總之`MailTrap`就是類似這樣的服務，可以方便提供開發者作出簡單的測試信件之類的，你現在上面註冊過帳號，然後到https://mailtrap.io/inboxes 這裏，你會看到底下的畫面

![https://ithelp.ithome.com.tw/upload/images/20190930/201069999g0JUqbrlH.png](https://ithelp.ithome.com.tw/upload/images/20190930/201069999g0JUqbrlH.png)

選擇點進去某個 inboxes 當中，之後你會看到這樣的畫面。
![https://ithelp.ithome.com.tw/upload/images/20190930/20106999WkPyYf2H0n.png](https://ithelp.ithome.com.tw/upload/images/20190930/20106999WkPyYf2H0n.png)

叮咚，我們有一個可以測試用的 SMTP 囉～
**不過這只是屬於開發中在用的，如果要搬到正式專案上建議仍是要有一個真正的 SMTP Server 喔**

# 填入 SMTP 資訊到.env 當中

如何將 SMTP 連結我們的 Laravel 專案呢？那些繁複的過程和程式其實 Laravel 大部分都幫我們寫好了，我們只要填入資訊即可，讓我們到`.env`這個檔案當中，你會看到`MAIL_DRIVER`那裡，請把你剛剛在`mailtrap`上看到的`username`和`password`分別對應填到`MAIL_USERNAME`和`MAIL_PASSWORD`裡
![https://ithelp.ithome.com.tw/upload/images/20190930/20106999KzLt3Qbr5A.png](https://ithelp.ithome.com.tw/upload/images/20190930/20106999KzLt3Qbr5A.png)

# 開始寫 Mailable

連線資訊準備好了，那我們來準備寄信看看吧！
首先讓我們建立一個叫做`Mailable`的東西，這是 Laravel 所提供的 class

```
$ php artisan make:mail FirstMail
```

有沒有看到`app`資料夾裡面多了`mail/FirstMail.php`呢？
![https://ithelp.ithome.com.tw/upload/images/20190930/20106999uwP2SdY0Pj.png](https://ithelp.ithome.com.tw/upload/images/20190930/20106999uwP2SdY0Pj.png)

之後，我們去到`FirstMail.php`這個檔案改寫一下`build()`這個地方，改寫為

```
public function build()
{
    return $this->from('example@example.com')->view('mail.index');
}
```

有沒有看到很熟悉的`view`啊，所以讓我們到`views`裡面建立`mail/index.blade.php`
![https://ithelp.ithome.com.tw/upload/images/20190930/201069998Iepk240YG.png](https://ithelp.ithome.com.tw/upload/images/20190930/201069998Iepk240YG.png)

之後在`index.blade.php`放一段簡單的`HelloWorld`就好。這樣我們的 Mail 大概完成了啦～

# 使用 Mailable

之後我們寫一個簡單的路由規則

```
Route::get('sendMail', function () {
    \Mail::to('abc@abc.com')->send(new \App\Mail\FirstMail);
});
```

之後`php artisan serve`之後到`http://127.0.0.1:8000/sendMail`

回到`MailTrap`，本堂課完成！
![https://ithelp.ithome.com.tw/upload/images/20190930/201069999aOraj8Gr8.png](https://ithelp.ithome.com.tw/upload/images/20190930/201069999aOraj8Gr8.png)

不過啊，寄 Email 也可以帶上一些參數、附件，這些都是可以的喔，如果你有興趣想更加進深，可以參考~~史上最好看的~~官方文件：https://laravel.com/docs/6.x/mail

要看完整程式碼的可以參考這裡: https://github.com/r567tw/Make-PHP-Great-Again/commit/85bb74924e6fb29aa7eb4d7910468fbf69b8f8d9
