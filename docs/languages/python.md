---
title: Python
type: post
date: 2024-09-23T11:49:35+00:00
categories:
  - laravel
tags:
  - laravel
toc: false
draft: true
---
# Django

## 1.開發環境建置
## 2.網站快速開發
> pip install virtualenv

> virtualenv VENV

> source VENV/bin/activate

```
pip install django
django-admin startproject mblog
python manage.py startapp mainsite
python manage.py runserver
python manage.py migrate
python manage.py makemigrations mainsite
python manage.py migrate
python manage.py createsuperuser
python manage.py shell

pip install django-markdown-deux
pip freeze > requirements.txt
```

```
//in templates
{%block ... %} {% end block%}
{% extends '...' %}
{% for i in list %}{% endfor %}
{% load static %}
{% static "..." %}
{{ post.body | truncatechars:40 }}
{{ post.pub_date | date:"Y M d,h:m:s" }}
{{ post.body | safe }}
```

## 3.讓網站上線
1.DigitalOcean
2.HeroKU
3.GCP
```
apt-get update
apt-get install apache2
apt-get install libapache2-mod-wsgi
apt-get install git
apt-get install python-pip
apt-get install virtualenv
//修改settings.py debug=false production!
```

## 4.深入了解django 的mvc 架構
1. mvc
2. django 的mtv 架構
 - m :model
 - t : view
 - v : controller

- 與專案同名的資料夾放置全站設定
- 開發步驟
    - 需求分析
    - 資料庫設計
    - 使用vituralenv
    - pip install django
    - django-admin startproject
    - python manage.py startapp
    - templates 資料夾
    - static 資料夾
    - 修改settings.py
    - 修改ｍodels.py
    - 修改 views.py import models
    - 編輯 admin.py 將model 註冊進去
    - 編輯 views.py define function to render
    - 編輯 urls.py import views.py 和define url
    - python manage.py makemigrations
    - python manage.py migrate
    - python manage.py runserver

### model
 - from django.db import models
