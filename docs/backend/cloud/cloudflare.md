---
title: Cloudflare
sidebar_position: 999
---

## Cloudflare tunnel
Cloudflare 有一個很像 ngrok 的服務，而且他可以綁定自己在 Cloudflare 綁定的 Domain , 這個服務蠻推薦的。
- [Tunnel](https://www.cloudflare.com/zh-tw/products/tunnel/)
- 教學：https://www.sakamoto.blog/cloudflare-tunnel/#google_vignette

- 推薦使用 docker 服務架起
> 如果想要轉接本機的9988的服務，那要在Service的位置填上`http://host.docker.internal:9988`