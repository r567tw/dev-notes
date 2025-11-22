---
title: Laravel
sidebar_position: 7
---

## RoadMap

- https://laraveldaily.com/roadmap-learning-path

## Documents

- https://deepwiki.com/laravel/laravel
- https://gitdiagram.com/laravel/laravel

### Architecture Concepts

- https://laravel.com/docs/12.x/lifecycle
- https://laravel.com/docs/12.x/container
- https://laravel.com/docs/12.x/providers
- https://laravel.com/docs/12.x/facades

## 核心筆記(0)：Request Lifecycle

> Laravel 的生命週期是一個由外部到核心，再由核心到外部的流程，Service Providers 是其中最關鍵的啟動環節。

1. **啟動與核心 (First Steps & Kernels)**

- 入口點： 所有請求都從 public/index.php 開始。您的 Web 伺服器（Nginx/Apache）配置會將所有流量導向此文件。
- 創建核心： index.php 載入 Composer Autoloader 後，從 bootstrap/app.php 獲取應用程式實例，並創建了 Service Container。(Create App)
- 核心處理： 請求被送至 HTTP Kernel (Illuminate\Foundation\Http\Kernel)，它是所有請求流動的中央位置。
- Bootstrappers： Kernel 定義了一系列 bootstrappers（啟動程式），它們在請求執行前運行，負責配置錯誤處理、日誌記錄和環境偵測等框架內部配置。

2. **服務提供者 (Service Providers) — 框架配置的中心**
   > 這是應用程式啟動的最重要步驟。

- 註冊 (Register)： Kernel 實例化所有 Service Providers，並呼叫所有 Provider 的 register 方法。此階段負責將框架的各種組件（如資料庫、佇列、驗證等）綁定到 Service Container。(app->bind , app->singleton)
- 引導 (Boot)： 在所有 register 方法執行完畢後，Laravel 才會呼叫所有 Provider 的 boot 方法。這確保了在執行啟動邏輯時，所有容器綁定都已完成。
  > 關鍵性： 幾乎所有 Laravel 的主要功能都是由 Service Provider 啟動和配置的。

3. **中介層與路由 (Middleware & Routing)**

- 中介層堆疊 (Middleware Stack)： 在請求到達路由之前，HTTP Kernel 會讓請求穿過全域中介層（例如處理 Session、CSRF 驗證）。
- 路由分派： 應用程式啟動完畢後，Router 接手請求，將其分派給匹配的路由或控制器。
- 路由中介層： 路由器還會執行路由專屬的中介層（例如驗證使用者是否登入）。
- 控制器執行： 請求通過所有中介層後，執行路由或控制器方法，生成 Response。

4. **結束與響應 (Finishing Up)**

- 響應回傳： 控制器返回的 Response 會反向穿過所有路由中介層，讓中介層有機會在響應發出前進行最後的修改。
- 最終發送： HTTP Kernel 的 handle 方法返回 Response 給應用程式實例，最終由應用程式實例呼叫 send 方法，將響應內容發送給使用者的瀏覽器，完成整個生命週期。

## 核心筆記(1)：Service Provider 與 Service Container

### Service Provider

> **💡 比喻：** 應用程式的 **「總務處」或「啟動器」**，負責組織和啟動所有服務。

```bash
php artisan make:provider ExampleServiceProvider
```

| 職責     | 說明                                                                   |
| :------- | :--------------------------------------------------------------------- |
| **定義** | 這是 Laravel 啟動所有服務的中心點。                                    |
| **功能** | 告訴 Laravel 應該在什麼時候、如何**綁定 (Binding)** 各種應用程式元件。 |

#### 兩個核心方法

| 方法         | 職責 (只能做什麼)                                            | 時機 (何時執行)                                  | 核心用途                             |
| :----------- | :----------------------------------------------------------- | :----------------------------------------------- | :----------------------------------- |
| `register()` | **只用於綁定服務到容器**。不可使用其他服務、註冊路由或事件。 | 在 `boot()` 之前，所有 Provider 會先執行此方法。 | 將 **介面** 綁定到 **具體實現**。    |
| `boot()`     | **執行啟動邏輯**。所有服務已註冊完成，可以安全地使用。       | 在所有 Provider 的 `register()` 完成後執行。     | 註冊路由、視圖、事件監聽器、中介層。 |

---

### Service Container

> **💡 比喻：** 一個 **「智慧工廠」或「中央倉庫」**，負責生產和交付所需的類別實例。

