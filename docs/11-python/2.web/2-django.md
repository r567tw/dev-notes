---
sidebar_position: 2
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

