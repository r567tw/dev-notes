---
sidebar_position: 1
---

# Data Structure

## array

## linked list

## Stack

- 一種有順序性的資料結構，LIFO/FILO 最晚放入會最先被取出
- push & pop

## Hash table

- hash function : 一種將輸入的字串輸出成數字的函式
  - 必須有一致性
  - 不同的字串要對應到不同的數字
- hash table / hash map / map /dictionary/ associative array
- 應用情境：電話簿、檢查是否有重複、快取
- 碰撞 (Collision)
- 負載係數 (Load Factor): 雜湊內表內的元素數量/雜湊表的儲存槽總數

## Graph

- 含有節點 Node 以及邊 Edge 所組成的模型

```python
graph = {}
graph["you"] = ["alice", "bob", "claire"]
```

- 有向圖、無向圖

## 樹狀圖 Tree

- Root Node
- 每個節點只有一個父節點
- 無環特性
- 樹狀圖的高度決定其搜尋效率

### 二元樹 Binary Tree

- 每個節點最多只有兩個子節點

#### 霍夫曼編碼(Huffman Coding)

- 一種 無失真壓縮（lossless compression） 演算法。

1. 計算每個字元的出現頻率。
2. 建立一個「最小堆（min-heap）」：每個字元對應一個節點，權重是頻率。
3. 重複以下動作直到只剩一棵樹：

- 取出兩個最小頻率的節點，合併成新節點（權重=兩者相加）。
- 把新節點放回堆中。
- 從根節點開始遍歷，給左分支編碼 0，右分支編碼 1，直到所有字元都有編碼。

### Balanced Binary Search Tree (BST)

- 概念：任何保持左右子樹高度差在某範圍內的二元搜尋樹（BST）都屬此類。
- 目的：避免退化成鏈狀結構，維持搜尋、插入、刪除在 O(log n) 時間複雜度。
- 常見實作：AVL Tree、Red-Black Tree、Splay Tree 等。

#### AVL Tree

- 特徵：最早提出的自平衡 BST。
- 規則：任何節點的左右子樹高度差 ≤1。
- 優點：搜尋速度穩定（因高度最小化）。
- 缺點：插入/刪除需頻繁旋轉調整，維護成本較高。

#### Splay Tree

- 特徵：自調整 BST。
- 操作：每次**存取（搜尋/插入/刪除）**後，將目標節點旋轉到根節點（Splay）。
- 優點：對 **「經常被重複存取」** 的資料特別快，攤銷時間 O(log n)。
- 缺點：單次操作最差可退化到 O(n)。

### B Tree

- 結構：多路搜尋樹（非二元），每個節點可存放多個 key 與多個子樹。
- 應用：資料庫、檔案系統常用（如 MySQL、檔案索引）。
- 優點：降低磁碟 I/O，搜尋、插入、刪除皆為 O(log n)。
- 變種：B+ Tree（更適合範圍查詢）。

## Queue

- FIFO 先進先出、後進後出

```

```
