---
title: Laravel File Storage
date: '2019-10-07 10:29:27+00:00'
tags:
- laravel
- ithome
---
接下來我分享關於Laravel內建關於檔案管理的部分，先上個文件：https://laravel.com/docs/6.x/filesystem

Laravel 的檔案除了傳統上的可以存在本機(Server)上，也可以存在AWS S3和ftp/sftp喔，也可以配合一些大大寫好的套件存在GCP或者其他儲存的載體中。

這裡就簡單說明一下：
- 如果你要提取檔案
```
$contents = Storage::get('file.jpg');
```

- 如果你想要從AWS S3取得檔案的話，在中間加入一個`disk`即可
```
$contents = Storage::disk('s3')->get('file.jpg');
```
註：ftp 和sftp以此類推...

而在文件當中也說到我們可以去`強迫他人下載`檔案，大家有印象的話通常我們在某些連結點擊時不是就會出現一個跳窗(問你要存在哪裡？)(沒有的話可能是你已經先做預設的調整了～)，在Laravel可以這樣用：
```
return Storage::download('file.jpg');
```

接下來，我決定帶大家試做一遍，一個極簡單可以上傳檔案的表單。好讓大家試試看這個File Storage的API。

# 建立Route、Controller和blade

首先，我們先準備兩個route，一個是上傳檔案的form，另外一個則是負責上傳流程的。
```
// in routes/web.php
Route::get('upload','UploadController@uploadPage');
Route::post('upload','UploadController@upload');
```

然後建立一下`UploadController`，你可以用指令，也可以手動建立
```
$ php artisan make:controller uploadController
```

然後，我們先來處理form的部分，`uploadPage`裡面就只是簡單回傳一個view
```
    public function uploadPage(){
        return view('fileUpload');
    }
```

別忘了要到`resources/view`資料夾建立`fileUpload.blade.php`
```
@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="row justify-content-center">
                    @if (isset($message))
                        <div class="success">
                            {{ $message }}
                        </div>
                    @endif
                    <form class="form" action="" method="POST" enctype="multipart/form-data">
                        @csrf
                        <div class="form-group">
                            <label for="">檔案上傳</label>
                            <input  class="form-control-file" type="file" name="ImageFile" id="" accept="image/*"/>
                        </div>
                        <button class="btn btn-primary" type="submit">送出</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
```

請記得，上傳檔案的form必須要加一個`enctype="multipart/form-data`，否則你無法上傳檔案。

接下來，讓我們開始處理檔案上傳的流程吧！
在`UploadFileController`這個檔案新增`upload`這個function，別忘了要在之前`use Storage`喔
```
use Storage;
...（略）

    public function upload(Request $request){
        Storage::put('test.jpg', $request->file('ImageFile')->get());
        return view('fileUpload')->withMessage('Success Upload');
    }
```

說明：這裡可以使用`put`這個方法，並且將檔案的內容傳入，其實就是這麼簡單，使用`request`類別的`file`方法，裡面則就放在表單裡宣告的名稱(name)，這裏以`ImageFile`為例。
```
<input  class="form-control-file" type="file" name="ImageFile" id="" accept="image/*"/>
對上
$request->file('ImageFile')->get()**
```

接下來嘗試上傳一個檔案，看到Success Upload就正確囉
![https://ithelp.ithome.com.tw/upload/images/20191007/20106999BsOfkKRHno.png](https://ithelp.ithome.com.tw/upload/images/20191007/20106999BsOfkKRHno.png)

之後你也會看到storage/app 出現了一個`test.jpg`的檔案囉～
![https://ithelp.ithome.com.tw/upload/images/20191007/20106999GUp21f1mpL.png](https://ithelp.ithome.com.tw/upload/images/20191007/20106999GUp21f1mpL.png)

要看完整程式碼的可以參考這裡:https://github.com/r567tw/Make-PHP-Great-Again/commit/85ba735bbf1144c9c4ea7d5aae142441d59f7871