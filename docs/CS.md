---
title: Computer Science
sidebar_position: 2
---


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

## Concurrency
- Process: 作業系統結構的基礎、是系統進行資源設定和排程的基本單位
- Thread: 程式執行流的最小單位、一般由作業系統控制、由執行緒id、指令指標、暫存器集合與堆疊組成。有初始化、可執行、執行中、阻塞、銷毀等狀態
- Coroutines: 一種比執行序更小的函數，由程式控制

> Process > Thread > Coroutines

