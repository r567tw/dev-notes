#!/bin/bash

# 檢查是否有提供 title
if [ -z "$1" ]; then
  echo "請提供 Blog 標題，例如: ./post.sh 'WordCamp 2023 一日遊'"
  exit 1
fi

TITLE="$1"
DATE=$(date +"%Y-%m-%d %H:%M:%S+08:00")  # 取得當前日期時間含時區
FILENAME_DATE=$(date +"%Y-%m-%d")  # 用於檔名的日期格式
BLOG_DIR="blog"
FILENAME="$BLOG_DIR/$FILENAME_DATE.md"

# 確保 blog 目錄存在
mkdir -p "$BLOG_DIR"

# 生成 Blog Markdown
cat <<EOT > "$FILENAME"
---
title: $TITLE
date: "$DATE"
hide_table_of_contents: false
tags:
  - 
---
:::info[]
description: 這是自動生成的 Blog 範本，請記得補充內容與標籤。
:::
<!-- truncate -->
EOT

echo "Blog 已生成: $FILENAME"
