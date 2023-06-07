---
sidebar_position: 5
---
# Articles

## Laravel 的中大型專案架構
- [參考資料](http://oomusou.io/laravel/laravel-architecture/)
- [laravel 優美架構](https://docs.google.com/presentation/d/1rOWNct6tu8u63Gss8hHwz8KncWkP3yI3BR8dsDs1-Sg/edit#slide=id.g22cf02b506_3_403)
- 可用外掛
    - https://github.com/Mombuyish/Laravel-Oh-Generators

1.Model : 僅當成 Eloquent class。
2.**Repository : 輔助 model，處理資料庫邏輯，然後注入到 service。**
3.**Service : 輔助 controller，處理商業邏輯，然後注入到 controller。**
4.Controller : 接收 HTTP request，調用其他 service。
5.**Presenter : 處理顯示邏輯，然後注入到 view。**
6.View : 使用 blade 將資料 binding 到 HTML。
7.++Transformer :轉換顯示欄位(API)++
8.++Formatter: 格式的統一顯示格式(API)++
9.++Foundation: 獨立掛載功能++

### 總結
- 職責單一: 就是說每次修改都會有個地方變動而已，所以每個類別都只會有一種改變的理由
- 跟夥伴們取得一個共識：讓他們知道這樣的設計和方法可以帶來時麼樣的好處，建立一個良好的溝通


## Laravel 測試
[Laravel-Dusk](https://d.laravel-china.org/docs/5.5/dusk)
[測試起手式](https://gist.github.com/r567tw/03d71b9c0a8ff9f17c3460ee9e92e1c1)
https://laravel-china.org/topics/3583/laravel-performance-has-always-been-difficult-to-let-go-seek-guidance

## 詳解MVC 架構
https://hackmd.io/JwBgHAzAJgRsUFoYHZgGMEBYCGMBMCYArBMAhGhAKaZoBmAbBJlEUA==#

## Laravel 佈署到 Azure
https://blogs.msdn.microsoft.com/ericsk/2014/01/13/laravel-php-windows-azure/

## serverless
- https://dev.to/chandreshhere/deploy-serverless-laravel-application-using-bref-cp2
- https://medium.com/@azole/deploy-serverless-laravel-by-bref-6f28b1e0d53a

### AWS-ECS
https://dev.to/gbxnga/deploy-a-docker-ized-laravel-application-to-aws-ecs-with-codebuild-37pi

### Bref
https://medium.com/@azole/deploy-serverless-laravel-by-bref-6f28b1e0d53a
https://medium.com/@azole/deploy-laravel-to-lambda-with-bref-by-aws-cdk-5a1ba8748014

### fargate
https://silvermoonfox.github.io/2019/12/24/awsFargateNginxPHP/

## queue
### aws sqs
- https://medium.com/@rayar0812/laravel-queue-with-aws-sqs-2392557e476
- https://shian420.pixnet.net/blog/post/344722654-%5Blaravel%5D-%E9%A6%AC%E4%B8%8A%E5%AD%B8%E6%9C%83-queue
- https://learnku.com/articles/3729/use-laravel-queue-to-understand-the-knowledge

- https://laravel.tw/docs/5.2/queues#running-the-queue-listener

## 高流量
https://blog.scottchayaa.com/post/2019/01/09/how-to-handle-the-high-concurrency-on-laravel/

## broadcasting 
https://jaceju.net/laravel-events-broadcasting/

## GraphQL

### article
- https://www.toptal.com/graphql/laravel-graphql-server-tutorial

### Mutation 、 Query 以及 Type
- https://github.com/rebing/graphql-laravel
- https://medium.com/lion-f2e/%E6%B7%BA%E8%AB%87-%E5%9C%A8-laravel-%E4%B8%AD%E4%BD%BF%E7%94%A8-graphql-%E4%BA%8C-a315fd40c00b

## ml & swoole
https://learnku.com/articles/25775
https://github.com/Aquarmini/laravel-phpml-geo

## Laravel Chunk 的問題

- https://tanteng.me/2018/08/laravel-chunk-tip/

- https://engineering.carsguide.com.au/chunk-be-careful-b19c8197dc4d

## Cron-job
https://tutsforweb.com/how-to-set-up-task-scheduling-cron-job-in-laravel/

cron job 再跑的時候沒有env 的資料

# Build APIs You Won't Hate
https://pastewall.com/sticker/c98b00bf9fbd46789a9302c5b98cbdfa

# PEST PHP
- 文件：https://pestphp.com/

# livewire

- https://laravelarticle.com/laravel-livewire-crud-tutorial?fbclid=IwAR0xxVxQ4TplNBcp0IRzakstmdCAOaH3fXzhmjzU2K33rl8cXH6sgcb6nbE
- https://jaceju.net/laravel-livewire/

# InertiaJS

資料來源：https://ithelp.ithome.com.tw/articles/10233923

## 分別
- MPA (後端渲染)
- SPA (前端渲染)

- Inertia.js 
- Livewire

https://laravelarticle.com/laravel-inertia-js-crud-tutorial