```
class Post(models.Model):
    title = models.CharField(max_length=200)
    ...
```
 - [常用資料欄位名稱](https://docs.djangoproject.com/en/2.0/ref/models/fields/)
 - [常用屬性](https://docs.djangoproject.com/en/2.0/ref/models/fields/#field-options)
 - admin.py
 ```
 from mysite.models import NewTable
 admin.site.register(NewTable)
 ```
 - 選項
 ```
 ...
 SIZE =(('S','SMAILL'),('M','MEDIUM'))
 size = models.CharField(max_length=1,choices=SIZE)
 ...
 ```
 - python manage.py shell
 - 資料的查詢與編輯
    - Product.objects.
        - create
        - save
        - all
        - filter
        - exists
        - order_by()
### view
```
//views.py
from django.shortcuts import render
from django.http import HttpResponse
html =......
return HttpResponse(html)
//urls.py
from mysite.views import about
...
```

### template
```
products = Product.objects.all()
template = get_template('list.html')
html = template.render({'products':products})
return HttpResponse(html)
```

## 5.網址的對應與委派
- URLconf 模組
- https://docs.djangoproject.com/en/2.0/topics/http/urls/ 
```
from django.conf.urls import include,url

urlpatterns =[
    path('admin/', admin.site.urls),
    path('',homepage),
    path('post/<slug:slug>',showpost)    
    path('articles/<int:year>/', views.year_archive, name='news-year-archive'),
]
// name='news-year-archive' in template
<a href="{% url 'news-year-archive' 2019 %}">show the post</a>
```
## 6.Template 深入探討
```
{% if 條件 %}{% endif %}
{% if 條件 %}{% elif 條件 %}{% endif %}
{% if 條件 %}{% elif 條件 %}{% else %}{% endif %}


{% for t in tv_list %}{% endfor %}
```

- 過濾器
- https://docs.djangoproject.com/en/2.0/ref/templates/builtins/
- https://docs.djangoproject.com/en/2.0/ref/templates/builtins/#built-in-filter-reference

## 7.Models 與資料庫
- 資料庫設計
```
pmodel= models.ForeignKey(Product , on_delete=models.CASCADE)
```

```
class ProductAdmin(admin.ModelAdmin):
    list_display('pmodel','nickname','price','year')
    search_fields('nickname',)
    ordering=('-price',)

admin.site.register(models.Product,ProductAdmin)

```

- django connect MySQL
    - apt-get install python-dev libmysqlclient-dev
    - pip install mysql-python
```python
// in settings.py
DATABASES = {
    'default':{
        'ENGINE':'django.db.backends.mysql',
        'NAME' :'db_name',
        'USER' :'user_name',
        'PASSWORD' :'password',
        'HOST':'host',
        'PORT':'port'
    }
}
```

## 8. 網站與表單
- form html
- receive request
```python
def index(request):
    template = get_template('index.html')
    try:
        urid = request.GET['user_id']
        urpass = request.GET['user_pass']
    except:
        urid = null
    //urfcolor = request.GET.getlist('fcolor')
    html = template.render(locals())
    return HttpResponse(html)
```
- csrf
    - settings.py/middleware_classes: django.middleware.csrf.CsrfViewMiddleware
```html
//in template html
{% csrf_token %}
``` 
- form class
```python
//froms.py
from django import forms
class ContactForm(forms.Form):
    city =['ab','b']

    user_name = froms.CharField(label='your name',max_length=50,initial='default')
    user_city = froms.ChoiceField(label='city',choices=city)
    user_email = froms.EmailField(label='email address')
    user_message = forms.CharField(label='your comment',widget=forms.Textarea)

//views.py
from mysite import models,forms
def contact(request):
    form = forms.ContactForm()
    template = get_template('contact.html')
    request_context = RequestContext(request)
    request_context.push(locals())
    html = template.render(request_context)
    retrun HttpResponse(html)

//in template contact.html (as_p, as_table, as_ul )
{% csrf_token %}
{{ form.as_p }}
....

// receive request 
def rcontact(request):
    if request.method == 'POST':
        form = forms.ContactForm(request.POST)
        if form.is_valid():
            message = 'ok'
            //user_name = form.cleaned_data['user_name']
        else:
            message = 'error'
    else
        form = forms.ContactForm()

    template = get_template('contact.html')
    request_context = RequestContext(request)
    request_context.push(locals())
    html = template.render(request_context)
    retrun HttpResponse(html)
    
```
- mail
- http://mailgun.com
- pip install django-mailgun
```
from django.core.mail import EmailMessage
...
email = EmailMessage('subject','content','from_mail',['abc@abc'])
email.send()
```

- modelform
- https://docs.djangoproject.com/en/2.0/topics/forms/modelforms/
```python
//froms.py
from django import forms
class ContactForm(forms.ModelForm):
    class Meta:
        model = models.Contact
        fields = ['user_name','user_city','user_email','user_message']

    def __init__(self,*args,**kwargs):
        self.fields['user_name'].label ='your name'
        self.fields['user_city'].label ='city'
        self.fields['user_email'].label ='email address'
        self.fields['user_message'].label ='your comment'

//views.py
from mysite import models,forms
def contact(request):
    template = get_template('contact.html')
    form = forms.ContactForm()
    city = ['a','b']
    message = 'error'
    request_context = RequestContext(request)
    request_context.push(locals())
    html = template.render(request_context)
    retrun HttpResponse(html)

//in template contact.html (as_p, as_table, as_ul )
{% csrf_token %}
{{ form.as_p }}
....

// receive request 
def rcontact(request):
    if request.method == 'POST':
        form = forms.ContactForm(request.POST)
        if form.is_valid():
            message = 'ok'
            //form.save()
        else:
            message = 'error'
    else
        form = forms.ContactForm()

    template = get_template('contact.html')
    request_context = RequestContext(request)
    request_context.push(locals())
    html = template.render(request_context)
    retrun HttpResponse(html)
    
```

- django-simple-captcha
```python
from captcha.fields import CaptchaField

captcha = CaptchaField()
self.fields['captcha'].label ='確定你不是機器人'
```

## 9.Session
- cookie
```python
if request.session.test_cookie_worked():
    request.session.delete_test_cookie()
    message ='cookie supported'

request.session.set_test_cookie()
//response.set_cookie('username',username)
//request.COOKIES['username']
//response.delete_cookie('username')
```
- session
```python
request.session['username']
request.session['username']=user.name
```
- message framework
```python
from django.contrib import messages
messages.add_message(request,messages.INFO,'STRING')
messages.get_messages(request)

//template
{% for message in messages %}
    <div class='alert alert={{message.tags}}'>{{ message }}</div>
{% endfor %}
```
- django auth
```python
//login
from django.contrib.auth.models import User
user = User.objects.create_user('name','email','password')

from django.contrib.auth import authenticate
from django.contrib import auth
from django.contrib.auth.decorators import login_required

user = authenticate(username=login_name,password=login_password)

if user is not None:
    if user.is_active:
        auth.login(request,user)
        ...
    else:
        //account not active
else:
    //login error

//logout
    auth.logout(request)
    ...
```

- 增加user 欄位
```python
from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    height = models.PositiveIntegerField(default=60)
    male = models.BooleanField(default=false)
    website = models.URLField(null=true)

    def __str__(self):
        return self.user.username

```

## 10.使用者的註冊與管理
- pip install django-registration
- pip install django-allauth
    - for social account

## 11.購物車
- pip install django-cart
- oscar
    - pip install django-oscar
    - git clone https://github.com/django-oscar/django-oscaar.git


## 12.其他資源
- django package
    - https://djangopackages.org
- awesome django
    - https://gitlab.com/rosarior/awesome-django
- django 
    - https://www.djangoproject.com/
https://www.learncodewithmike.com/2020/04/django-authentication-and-usercreationform.html

# Flask

## 入門
- pip install flask
```python
from flask import Flask

app = Flask(__name__,static_folder='/tmp')

@app.route('/')
def hello_world():
    return 'hello world'

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=9000)
```

```
@app.route('/item/<id>')
def item(id):
    return 'Item:{}'.format(id)

@app.route('/login',methods=['GET','POST'])

redirect(location,code=301)
```

- 設定
```
app.config['DEBUG'] =True
app.config.update(DEBUG=True,SECRET_KEY='...')
```
- SQLAlchemy

## flask 進階
- pip install blinker
- pip install flask-login
- pip install flask-script // python manage.py startapp
- pip install flask-debugtoolbar
- pip install flask-Migrate
- pip install flask-wtf
- pip install flask-security
- pip install flask-restful
- pip install flask-admin
- pip install flask-assets
- pip install Werkzeug //middleware

## REST 和 Ajax
- REST:  Representational State Transfer
    - 資源
    - client/server
    - 無狀態
    - 快取
    - 統一介面
    - 分層系統
- Ajax: 非同步javascript and xml

## 網站架構
- WSGI : python web server gateway interface
- WSGI 標準 在 PEP333 規定一種在web server 和ｗeb application 之間推薦的標準介面
    - Gunicorn
    - uWSGI

- Nginx :web 伺服器- 負責處理http 協定，透過WSGI介面丟到web application 處理
- web application ->內容/其他協定

- 反向代理 和 正向代理
- 快取系統
    - 避免透過直接存取資料庫對資料庫造成很大的負擔
    - Memcached
    - Redis

- 快取更新策略
    - 懶惰式載入：如果快取找到，就回傳：如果沒找到在去找資料庫並更新寫回快取
    - 主動更新：預設快取永不失效，當有資料需要更新時同時也會把最新資料寫回快取中，如果耗時，應使用非同步的更新

- 分片和叢集管理

- NoSQL:Not only SQL
    - 不預先定義模式
    - MongoDB
- CDN
- 大型網站架構經驗
    - 快取
    - 負載平衡
    - 高可用性
    - 業務拆分
    - 叢集
    - 減少頁面請求和請求內容量
        - http 是無狀態的應用層協定，每次請求都要client and server 啟動獨立執行緒處理。
    - 動靜頁面分離
    - 動態頁面靜態化

## 系統管理
- supervisor
- fabric
- psutil

## 測試和持續整合
- unittest
- doctest

## 訊息佇列和celery
- Message Queue: 提供非同步通訊協定，可以實現處理程序間通訊或同一處理程序的不同執行緒間通訊
- beanstalked
- RabbitMQ
- celery

## 服務化


## 資料處理
- MapReduce
- Pandas

## 幫助工具
- Ipython
- Jupyter Notebook

- 了解linux 伺服器執行狀況
    - free
    - uptime
    - dstat
    - glances
    - iftop
    - sysdig
    - nethogs
    - iotop
    - iptraf

- boom 壓測工具
- tcpcopy

## python 平行處理程式設計

## python 進階

## web 開發專案實作

# AI

## 01人工智慧、機器學習、深度學習介紹
### 名詞簡介與關係
- 人工智慧 Artificial Intelligence
    - Turing 圖靈
    - strong AI: 居有和人類相同認知能
    - weak AI：不需要具有和人類相同認知能，只要設計的看起來具有智慧即可

- 機器學習：透過演算法使用大量資料進行訓練，訓練好會形成模型，當未來有新資料時可以進行預測 Machine Learning
    - 監督式學習: Supervised Learning
    - 非監督式學習: Unsupervised Learning
    - 增強式學習

- 深度學習 deep learning
    - 機器學習的分支
    - 模擬人類神經網路的運作模式
    - Multilayer Perceptron 多層感知器
    - DNN 深度神經網路/CNN 卷積神經網路/RNN 遞迴神經網路

question: 為何近年成長快速？
1. 大數據big data 分散式儲存與運算
2. GPU\TPU 平行運算

### 機器學習介紹
- 透過演算法、使用歷史資料進行訓練，訓練完成後會產生模型。未來有新資料後可以使用模型進行預測

- features 資料特徵 ex. 風向、濕度、氣壓
- label 資料標籤，希望預設的目標ex. 晴天、陰天、下雪
- training 過去累積的歷史資料
- predict 預測

### 機器學習分類
- 監督式學習 supervised learning
    - ：已知有具備特徵與預測目標
    - 二元分類
    - 多元分類
    - 回歸分析

- 非監督式學習 unsupervised learning
    - ：不知道要預測的答案
    - cluster 集群演算法：分成幾個相異性大的，而群組內相似程度高
- 強化學習 reinforcement learning
    - :藉由定義動作、狀態、獎勵的方式，不斷訓練機器循序漸進
    - Q-learning
    - TD
    - Sarsa

### 深度學習
- [wiki](https://zh.wikipedia.org/wiki/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0)

## 02 深度學習的原理
- 神經傳導原理介紹 
- 多層感知器模型
- 使用back propagation 反向傳播演算法進行訓練
    - 資料預處理
    - 建立模型
    - 反向傳播算法訓練多層感知器模型
    - 最佳化方法
        - SGD梯度下降法

## 03 TensorFlow與Keras介紹
- TensorFlow 架構圖:Tensor 張量/廣義的數量+ Flow 資料流程
    - 高階API
    - 前端程式語言 python c++
    - TensorFlow Distributed Execution Engine
    - 平台作業系統
    - CPU GPU TPU
- 主要設計讓矩陣運算達到最高效能
- TensorFlow 程式設計模式核心:計算圖 建立與執行～

- Keras 介紹
    - 模型的建立與訓練、預測
    - 後端引擎: Theano 或者TensorFlow

- keras 程式設計模式
```
model = Sequential()
model.add(Dense(units=256,
                input_dim=784,
                kernel_initializer='normal',
                activation='relu')) //加入輸入層和隱藏層
model.add(Dense(units=10,
                kernel_initializer='normal',
                activation='softmax')) //加入輸出層
```

## 04 Windows 安裝TensorFlow 與Keras
- 安裝anaconda
- conda create --name tensorflow python=3.5 anaconda
- activate tensorflow //open env
    - jupyter notebook
- deactivate tensorflow //close env
- pip install tensorflow
- pip install keras
- import tensorflow as tf
    - tf._\_version_\_
- import keras
    - keras._\_version_\_

## 05 linux ubuntu 安裝 TensorFlow 與keras
- same step...
- edit .bashrc
    - export PATH="/home/user/anaconda3/bin:$PATH"
- jupyter notebook


## 必要函式庫
- Pandas
- Jupyter
- matplotlib
- TensorFlow
- Keras

## jupyter
```
jupyter notebook
```

## pandas
- 定義：
    - 直：column
    - 橫：row 
    - columns: 行標籤
    - index：列標籤
    - dataFrame / series

## 使用 pandas

### 基礎行列操作
```
import pandas as pd
df = pd.read_csv('ted_main.csv',encoding = 'utf-8')

# 行操作
df["comments"]
df[["comments","description"]]

# 列操作
df.head(5)
df.tail(5)
df.iloc[999]
df.iloc[999:1005]
df.iloc[999:1005:2]
```

### 進階操作
```
from datetime import datetime

def timeflow(t):
    return str(datetime.utcfromtimestamp(t))

df['file_date_utc'] = df['film_date'].apply(timeflow)
df

# df[條件]
df.head(3)[[False,True,False]]

df["comments"]>30
df[df["comments"]>3000]

# 篩選出children 的tag
def tagFlow(s):
    tags = eval(s)
    return "children" in tags
df["tags"].apply(tagFlow)
df[df["tags"].apply(tagFlow)]

def test(**a):
    print(a)

# 允許外部作為參數輸入tag
def tagFlow(s,**kwargs):
    tags = eval(s)
    return kwargs['tag'] in tags

df[df["tags"].apply(tagFlow,tag='children')]

# 翻轉資料
df.T
df.T.to_csv("hello.csv",encoding = 'utf-8',index=False)
```

<!-- # 深度學習入門教室
http://www.sotechsha.co.jp/sp/1187
## CH1 深度學習與機器學習
1. 深階層的類神經網路
DNN => Deep Neural Network
2. 歷史
3. 監督式學習與非監督式學習、強化學習
4. 所需的數學

## 安裝python 以及python 基本語法

## TensorFlow & Keras 的安裝

## numpy
```
import numpy as np
a = np.array([1,2,3,4,5,6])
a.reshape([3,2])
np.zeros((3,4)) //[[0,0,0,0],[0,0,0,0],[0,0,0,0]]
```

## matplotlib


- ANN: 人工神經網路
- 階躍函數：step function: 當某個條件才會是0/某個條件才是1
- 感知器

## 激勵函數
 -->


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


# Basic
:::info
參考: 精通 Python：運用簡單的套件進行現代運算、王者歸來、Python特訓班等書籍整理
:::

## 介紹
- 直譯式語言、物件導向、具有垃圾回收
- 註解符號：`#`,`'''`
- Python 彩蛋：`import this`, `import antigravity`
- 等號的多重指定
```python
x , y ,z = 10,20,30
```

- Example code
```python 
for countdown in 5,4,3,2,1:
    print(countdown)
import this # python 之禪
```

## 數字、字串與變數
1. boolean
2. integer
3. float
4. string

```python
type(a) # 以查詢是什麼類別
```

- 變數只能使用這些字元
    - 小寫大寫字母
    - 數字（不可以純粹數字）
    - 底線（不可放在後面 ex. 1_ 這個名稱就會無效）
    - 不可使用保留字

- 基數
    - 二進位：0b/0B
    - 八進位：0o/oO
    - 十六進位：0x/0X

- 型別轉換

- 字串函式
    - str()
    - "HEy"*3
    - letters[0] / letters[start:end:step] / letters[::7]
    - len()
    - split() 
    - join()  ', '.join(list)
    - startswith()
    - endswith()
    - find()
    - rfind()
    - count()
    - isalnum() 是否只有字母與數字
    - strip()
    - capitalize() 第一個字母改大寫
    - title() 所有字母第一個改大寫
    - upper() 
    - lower()
    - swapcase()
    - center() 在幾個空格裡置中字串
    - ljust() 靠左對齊
    - rjust() 靠右對齊
    - replace()

## 串列、Tuple、字典、與集合
### Tuple 不可變的
- 建立方式
```python
() 
```
- turple unpacking
```
data = ('a','b','c')
a,b,c = data
a # 'a'
b # 'b'
c # 'c'
```
- 佔用空間少、無法被修改

### list: 可變的
- 建立方式
```
[] / list()
```
- [為移植]
- append()
- extend() => +=
- insert()
- remove()
- pop()
- index()
- count()
- join()
- sort() ：就地排序
- sorted() : 回傳副本
- copy(): https://skylinelimit.blogspot.com/2018/04/python-variable-reference.html
    - 變數可能會參考
- in
- del 
- len()

### 字典
- 建立方式
```
{}
```

- dict()
- update()
- clear()
- keys()
- values()
- items()
- copy()
- [key]
- del
- in

### 集合
- 建立方式
```
set()
```

- 丟棄任何重複的值
- & / intersection()  取得交集
- | / union() 取得聯集
- `-` / difference : 取得差集（屬於第一個而非第二個）
-  ^ / symmetric_difference() 互斥
- `<=` / issubset() 子集合

## Control Flow
- if / elif / else
- while / break / continue / else
- for ... in ... / else
- for ... in zip(a,b,c)
- for ... in range(0,3)

```
numbers = [number for number in range(1,6)]
odds = [number for number in range(1,6) if number % 2 == 0]
```

- def ...
- None
- is

- 用 ＊ 來收集位置引數 ＊args 回傳tuple
- 用 ＊* 來收集關鍵字引數 **kwargs 回傳字典

- lambda()
```
lambda word: word.capitalize()
```

- decorator: `@`
- _ & __
- try ... catch


- 命名空間與範圍
- locals()
- globals()

## Module

### Import Module
```python
import <module> / from <module> import <function>
```

- from collections import defaultdict/ OrderedDict
- from collections import Counter / Couter.most_common()
- pprint()

### Crawler
- beautifulsoup4
- request-html https://github.com/psf/requests-html

### Subprocess
- run

```python
import subprocess

result = subprocess.run(["ls", "-l"], capture_output=True, text=True)
print(result.stdout)
```
- Popen

```python
import subprocess

process = subprocess.Popen(["ls", "-l"], stdout=subprocess.PIPE, text=True)
output, _ = process.communicate()
print(output)
```
- check_output

```python
import subprocess

output = subprocess.check_output(["ls", "-l"], text=True)
print(output)
```

:::info
golang 類似 subprocess 的模組："os/exec"
- Ref: https://stackoverflow.com/questions/54269243/golang-equivalent-of-creating-a-subprocess-in-python
:::

### Sys
```
import sys
print(sys.argv)
```
### BeautifulSoup
```=python
import requests
from bs4 import BeautifulSoup

request=requests.get(url)
content=request.content
soup=BeautifulSoup(content,"html.parser")
print(soup)
```

- find():只會找第一個找到的值並返回，假如沒有符合的並返回None
ex. soup.find("div",{"class","yt-lockup-video"})
- find_all():會找到所有符合的並返回一個 list ，假如沒有符合的並返回"[ ]"。
- select()
soup.select(".yt-lockup-video")
    - **class 用.** 
    - **id用#**
- get()

```python
#範例檔 抓取youtube 周杰倫的MV
import requests
from bs4 import BeautifulSoup

url = "https://www.youtube.com/results?search_query=%E5%91%A8%E6%9D%B0%E5%80%AB"
request = requests.get(url)
content = request.content
soup = BeautifulSoup(content, "html.parser")

for all_mv in soup.select(".yt-lockup-video"):
    # 抓取 Title & Link
    data = all_mv.select("a[rel='spf-prefetch']")
    print("名稱: {}".format(data[0].get("title")))
    print("連結: https://www.youtube.com{}".format(data[0].get("href")))

    # 抓取觀看時間與人數
    data = all_mv.select(".yt-lockup-meta-info")
    time = data[0].get_text("#").split("#")[0]
    see = data[0].get_text("#").split("#")[1]
    print("發佈時間: {}".format(time))
    print("觀看人數: {}".format(see))

    # 抓取Img
    data = all_mv.select("a[rel='spf-prefetch']")
    img = all_mv.select("img")
    if img[0].get("src") != "/yts/img/pixel-vfl3z5WfW.gif":
        print("照片: {}".format(img[0].get("src")))
    else:
        print("照片: {}".format(img[0].get("data-thumb")))
    print("-------------------")
```

## Object
- 屬性、方法
```
class Person():
    def __init__(self,name):
        self.name = name
    def shut(selft):
        print('shut')

class Boy(Person):
    def __init__(self,name,email):
        super().__init__(name)
        self.email = email


someone = Person('Jimmy')
```
 - property() / @property(), @name.setter
 ```
 class Duck():
    def __init__(self, input):
        self.hidden_name = input
    def get_name(self):
        return self.hidden_name
    def set_name(self,input):
        self.hidden_name = input
    name = property(get_name,set_name)
 ```
 - 使用雙底線開頭的命名規則
 - @classmethod
 - @staticmethod
 - 魔術方法： __eq__ / __ne__ / ....

## Input/Output
- 檔案輸入/輸出
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

- open() / write()
- read() / readline() / readlines()
- TXT / CSV / JSON / XML / YAML
- JSON : dumps() / loads()
- 二進位檔案
- 資料庫
    - SQLite / Mysql / PSSQL / NoSQL
    - SQLAlchemy

## Web 
### 標準程式庫
- http
- urllib
```
import urllib.request as ur
url = 'https://randomuser.me/api/'
conn = ur.urlopen(url)
data = conn.read()
print(data)
```
- Requests
```
import requests
url = 'https://randomuser.me/api/'
resp = requests.get(url)
print(resp.text)
```
- 啟動簡易伺服器
```
python -m http.server
python3 -m http.server
```
- WSGI : web 伺服器閘道介面

### 框架
- Bottle
- Flask
- Django
- web2py

### other
```
import antigravity # 會開啟一個特別的網頁
import webbrowser
webbrowser.open('https://google.com')
webbrowser.open_new('https://google.com')
```
- RESTFul API
- JSON
- Crawl & Scrape
```
pip install scrapy
pip install BeautifulSoup4
```

### TCP
```python
# client.py 
import socket

host = '127.0.0.1'
port = 3434

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((host, port))

data = s.recv(1024)
print(f'Received: {data}')
s.close()
```

```python
# server.py 
import socket
import datetime

host = '0.0.0.0'
port = 3434

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((host, port))
s.listen(1)

while True:
    conn, addr = s.accept()
    print(f'Client {str(addr)} connect')
    dt = datetime.datetime.now()
    message = f'Now: {str(dt)}'
    conn.send(message.encode('utf-8'))
    # print(f'sent : {message}')
    conn.close()
```

### UDP
```python
# client.py
import socket

host = '127.0.0.1'
port = 3434

s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

data = 'Hello World'
s.sendto(data.encode('utf-8'), (host, port))
s.close()

```

```python
# server.py
import socket
import datetime

host = '0.0.0.0'
port = 3434

s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.bind((host, port))

while True:
    data, addr = s.recvfrom(1024)
    print(f'Received {data} from {str(addr)}')

s.close()

```

## System and Datetime
### 標準程式庫
- open()
- os
    - os.path.exists()
    - os.path.isfile()
    - os.path.isdir()
    - os.path.isabs()
    - os.path.islink()
    - os.path.abspath()
    - os.path.realpath()
    - os.chmod()
    - os.chown()
    - os.rename()
    - os.remove()
    - os.mkdir()
    - os.rmdir()
    - os.listdir()
    - os.chdir()
    - os.link()
    - os.symlink()
- shutil
    - shutil.copy()
- glob
    - glob.glob('m*')
- subprocess
- multiprocessing

### 時間
- calendar
- datetime
- time

## Async

- 同步/非同步
- 標準程式庫：multiprocessing / threading / asyncio
- twisted 網頁框架
- redis
- 發布-訂閱 模式
    - redis
    - zeroMQ
    - RabbitMQ

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

## 有趣：一行指令輸出大心
- https://cheng-min-i-taiwan.blogspot.com/2019/11/python.html
```
print('\n'.join([''.join([('Love'[(x-y) % len('Love')]if ((x*0.05)**2+(y*0.1)**2-1)**3-(x*0.05)**2*(y*0.1)**3 <= 0 else ' ')for x in range(-30, 30)])for y in range(30, -30, -1)]))
```
