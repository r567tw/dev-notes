# 白話 Web 應用程式安全

> Part 1

## 1. 了解對手

- 駭客攻擊：沒有在授權情況下，嘗試取得系統的存取權
- Kali Linux
- 白帽(含安全研究人員)、黑帽(非法)、灰帽
- CVE、PoC、Exploit
- 隨時關注漏洞情報、追蹤應用程式的依賴、保持系統的可觀察性(日誌、監視)、資安教育

## 2. 瀏覽器端的安全性

### 瀏覽器的組成

- 瀏覽器的組成：以主從式(Client-Server)模式運作、處理 HTML、CSS、JavaScript 和 Media
- 渲染管線、渲染引擎(建立 DOM)、JavaScript 引擎

### JavaScript Sandbox

- 建立一個讓 JavaScript 安全運行的隔離區域，他無法執行一些有關 Kernel 的進階操作(如任意存取磁碟上的檔案、干擾作業系統其他執行程序)

> 盡可能的限縮 Web App 上的 JavaScript

- 內容安全政策：告訴瀏覽器指定從何處載入哪些類型的資源

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'" />
```

- 同源政策
- CORS Header

```
Access-Control-Allow-Origin: https://trusted.com
```

- 跨源請求
- CDN / integrity : 子資源完整性檢查

### 磁碟存取權

- 檔案操作 API
- Web 儲存區(localStorage 可以永久保存 sessionStorage 直到結束瀏覽該網站)
- IndexedDB (支援 transaction 機制)

### Cookies

```
set-Cookie: session_id=123456789; Secure; HttpOnly; SameSite=Strict; Max-Age=604800
```

- Secure: 只有發出 HTTPS 請求才發送 Cookie
- HttpOnly : JavaScript 不可以存取 Cookie
- SameSite: 通常預設值是 `Lax` (SameSite=Lax)，可剝離跨源請求狹帶的Cookie
- Expires：Cookie 的有效期限
- 讓 Cookie 失效:`Set-Cookie: session_id=; Max-Age=-1`

## 3. 加密

### 加密原理

- 將資訊偽裝成未經授權者難以讀取的形式
- 密碼學

### 加密金鑰

- 加密金鑰 v.s 解密金鑰
- 對稱加密演算法(區塊加密 Block cipher): 使用相同金鑰進行加密和解密資料
- 非對稱加密演算法: 使用不同金鑰進行資料加密和解密
- 雜湊演算法：無法解密其輸出的加密演算法，兩個不同輸入產生相同輸出的機會幾乎為0
  - 雜湊碰撞:發生不同輸入產生相同輸出
  - 雜湊值/雜湊：雜湊演算法的輸出
  - 通常檢測它是否有無異動，用於保管憑證和偵測 Web 伺服器上的可疑事件

### 加密傳輸

- TLS: 在 IP 上實作加密傳輸技術，前身 SSL 加密套件包含四種元素--金鑰交換演算法、身份驗證演算法、批量加密演算法、訊息鑑別碼演算法
- HTTPS
- 重導向 HTTPS
- 通知瀏覽器始終使用 HTTPS :`Strict-Transport-Security: max-age=604800`

### 靜態加密

- 利用加密技術保護儲存在磁碟的靜止資料
- 加鹽(salt)：「鹽」是一段隨機產生的字串，會在密碼進行雜湊處理前，附加在密碼後方。

```
$$Hash(Password + Salt) = Stored\_Value$$
```

- 加胡椒粉(Peppering)：「胡椒粉」與鹽類似，也是一段隨機字串，但它的管理方式更嚴格。(通常全系統使用同一個「胡椒粉」，或者針對不同類別的使用者使用。)

```
$$Hash(Password + Salt + Pepper) = Stored\_Value$$
```

### 完整性檢查

- 檢測資料是否發生非預期的變化
- 在 Web App 上所用的密碼應以強雜湊演算法保護，在儲存之前要執行加鹽和加胡椒粉處理，切莫以純文字形式儲存密碼

## 4. Web 伺服器的安全

### 檢驗輸入的內容

- 白名單篩選
- 黑名單阻擋
- 使用樣板比對(正規表達式)
- 進一步檢驗(信用卡號碼、URL、Mac Address)
- 檢驗電子郵件位址
- 檢驗檔案上傳

### 轉義輸出內容

- 轉義 Http 回應裡的輸出
- 轉義資料庫命令裡的輸出
- 轉義命令字串裡面的輸出

### 正確處理資源
- RESTFul API: Get 取得、Post 新建立、Put 更新、Delete 刪除

### 縱深防禦

- 多層防禦

### 最小權限原則

- 是指每個軟體元件和執行程序只能被授予完成預期任務所需的最小權限集

## 5. 安全是一種程序

### 應用四眼原則

- 一種控制機制：重要變更通常需要經過兩個人審核通過才能實施的一種管理機制
- 橡皮鴨除錯法

### 在流程中套用最小權限原則

- 通常軟體開發組織常見的角色：
  - 開發人員
  - 開發維運人員
  - 品質分析人員
  - 系統管理人員
  - 資料庫管理員
  - 技術支援人員

### 盡可能採用自動化作業

### 不重新發明輪子

### 保留稽核軌跡

- 程式碼變更
- 部署
- HTTP 存取日誌
- 使用者行為
- 資料更新
- 管理活動
- SSH 存取日誌


### 撰寫安全的程式碼

- 實施源碼控制 (Git Flow): 紀錄何時為 Web App 加入新功能至關重要
- 管理依賴套件
NodeJS npm yarn pnpm
Ruby Bundler
Python pip
Java Maven Gradie
.NET NuGET
PHP Composer
- 設計建構流程： mifify , Build Process
- 撰寫單元測試：100%覆蓋率並非程式碼完全正確，無可避免地有些條件分支可能無法檢查到，甚至可能在邏輯上做出錯誤判斷
- 程式碼審查
- 發行流程自動化
- 部署到準上線環境
- 回退到前一版 (rollback)

### 借助工具保護自己

- 依賴項分析、靜態分析、自動化滲透測試
- 防火牆、入侵偵測系統、防毒軟體

### 坦承過失

- 數位鑑識：發生安全事件之後，確認哪些系統發生損害、找出損害的前因後果
- 事後檢討

> Part 2

## 6. 瀏覽器端的漏洞


### 跨站腳本(XSS)
> 攻擊分為兩種型態：1. 攻擊網站上存在的漏洞 2. 誘騙使用者瀏覽受駭客控制的網站

- `XSS`
- 儲存型跨站腳本：動態內容來自於資料庫
- 反射型跨站腳本：HTTP 請求本身
- Dom 型跨站腳本

- **透過字元轉義化解跨站腳本攻擊**
- 內容安全政策：CSP-- 指示瀏覽器只能從特定來源載入 JavaScript
> Content-Security-Policy: default-src 'self'; script-src breddit.com

### 跨站請求偽造

- 別讓 GET 請求具有副作用
- 防 CSRF 符記 (CSRF Token)
- 確保 Cookie 有 SameSite attribute

### 點擊挾持

- 防範：讓網站不會到別人家的框架(frame)做客

```
Content-Security-Policy: frame-ancestors 'none'
```

### 跨站腳本引入

- XSSI
- JavaScript 不應包含機敏或與使用者相關的身份
  - 如果需要：一種透過非同步呼叫伺服器取得回傳內容(token)、一種則是將機敏資訊放在網頁本身的 HTML 裡面(hidden field)
- 設定跨域資源政策

## 7. 網路的漏洞

> 分為三類：攔截、窺探流量、誤導使用者的流量去向、竊取或偽造憑證(或金鑰)

### 中間人漏洞

- MITM
- ARP 欺騙
- 加入 HTTPS
- SSL 剝離
- 在 Nginx 伺服器加入 Strict-Transport-Security

```
add_header Strict-Transport-Security "max-age=31536000"
```

- 網站伺服器應指定可接受的最低 TLS 版本

### 誤導型漏洞

- 分身網域
- DNS 毒化：防範方式-HTTPS、DNSSEC
- 子網域搶注

### 憑證上的漏洞

- 憑證撤銷
- 憑證透明度

### 竊取加解密金鑰

- 最小權限原則
- 考慮將 Web 伺服器和應用伺服器分別部署在不同的電腦上

## 8.身份驗證機制的漏洞

### 暴力攻擊
> 駭客竊取身份憑據最直接方法是使用工具嘗試數百萬筆帳號和密碼組合，並記錄哪些組合返回成功代碼，這種方法稱之為暴力攻擊

- 工具：Hydra

### 單一登入 SSO
> 確保安全處理身份驗證的一種方式就是讓其他系統負責這項任務

> 將身份驗證的工作委托給第三方稱為單一登入(SSO)
> SSO 有兩種主要技術：OpenID Connect(搭配 Oauth)、SAML 

#### OpenID Connect & OAuth
- Oauth 一般用在授權而非識別
- OpenID Connect 搭在 Oauth 上面而完成的，發出請求的 APP 會收到一組 JWT token

- **第一步：使用者授權**
  使用者點擊「使用 Google 登入」按鈕，應用程式將使用者重導向至身份提供者的授權端點，並提交必要的參數。
  ```
  https://accounts.google.com/o/oauth2/auth?redirect_uri=https://app.com/callback&response_type=code&client_id=YOUR_CLIENT_ID&state=RANDOM_STATE&scope=email+profile
  ```

- **第二步：取得授權代碼**
  使用者在身份提供者登入並同意授權後，身份提供者會將使用者重導向回應用程式的回調 URL，並附帶授權代碼。
  ```
  https://app.com/callback?code=AUTH_CODE&state=RANDOM_STATE
  ```

- **第三步：交換存取令牌**
  應用程式伺服器使用授權代碼和客戶端秘鑰向身份提供者的令牌端點發出請求，以換取存取令牌，進而存取使用者資訊。
  ```
  POST https://oauth2.googleapis.com/token
  Content-Type: application/x-www-form-urlencoded
  
  code=AUTH_CODE&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&redirect_uri=https://app.com/callback&grant_type=authorization_code
  ```

- **第四步：取得身份信息** (openid connect)
  應用程式伺服器使用存取令牌向身份提供者的 UserInfo 端點發出請求，以取得使用者的身份信息（如姓名、電子郵件等）。
  ```
  GET https://www.googleapis.com/oauth2/v2/userinfo
  Authorization: Bearer ACCESS_TOKEN
  ```

- **第五步：建立使用者會話** (openid connect)
  應用程式伺服器驗證令牌並建立使用者會話，使用者即可登入應用程式。

> **OpenID Connect**: 一個建立在 OAuth 之上的身份驗證層，透過發行 JWT token 來識別使用者身份。


#### SAML
> Ｗeb App 是 SP 服務提供者，需要發佈一份帶有 SAML詮釋資料 meta data 的 xml 檔案，用以通知身份提供者，你打算託管評斷控制服物(ACS)的 URL, 以及給身份提供者用來簽署要求的數位憑證。ACS 是一組回呼URL，身份提供者在使用者登入之後，會傳送給使用者

**SAML 工作原理**

SAML (Security Assertion Markup Language) 是一種基於 XML 的身份驗證和授權協議。

**SAML 三方角色：**
- **使用者代理 (User Agent)**：通常是瀏覽器
- **服務提供者 (SP)**：提供服務的 Web App
- **身份提供者 (IdP)**：驗證使用者身份的系統

**SAML 工作流程：**

1. **使用者發起登入**
  使用者訪問 Web App，要求登入時被重導向至身份提供者

2. **身份提供者驗證**
  使用者在身份提供者登入，提供憑證進行驗證

3. **SAML 斷言生成**
  驗證成功後，身份提供者生成 SAML 斷言（包含使用者身份信息），並使用數位簽章簽署

4. **返回服務提供者**
  使用者被重導向回 Web App 的斷言消費服務 (ACS)，SAML 斷言以 POST 方式傳遞

5. **驗證和建立會話**
  Web App 驗證 SAML 斷言的簽章，確認其完整性和合法性，然後建立使用者會話

**SAML 元資料：**

Web App 需發佈 SAML 詮釋資料 (Metadata) XML 檔案，告知身份提供者：
- 斷言消費服務 (ACS) 的 URL
- 用於驗證身份提供者簽署的數位憑證

### 強化身份驗證能力

- 密碼複雜度規則、密碼輪換
- 圖靈驗證碼：CAPTCHA
- 速率限制

### 多因子身份驗證

- MFA

### 生物特徵識別
- 瀏覽器 API WebAuthn
#### WebAuthn

WebAuthn 是一個 Web 標準，允許使用者使用生物特徵識別（如指紋、臉部識別）或安全金鑰進行身份驗證，取代傳統密碼。

**主要特點：**
- 無密碼認證
- 抗網路釣魚
- 跨瀏覽器支援

**基本流程：**

1. **註冊階段** - 建立認證器
```javascript
const registration = await navigator.credentials.create({
  publicKey: {
    challenge: new Uint8Array(32),
    rp: { name: "Example Corp" },
    user: {
      id: new Uint8Array(16),
      name: "user@example.com",
      displayName: "John Doe"
    },
    pubKeyCredParams: [{ alg: -7, type: "public-key" }]
  }
});
```

2. **驗證階段** - 驗證使用者
```javascript
const assertion = await navigator.credentials.get({
  publicKey: {
    challenge: new Uint8Array(32),
    rpId: "example.com",
    userVerification: "preferred"
  }
});
```

**優勢：**
- 強化安全性，消除密碼洩漏風險
- 改善使用者體驗
- 符合最新安全標準

### 身份憑據的保存方式

- 為密碼加鹽、灑胡椒粉在雜湊加密

### 使用者枚舉

- 當帳號或密碼不正確時，登入頁面應該顯示相同的錯誤訊息：「帳號或密碼不正確」
- 無論該 Email 是否屬於現有帳戶，應該顯示「請檢查你的電子信箱」
- 要求重設密碼時，應該顯示「新密碼已寄到你的 Email」
- 時差測定攻擊：
  - 登入過程中如果只有在使用者提供正確帳號才計算密碼雜湊...
  - 防範方式：不管使用者輸入帳號是否存在，都應該對密碼做出雜湊處理

## 9.Session 管理的漏洞

### Session 的運作原理

#### Session
傳統 Session 是一種伺服器端的身份驗證機制。

**運作原理：**
1. 使用者登入時，伺服器驗證憑證後建立一個 Session 物件
2. 伺服器生成唯一的 Session ID，並透過 `Set-Cookie` 回應標頭將其發送給客戶端
3. 客戶端保存 Cookie，每次請求時自動附帶 Session ID
4. 伺服器根據 Session ID 查詢記錄的使用者資訊，識別請求來源

**優勢：**
- 使用者資訊儲存在伺服器，不會暴露給客戶端
- 伺服器可隨時撤銷或更新 Session
- 相對安全可控

**缺點：**
- 伺服器需維護 Session 存儲（記憶體或資料庫），增加伺服器負擔
- 不適合分散式系統或多伺服器架構
- Session 資料難以橫向擴展

#### JWT

JWT（JSON Web Token）是一種無狀態的身份驗證方式，使用者資訊被編碼在 Token 本身。

**JWT 的組成：**
- **Header（標頭）**：包含 Token 類型和使用的雜湊演算法
- **Payload（載荷）**：包含使用者資訊和其他聲明（Claims）
- **Signature（簽章）**：透過密鑰簽署前兩部分，確保 Token 未被篡改

**JWT 格式：**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**優勢：**
- 無需在伺服器端儲存 Session，減少伺服器負擔
- 可用於分散式系統和微服務架構
- 跨域友善

**安全考量：**
- 不應在 Payload 中儲存敏感資訊（如密碼），因為 Token 可被解碼
- 必須驗證簽章以確保 Token 的真實性
- 應設定合理的過期時間（`exp` claim）


### Session 劫持

- 從網路劫持 Session => 使用 HTTPS 以及 Secure with Cookie
- 利用 XSS 劫持 Session => **設定 Cookie 的 HttpOnly**
- 不良的 Session ID
- Session 定製：不能接受由用戶端選定的 Session ID

### Session 竄改

- 使用數位簽章

## 10.授權機制的漏洞

**授權和身份驗證密切相關，前者用以確保使用者只能存取有權存取的資料; 後者則在使用者與 App 互動時用來識別身份**
> 每個網站都不一樣，授權是你有沒有權利這麼作、身份驗證是你能不能進來

### 為授權建模
- 案例研究：網路論壇
- 案例研究：內容平台
- 案例研究：訊息傳遞系統

### 設計授權機制

### 實作存取控制
#### RBAC（角色型存取控制）

RBAC（Role-Based Access Control）是一種根據使用者角色來管理權限的存取控制機制。

**核心概念：**
- **角色（Role）**：代表一組相關的權限集合，如管理員、編輯、檢視者
- **權限（Permission）**：允許執行特定操作的授權，如建立、編輯、刪除
- **使用者（User）**：被指派一個或多個角色

**RBAC 運作模式：**
```
使用者 → 角色 → 權限 → 資源
```

**實作示例：**
- 管理員角色：擁有建立、編輯、刪除、稽核等所有權限
- 編輯角色：擁有建立、編輯權限
- 檢視者角色：僅擁有檢視權限

**優勢：**
- 簡化權限管理，減少複雜性
- 易於維護和更新角色權限
- 符合最小權限原則

**注意事項：**
- 避免過度授予角色權限
- 定期審查和更新角色定義
- 應有明確的角色職責劃分

### 測試授權機制
- 單元測試
- 模擬函式庫

### 常見的授權缺失

- 缺少存取控制
- 搞混負責存取控制的程式
- 違反信任邊界：
> 來自 HTTP 請求的輸入再通過查驗之前是不可信任;而來自資料庫的輸入通常假定可信任，關鍵是不要在同一資料結構中混合可信和不可信的輸入
- 依不可信任輸入做出存取控制決策

## 11. 資料載荷上的漏洞

> 開始比較偏向對 Web 伺服器的攻擊

### 反序列化攻擊

- 序列化 Serialization： 將記憶體的資料結構轉成二進制(或文字)格式的過程
- 反序列化 Deserialization：從二進制(或文字)格式重新建立記憶體裡的資料結構

- 接受來自不可信任來源的序列化內容要特別留意，若可能請優先選用 JSON 或 YAML 等文字型序列化格式，或使用數位簽章來防止資料竄改

### Json 和 Yaml 的漏洞
> 開發 NodeJS 應用程式時，切勿將不可信任得內容交給 eval() 處理


- 原型污染 prototype pollution: 是一種安全漏洞，攻擊者通過修改 JavaScript 物件的原型鏈，使得所有繼承該原型的物件都被注入惡意屬性或方法，從而影響應用程式的行為或造成程式碼執行。

### XML 的漏洞

- 停用任何 XML Parser 內聯 DTD 處理功能
- XML 炸彈
- XML 外部單元體攻擊: XML 外部單元體攻擊（XML External Entity Attack, XXE）是一種透過向 XML 解析器注入惡意外部實體定義來竊取敏感資料或執行遠端程式碼的安全漏洞。

### 檔案上傳的漏洞

- 檢驗上傳的檔案名稱、檔案大小和檔案類型，將檔案寫入磁碟時應優先選用間接表達方式，若情況允許請使用雲端儲存
- 如果不需要保留檔案名稱，在上傳時將檔案重新命名，這樣可以避免許多淺在安全問題
- 以最小權限原則將檔案寫入磁碟，當然不包括可執行權限
- 使用安全的檔案儲存區，可以交給第三方處理(如雲端、S3)

### 路徑遍歷

- 避免直接引用檔案，例如使用網址`http://foodle.com?menu=aaa.pdf`
- 限制檔案名稱可用字符，可以使用正規表達式確保不會有相對資料夾的路徑在裡面

