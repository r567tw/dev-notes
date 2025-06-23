---
title: Python 網頁：Django- 來做一個部落格(1)
date: '2018-10-26 15:06:28+00:00'
tags:
- python
- ithome
---
昨天我們已經建立好部落格的大概專案結構，如下 
    
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

接下來我們就來快速建立一個部落格吧
    
首先，我們主要work的資料夾都會在我們藉由startapp為起始的mblog資料夾內在models.py裡面做編輯，加入一個posts的表

```python 
from django.db import models
from django.utils import timezone

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=200)
    slug = models.CharField(max_length=200)
    content = models.TextField()
    pub_date = models.DateTimeField(default=timezone.now)
```

然後請記得***在blog全站設定的資料夾裡面的setting.py加入一行'mblog.apps.MblogConfig'***如下所示

```python
# (略)...
INSTALLED_APPS = [
   'mblog.apps.MblogConfig', #加入這一行，將mblog的設定加入
   'django.contrib.admin',
   'django.contrib.auth',
   'django.contrib.contenttypes',
   'django.contrib.sessions',
   'django.contrib.messages',
   'django.contrib.staticfiles',
]
# (略)...
```

然後就是    

```shell
python manage.py makemigrations
python manage.py migrate
```

django預設的資料庫就是他底下的db.sqlite3用資料庫的工具打開它你就會看到你的post表(mblog_post)在裡面了。
    
另外，Django厲害方便的地方是自帶後台，請在mblog資料夾下的admin.py編輯
    
```python
from django.contrib import admin
# Register your models here.
from .models import Post

admin.site.register(Post)
```

將post 表註冊進入admin中，然後利用
```shell
python manage.py createsuperuser
```

這個指令創建後台使用者，然後    
```shell 
python manage.py runserver
```
就可以進後台(記得在網址後面加入admin)無痛開箱使用post表囉

明天來講講怎麼使用前端的部分還有引入markdown的部分 就結束django這個旅程吧