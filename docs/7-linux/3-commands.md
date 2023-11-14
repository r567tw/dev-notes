---
sidebar_position: 3
---
# Commands

## 基本指令
- whoami
- pwd
- cd
- locate
- whereis
- which
- find
- grep
- cat
- touch
- mkdir
- rmdir
- rm
- head less tail nl more
- patch : 撰寫 patch 檔案以修改原檔


## 網路相關
- ip addr
> 通常會有 lo 和 ens5 兩種網卡, lo 是給本地端使用
- ping
```
用來檢測某一台主機是否可抵達(reachable)，也可以計算往返時間(Round Trip Time RTT)和網路封包雕師率

實際運作原理：發送 ICMP 回應請求到目標主機，目標主機會回傳 ICMP 回應封包
```
> 通常有回應就是 reachable , 不過沒有結果不一定表示主機完全不可達，可能只是防火墻擋掉了ICMP封包

## 程序管理類
- ps 
```
process status 的縮寫。
- a all
- u user
- x 列出沒有控制終端機的 process
```
<!-- ps -aux thread 測底搞懂 program , process ,thread https://www.796t.com/content/1527709011.html
https://totoroliu.medium.com/program-process-thread-%E5%B7%AE%E7%95%B0-4a360c7345e5 -->
- top
- nice
- kill
- & 和 fg