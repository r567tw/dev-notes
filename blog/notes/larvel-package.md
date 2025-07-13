---
title: 寫一個簡單的Laravel Package
date: '2022-08-08 01:33:11+00:00'
tags:
- laravel package
---
# 前言
最近突然心血來潮看到這篇 Laravel new 的 post: https://laravel-news.com/building-your-own-laravel-packages

於是起心動念開始寫一個 package來玩一玩。
詳細程式碼在這裡：https://github.com/r567tw/laravel-package-practice

# 首先，要有composer
既然要寫一個自己的客製package，當然要先有`composer.json`呀
於是讓我們先`composer init`起來！或者你要手動建立`composer.json`也是可以

總之，你composer.json 裡面的內容應該要包含以下
```
{
    "name": "{你的名稱}/{你的套件名稱}",
    "type": "library",
    "license": "MIT",
    "autoload": {
        "psr-4": {
            "{你的名稱}\\{你的套件名稱}": "src/"
        }
    },
    "require": {
        "php": "^8.1",
        "illuminate/support": "^9.23"
    },
    "extra": {
        "laravel": {
            "providers": [
                "{你的名稱}\\{你的套件名稱}\\Providers\\PackageServiceProvider"
            ]
        }
    }
}
```

- `extra` 是給laravel 看的，laravel在某個版本之後啟用autoload service provider，「粉方便」
- 主要要`require` `illuminate/support`這個套件
- 通常我們會使用`src`這個資料夾，但如果你想特立獨行也是可以拉
- 要寫一個 `serviceprovider` 檔，如果之後有機會來記錄筆記一下Laravel這個`service provider` 這個東西，一定可以學到很多！

# 寫一個service provider
我這個套件的目標很簡單，就是弄出一個artisan 的指令來helloworld一下就好，所以這邊我在`src/Providers`裡面建立`PackageServiceProvider.php`檔
```
<?php
declare(strict_types=1);
 
namespace Fang\LaravelPackagePractice\Providers;
 
use Illuminate\Support\ServiceProvider;
use Fang\LaravelPackagePractice\Console\Commands\FirstPackageCommand;
 
final class PackageServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        if ($this->app->runningInConsole()) {
            $this->commands(
                commands: [
                    FirstPackageCommand::class,
                ],
            );
        }
    }
}
```

如果你想弄別的其實也可以參考他自家文件，很清楚：https://laravel.com/docs/9.x/packages

# 準備FirstPackageCommand
如果你是想弄別的，這一步可以略過弄你的版本即可，我以我自己練習用的為例
firstPackageCommand 裡面其實就這樣
```
<?php
namespace Fang\LaravelPackagePractice\Console\Commands;
 
use Illuminate\Console\Command;
 
final class FirstPackageCommand extends Command
{
    protected $signature = "practice";
 
    protected $description = "just say helloworld";

    public function handle()
    {
        $this->info("it's practice package");
    }
}
```

於是你的套件完成了！

# 單元測試
我個人比較雞婆一點，想要弄一個簡單的單元測試。
所以使用到一個套件`orchestra/testbench`
於是我的composer.json 就增加以下這段
```
    "require-dev": {
        "orchestra/testbench": "^7.6",
        "phpunit/phpunit": "^9.5"
    }
```

至於我的案例呢？我只是簡單寫一下
```
<?php

namespace Fang\LaravelPackagePractice\Tests\Unit;

use \Orchestra\Testbench\TestCase;
use \Fang\LaravelPackagePractice\Providers\PackageServiceProvider;

class FirstPackageCommandTest extends TestCase
{
    protected function getPackageProviders($app): array
    {
        return [
            PackageServiceProvider::class,
        ];
    }

    /** @test */
    function the_command_will_info_message()
    {
        $command = $this->artisan('practice');
        $command->expectsOutput("it's practice package");
    }
}
```

- 這裡很重要，請記得要寫`getPackageProviders`這個function 注入你的service provider! 我這裡卡關卡很久...

於是下`vendor/bin/phpunit`就可以試看看有沒有過啊！

# 終端測試一下
如果你想要公開給別人用，可以弄到[packagist](https://packagist.org/)，但我！不！想。

所以你可以更簡單一點在你新的laravel專案底下`composer.json`加上這一段
```
"repositories": [
        {
            "type": "vcs",
        }
    ]
```

然後呢？
執行`composer require {你的名稱}/{你的套件名稱}` 就好

以我這個案例為例：執行`php artisan practice` 就會看到我的成果：`it's practice package`

> 小君曰：寫 pakcage 給別人玩吧！

