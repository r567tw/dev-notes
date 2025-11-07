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

## 設定 SSH 只能執行某命令

在 SSH 的 authorized_keys 檔案中，可以針對某個公鑰設定只允許執行特定指令，並限制其他 SSH 功能。

例如：

```text
command="/home/deploy/deploy.sh",no-agent-forwarding,no-port-forwarding,no-pty,no-user-rc ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC... github-actions@deploy
```

說明：

- command="/home/deploy/deploy.sh"：登入時只會執行這個指令，無法執行其他 shell。
- no-agent-forwarding：禁止 SSH agent 轉發。
- no-port-forwarding：禁止 port 轉發。
- no-pty：不分配終端機（不能互動）。
- no-user-rc：不載入使用者的 rc 檔案（如 .bashrc）。

這種設定常用於自動化部署，例如 GitHub Actions push 代碼後觸發遠端腳本，提升安全性。
只要把這行加到 `/home/deploy/.ssh/authorized_keys`，就能限制該 key 只能執行你指定的 deploy.sh 指令。

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

## 如果需要計算自己在 Git 專案當中有幾天分別寫了幾次 Commit

```bash
git log --author="r567tw" --date=short --pretty=format:"%ad" | sort | uniq -c | grep "2025-10"
```
