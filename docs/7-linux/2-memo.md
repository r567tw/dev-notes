---
sidebar_position: 2
---
# Memo
:::info
這裡記錄幾個我工作中會常用的指令Memo用，畢竟...我就不喜歡背...
:::

- 查看目前那些port號被佔用
```bash
nc -zv 127.0.0.1 3300-3310 # 快速看 3300~3310 port 能不能被 connected
sudo lsof -PiTCP -sTCP:LISTEN # Mac 用：查看目前哪些port號被用
```

- 清空某個檔案
```
true > .vscode/logs/log 
```

