---
title: AB
sidebar_position: 6
---

# ab

AB (ApacheBench) 是 Apache HTTP Server 附帶的簡單壓測工具，用來快速量測 HTTP 端點的吞吐量與延遲分佈。它適合做「單一 URL、固定請求內容」的基準測試，不是完整負載測試框架。

## 何時用
- 想快速驗證某個 API 或頁面在固定壓力下的回應時間
- 比較調整前後的效能差異
- 檢查反向代理或 CDN 的基本吞吐量

## 基本用法
```bash
# 對單一 URL 發 1000 次請求，並發 50
ab -n 1000 -c 50 https://example.com/

# 傳送 POST JSON
ab -n 500 -c 20 -p payload.json -T application/json https://example.com/api
```

## 常用參數
- `-n` 總請求數
- `-c` 並發數
- `-t` 測試時間上限（秒）
- `-p` POST 的檔案內容
- `-T` Content-Type
- `-H` 自訂 Header（可重複）
- `-k` Keep-Alive
- `-s` 逾時秒數

## 觀察重點
- `Requests per second`：吞吐量
- `Time per request`：每個請求的平均耗時
- `Transfer rate`：傳輸速率
- `Connection Times`：連線與回應時間分佈
- `Percentage of the requests served within a certain time`：百分位延遲

## 典型流程
1. 先用小量請求驗證路徑與權限
2. 調整 `-c` 找出可接受的並發範圍
3. 以固定 `-n` 反覆測試，觀察結果是否穩定
4. 若需要比較優化前後，保留相同參數與測試環境

## 限制與注意
- 只能測單一 URL，不適合複雜流程或多步驟情境
- 不支援動態資料與多段流程
- 若目標有 HTTPS 與 DNS 問題，結果會被拉長
- 本機與目標網路狀況會影響結果

## 小技巧
- 先用 `curl` 確認回應正確，再跑 `ab`
- 測試時固定機器與網路，避免外部干擾
- 觀察錯誤率，若 `Failed requests` 過高需要先排除
