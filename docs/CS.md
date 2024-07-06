---
title: Computer Science
sidebar_position: 2
---

## Concurrency
- Process: 作業系統結構的基礎、是系統進行資源設定和排程的基本單位
- Thread: 程式執行流的最小單位、一般由作業系統控制、由執行緒id、指令指標、暫存器集合與堆疊組成。有初始化、可執行、執行中、阻塞、銷毀等狀態
- Coroutines: 一種比執行序更小的函數，由程式控制

> Process > Thread > Coroutines

## SOLID 
- SRP: Single Responsibility Principle (單一職責原則)
應該且僅有一個原因引起類別的變更，讓類別只有一個職責。
- OCP: Open Closed Principle (開放封閉原則)
軟體中的對象(類別、函數)，對於擴展是開放的，對於修改是封閉的。
- LSP: Liskov Substitution Principle (里氏替換原則)
所有參照基礎類別的地方，必須可以使用衍生類別的物件代替，而不需要任何改變。
子類別應該可以替換掉父類別而不影響程式架構。
子類別應該可以執行父類別想做的事情。
- LKP: Least Knowledge Principle (最小知識原則)
一個物件應該對其他物件有最少的了解，盡可能減少類別中的 public method，降低其他類別對此類別的偶合度。
- ISP: Interface Segregation Principle (介面隔離原則)
用戶端程式碼不應該依賴他用不到的介面，依賴的介面都是有其必要性。
把不同功能的從介面中分離出來。
- DIP: Dependency Inversion Principle (依賴反轉原則)
高接模組不應該依賴低接模組，兩者應該要依賴其抽象，抽象不要依賴細節，細節要依賴抽象。
不要把程式碼寫死某種實作上。

Ref: http://clouding.city/oop-solid/

總結面對原始碼改變的策略：
1. SRP: 降低單一類別被「改變」所影響的機會
2. OCP: 讓主類別不會因為新增需求而改變
3. LSP: 避免繼承時子類別所造成的「行為改變」
4. LKP: 避免暴露過多資訊造成用戶端因流程調整而改變
5. ISP: 降低用戶端因為不相關介面而被改變
6. DIP: 避免高階程式因為低階程式改變而被迫改變

### DI、IoC、DIP
控制權反轉，注入介面使用介面的方法，以便日後維護與替換

> DI 其實是個手段，不是目標。

- Inversion of Control （控制反轉）是實現低耦合的最佳設計方式之一，讓通用的程式碼來控制應用特定的程式碼，相依於抽象而不倚賴實作。實現 IoC 的做法有：DI、工廠模式……等。

> **DIP 是個使用抽象時依賴關係的準則或概念，IoC 說明了依賴關係的控制方向，而 DI 是一種處理依賴關係的模式。**

Ref: https://medium.com/wenchin-rolls-around/%E6%B7%BA%E5%85%A5%E6%B7%BA%E5%87%BA-dependency-injection-ea672ba033ca

## MVC
- Model：處理與應用程式業務邏輯相關的資料、及資料的處理方法
- View：實現顯示
- Controller：控制應用程式的流程、處理事件並作出回應

## Database
### ACID
#### Transaction
- collection of queries
- 1 unit of work
- Lifespan
```
TRANSACTION BEGIN
TRANSACTION COMMIT
TRANSACTION ROLLBACK
unexpected ending => ROLLBACK
```
- nature of transactions
    - used to change or modify data
    - also can used to **read**

####  Atomicity
> 指一個交易（Transaction）的所有操作要麼全部完成，要麼全部不完成，不會結束在中間某個狀態。

#### Consistency
在一個事務完成後，資料庫內部的狀態必須是合法的，即必須符合事務處理的一系列規則和約束。這包括資料的完整性、相容性以及其他的約束條件。
- Eventual Consistency 最終一致性：是分佈式系統中的一種一致性模型，它允許在一段時間內，不同副本之間的數據可能是不一致的，但最終將會達到一致的狀態。換句話說，當系統沒有新的更新操作時，數據最終會在所有副本中達到一致的狀態。

