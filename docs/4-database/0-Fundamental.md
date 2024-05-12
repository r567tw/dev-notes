---
sidebar_position: 0
---
# Fundamentals

## ACID
### Transaction
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

###  Atomicity
> 指一個交易（Transaction）的所有操作要麼全部完成，要麼全部不完成，不會結束在中間某個狀態。

### Consistency
在一個事務完成後，資料庫內部的狀態必須是合法的，即必須符合事務處理的一系列規則和約束。這包括資料的完整性、相容性以及其他的約束條件。

### Isolation
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

### Durability
在事務成功完成後，所做的更改將永久保存在資料庫中，即使系統發生故障或重啟，這些更改也不會丟失。持久性保證了資料庫的可靠性和穩定性，使得資料庫能夠長期存儲重要的數據。

- Write-Ahead Logging（WAL）：WAL 是一種持久化數據庫更改的技術，它要求在將數據更改應用到數據文件之前，先將更改寫入到事務日誌中。這樣可以確保在數據文件上的更改之前，相應的日誌記錄已經被持久化，從而保證了數據的一致性和持久性。
- Async snapshot：涉及將數據庫的當前狀態快照到其他存儲位置，例如另一個硬盤、雲端存儲或者網絡備份系統中。但除了進行異步快照之外，資料庫還需要將數據文件中的更改持久化到磁盤上的持久性存儲設備中，以確保數據的完整性和一致性。
- AOF：每當對資料庫進行更改時，比如添加、更新或刪除操作，相應的操作指令將被寫入一個持久化的日誌文件中，這個日誌文件就是 AOF 文件。這些指令以追加（Append）的方式寫入文件，而不是覆蓋原有的文件內容，因此稱為「追加日誌」。