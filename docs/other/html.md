---
title: HTML
sidebar_position: 999
---

## capture
```html
<!-- 開啟 前鏡頭 錄影、拍照 -->
<input type="file" capture="user" accept="video/*"/>
<input type="file" capture="user" accept="image/*"/>

<!-- 開啟 後鏡頭 錄影、拍照 -->
<input type="file" capture="environment" accept="video/*"/>
<input type="file" capture="environment" accept="image/*"/>

<!-- Ref: https://www.letswrite.tw/html-capture/ -->
```

## Link Rel 
- https://zhuanlan.zhihu.com/p/150231042
```
<link rel="prefetch" href="/style.css" as="style" />
<link rel="preload" href="/style.css" as="style" />
<link rel="preconnect" href="https://example.com" />
<link rel="dns-prefetch" href="https://example.com" />
<link rel="prerender" href="https://example.com/about.html" />
```

- preload (紧急下载内容)
- prefetch (使用低优先级策略下载内容)
- preconnect (连接到服务器)
- dns-prefetch (解析域名)
- prerender (在后台渲染页面)