#### Isolation
> 指當多個使用者同時存取資料庫時，系統必須能確保各個交易（Transaction）彼此獨立，避免交互影響。隔離性的實現通常透過隔離等級（Isolation Level）來控制，不同的隔離等級會影響系統的一致性和效能。

1. Dirty Read
髒讀是當一個交易讀取到另一個尚未提交的交易所修改的數據。如果那個交易最後失敗並進行了回滾，那麼讀取到的數據實際上是無效的。這通常會在隔離等級為Read Uncommitted（讀未提交）時發生。

2. Non-repeatable Read
不可重複讀發生在一個交易中，當一筆數據被多次讀取，且在兩次讀取之間，另一個已提交的交易修改或刪除了該數據。這導致了第一個交易中多次讀取的結果不一致。這種情況在Read Committed（讀已提交）等級中仍可能發生。

3. Phantom Read
幻讀發生在一個交易中重新執行相同範圍的查詢時，發現其他交易已經插入或修改了這個範圍的數據。這種情況下，似乎"幻影般"地出現了新的資料。這種現象即使在Repeatable Read（可重複讀）隔離等級下也可能發生，尤其是在某些資料庫系統如MySQL中。

4. Lost Update
丟失更新是指當兩個交易同時試圖更新同一數據時，其中一個交易的修改可能會被另一個交易的修改所覆蓋，從而導致最初的部分或全部更新丟失。這通常可以透過適當的鎖定策略來避免。

> 隔離等級對這些現象的控制
> Read Uncommitted：最低等級，允許髒讀，其他問題現象也可能發生。
> Read Committed：防止髒讀，但不可重複讀和幻讀仍然可能。
> Repeatable Read：除了防止髒讀和不可重複讀，還試圖防止幻讀，但在某些實現中幻讀仍可能發生（例如MySQL）。
> Serializable：最高的隔離等級，通過鎖定事務影響的所有數據來防止所有上述問題，從而確保事務像是序列化進行的。

#### Durability
在事務成功完成後，所做的更改將永久保存在資料庫中，即使系統發生故障或重啟，這些更改也不會丟失。持久性保證了資料庫的可靠性和穩定性，使得資料庫能夠長期存儲重要的數據。

- Write-Ahead Logging（WAL）：WAL 是一種持久化數據庫更改的技術，它要求在將數據更改應用到數據文件之前，先將更改寫入到事務日誌中。這樣可以確保在數據文件上的更改之前，相應的日誌記錄已經被持久化，從而保證了數據的一致性和持久性。
- Async snapshot：涉及將數據庫的當前狀態快照到其他存儲位置，例如另一個硬盤、雲端存儲或者網絡備份系統中。但除了進行異步快照之外，資料庫還需要將數據文件中的更改持久化到磁盤上的持久性存儲設備中，以確保數據的完整性和一致性。
- AOF：每當對資料庫進行更改時，比如添加、更新或刪除操作，相應的操作指令將被寫入一個持久化的日誌文件中，這個日誌文件就是 AOF 文件。這些指令以追加（Append）的方式寫入文件，而不是覆蓋原有的文件內容，因此稱為「追加日誌」。

## Code Review
:::tip
Code Review 同樣可以用心理學的馬斯洛需求層次理論去應用...
:::
[https://www.dein.fr/posts/2015-02-18-maslows-pyramid-of-code-review](https://www.dein.fr/posts/2015-02-18-maslows-pyramid-of-code-review)

- Correct 正確性 => 基本生理
- Secure 安全 => 安全
- Readable 可讀性 => 愛與歸屬的需求
- Elegant 優雅 => 尊嚴
- Altruist 是否能幫助他人(利他主義者) => 自我實現

## 關於產能
> 在《Programming Perl》中，Larry Wall鼓勵程式人應培養三種美德：「懶惰（Laziness）、沒耐性（Impatience）與驕傲（Hubris）」。

- https://www.ithome.com.tw/voice/84963
