
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

### Internal
- 資料庫基本上就是一堆在磁碟裡面的「Page」

### Index
索引是一種加速資料查詢的**資料結構**，類似書籍的目錄，讓資料庫在大量資料中能更快速地定位所需的資料。透過索引，可以極大地提高查詢效能，但也會佔用額外的儲存空間，並增加一些資料寫入與更新的成本。


當資料表建立了索引後，資料庫會生成一個基於指定欄位的索引結構，**通常是 分別是 b-tree 和 LSM trees 類型**。這樣的結構讓資料庫在搜尋特定欄位時，可以利用索引快速鎖定要找的資料位置，而不是一筆一筆掃描整個資料表。

- Primary Index（主索引）
- Unique Index（唯一索引）
- Full-Text Index（全文索引）
- Composite Index（複合索引）

### Partitioning
Database partitioning 是一種將大型資料表或資料庫分割成更小的、可管理的資料區塊的方法，以提升查詢效率和操作效能。它透過把數據劃分成邏輯或物理上的區段來減少資料庫的負擔，並優化資料存取速度。常見的分割方法有以下幾種：

1. **範圍分割（Range Partitioning）**  
   依照特定範圍（如日期、數字等）來將資料分成不同的區塊。例如，以日期為基準，每月或每年存成一個分區。

2. **清單分割（List Partitioning）**  
   使用特定的清單值來決定每個分區包含的資料，例如，將不同國家的資料放在不同的分區中。

3. **哈希分割（Hash Partitioning）**  
   對某個欄位進行哈希運算，並根據哈希值把資料分散到不同的分區，這樣可以使資料分佈更為均勻，減少單一分區的負擔。

4. **複合分割（Composite Partitioning）**  
   結合多種分割方法，例如先使用範圍分割，再進行哈希分割，以達到更精細的分區效果。

#### Partitioning 的優勢
- **性能優化**：分割後的資料更小、更易於查詢，有效減少 I/O 負擔。
- **高效維護**：分區可以獨立維護，清理或備份其中一個分區不影響其他分區。
- **更好的擴展性**：隨著資料量的增長，可以輕鬆新增分區，減少資料庫壓力。

#### 適用場景
- 大型資料庫，尤其是資料量持續增長且查詢操作頻繁的情況。
- 特定分區會進行大量讀寫操作（例如報表生成、統計數據等）。
  
透過正確的分割策略，Database Partitioning 可以顯著提升資料庫的效能和穩定性。

Ref: https://cola.workxplay.net/mysql-partitioning-for-performance-optimization/

### Database sharding 
- 資料分割：資料根據某種規則（例如：使用者ID、地理區域或時間範圍）分割成多個部分，這些部分分別存儲在不同的資料庫或伺服器上。
- 分片：每個分片是一個獨立的資料庫，擁有完整的資料集合，但每個分片只包含一部分資料。例如，使用者資料可以根據使用者ID範圍（ID 1-1000、1001-2000 等）來分片。
- 查詢路由：當應用發出查詢時，系統需要確定查詢的資料在哪個分片上。這通常是通過一個稱為分片鍵（Sharding Key）的欄位來實現，這個欄位用來決定資料的分佈。
- 擴展性：當資料庫需要處理的資料量增長時，可以輕鬆地增加新的分片，這樣系統可以無縫地擴展，處理更多的資料和請求。

#### vs Partitioning
| **特性**                  | **Database Sharding**                                       | **Partitioning**                                              |
|---------------------------|-------------------------------------------------------------|----------------------------------------------------------------|
| **概念**                  | 將資料分散到多個獨立的資料庫或伺服器                         | 將一個資料庫的資料拆分成多個區段（例如分區表）               |
| **架構**                  | 分散於多個伺服器或節點，通常為分散式架構                       | 單一資料庫內部的分區，通常為單一伺服器上                      |
| **使用場景**              | 高併發、高容量需求（例如全球性應用）                          | 單一資料庫需要提高查詢效率或管理大型表格                    |
| **實作**                  | 每個分片（shard）是一個獨立的資料庫，可使用不同伺服器        | 分區依賴資料庫系統提供的功能，無須獨立伺服器                  |
| **資料一致性**           | 難度較高，通常需要實現跨分片一致性處理                        | 分區屬於同一資料庫，內部一致性較易管理                        |
| **延展性 (Scalability)** | 水平擴展較佳，能透過新增節點提升整體容量                      | 垂直擴展為主，擴展性較受限                                    |
| **管理複雜度**           | 較高，需要處理分片間的資料分布、查詢分派等                   | 較低，分區由資料庫自動管理，不涉及跨伺服器的問題             |
| **範例**                  | 將用戶資料分配到不同區域的伺服器（如區域性分片）              | 將年度資料分成每年的分區表，減少查詢範圍                     |
| **優缺點**               | 擴展性強，但管理與一致性成本較高                             | 簡單易行，但單一資料庫的效能與容量受限                       |



### Database Replication
- 資料備援與高可用性：若主資料庫（primary database）發生故障，備份資料庫（replica 或 standby）可快速接手。
- 負載平衡：通過在多個伺服器間分散讀取負載（如查詢操作），減少主資料庫壓力，提升效能。
- 地理分佈：在不同地點部署複製資料庫，讓使用者存取最近的伺服器，降低延遲。

#### 資料庫複製的類型
- 同步複製（Synchronous Replication）：在主資料庫寫入資料時，同步將資料寫入到所有的備份資料庫。這樣可以保證所有資料庫的資料一致性，但會增加延遲，因為需要等待所有備份完成。
- 非同步複製（Asynchronous Replication）：主資料庫不會等待備份資料庫的回應，而是先行完成寫入操作，然後再進行資料複製。這樣效率較高，但有可能在主資料庫故障時導致部分資料未被複製。

#### 資料庫複製的挑戰
- 資料一致性：非同步或多主架構可能會導致資料不同步或衝突。例如，同一筆資料在不同主節點上被同時更新時，可能會出現矛盾。
- 衝突處理：多主架構下可能會發生寫衝突，需要設定衝突解決規則。
- 延遲問題：同步複製可能會增加寫操作延遲，非同步複製可能導致資料的時間差異。
- 資料丟失：在非同步複製中，如果主資料庫出現故障，有可能某些操作尚未複製到從資料庫，導致資料丟失。

#### vs 分割（Sharding）的區別
- Database Replication: 是將整個資料集複製到多個伺服器，用於備援、讀取分流和提高可用性。
- Database Sharding: 是將資料集分成多個分區，每個分區分配到不同伺服器，用於支持大規模數據量和提升效能。這兩者可以相互結合。

### Database Engine
> 在資料庫中進行創建、讀取、更新和刪除（CRUD）數據的底層軟體組件。

1. MyISAM
2. InnoDB
3. PostgreSQL
4. SQLite


### Database Cursor
> 在資料庫引擎 (Database Engine)中，讓開發人員或資料庫管理員可以遍歷、瀏覽檢索結果的資料列(稱為資料查詢結果集, Result set)，是主要用於在結果集中移動到某一資料列(row)的控制結構。游標可以被看作是指向一組列中，代表某一列的指針。游標一次只能參照一列，但可以根據需要移動到結果集的其他列。

### SQL vs NoSQL
> 數據庫不在只是儲存Table,Row,Column....