### 批量賦值

- 在 HTTP 請求資料中，應該在伺服器端的程式碼中明確指出要更新的物件屬性

## 12.注入型漏洞

- 欺騙受害伺服器去執行惡意程式
- 切勿將不可信任的輸入當作動態程式碼執行

### 遠端程式碼執行

- RCE
- 不應將來自 HTTP 請求的不可信任輸入當作程式碼執行
- 常會發生的情境：
  - DSL (一種用來解決特定領域任務的程式語言並非通用程式語言...例如 excel 的公式、google 搜尋運算子)
  - 伺服器端引入 (php 的 include)

### SQL 注入

- 使用參數化語句
- ORM
- 套用最小權限原則：限制應用程式使用資料庫的帳戶權限

### NoSQL 注入

- MongoDB: 以文件為基礎，使用 BSON(2 進制 JSON)格式
- Couchbase: 以 JSON 格式儲存資料
- Cassandra: 以表格形式管理資料
- Hbase: 以表格方式儲存資料

### LDAP 注入

### 命令注入

- 避免直接調用作業系統指令
- 要插入命令列字串的內容，應事先適當清理

### CRLF 注入

- 要合併到 Http 回應標頭的不可信任輸入，應先移除其換行字元，以防止 Http 回應拆分攻擊

### Regex 注入

