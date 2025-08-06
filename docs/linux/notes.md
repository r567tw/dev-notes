---
title: Notes
sidebar_position: 3
---

:::info
這裡記錄幾個我工作中會常用的指令 Memo 用，畢竟...我就不喜歡背...
:::

## 常見組合技

```bash
cat file.txt | grep "pattern"  # 顯示 file.txt 中符合 "pattern" 的行；可用來搜尋檔案中特定關鍵字
ps au | grep process_name  # 顯示目前所有程序中包含 process_name 的資訊，用於找特定程序
find /path -name "*.txt" | xargs rm  # 找出 /path 下所有 .txt 檔並刪除，用於批次刪除符合條件的檔案
history | grep "command"  # 在指令歷史中搜尋包含 "command" 的紀錄，用於找過去執行過的相關指令
echo "some text" >> file.txt && tail file.txt  # 將 "some text" 加到 file.txt 結尾，然後顯示該檔案最後幾行；適合追加內容並確認結果
netstat -tulnp | grep :8080  # 檢查有哪些程式正在監聽 8080 埠口，常用於偵錯服務啟動與連線狀況
find /path -type f -size +1M -exec du -h {} + | sort -rh | head -n 5  # 找出 /path 下大於 1MB 的檔案，列出檔案大小後由大至小排序，顯示前五個，用於找出大檔案釋放空間
ps au --sort=-%mem | head -n 4 | awk '{print $2}' | xargs kill -9  # 找出記憶體使用最多的前幾個程序（排除標頭列），然後強制終止它們，用於處理記憶體吃緊的情況
```

## 查看目前那些 port 號被佔用

```bash
nc -zv 127.0.0.1 3300-3310 # 快速看 3300~3310 port 能不能被 connected
sudo lsof -PiTCP -sTCP:LISTEN # Mac 用：查看目前哪些port號被用
```

## 清空某個檔案

```
true > .vscode/logs/log
```

## `sudo` 不用密碼

```bash
sudo visudo # = vi /etc/sudoers
# 在 /etc/sudoers 增加一行
`{ username } ALL=(ALL) NOPASSWD:ALL`

# Ref: https://linuxhint.com/setup-sudo-no-password-linux/
# Ref: https://dchesmis.blogspot.com/2018/05/visudosudo.html
```

## 讓 SSH 變得更方便拉

- 修改`.ssh/config`檔案

```
Host             {{NAME}}
Hostname         x.x.x.x
Port             22
User             admin
```

alias enter-nas="sshpass -p password ssh -t `{{NAME}}`"

- ssh-keygen -t rsa -b 4096 > ssh-copy-id 用戶名@遠端伺服器 IP 地址
- ssh-copy-id
