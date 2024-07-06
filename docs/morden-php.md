---
title: 現代PHP 閱讀筆記
type: post
date: 2019-08-25T07:28:00+00:00
categories:
  - learning
tags:
  - php
url: posts/morden-php
---
# 1.現代的php

- php 是一個直譯式的伺服器端腳本語言
- php 引擎是一個可以解析、直譯和執行php 程式碼的程式
    - Zend Engine
    - HipHop Virtual Machine
- Hack 程式語言：建立在PHP 之上的新程式語言
    - 靜態型別
- 動態型別在程式執行時期檢查；靜態型別再編譯時期被檢查(第十二章)

# 2.特點
- 名稱空間 namespace
    - php5.3.0
    - 解決class 名稱的衝突
    - 緊接`<?php`標籤之後
    - 讓我們創造出程式碼並獨立運作於其他開發者的程式
- Import and Alias
    - 不用輸入完整的namespace 落落長的名稱

```php
#不利用import and alias
$response = new \Symfony\Component\HttpFoundation\Response('oops',400);
#利用import and alias
use \Symfony\Component\HttpFoundation\Response as Res
$r=Res('oops',400)
```
- 多重匯入(可以好幾個use)
- 單一檔案多重名稱空間

```php
<?php
namespace foo{

}
namespace bar{

}
```

- 全域名稱空間
    - 有些程式碼沒有名稱空間，將存在於全域名稱空間，例如`exception`

```php
<?php
namespace My\App
class foo{
    public function do(){
        $exception = new \Exception()
    }
}
```

- 程式碼作為介面
    - 一個介於兩個php 物件之中的合約，它讓一個物件瞭解另一個物件可以做甚麼，而不是另一個物件是甚麼
    - interface 的撰寫
- 特徵機制
    - trait
    - from php5.4
    - 模組化實作方式可以被插入到不相關的類別中

```php
<?php
trait mytrait{

}
#use trait
class myclass{
    use mytrait;
}
```

- 產生器
    - from php 5.5
    - 簡單的迭代器
    - [文章參考][1]
    - 如果一次把檔案讀入記憶體，會使用掉很大的資源，比較好的處理方式是用streaming的方式讀取，逐步處理讀取的內容。
    - 不會要求你的類別實作Iterator 介面，產生器只在需要的時候計算並產生迭代的數值

```php
<?php
function makeRange($length){
    for ($i=0; $i<$length; $i++){
        yield $i;
    }
}

foreach (makeRange(10000000) as $i){
    echo $i,PHP_EOL;
}
#ｃｓｖ　產生器
function getRows($file){
    $handle = fopen($file,'rb');
    if ($handle ==== false)
    {
        throw new Exception();
    }
    while (feof($handle) === false){
        yield fgetcsv($handle);
    }
    fclose($handle);
}

foreach (getRows('data.csv') as $row){
    print_r($row);
}
```

- 閉包
    - from php 5.3.0

```php
$closure = function ($name){
    return sprintf('hello %s',$name);
}

echo $closure('josh') # output=> 'hello josh'

$numberplusone=array_map(function ($number){
    return $number+1;
},[1,2,3]);

print_r($numberplusone);
# output=>[2,3,4]
```

- 繫結狀態
    - 閉包裡的閉包 closure in closure
    - [參考文章][2]
    - bindTo and invoke
        - [參考文章][3]
    - 利用use 關鍵字傳入多個參數到closure 可以利用逗號區分變數，如同其他任何php函式或方法的參數

```php
<?php
function enclosePerson($name){
    return function($doCommand) use ($name){
        return sprintf('%s $s',$name,$doCommand);
    };
}

$clay=enclosePerson('Clay');
echo $clay('get me sweet tea!');
# output=> 'Clay get me sweet tea!'
```

- Zend OPcache
    - [文章][4]
- 內建http 伺服器

```bash
php -S localhost:4000
```
# 3.標準

- PHP-FIG 到 Rescue
- 框架互通性 
    - 介面
    - 自動載入
    - 風格
- PSR 
    - PHP 標準協議 PHP standards recommendation
- PSR-0 已棄用，由PSR-4 取代
- PSR-1:基本程式碼風格 
    - PHP 標籤 你要用PHP 標籤 或 包覆PHP 程式碼
    - 編碼：必須以沒有位元順序標記的utf-8字元編碼
    - 目的：每個php檔案可以用來定義符號或執行一個有作用的動作
    - 自動載入: 你的名稱空間和類別必須支援psr-4 自動載入器標準
    - 類別:使用CamelCase 格式 ex. CoffeeGrinder
    - 常數名稱:必須使用大寫，並且必要時使用底線
    - 方法名稱:使用camelCase 格式，弟一個字要小寫，每個單字的第一個字元是大寫
