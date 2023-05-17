---
sidebar_position: 1
---
# Data structure

## Bloom Filter
Bloom Filter 有兩個要素：長度為 n 的 bit array 和 m 個獨立的 hash function，當要寫入資料（x）的時候，用所有的 hash function 對 x 進行 hash 後 mod n 得到 m 個位置，把 bit array 這些位置的 bit 設為 1，就完成了一次寫入。

使用案例: 搶票流量控制

Ref: [連結](https://medium.com/@Kadai/%E8%B3%87%E6%96%99%E7%B5%90%E6%A7%8B%E5%A4%A7%E4%BE%BF%E7%95%B6-bloom-filter-58b0320a346d)