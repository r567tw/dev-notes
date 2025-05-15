---
title: PHP
sidebar_position: 1
---

## Intro

- 多重範式 (multiparadigm)

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

## Class & Object

### 從自訂類別實體化物件

```php
class pet
{
    public function __construct(
        public string $name,
        public string $species
    ){}
}

$dog = new Pet('Fido', 'golden retriever');
```

### 定義唯讀屬性

- readonly 不可以有預設值

```php
class Book
{
    public function __construct(public readonly string $title){}
}
```

### 擴充、強制類別表現出特定行為、建立抽象基礎類別、防止修改類別

- extends
- interface
- abstract class
- final

### 靜態方法

- static

### 列舉在物件中的私有屬性或方法

```php
$reflected = new ReflectionClass('SuperSecretClass');

$methods = $reflected->getMethods();
$properties = $reflected->getProperties();
```

### 在類別之間重複使用任意程式碼

- trait

## 安全與加密

- mcrypt
- sodium

### 過濾、驗證和清理使用者輸入

```php
filter_var($email, FILTER_VALIDATE_EMAIL);
```

### 將敏感憑證排除在應用程式之外

```php
$db = new PDO($database_connection, getenv('DB_USER'), getenv('DB_PASS'));
```

- Virtualhost 的 SetEnv
- location 區塊裡 fastcgi_param

### 雜湊和驗證密碼

```php
$hash = password_hash($password, PASSWORD_DEFAULT);
if (password_verify($password, $hash)){

}
```

### 加密與解密資料

- sodium_crypto_secretbox()
- sodium_crypto_secretbox_open()

#### 對稱式加密

```php
# 加密
$message = '這是機密資料';
$key = sodium_crypto_secretbox_keygen(); // 產生安全的 key
$nonce = random_bytes(SODIUM_CRYPTO_SECRETBOX_NONCEBYTES); // 加密用的唯一 nonce

$ciphertext = sodium_crypto_secretbox($message, $nonce, $key);

# 解密
$plaintext = sodium_crypto_secretbox_open($ciphertext, $nonce, $key);
if ($plaintext === false) {
    echo "解密失敗，可能資料被竄改。";
} else {
    echo "原始訊息：$plaintext";
}
```

### 補充 Sodium

> 從 PHP 7.2 開始內建的密碼學函式庫，基於 Libsodium，提供現代、安全的加密功能。

1. 對稱式加密/解密（Secret-Key Encryption）
2. 非對稱式加密/解密（Public-Key Encryption）
3. 數位簽章（Signing）
4. 雜湊（Hashing）
5. 密碼雜湊（Password Hashing）

## File

### 建立或開啟、讀入

```php
$fp = fopen('document.txt', 'r');
$config = file_get_contents('config.json');
```

### 同時寫入多個檔案

```php
$fps = [
    fopen('data.txt','w'),
    fopen('php://stdout', 'w')
];

foreach($fps as $fp){
    fwrite($fp,'The wheels on the bus go round and round.');
}
```

### 鎖定檔案以防止其他行程存取或修改

```php
flock()
```

## Streams (串流)

| wrapper | description                                  |
| ------- | -------------------------------------------- |
| file:// | 存取本機檔案                                 |
| http:// | 透過 http(s) 存取遠端 URL                    |
| ftp://  | 透過 ftp 存取遠端檔案系統                    |
| php://  | 存取各種本機 I/O 串流(記憶體, stdin, stdout) |
| zlib:// | 壓縮                                         |
| data:// | 原始資料                                     |
| glob:// | 尋找與樣式相符的路徑名稱                     |
| phar:// | 操作 php 檔案                                |
| ssh2:// | 透過 ssh 連線                                |
| rar://  | rar 壓縮                                     |
| ogg://  | 音頻串流                                     |

