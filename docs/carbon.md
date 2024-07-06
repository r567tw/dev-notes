---
title: Carbon Notes
type: post
date: 2024-09-23T11:49:35+00:00
categories:
  - laravel
tags:
  - carbon
toc: true
---

# 本地化
```php
# app/Providers/AppServiceProvider.php
public function boot()
{
    \Carbon\Carbon::setLocale('zh');
}
#$article->created_at->diffForHumans(); # 1 年前
```

# isX :True/False
```php
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

# isBirthday

```php
$born = Carbon::createFromDate(1987, 4, 23);
$noCake = Carbon::createFromDate(2014, 9, 26);
$yesCake = Carbon::createFromDate(2014, 4, 23);
var_dump($born->isBirthday($noCake));      // bool(false)
var_dump($born->isBirthday($yesCake));
```

# StartOfX 和 EndOfX 列表
```php
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
# Today, Tomorrow, Yesterday
```php
$today = Carbon::today();  // assuming 2016-06-24
echo $today;                   // 2016-06-24 00:00:00
$tomorrow = Carbon::tomorrow();
echo $tomorrow;                      // 2016-06-25 00:00:00
$yesterday = Carbon::yesterday();
echo $yesterday;                   // 2016-06-23 00:00:00
```

# DiffForHumans + 本地化
```php
<?php
echo Carbon::now()->subDays(5)->diffForHumans()//5daysago
Carbon::setLocale('zh');
echo Carbon::now()->addYear()->diffForHumans(); //一年前
```

# Change Now() 改成任意時間
```php
<?php
$knownDate = Carbon::create(2001, 5, 21, 12);//建测试日期
Carbon::setTestNow($knownDate);    // set the mock 
echo Carbon::now();      // 2001-05-21 12:00:00
```

# 星期常量
```php
<?php
var_dump(Carbon::SUNDAY);            // int(0)
var_dump(Carbon::MONDAY);            // int(1)
var_dump(Carbon::TUESDAY);           // int(2)
var_dump(Carbon::WEDNESDAY);         // int(3)
var_dump(Carbon::THURSDAY);          // int(4)
var_dump(Carbon::FRIDAY);            // int(5)
var_dump(Carbon::SATURDAY);          // int(6)
```
