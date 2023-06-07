---
sidebar_position: 5
---
# Input/Output
## 第七章 喔喔：處理資料
- 文字字串
    - ASCII
    - Unicode
    - UTF-8
- encode() , decode()
- 用 `%` 格式化字串
- 用 `{}`與format 
```
'{} {} {}'.format(n,f,s)
'{2} {0} {1}'.format(s,n,f)
'{n} {f} {s}'.format(n=1,f=7,s='string')
'{n:d} {f:f} {s:s}'.format(n=1,f=7,s='string')
```
- 正規表達式

## 第八章 資料的去處
- 檔案輸入/輸出
- open() / write()
- read() / readline() / readlines()
- TXT / CSV / JSON / XML / YAML
- JSON : dumps() / loads()
- 二進位檔案
- 資料庫
    - SQLite / Mysql / PSSQL / NoSQL
    - SQLAlchemy

## 基本輸入與輸出
```
input()
eval() #處理數學運算
>>> eval("1+3")
4

//help(print)
print(value,sep="",end="\n",file=sys.stdout,flush=False)
print("%s的物理成績是%d"%(name,grade))
print("{}的物理成績是{}".format(name,grade))
print()

//file
open()

dir(__builtins__)

```
