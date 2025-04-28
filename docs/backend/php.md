# PHP

## Installation

- https://php.new : 使用在 dev 環境當中，production 請使用`docker`或者`LAMP Steak`

## Variables

|            | empty($x) |
| ---------- | --------- |
| $x = ""    | true      |
| $x = null  | true      |
| $x = false | true      |
| $x = 0     | true      |
| $x = "0"   | true      |
| $x = []    | true      |

> 盡量別使用 empty() 這個 function

### 常數

```php
defined('CONST');
define('CONST', 5);

class foo
{
    const MY_CONST = 5;
}
```

### 可變變數

```php
$red = '#f00';
$color = 'red';
echo $$color;
echo ${$color}
```

> 勉強可用, 但盡量少用, 感覺做法太騷...

### 交換變數

```php
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

## Laravel Security

https://www.laravel-enlightn.com/docs/getting-started/installation.html

```bash
composer require enlightn/enlightnpro
```

## Study PHP original code

- https://github.com/php/php-src

## NativePHP Package

- https://www.youtube.com/watch?v=TY21MRVNxSo

## Serverless Laravel

- Vapor: https://vapor.laravel.com
- Bref: https://bref.sh/
