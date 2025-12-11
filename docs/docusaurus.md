---
sidebar_position: 998
title: Docusaurus
---

## 搜尋

本站使用`Local Search`的做法，可參考

- https://github.com/easyops-cn/docusaurus-search-local

## 中文化

- 先在`docusaurus.config.js` 加入 i18n 選項

```js
  i18n: {
    defaultLocale: 'zh-Hant',         // 預設語系
    locales: ['zh-Hant'],             // 支援的語系
    localeConfigs: {
      'zh-Hant': {
        label: '繁體中文',             // 語系切換選單上的名稱
      },
    },
  },
```

- 執行指令

```bash
npm run write-translations -- --locale zh-Hant
```

- 之後去 `i18n/zh-Hant/*` 底下去做修改即可

## 預設深色模式

:::info
我喜歡黑黑的，我喜歡深色模式
:::

```js
  themeConfig: {
    // 其他設定...
    colorMode: {
      defaultMode: 'dark',   // 預設深色
      disableSwitch: false,  // 是否允許使用者切換（true = 不允許）
      respectPrefersColorScheme: false, // 是否依照使用者系統設定
    },
  },

```

## 將某文章置頂

- 建立一個控制 theme 的 index.js

```js
// src/theme/BlogListPage/index.js
import BlogListPage from "@theme-original/BlogListPage";

export default function BlogListPageWrapper(props) {
  const { items } = props;

  // 將 sticky=true 的文章排在最上面
  const sortedItems = [...items].sort((a, b) => {
    const aSticky = a.content.frontMatter.sticky ? 1 : 0;
    const bSticky = b.content.frontMatter.sticky ? 1 : 0;
    if (aSticky !== bSticky) return bSticky - aSticky; // sticky 的排前面
    return (
      new Date(b.content.metadata.date) - new Date(a.content.metadata.date)
    ); // 其餘照日期
  });

  return <BlogListPage {...props} items={sortedItems} />;
}
```

> 這樣只要文章加入 sticky 這個屬性就可以了

```
title: 架站筆記
date: "2025-10-31 23:36:55+08:00"
hide_table_of_contents: false
// highlight-next-line
sticky: true
```

## 加入數學表達式

- https://docusaurus.io/zh-CN/docs/next/markdown-features/math-equations

```
npm install --save remark-math@6 rehype-katex@7


```
