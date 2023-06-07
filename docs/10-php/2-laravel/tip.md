---
sidebar_position: 4
---
# Tip

## Laravel 的Carbon 小技巧
1.本地化
```php=
# app/Providers/AppServiceProvider.php
public function boot()
{
    \Carbon\Carbon::setLocale('zh');
}
#$article->created_at->diffForHumans(); # 1 年前
```
2.七個小技巧
https://9iphp.com/web/php/less-known-useful-carbon-functions.html
- isX :True/False
```php=
<?php
$dt->isWeekday();
$dt->isWeekend();
$dt->isYesterday();
$dt->isToday();
$dt->isTomorrow();
$dt->isFuture();
$dt->isPast();
$dt->isLeapYear();
$dt->isSameDay(Carbon::now());
```
- isBirthday
```php=
<?php
$born = Carbon::createFromDate(1987, 4, 23);
$noCake = Carbon::createFromDate(2014, 9, 26);
$yesCake = Carbon::createFromDate(2014, 4, 23);
var_dump($born->isBirthday($noCake));      // bool(false)
var_dump($born->isBirthday($yesCake));
```
- StartOfX 和 EndOfX 列表
```php=
<?php
$dt = Carbon::create(2012, 1, 31, 12, 0, 0);
echo $dt->startOfDay();     // 2012-01-31 00:00:00
echo $dt->endOfDay();       // 2012-01-31 23:59:59
echo $dt->startOfMonth();   // 2012-01-01 00:00:00
echo $dt->endOfMonth();     // 2012-01-31 23:59:59
echo $dt->startOfYear();    // 2012-01-01 00:00:00
echo $dt->endOfYear();      // 2012-12-31 23:59:59
echo $dt->startOfDecade();  // 2010-01-01 00:00:00
echo $dt->endOfDecade();    // 2019-12-31 23:59:59
echo $dt->startOfCentury(); // 2000-01-01 00:00:00
echo $dt->endOfCentury();   // 2099-12-31 23:59:59
echo $dt->startOfWeek();    // 2012-01-30 00:00:00
echo $dt->endOfWeek();      // 2012-02-05 23:59:59
```
- Today, Tomorrow, Yesterday
```php=
<?php
$today = Carbon::today();  // assuming 2016-06-24
echo $today;                   // 2016-06-24 00:00:00
$tomorrow = Carbon::tomorrow();
echo $tomorrow;                      // 2016-06-25 00:00:00
$yesterday = Carbon::yesterday();
echo $yesterday;                   // 2016-06-23 00:00:00
```
- DiffForHumans + 本地化
```php=
<?php
echo Carbon::now()->subDays(5)->diffForHumans()//5daysago
Carbon::setLocale('zh');
echo Carbon::now()->addYear()->diffForHumans(); //一年前
```
- 改变 now() 为任意你想要的时间
```php=
<?php
$knownDate = Carbon::create(2001, 5, 21, 12);//建测试日期
Carbon::setTestNow($knownDate);    // set the mock 
echo Carbon::now();      // 2001-05-21 12:00:00
```
- 星期常量
```php=
<?php
var_dump(Carbon::SUNDAY);            // int(0)
var_dump(Carbon::MONDAY);            // int(1)
var_dump(Carbon::TUESDAY);           // int(2)
var_dump(Carbon::WEDNESDAY);         // int(3)
var_dump(Carbon::THURSDAY);          // int(4)
var_dump(Carbon::FRIDAY);            // int(5)
var_dump(Carbon::SATURDAY);          // int(6)
```

## Laravel 的 Eloquent 小技巧
1.同時產生migration 和model
> php artisan make:model Post -m
2.scope
```php=
class Post extends Model
{
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }
}
#Post::published()->get();
#相當於 Post::where('is_published', true)->get();

```

3.Accessors（访问器）
4.动态方法名称
```php=
// Post::where('published', 1)->get();
Post::wherePublished(1)->get();
 
// Post::where('category', null)->get();
Post::whereNull('category')->get();
 
// Post::where('category', '!=', null)->get();
Post::whereNotNull('category')->get();
```
5.扩展访问器
```php=
class User extends Model
{
    protected $appends = ['name'];
}
```
https://9iphp.com/web/laravel/5-laravel-eloquent-tips-tricks.html

## laravel 建立多國語言
https://www.myandroid.tw/bbs-topic-1615-0.sea
- 先在 lang 下建立 zh_tw 資料夾，然後在 en 與 zh_tw 中加入語言定義檔
-  app()->setLocale(Session::get('locale'));
## Laravel 實作資料庫讀寫分離
https://laravel-china.org/topics/1879/laravel-5-configuration-read-and-write-separation-and-source-analysis

- Laravel5读写分离配置比较简单，只需修改config/database.php，下面以MySQL数据库为例，内容如下
```php=
'mysql' => [
    'read' => [
        'host' => '192.168.1.1'
    ],
    'write' => [
        'host' => '196.168.1.2'
    ],
    'driver'    => 'mysql',
    'database'  => 'database',
    'username'  => 'root',
    'password'  => '',
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix'    => '',
]
```
- [mysql 讀寫分離](http://blog.csdn.net/justdb/article/details/17331569)
