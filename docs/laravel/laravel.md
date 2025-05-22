---
title: Laravel
sidebar_position: 2
---

## Documents

- https://deepwiki.com/laravel/laravel
- https://gitdiagram.com/laravel/laravel

## Security

https://www.laravel-enlightn.com/docs/getting-started/installation.html

```bash
composer require enlightn/enlightnpro
```

## NativePHP Package

- https://www.youtube.com/watch?v=TY21MRVNxSo

## Serverless Laravel

- Vapor: https://vapor.laravel.com
- Bref: https://bref.sh/

## Packages

- 翻譯相關：https://github.com/edulazaro/laratext
- 後台：https://filamentphp.com/docs/3.x/panels/getting-started

## Question

### 一、Laravel 框架底層原理

1. Laravel 的服務容器（Service Container）是什麼？它的用途為何？請舉例說明如何使用 bind、singleton。
2. 請說明 Laravel 的服務提供者（Service Provider）在整個應用啟動流程中扮演的角色？何時需要自訂 ServiceProvider？
3. Laravel 如何實作 Facade？底層實際是如何解決依賴的？
4. Laravel 中的中介層（Middleware）是如何運作的？它在請求流程的哪個階段執行？

### 二、效能與最佳化

5. 請說明 Laravel 的快取（Cache）系統的幾種常見應用方式（如 route、config、query）以及其使用時機與注意事項。
6. Laravel 如何優化 Eloquent 查詢？請說明 eager loading 與 lazy loading 的差異與效能考量。
7. 什麼是 N+1 問題？如何在 Laravel 裡避免它？
8. Laravel 裡的 Task Scheduling 是如何設計的？有哪些實務應用場景？

### 三、安全性與權限

9. Laravel 中 CSRF 是如何實作的？如何避免此類攻擊？
10. Laravel 的認證與授權機制（如 Gate、Policy、Middleware）是如何運作的？請說明其差異與使用時機。
11. 如何在 Laravel 中實作 API Token 驗證？請比較 Sanctum 與 Passport 的異同。

### 四、架構與設計

12. 當 Laravel 專案愈來愈大時，如何進行模組化管理（如 Domain-Driven Design、Package、Module）？
13. 請說明 Laravel 的事件（Event）與監聽器（Listener）機制，以及使用場景。
14. Laravel 的 Job Queue 機制是怎麼運作的？請描述一次 dispatch 的完整流程。
15. 請舉例說明如何使用 Laravel 的 Repository Pattern 進行資料存取層的封裝。

### 五、測試與 CI/CD

16. Laravel 提供哪些測試方式（Feature / Unit）？如何選擇使用？
17. 如何模擬外部 API 進行測試？你會用什麼技巧（如 Fake、Mock、Factory）？
18. 如何使用 Laravel 的 artisan 指令來建立測試與執行測試？如何整合 CI/CD 工具（如 GitHub Actions）來跑測試流程？

### 六、實作題（Coding）

19. 請寫一段 Laravel 的 Middleware，限制每分鐘最多 10 次請求，超過次數要回傳錯誤訊息。
20. 請設計一個簡單的投票系統（Post 有多個選項，User 可對每個選項投一票），並用 Laravel Eloquent 設計資料表與關聯。
