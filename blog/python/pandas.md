---
title: Python 資料科學：Pandas
date: '2018-10-29 14:47:16+00:00'
tags:
- python
- ithome
---
今天來說說資料分析的Python modules &#8212; pandas 

首先我們來安裝他    
```shell
pip install pandas
```

接下來我要介紹在pandas兩個資料結構 Series 和 DataFrame他們的宣告很簡單，而且樣式也是很簡單，首先是series

```python
import pandas as pd

l = [1,2,3,56,7,7,73,3,3,2]

date = pd.date_range('20180731',periods=10)
s = pd.Series(l,index= date)
print(s)
```

`print(s)`接下來你就會看到

```shell
2018-07-31     1
2018-08-01     2
2018-08-02     3
2018-08-03    56
2018-08-04     7
2018-08-05     7
2018-08-06    73
2018-08-07     3
2018-08-08     3
2018-08-09     2
Freq: D, dtype: int64
```

所以series 很簡單，你可以想像成一個關係數列，然後之後我們可以藉由呼叫這個series的各種方法，如下    
```python
print(s.loc['20180731']) #因為index 是時間可以這樣呼叫=>1
print(s.loc['20180731':'20180802']) #因為index從2018-07-31到2018-08-02 的值
'''
2018-07-31    1
2018-08-01    2
2018-08-02    3
Freq: D, dtype: int64
'''
print(s.iloc[6]) #也可以用index喔（從0開始）-->73
print(s.iloc[5:7]) #iloc 最後一筆不算，所以會從5-6
'''
2018-08-05     7
2018-08-06    73
Freq: D, dtype: int64
'''
print(s.max()) #最大值 -->73
print(s.min()) #最小值 -->1
print(s.mean()) #平均值 -->15.7
print(s.std()) #標準差 -->26.106831800635376
```
    
還有其他的方法，請大家可以自行參考這裡。https://pandas.pydata.org/pandas-docs/version/0.23.4/generated/pandas.Series.html
    
再來，我要介紹關於dataframe的部分，dataframe簡單來說就是許多series組成的
    
```python
import pandas as pd

date = pd.date_range('20181029',periods=3)
s1 = pd.Series([1,2,3],index=date)
s2 = pd.Series([4,5,6],index=date)
s3 = pd.Series([7,8,9],index=date)
df = pd.DataFrame() #empty dataframe
df = pd.DataFrame({'c1':s1,'c2':s2,'c3':s3})
print(df)
```
print df就會長得像這樣    
```shell
             c1  c2  c3
2018-10-29   1   4   7
2018-10-30   2   5   8
2018-10-31   3   6   9

```

同樣的，他也和series支援很多方法

```python
df.loc['2018-01-05']
'''
c1    2
c2    5
c3    8
'''
df.loc['2018-01-01':'2018-01-02',['c1','c2']]
'''
            c1  c2
2018-01-01   1   4
2018-01-02   2   5
'''
df.iloc[1:3,[2,1]]
'''
            c3  c2
2018-01-02   8   5
2018-01-03   9   6
'''
```
    
    
      