---
title: Python 網頁：Django- 來做一個部落格(2)
date: '2018-10-27 15:56:02+00:00'
tags:
- python
- ithome
---

今天，想把Django篇先結束ＸD 
    
昨天，我們已經將post這個表註冊到後台並且已經migrate它現在，我們要開始做前端的畫面並且能夠顯示。 這非常的陽春，如果需要更加深研的請歡迎自行搜尋
    
首先你會好奇為什麼在後台儲存資料卻是post object，原因是你沒有設定要顯示的什麼東西
    
所以在這裡請編輯models.py    
```python
from django.db import models
from django.utils import timezone

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=200)
    slug = models.CharField(max_length=200)
    content = models.TextField()
    pub_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title
```
加入 `＿str__` 方法並回傳他要回傳的名稱這樣就可以在後台看到標題了
    
```python
# ...（略）
from django.contrib import admin
from mblog import views

    path('', views.homepage, name='homepage'),

]
```

將mblog/view.py引入，然後宣告首頁指向他

接下來編輯views.py    
```python
from django.shortcuts import render
from .models import Post

# Create your views here.
def homepage(request):
    posts = Post.objects.all()
    context = {
        'posts_list': posts
    }
    return render(request, 'homepage.html', context)
```
定義一個hombepage 方法，然後宣告他要傳的template 為homepage.html

最後請在mblog 裡面新建一個資料夾:templates，裡面有一個新檔案加入homepage.html    
```html
{% if posts_list %}
    <ul>
    {% for post in posts_list %}
        <li><a href="#">
            {{ post.title }}</a>
        </li>
    {% endfor %}
    </ul>
{% else %}
    沒有文章可以顯示
{% endif %}
```

這樣一個簡單的文章列表就會產生

此時我們的資料夾結構    
```python
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
    ├── __pycache__
    │   ├── __init__.cPython-36.pyc
    │   ├── admin.cPython-36.pyc
    │   ├── apps.cPython-36.pyc
    │   ├── models.cPython-36.pyc
    │   └── views.cPython-36.pyc
    ├── admin.py
    ├── apps.py
    ├── migrations
    │   ├── 0001_initial.py
    │   ├── __init__.py
    │   └── __pycache__
    │       ├── 0001_initial.cPython-36.pyc
    │       └── __init__.cPython-36.pyc
    ├── models.py
    ├── templates
    │   └── homepage.html
    ├── tests.py
    └── views.py
```
    
    
      