---
title: Laravel Complete
type: post
date: 2024-09-23T11:49:35+00:00
categories:
  - laravel
tags:
  - laravel
toc: true
draft: true
---

# Best Practice

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

## clean code
- https://sohambanerjee.me/2020/06/26/clean-code-laravel/
- It’s about the micro
- Use lookup tables
- Return early
- Split lines correctly
- Don’t create useless variables
- Create variables when they improve readability
- Create model methods for business logic
- Create action classes
- Consider form requests
- Use events
- Extract methods
- Create helper functions
- Avoid helper classes
- Dedicate a weekend towards learning proper OOP
- Don’t just write procedural code in classes
- Read up on things like SRP & follow them to reasonable extent
- Avoid too many parameters in functions
- The function has too many responsibilities. Separ…ine, but you should refactor the long signature.
- Use Data Transfer Objects (DTOs)
- Create fluent objects
- Use custom collections
- Don’t use abbreviations
- Try to only use CRUD actions
- Use expressive names for methods
- Create single-use traits
- Create single-use Blade includes
- Import namespaces instead of using aliases
- Create query scopes for complex where()s
- Don’t use model methods to retrieve data
- Use custom config files
- Don’t use a controller namespace
- Consider single-action controllers
- Be friends with your IDE
- Use short operators
- Decide if you like spaces around operators
- Helpers instead of facades
- Create custom Blade directives for business logic
- Avoid queries in Blade when possible
- Use strict comparison
- Use docblocks only when they clarify things
- Have a single source of truth for validation rules
- Use collections when they can clean up your code
- Write functional code when it benefits you
- Comments usually indicate poor code design
- Context matters
- Use only what helps you and ignore everything else

## 相關資源
1. [Best Package](https://www.cloudways.com/blog/best-laravel-packages/)
2. [Laravel 比較好得實踐](https://github.com/alexeymezenin/laravel-best-practices)