---
sidebar_position: 2
---

# NodeJS

## core modules
- http 
- https
- fs
- path
- os

## First App

```javascript title="app.js"
console.log("Hello World")
```

- 使用`fs`
```javascript title="app.js"
const fs = require("fs")
fs.writeFileSync("sample.txt", "Hello World!")
```
## Event Loop

> 我們都知道Node.js出了名的輕巧高效來自於他只使用單執行緒與Event Loop(事件迴圈)的概念，將凡事有任何需要等待結果的、請求外部資源才能進行的函式，一律丟到Event Loop中等待。

![nodejs](/img/nodejs.jpeg)

Ref: [連結](https://notes.andywu.tw/2020/%E5%AE%8C%E6%95%B4%E5%9C%96%E8%A7%A3node-js%E7%9A%84event-loop%E4%BA%8B%E4%BB%B6%E8%BF%B4%E5%9C%88/)

## npm and basic
- 兩者不可共用！
```javascript
module.exports ={}
exports.data={}
```

## Http
- createServer()
```javascript
var http = require('http');

http.createServer(function(request,response){
    response.writeHead(200,{"Content-Type":"text/plain"});
    response.write('hello');
    response.end();
}).listen(9999);
```

> nodemon : node hot reload 的工具

## express
https://expressjs.com/


### Install
- npm install express --save
```javascript
var express = require('express')
var app = express()

// console.log(app)
app.get('/', function(req,res){
    res.send('hello world')
});

app.listen(4000)
```

### Route
- params (url)
```javascript
app.get('/user/:name', function(req,res){
    myname = req.params.name
    res.send(myname)
});
```

- query (get)
```javascript
app.get('/user', function(req,res){
    myname = req.query.name
    res.send(myname)
});
```

### Middleware
```javascript
app.use(function (req,res,next){
    console.log('有人進來了');
    next(); //可以往下一個route 前後順序很重要
})
```

- 404 page
```javascript
//放在最後
app.use(function (req,res,next){
    res.status(404).send('你的頁面找不到');
})
```
- error
```javascript
app.use(function (err,req,res,next){
    console.error(err.stack)
    res.status(500).send('你的頁面有錯誤喔');
})
```

- middleware 的另外一種寫法
```javascript
var login = function(req,res,next){
    console.log('有人真的進來了');
    next();
}

//寫法一
app.use(login)

//寫法2
app.get('/', login,function(req,res){
    res.send('hello world')
});
```

### static and Ejs
#### static file
```javascript
app.use(express.static('public'))
```

### EJS
- npm install ejs-locals
- http://www.embeddedjs.com/
- http://ejs.co/
```javascript
var engine = require('ejs-locals')
app.engine('ejs',engine)
app.set('views','./views')
app.set('view engine','ejs')
...
app.get('/',login,function(req,res){
    res.render('index'); //views/index.ejs
});
```

- render params into ejs
```javascript
//app.js
app.get('/',login,function(req,res){
    res.render('index',{'title':'abc'});
});
// index.ejs
<title><%= title %></title>
<title><%- title %></title> //渲染html格式

//if
<% if (show){ %>
<% } %>

//for
<ul>
<% for(var i=0; i<supplies.length; i++) {%>
   <li><%= supplies[i] %></li>
<% } %>
</ul>

```

- layout
```javascript
//layout.ejs
...
<%- body %>
...

//index.ejs
<% layout('layout') %>
    <h1>hello world</h1>
    <%- content %>
```

### body-parser
- npm install body-parser -save
```javascript
//include and use
var bodyParser = require('body-parser')
app.use(bodyParser.json()); //決定可以接受json
app.use(bodyParser.urlencoded({extended:false}));//決定可以接受urlencode

// how to receive data
app.post('/search',function(req,res){
    console.log(req.body) //{ searchText: 'ffff' }
    res.send(req.body.searchText)
    // res.redirect('/search')
});
```


### 文件與安裝
https://expressjs.com/en/starter/generator.html
> npm install express-generator -g

### Create
> express -e project
> cd project && npm install
> npm start（預設3000port）

### express-generator
- https://expressjs.com/en/starter/generator.html
- npm install express-generator -g
- express -e project
- cd project && npm install
- npm start

### cookie & session
```
document.cookie
document.cookie="myname=tom;max-age=10;path=/"
document.cookie="myname=tom;expire=...;path=/"

//使用nodejs取得與設定cookies資料
req.cookies //需要var cookieParser = require('cookie-parser');
res.cookie('name','mery',{maxAge:10000,HttpOnly:true})

// session
https://github.com/expressjs/session

```

cookie 在瀏覽器的暫存資料
session 在伺服器的暫存資料，在cookie會紀錄session_id等


瀏覽器端 Cookie
寫入 Cookie

document.cookie = "myName=tom"; 

寫入 Cookie，並加入過期時間，

document.cookie="username=bob; expires=Mon, 04 Dec 2017 08:18:32 GMT; path=/"; 

GMT 時間

new Date().toGMTString() 

寫入 Cookie，設定 10 秒後失效

document.cookie="username=bob; max-age=10; path=/"; 



Node.js Cookie 設定
安裝 解析 Cookie NPM (cookie-parser)

npm install cookie-parser 

Express 寫入 Cookie，並加入相關設定 (過期時間、httponly、path)

res.cookie(name, value [, options]); 

Express 讀取 Client 端 Cookie

req.cookies.yourCookieName; 



Node.js express-session 設定
app.use(session({
 secret: 'keyboard cat',
 resave: true,
 saveUninitialized: true,
 cookie:{}
// 設定 Cookie 設定
}))
寫入 session

res.session.屬性 = 值 

### nodeMailer
- https://nodemailer.com/about/
```
router.post('/post', csrfProtection, function (req, res) {

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        secure: true,
        auth: {
            type: "OAuth2",
            user: process.env.ACCOUNT,
            clientId: process.env.CLINENTID,
            clientSecret: process.env.CLINENTSECRET,
            refreshToken: process.env.REFRESHTOKEN,
        }
    });

    var mailOptions = {
        form: '"六角學院"<r567twiamfang@gmail.com>',
        to: 'r567tw@gmail.com',
        subject: '寄了一封信',
        text: req.body.description
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        res.redirect('review');
    })
});
```
### csurf
- https://github.com/expressjs/csurf

### dotenv
- https://www.npmjs.com/package/dotenv

### connect-flash
資料暫存
- https://github.com/jaredhanson/connect-flash
```
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');

app.use(cookieParser());
app.use(session({ secret: 'mysecret', resave: true }));
app.use(flash());

...
req.flash('error', 'username is empty')
之後取用：req.flash('error')
...

## express-validator

## 整合firebase 資料庫～
## heroku 部署
```
### express-validator
https://express-validator.github.io/docs/

### Promise
- funciton
    - new promise
        - resolve
        - reject
- 使用promise
    - then
    - catch
```
var runPromise = function(someone, timer, success) {
  console.log(someone + '開始奔跑');
  // Promise 從這開始
  return new Promise(function(resolve, reject) {
    if (success) {
      setTimeout(function() {
        resolve(someone + ' ' + (timer/1000) +'秒 抵達終點');
      }, timer);
      
    } else {
      reject(new Error(someone + '失敗'));
    }
    
  });
}
runPromise('小明', 2000, true).then(function(response) {
  console.log(response)
  return runPromise('胖虎', 3000, false);
}).then(function(response){
  console.log(response)
}).catch(function(response) {
  console.log(response)
})

Promise.all([runPromise('小明', 2000, true), runPromise('胖虎', 1000, true)])
  .then(function(response) {
  console.log(response);
}).catch(function(err) {
  console.log(err)
})

all: 全部回傳
race: 回傳最快的response
```

## Firebase
https://console.firebase.google.com/

### ref/set
```
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "...",
    authDomain: "...",
    databaseURL: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "..."
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database().ref()
</script>
```
- rule
```
{
  /* Visit https://firebase.google.com/docs/database/security to learn more about security rules. */
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
- ref(): 尋找資料庫路徑，讀取，沒有填入的話就是預設根目錄
- set(): 寫入/新增資料
```
// ref() 尋找資料庫路徑
// set() 新增資料
// firebase.database().ref().set('hi')
// firebase 全部物件格式，不能陣列內容
// 一個班級有兩個學生
 
var school = {
    student1: {
        name: 'tom',
        num: '1'
    },
    student2: {
        name: 'john',
        num: '2'
    }
}
// 餐廳資料
var data = {
    food: {
        coke: {
            price: 30,
            num: 1
        },
        fries: {
            price: 50,
            num: 20
        }
    },
    order: {
        1: {
            coke: 2
        },
        2: {
            fries: 5,
            coke: 2
        }
    }
 
}
database.ref('school').set(school)
database.ref('restaurant').set(data)

//如果要修改某位學生的資料的話可以使用這樣
//database.ref('school/student1/name').set('Koch')

```

### once
```
//once 讀取一次的資料
database.ref('myName').once('value', function (snapshot) {
  console.log(snapshot.val())
  document.getElementById('title').textContent = snapshot.val()
})
```

### on
```
//on 即時更新
database.ref('myName').on('value', function (snapshot) {
  console.log(snapshot.val())
  document.getElementById('title').textContent = snapshot.val()
})
```

## push
- 會給一個隨機id
```
database.ref('school').push({student3: {
        name: 'Jim',
        num: '3'
    }})
```

##3 remove/child
```
database.ref().child('school')
// remove 刪除
database.ref().child('school').remove()
```

### for-in
```
for(var item in items){
  console.log(item) //=>索引值
  console.log(items[item])
}
```

### debug
```
database.ref().on('value', function (snapshot) {
  //console.log(snapshot.val())
  document.getElementById('title').textContent = JSON.stringify(snapshot.val(),null,3)
})
```

### 排序
```
//orderByChild
database.ref('school').orderByChild('weight').on('value', function (snapshot) {
  //console.log(snapshot.val())
  document.getElementById('title').textContent = JSON.stringify(snapshot.val(),null,3)
})
//forEach
database.ref().on('value', function (snapshot) {
  snapshot.forEach(function(item){
    console.log(item.val())
  })
})
```
參考規則：https://firebase.google.com/docs/database/admin/retrieve-data?hl=zh-cn#orderbychild

### startAt(), endAt() , equalTo()
```
// 路徑>>排序('屬性')>>過濾>>讀取> forEach 依序撈出資料
peopleRef.orderByChild('weight').equalTo(2500).once('value',function(snapshot){
  snapshot.forEach(function(item){
    console.log(item.key);
    console.log(item.val());
  })
  // console.log(snapshot.val());
})
```

### limit
- limitTolast
- limitToFirst
```
peopleRef.orderByChild('weight').limitlast(5).once('value',function(snapshot){
  snapshot.forEach(function(item){
    console.log(item.key);
    console.log(item.val());
  })
  // console.log(snapshot.val());
})
```

### 反轉
- reverse()
```
todos.on('value',function(snapshot){
  var str = '';
  var data = [];
  snapshot.forEach(function(item){
      data.push(item.val());
      console.log(data);
  })
  data.reverse();
})
```


## serverless framework
https://denny.qollie.com/2016/05/22/serverless-simple-crud/

## DenoJS
### Articles
Build realtime app: https://morioh.com/p/2ea69cb929cd