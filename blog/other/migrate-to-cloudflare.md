---
title: 搬家到 Cloudflare Page
date: "2024-09-14 00:00:00+08:00"
tags:
  - idea
---

<!-- {{< admonition info info >}}
原本這個網站是 Host 在 Github Page 上面, 使用自己買的 domain name...
但是後來我在工作上遇到了「Cloudflare」...發現他有提供所謂的「Cloudflare Page」和「Cloudflare Worker」便想說試試看
以下是我在搬家的過程與心得...
{{< /admonition >}} -->

## Hugo 搬家記

之前購買 domain 「jimmycode.tw」時，使用的是「GoDaddy」，但經過一兩年之後，發現在 Cloudflare 買域名居然超級香的，一年只要 8 USD (大約新台幣 250~300 元)，於是便果斷轉到 Cloudflare 來買網域...

> 心想，自己也在 Cloudflare 買域名了，何不在 Cloudflare 做深度的服務綁定呢？! 😎

發現 Cloudflare Page 似乎對 Hugo 很友善...，從這份文件可以看得出來：https://developers.cloudflare.com/pages/framework-guides/deploy-a-hugo-site/

於是也慢慢拿掉對 Github action 部署過程、同時也刪除原本的 `r567tw.github.io` 的專案，留下原本拿來部署網頁的 resource 專案...
發現... 非常無痛呢！

這大大解決我以前困擾的問題：「就是一旦對 `github.io` 做 Custom Domain 時，所有自己的 `github.io` 專案都會被自己的 Custom Domain 所取代...」

現在，我的履歷專案又可以用 `github.io` 拉！

> https://r567tw.github.io/resume/

接下來去 Cloudflare 的後台將他給的 `page.dev` 指向到自己買的 custom domain 即可 ✅

然而在部署完成之後我也發現一個小問題，雖然 custom domain 有 working...但 Cloudflare 有版本管理的概念...每一個版本在 `page.dev` 前面都有個小小的亂數子域名，這對版本管理確實很方便...可是，**_我就不喜歡啊_**

於是我使用 CloudFlare 提供的另外一個服務： `redirect`

> https://www.codemzy.com/blog/cloudflare-pages-dev-redirect

這個作者也是有面臨和我差不多的問題，我就懶得說了，自己去看唄

## Docusaurus To Cloudflare Page

我除了本部落格以外，自己還有經營另外一個知識庫系統...

> https://notes.r567tw.cc/docs/intro

原本他是架在 Netlify ，但我覺得我越來越想一站管理，不喜歡自己的東西四散在各地這樣，恰好也看到 cloudflare 的 migration document: https://developers.cloudflare.com/pages/migrations/migrating-from-netlify/

既然都看到了...那當然就來弄弄看拉...
不過這就真的有點不順利了 😅

所幸我是個天才，還是被我克服了，不過這其實也是幾個月前的事情，詳細如何解決的也有點忘了，只記得自己當時筆記記錄了這個連結：

> - lock 寫入問題:
>   https://stackoverflow.com/questions/67062308/getting-yn0028-the-lockfile-would-have-been-modified-by-this-install-which-is-e

## 今天...我把網站改成了黑色

說真的很久沒有碰這個網站站了呵呵，遙望上次的文章：[原來可以這麼寫 (29): 退訂 ChatGPT Plus](https://r567tw.cc/posts/job-complete/29/)

大概是六月初時寫的，呵呵，我快要讓自己長出各種雜草囉 😆

所以寫下這篇紀錄文(~~流水帳~~)，順便更新一下 Hugo Theme...

<!-- {{< admonition success >}}
我喜歡黑畫面、我喜歡 Dark Mode、我喜歡黑黑的感覺...
{{< /admonition >}} -->

感謝 ChatGPT , 我居然成功改掉那些 SCSS 讓我整個網站都黑黑的拉 🎉

不過我是個美術白痴，能稱讚的就是自己很會讀書、但美勞、體育通通都一竅不通...

> 如果有其他更好的建議歡迎來對這個專案做 PR 囉～
>
> https://github.com/r567tw/hugo-theme-even

如果你們對網站的配色與設計有什麼建議請告訴我啊 🥹

拜託 🙏

:::success
最近終於新買了一台 MacBook Air...M3 版本...這是用新電腦寫的第一篇文章，特此紀念 😎
:::
