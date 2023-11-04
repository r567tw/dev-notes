const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'Jimmy の note',
  tagline: 'Notes for Output & Understand',
  url: 'https://jimmynotes.netlify.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'r567tw', // Usually your GitHub org/user name.
  projectName: 'dev-notes', // Usually your repo name.
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
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
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
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Jimmy Notes',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'coding/intro',
            position: 'left',
            label: 'Documents',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          { to: 'https://r567tw.github.io/', label: 'Site', position: 'left' },
          { to: 'https://github.com/r567tw', label: 'Github', position: 'left' }
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Jimmy の note`,
      },
      prism: {
        theme: darkCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
});
