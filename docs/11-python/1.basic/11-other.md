---
sidebar_position: 8
---
# Other

## 第十一章 並行處理與網路

- 同步/非同步
- 標準程式庫：multiprocessing / threading / asyncio
- twisted 網頁框架
- redis
- 發布-訂閱 模式
    - redis
    - zeroMQ
    - RabbitMQ
- TCP/IP

## 第十二章 當一位Python忠貞黨員
- https://docs.python.org/3/library
- pip
```
pip install flask
pip install flask==0.9.0
pip install 'flask>-0.9.0'
pip -r requirements.txt
```
- pylint /pyflakes / pep8
- unittest /doctest/ pytest
- pypy

- https://github.com/madscheme/introducing-python

## Python 的GUI 選擇
[連結](http://xdean.pixnet.net/blog/post/41253597-python%E4%BD%9Cgui%E9%96%8B%E7%99%BC%E7%9A%84%E9%81%B8%E6%93%87%EF%BC%BB%E8%BD%89%EF%BC%BD)
1.**Tkinter**
2.WxPython
3.PyGtk
4.**PyQT**
5.Jython
6.MFC
7.PythonCard
8.Dabo
9.AnyGui
10.WPY
11.**IroPython (.net)**

## 將python 打包成exe
[連結](http://mf99coding.logdown.com/posts/206237-package-your-python-script-into-exe-executable)
1.Py2Exe
- 先至 Py2Exe 官網 下載安裝檔，並安裝在電腦中
- 接著在你要轉換的 Python script 的目錄底下新增一個 setup.py
- 開啟 Terminal 並移動到 set.py 所在的目錄，並執行以下指令
> python setup.py py2exe

2.pyinstaller
- http://www.pyinstaller.org/

```shell=
pip install pyinstaller
pyinstaller yourprogram.py
```
**完成的結果會在 dist 資料夾中！**

## PYTHON 測試框架 PYTEST
https://docs.pytest.org/en/latest/


## Poetry
poetry 套件管理器 教學 https://blog.kyomind.tw/python-poetry/