```php
// class binding
$this->app->bind(\App\Contracts\PaymentGateway::class, \App\Services\StripeGateway::class);

// closure factory（每次解析都執行 closure）
$this->app->bind(\App\Contracts\PaymentGateway::class, function ($app) {
    return new \App\Services\StripeGateway(config('services.stripe'));
});

// singleton（比較）
// 只在第一次解析時建立一次實例，之後每次都回傳相同物件
$this->app->singleton(\App\Services\ConfigManager::class, function ($app) {
    return new \App\Services\ConfigManager(config('app'));
});

// 其他綁定方式
// instance：手動註冊已建立的物件
$service = new Transistor(new PodcastParser);

$this->app->instance(Transistor::class, $service);

// contextual binding：針對特定類別需求給不同實作
$this->app->when(\App\Services\OrderService::class)
          ->needs(\App\Contracts\PaymentGateway::class)
          ->give(\App\Services\StripeGateway::class);

// 解析與傳參
$gw = app(\App\Contracts\PaymentGateway::class);
$gw = app()->make(\App\Contracts\PaymentGateway::class, ['option' => 'value']); // 傳參給 closure
```

#### 核心概念 (IoC/DI)

- **IoC (控制反轉 - Inversion of Control):** 將類別實例化的控制權交給容器，讓程式碼更專注於業務邏輯。
- **DI (依賴注入 - Dependency Injection):** 容器自動將類別 A 依賴的類別 B 實例「注入」給 A 的建構子或方法。
- **用途:** 提高程式碼的**彈性**、**可測試性**和**解耦度**。

#### 兩種核心綁定方式

主要在 Service Provider 的 `register()` 方法中使用以下兩種方式：

| 綁定方式        | 語法範例 (Service Provider 中)                            | 實例化行為                                                 | 適用情境                                                                 |
| :-------------- | :-------------------------------------------------------- | :--------------------------------------------------------- | :----------------------------------------------------------------------- |
| **`bind`**      | `$this->app->bind(Interface::class, Concrete::class);`    | **每次**解析時，都會創建一個 **全新的** 實例。             | 無狀態的服務，例如：單次交易的支付閘道。                                 |
| **`singleton`** | `$this->app->singleton(Service::class, function(){...});` | **只在第一次**解析時創建，之後每次都返回 **同一個** 實例。 | 創建成本高、需要全局共享或維持狀態的服務，例如：配置管理器、日誌管理器。 |

#### 如何手動解析 (取出) 服務？

除了最常用的自動**依賴注入 (DI)** 外，您也可以透過以下方式手動從容器中獲取服務實例：

| 方法                 | 範例                                                           |
| :------------------- | :------------------------------------------------------------- |
| **全域輔助函數**     | `app(PaymentGatewayInterface::class);` 或 `app('sms.sender');` |
| **Facade**           | `\App::make(Service::class);`                                  |
| **`resolve()` 函數** | `resolve(Service::class);`                                     |

### 釐清 Service Provider 與 Service Container 關係

#### 核心比喻與職責劃分

| 概念           | 英文名稱              | 廚房中的比喻                    | 核心職責                                                                                       |
| :------------- | :-------------------- | :------------------------------ | :--------------------------------------------------------------------------------------------- |
| **服務容器**   | **Service Container** | **「廚房冰箱」** (或中央工具架) | 負責**儲存**所有服務（類別）和**食譜**（綁定方法），並在需要時**交付**實例。                   |
| **服務提供者** | **Service Provider**  | **「採購員兼食譜製作者」**      | 是一個**類別**，負責**配置**和**註冊**服務的「食譜」給冰箱（容器），並啟動應用程式的其他元件。 |

#### 詳細功能區分

1. 服務容器 (Service Container)

- **本質：** 是一個存放和管理所有服務實例的**中央工具**。
- **工作內容：** 負責「製造」和「交付」您所需的類別實例，自動處理複雜的依賴關係 (DI)。
- **關鍵動詞：** **管理 (Manage)**、**解析 (Resolve)**、**交付 (Deliver)**。
- **您如何使用它：** 通常使用 **DI** (依賴注入) 或 `app()` 輔助函數來向它請求服務。

2. 服務提供者 (Service Provider)

- **本質：** 是一個設定和**配置**應用程式的**類別**。
- **工作內容：** 在應用程式啟動時運行，**註冊**服務的綁定方式 (`bind`, `singleton`) 到容器中，並負責應用程式的**啟動邏輯**（如註冊路由、視圖等）。
- **關鍵動詞：** **提供 (Provide)**、**註冊 (Register)**、**啟動 (Bootstrapping)**。
- **您如何使用它：** 透過覆寫 `register()` 和 `boot()` 方法來定義您的服務和啟動邏輯。

### 總結：配置與執行

1.  **Provider (採購員)** 告訴 **Container (冰箱)**：「當有人需要 `PaymentGateway` 時，你要給他 `Stripe` 實例。」 (`register()` 階段)
2.  **Container (冰箱)** 記下這個食譜（綁定）。
3.  當您的控制器 (Controller) 宣告需要 `PaymentGateway` 時，**Container** 會根據 Provider 提供的食譜，自動製造並提供 `Stripe` 實例給控制器。

