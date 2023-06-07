---
sidebar_position: 5
---

# pandas
- pip install pandas
    - series
    - dataframe
- http://pandas.pydata.org/pandas-docs/stable/

## series
```python
import pandas as pd

l = [1,2,3,5]
a = pd.Series(l)
print(a)

date = pd.date_range('20180731',periods=10)
s = pd.Series(l,index= date)
# s = pd.Series(60,index= date) #傳出每一天為60 的序列

print(s)
print(s.loc['20180731'])
print(s.loc['20180731':'20180802'])
print(s.iloc[5])
print(s.iloc[5:7])
print(s.max()) #最大值
print(s.min()) #最小值
print(s.mean()) #平均值
print(s.std()) #標準差
# iloc 最後一筆不算
larage_than_3 = s>3
print(larage_than_3) # return true/false
print(s.loc[s>3]) #大於3的值
larage_than_3 = s>3
print(s.loc[larage_than_3]+1) #每個值+1
print(s.rolling(2).sum())  #前兩位數相加行成新序列
print(s.rolling(2).cumsum())  #前兩位數一直相加成新序列
print(s.cumprod()) ##前兩位數一直相乘成新序列ˊ

##練習
date = pd.date_range('20180101',periods=5)
s = pd.Series(60,index= date)
s.loc['20180103':] += 5
print(s)
'''
2018-01-01    60
2018-01-02    60
2018-01-03    65
2018-01-04    65
2018-01-05    65
'''
```

## dataframe
- 許多條series 組成！
```python
s1 = pd.Series([1,2,3],index=date)
s2 = pd.Series([4,5,6],index=date)
s3 = pd.Series([7,8,9],index=date)
df = pd.DataFrame() #empty dataframe
df = pd.DataFrame({'c1':s1,'c2':s2,'c3':s3})
df.plot() #畫圖

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

df.cumsum()
'''
            c1  c2  c3
2018-01-01   1   4   7
2018-01-02   3   9  15
2018-01-03   6  15  24
'''

df['c1']
```

## read_html
```python
import requests
import pandas as pd
from io import StringIO
res = requests.get('http://www.wibibi.com/info.php?tid=116')
dfs = pd.read_html(StringIO(res.text))
```

## 抓取
```
pd.to_numeric(series) <--- 將series轉型成數字。
df.apply(func) <--- 將 dataframe 中的每一條 series 都用 func 處理一番。
lambda x: y <--- 一個無名氏function，讀入 x 吐出 y。
df.set_index(col_name) <--- 將某個column直接變成index
df[x] <--- 選取 df 中的 x ，假如 x 是 a (list or series) of (string or boolean)， 假如為 boolean，則長度得跟columns的數目一樣常喔！
```

## csv
```
# 將檔案存檔成csv（可以用excel打開）
# 用dataframe存檔，避免中文亂碼，記得要將encoding='utf_8_sig'喔！
df.to_csv('daily_price.csv', encoding='utf_8_sig')

# 讀檔
# 我們指名 index 為 證券代號
df = pd.read_csv('daily_price.csv', index_col=['證券代號'])

print('index為證券代號')
print('     v')
df.head()


# 實際操作
# 將 df 中的當月營收用 .to_numeric 變成數字，再把其中不能變成數字的部分以 NaN 取代（errors='coerce'）
df['當月營收'] = pd.to_numeric(df['當月營收'], errors='coerce')
# 再把當月營收中，出現 NaN 的 row 用 .dropna 整行刪除
df = df.dropna(subset=['當月營收'])

#df = df.loc[~pd.to_numeric(df['當月營收'], errors='coerce').isnull()] ---->影片中的寫法，可以取代上面兩行（以 .isnull() 檢查是否為 NaN，再取其否定「～」的行數作為新的 df）

# 刪除「公司代號」中出現「合計」的行數，其中「～」是否定的意思
df = df.loc[~(df['公司代號'] == '合計')]

# 將「公司代號」與「公司名稱」共同列為 df 的 indexes
df = df.set_index(['公司代號', '公司名稱'])

# 最後，將 df 中的所有字串轉成數值
df = df.apply(pd.to_numeric)
```

## sqlite
```
# 將 sql 通道打開
import sqlite3
conn = sqlite3.connect('test.sqlite3')

# 存檔 if_exists='replace' 是說假如sql中已經有 daily_price 這個 dataframe，則取代它
df.to_sql('daily_price', conn, if_exists='replace')

# 讀檔
df = pd.read_sql('select * from daily_price', conn, index_col=['證券代號'])
df.head()
```