- 若需為使用者提供彈性的搜尋語法，請選擇專用的索引搜尋工具，避免誘惑惡意使用者利用 regex 去評估不可信任的輸入。以降低 Dos 攻擊的機會

## 13.第三方程式裡的漏洞

### 依賴項

- 版本 & lock 檔
- 使用自動化依賴項分析或稽核工具，將依賴項版本與 CVE 資料庫進行比對，以利及時修補有漏洞的依賴項
- 可以用工具進行程式碼安全審查
  Python safety
  Node npm audit
  Ruby bundler-audit
  Java OWASP Dependency-Check
  PHP local-php-security-checker (https://mng.bz/rjzX)
  Go gosec
  Rust cargo_audit

### 堆疊的更下層

### 資訊外洩

- 刪除 Server 標頭項

```
http {
  more_clear_headers Server;
}
```

- 更改 session cookie 名稱
- 使用乾淨的 URL
- 清理 DNS 紀錄
- 清理模板檔

### 不安全的組態

- 設定 Web 的根目錄
- 不在用戶端回報錯誤訊息
- 變更預設密碼

## 14.不知情的幫兇

### 伺服器端請求偽造 (SSRF)

- 管制伺服器可造訪的網域
- 只為真實使用者發出 HTTP 請求
- 檢查要造訪的 URL
- 使用網域黑名單：https://github.com/StevenBlack/hosts

### 電子郵件詐欺

- 寄件者策略框架 (SPF)
- 網域金鑰識別郵件 (DKIM)
- 網域郵件身份驗證、回報及確認 (DMARC)

### 開放式重導向

- 禁止離站的重導向
- 重導向時檢查 referrer 標頭項的來源網址

## 15. 遭駭時的處置之道

### 知道何時被攻擊

### 阻止進行中的攻擊

### 釐清來龍去脈

- 數位鑑識

### 避免重蹈覆徹

### 向使用者傳達入侵事件的細節

### 降低未來被入侵的風險

- 在 Web App 發布 security.txt 檔,以便灰帽駭客在攻擊漏洞之前能向機構傳達此漏洞的消息
