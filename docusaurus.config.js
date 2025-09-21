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
    themes: [
      // ... Your other themes.
      [
        require.resolve("@easyops-cn/docusaurus-search-local"),
        /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
        ({
          // ... Your options.
          // `hashed` is recommended as long-term-cache of index file is possible.
          hashed: true,

          // For Docs using Chinese, it is recomended to set:
          // language: ["en", "zh"],

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
            {
              type: "doc",
              docId: "intro",
              position: "left",
              label: "Notes",
            },
            // { to: "https://r567tw.cc", label: "Blog", position: "left" },
            {
              to: "https://github.com/r567tw",
              label: "Github",
              position: "left",
            },
          ],
        },
        footer: {
          style: "dark",
          copyright: `Copyright © ${new Date().getFullYear()} Jimmy の Code`,
        },
      }),
  }
);
