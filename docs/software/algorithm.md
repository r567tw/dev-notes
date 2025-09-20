---
sidebar_position: 2
---

# Algorithm

## Big-O

- 演算法的執行時間不會隨著元素的增加而成等比增加
- 代表的是最差情況的執行時間

## Divide-and-Conquer

- 將一個問題分解成越來越小的問題。使用 D&C 時處理陣列時，Base Case 就是空陣列或單一元素的陣列

## 搜尋

### 二元搜尋法

```python
def binary_search(arr, item):
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = (low + high) // 2
        guess = arr[mid]

        if guess == item:
            return mid
        elif:
            high = mid - 1
        else:
            low = mid + 1
    return None
```

## 排序

### 選擇排序法

```python
def findSmallest(arr):
    smallest = arr[0]
    smallest_index = 0
    for i in range(1,len(arr)):
        if arr[i] < smallest:
            smallest_index = i
            smallest = arr[i]
    return smallest_index

def selectionSort(arr):
    newArr = []
    for i in range(len(arr)):
        smallest = findSmallest(arr)
        newArr.append(arr.pop(smallest))
    return newArr

```

### 快速排序法

- O(n log n)

```python
def quicksort(array):
    if len(array) < 2:
        return array
    else:
        pivot = array[0]
        less = [i for i in array[1:] if i <= pivot]
        greater = [i for i in array[1:] if i > pivot]

    return quicksort(less) + [pivot] + quicksort(greater)
```

## 遞迴

- 呼叫自己
- 必須有 Base Case 和 Recursive Case
- 所有呼叫都會產生一個 Call Stack
- 遞迴的 Call Stack 可能會變的非常大並且佔用大量的記憶體

```python
def countdown(i):
    print(i)
    if i <= 1:
        return
    else:
        countdown(i-1)
```

## 廣度優先搜尋 Breadth-First Search

- 比較適合處理最短路徑問題

```python
from collections import deque
search_queue = deque()
searched = set() // 避免重複循環

search_queue += graph["you"]
while search_queue:
    person = search_queue.popleft()
    if not person in searched:
        if person_is_seller(person):
            print(person + "是芒果賣家")
            return true
        else:
            serch_queue += graph[person]

return false
```

## 深度優先搜尋

- 不能用於尋找最短路徑

```python
from os import listdir
from os.path import isfile, join

def printnames(dir):
    for file in sorted(listdir(dir)):
        fullpath = join(dir ,file)
        if isfile(fullpath):
            print(file)
        else:
            printnames(fullpath)
```

## Dijkstra

- 戴克斯特拉演算法
- 每個路段分配了權重(加權圖形)

## Greedy Algorithm（貪婪演算法）

- 概念：在每一步選擇當下看起來最好的選項（局部最佳解），期望最終接近或得到全域最佳解。
- NP-Complete 問題：屬於計算上極難的問題，沒有已知多項式時間解法，貪婪法常用來找近似解。
- 背包問題：在有限容量的背包中放入物品以最大化價值，貪婪法可用「單位價值最高」的策略求近似。
- 集合覆蓋問題：從多個子集合中選擇最少集合以覆蓋所有元素，貪婪法通常挑選當下能覆蓋最多新元素的集合。

## Dynamic Programming（動態規劃演算法）

- **概念**：將問題拆成**重疊子問題 (overlapping subproblems)** 與**最優子結構 (optimal substructure)**，記錄中間結果以避免重複計算，提升效率。
- **應用場景**：最短路徑、背包問題、序列比對、股票買賣等。

### 最長共用子字串 (Longest Common Substring, LCS)

- **目標**：找出兩字串中**連續出現**且最長的相同子字串。
- **核心思路**：
  1. 建立二維 DP 陣列 `dp[i][j]` 表示 `s1[i-1]` 與 `s2[j-1]` **結尾相同時**的最長長度。
  2. 若字元相同：`dp[i][j] = dp[i-1][j-1] + 1`；否則 `0`。
  3. 取所有 `dp[i][j]` 的最大值即為答案。

### 簡易 Python 範例

```python
def longest_common_substring(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    max_len = 0
    end_pos = 0  # 紀錄 s1 中結尾位置

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
                if dp[i][j] > max_len:
                    max_len = dp[i][j]
                    end_pos = i
    return s1[end_pos - max_len:end_pos]

# 測試
print(longest_common_substring("abcde", "bcdf"))  # 輸出: bcd
```

## K-最近鄰演算法 (K-Nearest Neighbors, KNN)

- **用途**：可用於**分類**與**迴歸**。
  - **分類**：根據距離最近的 K 個鄰居的多數類別，將新資料**歸類成群組**。
  - **迴歸**：取 K 個鄰居的平均值（或加權平均），作為目標值的**預測結果**。
- **特徵提取**：將物件轉換為**可計算距離的數值特徵**，例如向量、像素值、統計量。
- **距離衡量**：常用歐式距離 (Euclidean)、曼哈頓距離 (Manhattan) 或餘弦相似度等。
- **K 的選擇**：
  - K 太小：易受雜訊影響，模型偏差大。
  - K 太大：邊界模糊，計算成本高。
- **優缺點**：
  - 優點：概念簡單、效果直觀、無需訓練模型。
  - 缺點：資料量大時計算成本高，對特徵尺度差異敏感，需正規化或標準化。

## Other

- 線性迴歸 (Linear Regression)：給定一組資料點，找出一條能最小化誤差的最佳直線以進行預測。
- 反向索引 (Inverted Index)：建立詞彙到文件清單的映射，快速搜尋包含特定詞的文件。
- 傅立葉轉換 (Fourier Transform)：將訊號分解為不同頻率成分，以分析或處理時域與頻域資訊。
- 平行演算法 (Parallel Algorithm)：將計算工作拆分給多個處理器同時執行以加速運算。
- MapReduce：分散式運算模型，透過 Map 分割資料與 Reduce 彙整結果，適合大規模資料處理。
- Bloom filter：一種使用位元陣列與多個雜湊函式的**空間高效**結構，用於快速測試元素是否可能存在集合中（允許少量誤判）。
- HyperLogLog：一種以極小記憶體估算集合中**不同元素數量**的機率演算法。
- HTTPS 與 Diffie-Hellman 金鑰交換：HTTPS 透過 TLS 加密傳輸，Diffie-Hellman 提供安全的金鑰交換協議以建立共享密鑰。
- 局部敏感雜湊 (Locality-Sensitive Hashing, LSH)：將相似物件映射到相同或相近雜湊值以加速近似最近鄰搜尋。
- 最小堆積 (Min Heap) 和優先佇列：Min Heap 是一種完全二元樹結構，根節點為最小值，常用於實作優先佇列以快速取出最小元素。
- 線性規劃 (Linear Programming)：在給定線性目標函數與線性約束條件下，尋找最佳解（最大化或最小化目標）。
