---
sidebar_position: 4
---
# Memo
:::info
這裡記錄幾個我工作中會常用的指令Memo用，畢竟...我就不喜歡背...
:::

## 查看目前那些port號被佔用
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
{ username } ALL=(ALL) NOPASSWD:ALL

# Ref: https://linuxhint.com/setup-sudo-no-password-linux/
# Ref: https://dchesmis.blogspot.com/2018/05/visudosudo.html
```

## 讓 SSH 變得更方便拉
- 修改`.ssh/config`檔案
Host             {{NAME}}
Hostname         x.x.x.x
Port             22
User             admin

alias enter-nas="sshpass -p password ssh -t {{NAME}}"

- ssh-keygen -t rsa -b 4096 > ssh-copy-id 用戶名@遠端伺服器IP地址
- ssh-copy-id 