---
title: 和Travis說掰掰
date: '2023-01-02 20:47:20+08:00'
tags:
- github-action
- travis
- devops
---

# 從 travis 改成 github action
github action 是一個 github 提供的 CICD 服務。但是我的專案(resume)已經是很久以前寫的，甚至那時還使用 gulp3 撰寫(之後我調整升級成 gulp4 的寫法)


而當時我選用`travis ci`作為自動化部屬的服務之一。現在我想說既然在 Github 上不如就把他換成github action 的服務吧！沒想到意外的簡單！讓大家比較一下

- travis

```yaml
language: node.js
node.js: 14.5
install:
- npm install
- npm install --global gulp-cli@2.2.0
- npm install -g bower@1.8.2
- bower install
script:
- gulp
deploy:
  skip_cleanup: true
  email: r567tw@gmail.com
  name: r567tw
  provider: pages
  github_token: "$GITHUB_TOKEN"
  local_dir: "public"
  on:
    branch: master
```

- github action
```yaml
name: Node.js CI

on:
  push:
    branches:
      - master  # Set a branch to deploy

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '14.5'
      - run: npm install
      - run: npm install --global gulp-cli@2.2.0
      - run: npm install -g bower@1.8.2
      - run: bower install
      - run: gulp
      - name: Push
        uses: s0/git-publish-subdir-action@develop
        env:
          REPO: self
          BRANCH: gh-pages # The branch name where you want to push the assets
          FOLDER: public # The directory where your assets are generated
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # GitHub will automatically add this - you don't need to bother getting a token
          MESSAGE: "Build: ({sha}) {msg}" # The commit message
Footer
```

其實我就只是格式換一換，而比較特別的是使用`s0/git-publish-subdir-action@develop` 這個外部 action 這樣。

:::success
我覺得 gihub action 好好玩～
:::


