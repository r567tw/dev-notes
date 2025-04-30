---
title: PHP
sidebar_position: 1
---

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

### 邏輯計算

| Expression   | Description |
| ------------ | ----------- |
| `$x && $y`   | and         |
| `$x \|\| $y` | or          |
| `!$x`        | not         |

### 位元計算

| Expression | Description                                                     |
| ---------- | --------------------------------------------------------------- |
| `$x & $y`  | 位元和                                                          |
| `$x \| $y` | 位元或                                                          |
| `$x ^ $y ` | 位元互斥或(xor:其中之一為 true 則結果為 true,但不能同時為 true) |
| `~$x`      | 反轉                                                            |
| `$x << $y` | 左移                                                            |
| `$x >> $y` | 右移                                                            |

### 比較計算

| Expression  | Description                                                    |
| ----------- | -------------------------------------------------------------- |
| `$x == $y`  | 相等                                                           |
| `$x === $y` | 恆等(考慮型別)                                                 |
| `$x <=> $y` | 三路比較：數值相等 return 0,$x 較大 return 1,$y 較大 return -1 |

### 三元運算符號代替 if-else

```php
$username = isset($_GET['username']) ? $_GET['username'] : 'default';
```

### 合併潛在 null 值

```php
$username = $_GET['username'] ?? 'not log in';
```

## Function

### 存取函數參數

- Call By Value

```php
function increment($number){
    $number += 1;
    return $number;
}

$number = 6;
echo increment($number); //7
echo $number; //6
```

- Call By Reference

```php
function increment(&$number){
    $number += 1;
    return $number;
}

$number = 6;
echo increment($number); //7
echo $number; //7
```

### 設定函數的預設值

```php
function get_book_title($isbn, $error='Unable to Query'){
    try{
        $book = query_isbn($isbn);
        return $book->title;
    } catch {
        return $error;
    }
}
```

### 函數參數給名稱(命名參數)

```php
function makeyogurt($container = "bowl", $flavour = "raspberry", $style = "Greek")
{
    return "Making a $container of $flavour $style yogurt.\n";
}

echo makeyogurt(style: "natural"); //Making a bowl of raspberry natural yogurt.
```

### 強制執行函數引數及回傳型別

```php
declare(strict_types=1);

function add_numbers(int $left,int $right): int
{
    return $left + $right;
}

echo add_numbers(1,2); //3
```

| Type     | Description                                            |
| -------- | ------------------------------------------------------ |
| array    | 陣列                                                   |
| callable | 可呼叫的函數                                           |
| bool     | boolean                                                |
| float    | float                                                  |
| int      | int                                                    |
| string   | string                                                 |
| iterable | 必須是陣列或實作 Traversable 的物件                    |
| mixed    | any                                                    |
| void     | 表示不回傳數值, 允許`return;`                          |
| never    | 表示不回傳數值, 有兩種可能行為：`exit()`或刻意無限迴圈 |

- void can have return; but never can't.

### 定義具有可變引數數量的函數

```php
function greatest(int ...$numbers): int
{
    $greatest = 0;
    foreach ($numbers as $number){
        if ($number > $greatest){
            $greatest = $number;
        }
    }

    return $greatest;
}
```

### 回傳多個數值

```php
function decode_jwt(string $jwt): array
{
    $parts = explode('.',$jwt);
    return array_map('base64_decode',$parts);
}

list($header, $payload, $signature) = decode_jwt($jwt);
```

### 在函數內存取全域變數

```php
$a = 1;
function example(): void
{
    global $a;
    echo $a;
}
```

### 跨函數呼叫管理狀態值

```php
function increment(){
    static $count = 0;
    return $count++;
}

echo increment(); //0;
echo increment(); //1;
echo increment(); //2;
```

### 定義動態函數

```php
$greet = function($name){
    echo 'Hello ,'.$name. PHP_EOL;
};
$greet('World'); //Hello ,World

$some_value = 42
$bar = function() use ($some_value){
    echo $some_value;
};
$bar(); // 42
```

### 箭頭函數

```php
$outer = 42;
$anon = fn($add) => $outer+$add;
$anon(5); //47
```

## PHP 的記憶體機制

## Study PHP original code

- https://github.com/php/php-src
