---
title: PHP
sidebar_position: 1
---
:::info
- 內容整理 From `PHP學習手冊` & `現代PHP` ＆ `工作經驗`
:::

## Intro
- 後端語言
- php 引擎是一個可以解析、直譯和執行php 程式碼的程式
    - Zend Engine
    - HHVM 和 HACK
    - PHP-FPM 作為 Zend Engine 和 Web Server 的中間層
        - 服務啟動時建立 Master 跟數個 Workers，管理 PHP Process
        - 優化：- https://geekflare.com/php-fpm-optimization/
- [PHP 如何運作](https://hackmd.io/@Burgess/S1HL_7fov)
- 開始標籤與結束標籤: `<?php`、`?>`
- 註解
- **require**
    - 出現錯誤**直接停止**程式
- **include**
    - **有問題會繼續**執行接下來得php程式

## Data Structure
- 文字: 單引號或者雙引號皆可
- 數字
- 布林：true 和 false
<!-- - function
    - trim()
    - strlen()
    - strcasecmp 不分大小寫的字串比較
    - printf()
    - strtolower()
    - strtoupper()
    - len() -->

## Control Flow
- if elseif else
- == 和 === 和 !=
- for while foreach
- Error Handing: try...catch

## Array
- array()

## Function
```php
function page_header({string} $color){

}

page_header($color)
```

- closure 
```php
$closure = function ($name){
    return sprintf('hello %s',$name);
}

echo $closure('josh') ## output=> 'hello josh'

$numberplusone=array_map(function ($number){
    return $number+1;
},[1,2,3]);

print_r($numberplusone);
## output=>[2,3,4]
```
- 繫結狀態
    - [參考文章](https://ithelp.ithome.com.tw/articles/10132747)
    - 利用 use 關鍵字傳入多個參數到closure 可以利用逗號區分變數，如同其他任何php函式或方法的參數
```php
<?php
function enclosePerson($name){
    return function($doCommand) use ($name){
        return sprintf('%s $s',$name,$doCommand);
    };
}

$clay=enclosePerson('Clay');
echo $clay('get me sweet tea!');
## output=> 'Clay get me sweet tea!'
```

## Object
### Simple
```php
    class person{
        public $name;
        public function __construct(){

        }
        public {static} function walk(){

        }
    }
    #$person->name
    #$person::walk()/static
    #$person->walk() /no static
```
### extends
### interface
### trait
- [用法可參考文章](http://oomusou.io/php/php-trait/)
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

## Namespace
> 提供一種組織程式碼的方法，確保你的類別名稱不會與別人的類別名稱衝突

- 緊接`<?php` 標籤之後，如果要用別的namespace就可以使用`use` 關鍵字
- Alias: 不用輸入完整的namespace 落落長的名稱
```php
#不用
$response = new \Symfony\Component\HttpFoundation\Response('oops',400);
#使用Alias
use \Symfony\Component\HttpFoundation\Response as Res
$r=Res('oops',400)
```

### 多重匯入(可以好幾個use)
### 單一檔案多重名稱空間
```php
<?php
namespace foo{}
namespace bar{}
```
### 全域名稱空間
> 有些程式碼沒有名稱空間，將存在於全域名稱空間，例如exception
```php
<?php
namespace My\App
class foo{
    public function do(){
        $exception = new \Exception()
    }
}
```

## Magic Method
https://www.php.net/manual/en/language.oop5.magic.php#object.tostring
https://ithelp.ithome.com.tw/articles/10135522

1. __toString() : echo $p 的時候可以直接印出class 的資料, 如果有實作這個方法的話
2. __get(): 可以宣告沒有的屬性...
3. __set()
4. __call() : 如果最後找不到function , 如果有實作則會執行它
5. __callStatic() : __call 的static 版
6. __invoke()
7. __sleep / __wakeup
8. __clone()
9. $GLOBALS 陣列

## DateTime
```php
$d = new DateTime();
print $p->format('m/d/y');
```
- 解析日期與時間
- 計算日期與時間
    - modify('+2 day');
- 時區
    - date_default_timezone_set()

## Email
- Swift Mailer

```php
## composer require swiftmailer/swiftmailer
requrie "vendor/autoload.php"
$transport=Swift_SmtpTransport::newInstance('smtp.example.com',25);
$mailer = Swift_Mailer::newInstance($transport);

$message=Swift_Message::newInstance();
$message->setFrom('a@example.com');
$message->setTo(array('b@example.com'=>'james bard'));
$message->setSubject('example');
$message->setBody('example');
## 如果要寄HTML $message->setBody('example',"text/html");               
```
## Multilingual
- 文字處理
- 排序和比較
    - Collator
- 本地化輸出
    - MessageFormatter

## Form
- $_POST[]
- $_GET[]

## Database
- PDO
- Mysqli

## File
- file_get_contects()
- file_put_contents()
- fopen()
- fclose()
- fwrite()
- fgets()
- fgetcsv()

## Curl
- cURL
```php
curl_init()
curl_setopt()
curl_exec()
```

## Testing
- 單元測試：確認小段程式碼正確的方法
- 隔離受測程式
    - 重要測試原則
- 測試導向開發 TDD
    - 有一個新功能要開發時，你先把測試程式寫好，才開始開發新功能

- PHPUnit
    - 安裝 或者composer require-dev phpunit/phpunit
    - extends PHPUnit_Framework_TestCase
        - function testWithTaxAndTip()
            - $this->assertEquals(result,value)

## Package
- Composer
- Packagist 可以尋找合適的元件

## CLI & Built-in HTTP SErver
- $_SERVER['argv']
- php example.php
- php -a
- 內建http 伺服器
```sh
php -S localhost:4000
```
- composer global require psy/psysh

## Generator
- 簡單的迭代器
- [文章參考](https://ithelp.ithome.com.tw/articles/10133614)
- 如果一次把檔案讀入記憶體，會使用掉很大的資源，比較好的處理方式是用streaming的方式讀取，逐步處理讀取的內容。
- 不會要求你的類別實作`Iterator`介面，產生器只在需要的時候計算並產生迭代的數值
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
#csv產生器
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


## Coding Stype
- PSR：PHP 標準協議 PHP standards recommendation

### PSR-0 已棄用，由PSR-4 取代
### PSR-1:基本程式碼風格
    - PHP 標籤 你要用PHP 標籤`<?php ?>` 或 `<?= ?>`包覆PHP 程式碼
    - 編碼：必須以沒有位元順序標記的utf-8字元編碼
    - 目的：每個php檔案可以用來定義符號或執行一個有作用的動作
    - 自動載入: 你的名稱空間和類別必須支援psr-4 自動載入器標準
    - 類別:使用CamelCase 格式 ex. CoffeeGrinder
    - 常數名稱:必須使用大寫，並且必要時使用底線
    - 方法名稱:使用camelCase 格式，弟一個字要小寫，每個單字的第一個字元是大寫
### PSR-2:嚴厲程式碼風格
    - 實做PSR-1
    - 縮排：建議表示四個空白字元縮排
    - 檔案和行距：使用ＬＦ　做為每一行結尾，檔案最後應該保有最後一行並且不能包含?> 每一行不應超越80個字元，如果不得以，不能超越120個字元，每行結尾不能有空白字元
    - 關鍵字:以小寫表示所有的關鍵字
    - 名稱空間:每一個名稱空間的宣告都必須接上一行空白行，同樣的在USE 區塊之後要接上一行空白行
    - 類別:建議表示起始括號在類別內容結束的下一行，extends 和implements 關鍵字必須和類別名稱同一行
    - 方法:方法定義的起始括號必須要在方法名稱下一行的開頭，結尾在方法內容結束後的下一行開頭，第一個參數不用以空白結尾，而最後一個括號不用預留前置的空白，方法的每一個參數(除了最後一個)都緊接著一個逗號和一個空白
    - 能見度:必須宣告能見度，public protected private，abstract 或finial 在能見度之前，static 在能見度之後
    - 控制流程:所有控制流成關鍵字必須接上一個空白字元，起始括號和控制流成關鍵字同一行，結尾則在新的一行
### PSR-3:記錄器介面
    - 實做php 記錄器
### PSR-4:自動載入器

:::tip
Summary:

- [文章連結](https://www.ccc.tc/article/php-standards-recommendations#)
- PHP標準建議編號1(PSR-1)，基本編碼標準. 像是類別(Class)名稱必需宣告為StudlyCaps，方法(Method)的名稱需宣告為camelCase..等
- PHP標準建議編號2(PSR-2)，則是PSR-1的擴充，規範了PHP編碼風格，像是extends或是implements必需與class名稱同一行...等。
- PHP標準建議編號4(PSR-4)，則定義了自動載入(Autoloader標準)
:::

## Optimize
- php.ini
- 記憶體
- Zend OPcache
    - [文章](https://blog.longwin.com.tw/2016/02/php-zend-opcache-accelerate-2016/)
- 檔案上傳
- 最大運行時間
- session 處理
- 輸出緩衝區
- 真實路徑快取

## Deploy
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

## Analytic
- 分析應用程式效能的一種方式
    - 用於開發階段
    - 用於產品階段
- Xdebug
- New Relic 剖析器