## 核心筆記(2)：Facade

> Facade（門面）是 Laravel 提供的一種**「靜態介面」**，讓你可以用簡單、靜態的方式來存取應用程式**服務容器 (Service Container)** 中的實例。

### Static Proxy

| 特性         | 說明                                                                                                          |
| :----------- | :------------------------------------------------------------------------------------------------------------ |
| **表面現象** | 看起來像是您在呼叫一個靜態方法，例如 `Cache::get('key')`。                                                    |
| **底層本質** | 它是一個**代理 (Proxy)**。Facade 類別本身沒有該方法，而是將靜態呼叫**轉發**給容器中解析出的**真實物件**實例。 |
| **實現機制** | 依賴 PHP 的魔術方法 `__callStatic()`，以及 `getFacadeAccessor()` 方法。                                       |

---

### 與 Service Container

Facade 和 Service Container 相輔相成。

| 步驟           | 簡稱     | 說明 (由內向外)                                                                                       |
| :------------- | :------- | :---------------------------------------------------------------------------------------------------- |
| **Call**       | 靜態呼叫 | 應用程式發出靜態呼叫，例如 `Cache::get()`。                                                           |
| **Obtain Key** | 獲取鍵值 | Facade 執行 `protected static function getFacadeAccessor()`，回傳容器的**綁定鍵**（例如 `'cache'`）。 |
| **Resolve**    | 容器解析 | **Service Container** 根據該鍵，解析並實例化出真正的服務物件。                                        |
| **Execute**    | 轉發執行 | Facade 將靜態呼叫**轉發**給這個解析出的**實例**方法執行。                                             |

### 優點

1.  **簡潔語法 (Terse Syntax):** 讓程式碼簡潔易讀，無需手動注入或使用冗長的 `new` 關鍵字。
2.  **可測試性 (Testability):** 儘管看起來是靜態呼叫，但因為底層是物件實例，所以可以在測試中輕鬆地進行 **Mock/Stub**（使用 `Facade::shouldReceive()`）。
3.  **延遲載入 (Lazy Loading):** 服務實例只在被第一次呼叫時才由容器解析，節省資源。

### 必須實現的方法

當您創建自定義 Facade 時，必須繼承 `Illuminate\Support\Facades\Facade` 類別，並實現一個方法：

```php
protected static function getFacadeAccessor()
{
    // 必須返回服務容器中註冊該服務的鍵值
    return 'your.service.key';
}
```

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
   > 服務容器 (Service Container) 是 Laravel 的 IoC 核心，管理所有類別依賴，實現 DI (依賴注入) 達成解耦。<br/>bind: 每次解析都創建新的類別實例。<br/>singleton: 僅建構一次，在整個請求中共享單一實例。
2. 請說明 Laravel 的服務提供者（Service Provider）在整個應用啟動流程中扮演的角色？何時需要自訂 ServiceProvider？
   > 服務提供者 (Service Provider) 是應用程式的啟動器 (Bootstrapper)。<br/>角色： 負責在框架啟動時，將所有服務、設定、路由、視圖等註冊到服務容器中，並執行初始化工作 (register() 和 boot() )。<br/>自訂時機： 當你需要註冊自定義的容器綁定 (bind/singleton)、定義應用程式專屬的啟動邏輯、或整合第三方套件時。
3. Laravel 如何實作 Facade？底層實際是如何解決依賴的？
   > Laravel Facade 實作是透過繼承 Facade 類別。當靜態呼叫時，它會延遲執行，利用 getFacadeAccessor() 方法返回一個服務容器 (Service Container) 的綁定鍵（Binding Key）。底層實際是容器根據該鍵解析 (Resolve) 出真正的類別實例，並將靜態呼叫轉發給該實例處理。(和 Service Container 相輔相成)
4. Laravel 中的中介層（Middleware）是如何運作的？它在請求流程的哪個階段執行？
   > 中介層 (Middleware) 是 Laravel 處理 HTTP 請求的關鍵機制，它的運作方式可以形象地理解為層層把關的「洋蔥」模型。核心方法：handle()它接收兩個參數：<br/>$request: 當前的 HTTP 請求物件。<br/>$next: 閉包（Closure），代表洋蔥中的下一個層級。

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

### N+1 問題

當你查詢一組資料後，對每筆資料再個別查詢關聯資料時，會產生過多 SQL 查詢，導致效能變差。

```php
$posts = Post::all();

foreach ($posts as $post) {
    echo $post->user->name;
}

# 解法：Eager Loading
$posts = Post::with('user')->get();

foreach ($posts as $post) {
    echo $post->user->name;
}

# 動態載入 load
$posts = Post::all();
$posts->load('user');
```
