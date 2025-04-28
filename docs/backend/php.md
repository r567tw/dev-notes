# php

## 變數

|            | empty($x) |
| ---------- | --------- |
| $x = ""    | true      |
| $x = null  | true      |
| $x = false | true      |
| $x = 0     | true      |
| $x = "0"   | true      |
| $x = []    | true      |

```php
# 常數
defined('CONST');
define('CONST', 5);

class foo
{
    const MY_CONST = 5;
}

# 可變變數
$red = '#f00';
$color = 'red';
echo $$color;
echo ${$color}

# 交換變數
// list()
[$blue, $green] = [$green, $blue];

# 提取陣列元素
$address = ['123 S Main St.','Anywhere','NY','10001','USA'];

// 每個做變數
[$street,$city,$state,$zipcode,$country] = $address;

// 只抓幾個
[,,$state,,] = $address;
[,,,,$country] = $address;
```

## 安裝環境

- 開發環境用：https://php.new/

## Laravel Security

https://www.laravel-enlightn.com/docs/getting-started/installation.html

```bash
composer require enlightn/enlightnpro
```
