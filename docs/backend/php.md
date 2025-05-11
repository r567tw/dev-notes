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

## String

### 存取字串中的子字串

```php
if (strpos($url, '/secret/') !== false){

}

//計算所有子字串出現次數
function count_occurrences($haystack, $needle)
{
    $occurrences = 0;
    $offset = 0;
    $pos = 0;

    do {
        $pos = strpos($haystack ,$needle,$offset);

        if ($pos !== false) {
            $occurrences += 1;
            $offset = $pos + 1;
        }
    } while ($pos !== false);

    return $occurrences;
}

$str = 'How much wood would a woodchuck chuck if a woodchuck could chuck wood';
print count_occurrences($str , 'wood');
```

### 從字串中抓取子字串

```php
substr('phpcookbook', 3); //cookbook
substr('phpcookbook', 0,3); //php
substr('phpcookbook', -2); // ok
substr('phpcookbook', -8,4); //cook
```

### 替換部分字串

```php
// 知道其index 和 length: 使用 substr_replace
$string = '555-123-4567';
$replace = 'xxx-xxx';

$obfuscated = substr_replace($string,$replace, 0, 7);

// 不知道其index 和 length: 使用 str_replace
$string = 'How much wood would a woodchuck chuck if a woodchuck could chuck wood';
$beaver = str_replace('woodchuck','beaver',$string);
```

### 在字串中插入變數

```php
echo "There are {$cats} cats and {$dogs} dogs outside.";
```

## Number

### 驗證變數中的數字

```php
echo is_numeric(22);
```

### 浮點數的四捨五入

```php
echo round(15.31415,1); // 15.3 四捨五入
echo ceil(15.31415); //16 無條件進位到最接近的整數
echo floor(15.31415); //15 無條件捨去到最接近的整數
echo round(1.5, mode: PHP_ROUND_HALF_UP);
```

| mode                | description                      |
| ------------------- | -------------------------------- |
| PHP_ROUND_HALF_UP   | 在一半時，將數值進位             |
| PHP_ROUND_HALF_DOWN | 在一半時，將數值捨去             |
| PHP_ROUND_HALF_EVEN | 在一半時，將四捨五入最接近的偶數 |
| PHP_ROUND_HALF_ODD  | 在一半時，將四捨五入最接近的奇數 |

### 產生真正的隨機變數

```php
$rand_number = random_int(10,255);
```

### 產生可預測的隨機變數

```php
mt_srand(42); // 利用名為梅森旋轉的演算法
$rand_number = mt_rand(0,100);
```

### 依照權重產生隨機變數

```php
$choices = [
    'Tony' => 10,
    'Steve' => 2,
    'Peter' => 1,
    'Wanda' => 4,
    'Carol' => 6
];

function weighted_random_choice(array $choices): string
{
    arsort($choices);

    $total_weight = array_sum(array_values($choices));
    $selection = random_int(1,$total_weight);

    $count = 0;
    foreach ($choices as $choice => $wight){
        $count += $weight;
        if ($count >= $selection){
            return $choice;
        }
    }

    throw new Exception('Unable to make a choice !');
}
```

### 對數、指數的計算

```php
$log = log(5); //1.6... 以 e 為底數
$log2 = log(16,2); //4
$power = pow(2,5); //32
```

### 將數字格式化字串(加入千分位符號)

```php
$number = 25519;
print number_format($number); // 25,519
```

### 處理非常大或非常小的數字

```php
$sum = gmp_pow(4096,100);
print gmp_strval($sum);
```

### 在不同進制之間轉換數字

```php
$hex = base_convert(240,10,16);
```

## Datetime

### 取得目前的日期時間

```php
$now = date('r');
$now = (new DateTime())->format('r');
```

### 將日期和時間轉為 Unix Timestamp

```php
(new DateTime('2023-11-03T12:15:00-0700'))->format('U');
```

### Unix Timestamp 轉換成日期時間

```php
getdate(1688472300);
```

### 計算兩個日期之間的差值

```php
$firstDate = new DateTime('2016-01-10');
$secondDate = new DateTime('2016-01-13');

$interval = $secondDate->diff($firstDate);
print $interval->format('%y years %d days %m months');
```

### 從任意字串中解析日期和時間

```php
$entry = strtotime('last Wednesday');
$parsed = new DateTime("@{$entry}");
date_parse();
```

### 驗證日期

```php
checkdate()
```

### 增加或減去日期

```php
$date = new DateTime('December 25, 2023');

$date->add(new DateInterval('P12D'));
$date->sub(new DateInterval('P12D'));
```

## Array

### 透過數字範圍初始化

```php
$array = range(1,10);
$array = range('A','Z');
```

### 修改陣列的大小、將一個陣列附加到另一個陣列

```php
array_push($array , 'grape');
array_splice($array, 1, 2);
$merged = array_merge($first,$second);
$merged = [...$first,...$second];
```

### 從現有陣列的片段建立陣列

```php
$slice = array_slice($array, 7,4);
```

### 字串和陣列轉換

```php
$array = str_split($string);
$string = join('',$array)
```

### 反轉陣列、排序

```php
array_reverse($array);
sort($states);
usort($bonds.'sorter');
```

### 隨機打亂陣列中的元素

```php
shuffle($array);
```

### **將函數套用於陣列中的每個元素**

```php
array_walk($values, function(&$value, $key){
    $value *= $value;
});

array_walk_recursive()

$mutated = array_map(function($value){
    return $value * $value;
}, $values)
```

- `array_walk` 希望陣列在前、函數在後; `array_map` 希望函數在前、陣列在後
- `array_walk` 回傳 Boolean ; `array_map` 回傳 Array
- `array_map` 不會將鍵值傳到函數中、不會將額外的引數給函數
- `array_map` 沒有遞迴

### 將陣列簡化為單一數值

```php
array_reduce($value, function($carry, $item){
    return $carry+ $item;
});
```

### 透過重複疊代來替換無限或龐大的陣列

```php
function numbers() {
    for ($i = 1; $i <= 3; $i++) {
        yield $i;
    }
}

foreach (numbers() as $num) {
    echo $num . PHP_EOL;
}

$ns = numbers();
$ns->current();
$ns->next();
```

## PHP 的記憶體機制

## Study PHP original code

- https://github.com/php/php-src
