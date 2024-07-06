## Gulp

### gulp 的環境

> npm install gulp -g
> gulp -v

- - 引入套件
npm install gulp-sass --save(-dev)

```javascript
//gulpfile.js
gulp.task('{name}',function(){
    gulp.src('{./xxx/xxxfile}')
    .pipe(/*do something*/)
    .pipe(/*do something*/)
    .pipe(gulp.dest('{...path}'))
    gulp.watch(......)
})
   
```
接下來進行任務
>gulp [任務 name]
- 有沒有加入 -g 差異在哪裡呢？
    - 有加入 "-g"：這是安裝全域的套件:也就是安裝在目前的電腦上，目的是啟用 "gulp" 這個指令
    - 沒有加入：這是 local 套件安裝的指令:是裝在目前的專案資料夾內，目的是執行 gulp 時可以取用的套件

**總結：只有 npm install gulp -g  才會使用到全域的指令
其餘 gulp 套件只會用到 "npm install --save"**
### Gulp 常用套件
- gulp-jade
- gulp-sass
- gulp-plumber 出錯時不會馬上停止
- gulp-postcss
- autoprefixer
- gulp-load-plugins
- gulp-babel
- babel-preset-es2015
- gulp-sourcemaps
- gulp-concat
- browser sync
- main-bower-files
- gulp-minify-css
- gulp-uglify
- minimist
- gulp-if


### 打包和watch
1.打包
```javascript=
gulp.task('default',['jade','sass','watch']);
//gulp
```
2.watch
```javascript=
gulp.task('watch', function () {
    gulp.watch('./source/scss/**/*.scss',['sass']);
    gulp.watch('./source/**/*.jade',['jade']);
    gulp.watch('./source/js/**/*.js', ['babel']);
});
//gulp watch
```

### 範例一.copyHTML
```javascript=
var gulp= require('gulp');

gulp.task('copyHTML',function(){
    return gulp.src('./source/**/*.html')
        .pipe(gulp.dest('./public/'))
})
````
> gulp copyHTML

### 範例二 jade-blade
> npm install gulp-jade --save
```javascript=
var jade= require('gulp-jade');
gulp.task('jade',function(){
    gulp.src('./source/*.jade')
        .pipe(jade({
            pretty:true
        }))
        .pipe(gulp.dest('./public/'))
})

//gulp.src('./source/*.jade') 
//建議可以修改成 gulp.src('./source/**/*.jade') 
//gulp jade
```
### 範例三 Scss
> npm install gulp-sass --save
```javascript=
var sass= require('gulp-sass');
gulp.task('sass',function(){
    return gulp.src('./source/scss/**/*.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest('./public/css'))
});
//gulp sass
//目前版本的 Watch 並無法監控到 "新增” 及 “刪除” 的檔案更動
// 所以是新增的檔案下，是必須重啟 gulp 服務才能繼續監控
// 或者是使用另一個 gulp-watch 套件
// https://www.npmjs.com/package/gulp-watch
```
> https://github.com/scniro/gulp-clean-css
> gulp-minify-css 作者不再維護了改而推薦使用 gulp-clean-css
### 範例四 postcss 和autofixer
>處理瀏覽器合適的css (前綴詞) css 後處理器
```javascript=
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var minifyCss = require('gulp-minify-css'); //壓縮

gulp.task('sass',function(){
    var plugins=[
        autoprefixer({browsers:['last 1 version','>5%']})
    ];

    return gulp.src('./source/scss/**/*.scss')
        .pipe(sass().on('error',sass.logError))
        //編譯完成css
        .pipe(postcss(plugins))
        .pipe(minifyCss()) //壓縮css
        .pipe(gulp.dest('./public/css'))
});
```

### 範例五 gulp-load-plugins
>簡化gulp require 東西
>僅能處理gulp 開頭的套件
```javascript=
var $=require('gulp-load-plugins')()
// var jade= require('gulp-jade');
// var sass= require('gulp-sass');
// var postcss = require('gulp-postcss');
// 
//sass -> $.sass
//jade -> $.jade
//gulp-postcss -> $.postcss
```
### 範例六 babel concat(合併) sourcemaps
>將js 語法轉換為babel 語法 可以適用每個瀏覽器
```javascript=
var babel=require('gulp-babel');
var concat=require('gulp-concat');
var sourcemaps=require('gulp-sourcemaps');
var uglify = require('gulp-uglify'); //壓縮

gulp.task('babel', () =>
    gulp.src('./source/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('all.js'))
        .pipe(uglify()) //壓縮js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/js'))
        //.pipe(browserSync.stream())

);

//適用於scss 的sourcemap
gulp.task('sass',function(){
    var plugins=[
        autoprefixer({browsers:['last 1 version','>5%']})
    ];

    return gulp.src('./source/scss/**/*.scss')
        .pipe(sourcemaps.init()) //很重要的一行
        .pipe(sass().on('error',sass.logError))
        //編譯完成css
        .pipe(postcss(plugins))
        .pipe(minifyCss())
        .pipe(sourcemaps.write('.')) //要放在輸出前一行
        .pipe(gulp.dest('./public/css'))
        //.pipe(browserSync.stream())

});
```

### 範例七 gulp 與bower 對接
>main-bower-files
```javascript=
var mainBowerFiles=require('main-bower-files')
var uglify = require('gulp-uglify');

//先講檔案載入暫時的資料夾
gulp.task('bower', function () {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('./.tmp/vendors'))
});
//然後做出合併
gulp.task('vendorJs',['bower'],function(){
    return gulp.src('./.tmp/vendors/**/*.js')
    .pipe(concat('vendor.js'))
    .pipe(uglify({
        compress:{
            drop_console:true //把console.log 削掉
        }
    }))                                
    .pipe(gulp.dest('./public/js'))
})


```

### 範例八 WebService
> npm install browser-sync --save
> npm install -g browser-sync --msvs_version=2013  (windows 用戶採雷)
> >npm i browser-sync --save
```javascript=
//.pipe(browserSync.stream())
var browserSync = require('browser-sync').create();

gulp.task('browser-sync',function(){
    browserSync.init({
        server:{
            baseDir:"./public"
        }
    })
})

```

### 範例九 minimist gulp-if
- develop
    - js
        - console 保留
        - 不壓縮
    - css
        - 不壓縮
- production
    - js
        - console 放棄,壓縮
    - css,html 
        - 壓縮
---
```javascript=

var minimist = require('minimist');
var gulpif= require('gulp-if');

var env ={
    string:'env',
    default:{ env:'develop'}
}

var options = minimist(process.argv.slice(2),env)
console.log(options)

gulp.task('sass',function(){
    var plugins=[
        autoprefixer({browsers:['last 1 version','>5%']})
    ];

    return gulp.src('./source/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error',sass.logError))
        //編譯完成css
        .pipe(postcss(plugins))
        .pipe(gulpif(options.env === 'production',minifyCss()))  //重點 gulpif(變數,工作流)
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream())
});

//使用:  gulp sass --env production/develop
```

### 範例十 gulp-clean gulp-sequence
> 釋出開發的成品
```javascript=
var clean= require('gulp-clean');
//刪除資料夾
gulp.task('clean',function(){
    return gulp.src(['./.tmp','./public'],read:false})
        .pipe(clean())
});
var gulpSequence = require('gulp-sequence');
//按照順序產生任務

gulp.task('sequence', gulpSequence('clean', 'jade', 'sass','babel','vendorJs'));

```
### 範例十一 gulp- 圖片壓縮
```javascript=
const imagemin = require('gulp-imagemin');
 
gulp.task('image-min', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);
```