```php
stream_filter_register('str.*', 'StringFilter');

$fp = fopen('document.txt' , 'w');
stream_filter_append($fp , 'str.toupper');

fwrite($fp, 'Hello');
fwrite($fp , 'wordld');

fclose($fp);

echo file_get_contents('document.txt');
```

### 資料串流與暫存檔案之間的傳輸

```php
$fp = fopen('php://temp', 'rw');

while(true){
    fputs($fp , $data);

    if ($endOfData){
        break;
    }
}
```

### 從 php 輸入串流讀取資料

```php
$stdin = fopen('php://stdin', 'r');
```

### 寫入 php 輸出串流

```php
$stdout = fopen('php://stdout','w');
fputs($stdout, 'Hello, World');

```

### 從一個串流讀取並寫入另一個串流

```php
$source = fopen('document1.txt', 'r');
$destination = fopen('destination.txt', 'w');

stream_copy_to_stream($source, $destination)
```

### 將不同處理串流的方法組合再一起

```php
$fp = fopen('compressed.txt', 'r');
stream_filter_append($fp , 'covert.base64-decode');
stream_filter_append($fp , 'zlib.inflate');

echo fread($fp, 1024);
```

### 撰寫自訂串流包裝器

> 建立一個遵循以 streamWrapper 的自訂類別

```php
if (!in_array('var', stream_get_wrappers())){
    stream_wrapper_register('VariableStream');
}

$varContainer = '';

$fp = fopen('var://varContainer', 'w');

fwrite($fp , 'Hello');
fwirte($fp, 'World');

fclose($fp);

echo $varContainer;
```

## Error Handling

### 建立和處理自訂例外

- try/catch
- 擴充 Exception 類別，implement Throwable 介面

### 向使用者隱藏錯誤訊息

```ini
# php.ini
error_reporting = Off
display_errors = Off
```

- 錯誤報告等級常數

| 常數名稱              | 數值  | 說明                                                             |
| --------------------- | ----- | ---------------------------------------------------------------- |
| `E_ERROR`             | 1     | 致命錯誤，腳本會中止執行。                                       |
| `E_WARNING`           | 2     | 警告（非致命錯誤），腳本會繼續執行。                             |
| `E_PARSE`             | 4     | 編譯時解析錯誤。                                                 |
| `E_NOTICE`            | 8     | 提醒（通常是未初始化的變數），腳本仍會執行。                     |
| `E_CORE_ERROR`        | 16    | PHP 啟動時產生的致命錯誤。                                       |
| `E_CORE_WARNING`      | 32    | PHP 啟動時的警告（非致命錯誤）。                                 |
| `E_COMPILE_ERROR`     | 64    | Zend 引擎編譯時的致命錯誤。                                      |
| `E_COMPILE_WARNING`   | 128   | Zend 引擎編譯時的警告。                                          |
| `E_USER_ERROR`        | 256   | 使用者自定的致命錯誤（使用 `trigger_error()` 觸發）。            |
| `E_USER_WARNING`      | 512   | 使用者自定的警告。                                               |
| `E_USER_NOTICE`       | 1024  | 使用者自定的提醒。                                               |
| `E_STRICT`            | 2048  | 建議提升程式碼相容性與最佳實踐（PHP 7.0 起已被合併到 `E_ALL`）。 |
| `E_RECOVERABLE_ERROR` | 4096  | 可回復的致命錯誤，允許使用者自定錯誤處理函式處理。               |
| `E_DEPRECATED`        | 8192  | 表示不建議使用的功能，未來可能會被移除。                         |
| `E_USER_DEPRECATED`   | 16384 | 使用者自定的不建議使用訊息。                                     |
| `E_ALL`               | 32767 | 所有錯誤、警告與提醒（包括 `E_STRICT`、`E_DEPRECATED` 等）。     |

### 使用自訂錯誤處理函式

- set_error_handler()

### 將錯誤記錄到外部串流

- error_log()

## PHP 的記憶體機制

## Study PHP original code

- https://github.com/php/php-src
