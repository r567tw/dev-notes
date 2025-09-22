// const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: "Jimmy の Code",
    tagline: "Notes for Output & Understand",
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

    i18n: {
      defaultLocale: "zh-Hant", // 預設語系
      locales: ["zh-Hant"], // 支援的語系
      localeConfigs: {
        "zh-Hant": {
          label: "繁體中文", // 語系切換選單上的名稱
        },
      },
    },
    themes: [
      // ... Your other themes.
      [
        require.resolve("@easyops-cn/docusaurus-search-local"),
        /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
        // https://github.com/easyops-cn/docusaurus-search-local
        ({
          indexBlog: true,
          indexDocs: true,
          highlightSearchTermsOnTargetPage: true,
          explicitSearchResultPath: false,
          searchResultLimits: 10,
          // `hashed` is recommended as long-term-cache of index file is possible.
          hashed: true,

          // For Docs using Chinese, it is recomended to set:
          language: ["en", "zh"],

          // Customize the keyboard shortcut to focus search bar (default is "mod+k"):
          // searchBarShortcutKeymap: "s", // Use 'S' key
          // searchBarShortcutKeymap: "ctrl+shift+f", // Use Ctrl+Shift+F

          // If you're using `noIndex: true`, set `forceIgnoreNoIndex` to enable local index:
          // forceIgnoreNoIndex: true,
        }),
      ],
    ],
    presets: [
      [
        "@docusaurus/preset-classic",
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            sidebarPath: require.resolve("./sidebars.js"),
            // Please change this to your repo.
            // editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',
          },
          blog: {
            showReadingTime: true,
            blogSidebarCount: 10,
            blogSidebarTitle: "Recent Posts",
            // Please change this to your repo.
            // editUrl:
            //   'https://github.com/facebook/docusaurus/edit/main/website/blog/',
          },
          theme: {
            customCss: require.resolve("./src/css/custom.css"),
          },
        }),
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
            { to: "blog/tags", label: "Tags", position: "left" },
            { to: "docs/intro", label: "Notes", position: "left" },
            {
              to: "https://project.r567tw.cc",
              label: "Project",
              position: "left",
            },
            {
              type: "html",
              position: "right",
              value: `<a href="https://github.com/r567tw" target="_blank" rel="noopener noreferrer" style="display:flex; align-items:center;">
                  <img src="/img/github.svg" alt="GitHub" style="width:20px; height:20px;">
                </a>`,
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
  }
);
