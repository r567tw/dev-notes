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

## Operator

- 邏輯計算
  | | |
  | ---------- | --------- |
  | `$x && $y` | and |
  | `$x \|\| $y` | or |
  | `!$x` | not |

- 位元計算
  | | |
  | ---------- | --------- |
  | `$x & $y` | 位元和 |
  | `$x \| $y` | 位元或 |
  | `$x ^ $y ` | 位元互斥或(xor:其中之一為 true 則結果為 true,但不能同時為 true) |
  | `~$x` | 反轉 |
  | `$x << $y` | 左移 |
  | `$x >> $y` | 右移 |

- 比較計算
  | | |
  | ---------- | --------- |
  | `$x == $y` | 相等 |
  | `$x === $y` | 恆等(考慮型別) |
  | `$x <=> $y` | 三路比較：數值相等 return 0,$x 較大 return 1,$y 較大 return -1 |

### 三元運算符號代替 if-else

```php
$username = isset($_GET['username']) ? $_GET['username'] : 'default';
```

### 合併潛在 null 值

```php
$username = $_GET['username'] ?? 'not log in';
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
