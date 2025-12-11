// const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

module.exports = {
  title: "Jimmy の Code",
  tagline: "Our Blog and Notes for Output & Understand",
  url: "https://r567tw.cc",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "r567tw", // Usually your GitHub org/user name.
  projectName: "dev-notes", // Usually your repo name.
  // headTags: [
  //   {
  //     tagName: 'script',
  //     attributes: {
  //       async,
  //       crossorigin: "anonymous",
  //       src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3916790298498531',
  //     },
  //   },
  // ],
  // scripts: [
  //   {
  //     src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3916790298498531',
  //     async: true,
  //   },
  // ],
  markdown: {
    mermaid: true,
  },
  i18n: {
    defaultLocale: "zh-Hant", // 預設語系
    locales: ["zh-Hant"], // 支援的語系
    localeConfigs: {
      "zh-Hant": {
        label: "繁體中文", // 語系切換選單上的名稱
      },
    },
  },
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],
  themes: [
    "@docusaurus/theme-mermaid",
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        indexBlog: true,
        indexDocs: true,
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: false,
        searchResultLimits: 10,
        hashed: true,
        language: ["en", "zh"],
        // searchBarShortcutKeymap: "s", // Use 'S' key
        // searchBarShortcutKeymap: "ctrl+shift+f", // Use Ctrl+Shift+F
        // forceIgnoreNoIndex: true,
      },
    ],
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: {
          showReadingTime: true,
          blogSidebarCount: 10,
          blogSidebarTitle: "Recent Posts",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Jimmy's Code",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
        },
        items: [
          { to: "blog", label: "Blog", position: "left" }, // or position: 'right'
          { to: "docs/intro", label: "Notes", position: "left" },
          {
            to: "https://project.r567tw.cc",
            label: "Project",
            position: "left",
          },
          {
            to: "https://github.com/r567tw",
            label: "GitHub",
            position: "left",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} Jimmy の Code`,
      },
      colorMode: {
        defaultMode: "dark", // 預設深色
        disableSwitch: true, // 是否允許使用者切換（true = 不允許）
        respectPrefersColorScheme: false, // 是否依照使用者系統設定
      },
    }),
};
