---
sidebar_position: 999
---

# Other

## Robots
設定搜尋引擎爬蟲: 不允許搜尋蜘蛛爬取全部網站
> 不要讓搜尋引擎加入這個網站...

```txt title=robots.txt
User-agent: *
Disallow: /
```
Ref: https://www.newscan.com.tw/all-seo/robots-block-search-engines.htm

## Web Basic
### 執行原理
- input URL (brower)
- HTTP & HTTPS & HTTP2
- CGI Process Request (& use Database)
- output HTML Page (brower)

### DNS

### URI and URL and URN

## Docker & Command
```bash
# 使用 Docker 起
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password --name mysql mysql
docker run --rm -v $(pwd):/app composer "composer install"
```

## Blogs
[explainthis - 軟體工程面試與筆記](https://www.explainthis.io/zh-hant)