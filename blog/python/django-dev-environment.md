---
title: Python網頁篇：Django- 初始環境
date: '2018-10-24 14:13:41+00:00'
tags:
- python
- ithome
---
現在開始來講用Python開發網頁，這一篇到後面幾篇來講講用Django 架設一個用markdown寫作的部落格。 
    
也藉著這個範例來說明一下django.

首先，當然是要先安裝好django啦！
  
```shell
pip install django
``` 

然後要創建一個django的專案請使用

```shell
django-admin startproject {專案名稱}
#我這裡就是專案名稱為blog
django-admin startproject blog
```

你的資料夾結構如下    
    
```shell
blog
├── blog
│   ├── __init__.py
│   ├── settings.py
│   └── wsgi.py
└── manage.py
```
    
接下來到blog的資料夾（或者你專案的資料夾下），使用

```shell
python manage.py runserver
```

接下來會出現一個網址，像我的訊息就是    

```shell
Performing system checks...

System check identified no issues (0 silenced).

You have 15 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
Run 'Python manage.py migrate' to apply them.

October 24, 2018 - 14:12:00
Django version 2.1.2, using settings 'blog.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

接下來你只要在瀏覽器key上`http://127.0.0.1:8000` 就看到django的初始頁啦接下來我們一起好好研究Django吧！