---
title: Laravel Pint 簡易教學
date: "2022-08-02 01:33:11+00:00"
tags:
  - laravel package
---

# 前言

好的工程師通常對於自己的 code 會有所在意，並思考著如何能讓程式碼更讓人好懂,好閱讀。
以及通常團隊裡也會有統一的 coding-style。

在 Laravel 9 之後有個套件我覺得很有趣，它就在某個程度上就解決了這個情境
個人認為蠻值得簡介一下，叫做 Laravel Pint。

<!-- truncate -->

# 安裝

首先, 我們先安裝這個套件。

composer require laravel/pint --dev

安裝完之後，你就可以使用`./vendor/bin/pint`這個指令了。

# 取得版本

```
vendor/bin/pint --version
```

# 客製化

在文件裡指出，coding-style 可以被客製設定。在 root 目錄建立一個叫做`pint.json`的檔案即可。
裡面的內容則是

```
{
    "preset": "laravel"
}
```

這樣它就會設定 laravel 為這個專案的固定 coding-style。
如文件說明，你也可以客製底下的 rule 來處理。

如果想要看的更多可以參考這裡：https://laravel.com/docs/9.x/pint

by the way: 也可以看這個影片：https://www.youtube.com/watch?v=dvxzuH2ds8A

> 小君曰：如何成為一個好的工程師永遠是我人生上的一大哉問。
