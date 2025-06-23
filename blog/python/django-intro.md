---
title: Python網頁篇：Django- 簡介
date: '2018-10-25 15:35:03+00:00'
tags:
- python
- ithome
---

今天講點關於django概念上的東西 
    
首先Django 的MVC不是傳統上的MVC ，而是MTVM- model.pyT- templatesV- View

詳細介紹可以參考此網址：http://mropengate.blogspot.com/2015/08/mvcdjangomtv.html
    
而今天要架一個blog的網站，首先django有趣的是他有一個初始專案開啟的資料夾以外，還有一個專門放網站設定網站程式的資料夾。所以我們要撰寫用django 架設 blog時還要再下一個指令

```shell
Python manage.py startapp mblog
#mblog 你可以用任何的名稱，只要不要和你本身目錄衝到
```

這時我們來看看目前程式資料夾的架構    

```shell
├── blog
│   ├── __init__.py
│   ├── __pycache__
│   │   ├── __init__.cPython-36.pyc
│   │   ├── settings.cPython-36.pyc
│   │   └── wsgi.cPython-36.pyc
│   ├── settings.py
│   └── wsgi.py
├── db.sqlite3
├── manage.py
└── mblog
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── migrations
    │   └── __init__.py
    ├── models.py
    ├── tests.py
    └── views.py
```
    
覺得很多嗎？ 不用擔心，其實我們改動的很少....大概很快我們就能用Django寫出一個部落格了