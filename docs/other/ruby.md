---
title: Ruby
sidebar_position: 998
---
## Ruby基礎
- [Ruby 的註解方式][1]
- `#`單行註解
- Hello.rb

## 變數與輸入輸出
```ruby
puts 'Hello World' #output Hello World
puts 20+2 #output 22
puts 20-2 #output 18
puts 20*2 #output 40
puts 20/2 #output 10
name='John' #no output
puts name #john
name=gets.chomp #get user input
puts 'Hello'+name #output Hello John
print 'Hello world' #不會換行 output Hello World
```
- puts 印出資料 (換行)
- print 印出資料(不換行)
- gets.chomp 取得輸入
- `+`將兩個文字串接 
- boolean: true 和 false

> Tips:  
> `\=` 指派相等  
> `\==` 比較是否相等  
> `!=` 比較是否不相等 

## irb
- irb 是一個ruby 的命令介面，可以即時執行ruby 結果
- control+l 清空
- exit 離開

## Control Flow
```ruby
#number =8
number = Random.rand(9)
#隨機產生0-9 的數字
print("請猜一個1~15之間的數字")
guess=gets.chomp.to_i
#to_i 轉換為數字

if guess == number # '8' != 8
  puts '猜對了，答案是'+number.to_s
  #to_s 轉換為字串
else
  puts '猜錯了!'
end
```
## Loop
```ruby
#上一個的進階版
number = Random.rand(14)+1
#while guess==number #迴圈
while true
  print("請猜一個1~15之間的數字")
  guess=gets.chomp.to_i
  if guess == number # '8' != 8
    puts '猜對了，答案是'+number.to_s
    break;
  else
    if guess > number
      puts '猜錯了! 太大了'
    else
      puts '猜錯了! 太小了'
    end
  end
end
```

## Array
```ruby
scores= [80,100,90,99] #定義一個名為scores 的array
scores.each do |score|
puts score
end
#另外一種寫法
scores.each {|score|puts score}

print(scores[0]) # 印出第一個ruby array 值
print(scores.pop(2)) # 教最後兩個叫出來 [90,99]
print(scores.pop) # 將最後一個叫出來 [99]
print(scores.sort) # 排序 [80,90,99,100]
```

## Sample

```ruby
# 1=>檢視成績 2 新增成績 3 刪除成績 4 結束成績
scores=[90,88,85]
puts '輸入 1 檢視成績、2 新增成績、3 刪除成績、4 結束程式'
while true
  print '>'
  command = gets.chomp.to_i

  if command == 1
    scores.each do |score|
      puts score
    end
  end
  if command == 2
    print '請輸入要新增的成績:'
    scores.push gets.chomp.to_i
  end
  if command == 3
    print '請輸入要刪除的成績位置:'
    scores.delete_at (gets.chomp.to_i-1)
  end
  if command == 4
    puts '程式結束!'
    break
  end
end
```

## Hash

```ruby
record={'name'=>'john','score'=>90}
records={:name=>'john',:score =>90}

puts record[name] #john
puts record[score] #90

puts records[:name] #john
puts records[:score] #90

record.each do |key,value|
  puts key
  puts value
end
```

## Method
```ruby
def greet
  puts 'hello'
end

greet #=> hello
#def method_name....end
def greet(name)
  puts 'hello,'+name
end

greet 'John' #=> hello,John

require_relative 'method' #引入該資料夾底下的method.rb
```