- PSR-2:嚴厲程式碼風格 
    - 實做PSR-1
    - 縮排：建議表示四個空白字元縮排
    - 檔案和行距：使用ＬＦ　做為每一行結尾，檔案最後應該保有最後一行並且不能包含?> 每一行不應超越80個字元，如果不得以，不能超越120個字元，每行結尾不能有空白字元
    - 關鍵字:以小寫表示所有的關鍵字
    - 名稱空間:每一個名稱空間的宣告都必須接上一行空白行，同樣的在USE 區塊之後要接上一行空白行
    - 類別:建議表示起始括號在類別內容結束的下一行，extends 和implements 關鍵字必須和類別名稱同一行
    - 方法:方法定義的起始括號必須要在方法名稱下一行的開頭，結尾在方法內容結束後的下一行開頭，第一個參數不用以空白結尾，而最後一個括號不用預留前置的空白，方法的每一個參數(除了最後一個)都緊接著一個逗號和一個空白
    - 能見度:必須宣告能見度，public protected private，abstract 或finial 在能見度之前，static 在能見度之後
    - 控制流程:所有控制流成關鍵字必須接上一個空白字元，起始括號和控制流成關鍵字同一行，結尾則在新的一行
- PSR-3:記錄器介面 
    - 實做php 記錄器
- PSR-4:自動載入器

# 4.元件

- 框架
- Packagist 可以尋找合適的元件
- composer
    - 安裝
    - 元件安裝
- 建立php 元件
    - src
    - tests
    - composer.json
    - README.md
    - CoONTRIBUTING.md
    - LICENSE
    - CHANGELOG.md

# 5.良好習慣

- 消毒、驗證和跳脫
- 日期時間與時區

# 6.寄存

- 共享伺服器
- 虛擬私有伺服器 VPS
- 獨佔伺服器
- PaaS

# 7.服務開通
vps 的開通
- `php-fpm`

# 8.調校
- php.ini
- 記憶體
- zend opcache
- 檔案上傳
- 最大運行時間
- session 處理
- 輸出緩衝區
- 真實路徑快取

# 9.部屬

- 版本控制
- 自動化部屬
    - 保持簡單
    - 保持可預測
    - 保持可反悔
- 工具
    - capistrano
    - deployer
    - magallanes
    - rocketeer

# 10.測試

- 何時開始
    - 開發前
    - 開發當中
    - 開發結束
- 如何測試
    - 單元測試
        - PHPUnit
    - 測試驅動開發TDD
    - 行為驅動開發BDD
- 以Travis CI 持續測試
    - 測試應當自動化進行

# 11.剖析

- 分析應用程式效能的一種方式
    - 用於開發階段
    - 用於產品階段
- Xdebug
- XHProf
- New Relic 剖析器
- Blackfire 剖析器

# 12.HHVM 和 HACK

- HHVM
    - PHP 引擎
    - 已經最佳化應用程式但是需要更高效能的開法者
- HACK 語言

```php
<?hh
echo "I'm Hack";
```

- 靜態型別
    - 編譯
- 動態型別
    - 一直到執行階段才被檢查
- HACK 同時實做了靜態與動態~

# 13.社群

- 當地PUG
    - http://php.ug
- 研討會
- 導師
    - http://phpmentoring.org
- 持續吸收新知

# 補充

## PSR PHP標準建議

- [文章連結][5]
- PHP標準建議編號1(PSR-1)，基本編碼標準. 像是類別(Class)名稱必需宣告為StudlyCaps，方法(Method)的名稱需宣告為camelCase..等
- PHP標準建議編號2(PSR-2)，則是PSR-1的擴充，規範了PHP編碼風格，像是extends或是implements必需與class名稱同一行…等。
- PHP標準建議編號4(PSR-4)，則定義了自動載入(Autoloader標準)

 [1]: https://ithelp.ithome.com.tw/articles/10133614
 [2]: https://ithelp.ithome.com.tw/articles/10132747
 [3]: http://oomusou.io/php/php-bindTo/
 [4]: https://blog.longwin.com.tw/2016/02/php-zend-opcache-accelerate-2016/
 [5]: https://www.ccc.tc/article/php-standards-recommendations#