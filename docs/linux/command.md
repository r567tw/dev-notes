---
title: Commands
sidebar_position: 2
---

- printenv
- echo $PATH
- cat
- ls
- cp
- mv
- touch
- rm
- echo
- cd
- mkdir
- rmdir
- grep
- less / more
- pwd
- diff
- file
- find 和 locate
- head 和 tail
- sort
- ps

## 程序、監控相關

- ps
- top
- lsof
- strace
- uptime
- vmstat
- iostat
- pidstat

## 網路

- ip address show
- ip route show
- ping (發出 ICMP echo 請求)
- host
- /etc/hosts
- telnet
- curl
- lsof

## Shell Script 工具

- basename：取得檔案名稱（去除路徑）

```bash
basename /path/to/file.txt # file.txt
```

- awk：文字處理工具，常用來切割欄位、做條件判斷

```bash
echo "a b c" | awk '{print $2}' # b
```

- sed：文字取代、插入、刪除等操作工具

```bash
echo "hello" | sed 's/hello/world/' # world
```

- xargs：將標準輸入轉為命令列參數

```bash
echo "file.txt" | xargs rm # 執行 rm file.txt
```

- expr：進行整數運算或字串處理

```bash
expr 1 + 2 # 3
```

- exec：用來執行命令並取代目前的 shell 程序

```bash
exec ls # 直接執行 ls，不返回原 shell
```

## rsync

```bash
rsync [選項] 源目錄 目標目錄
rsync -av source/ destination/
rsync -av --exclude="*.log" source/ destination/
rsync -av --exclude="cache/" source/ destination/
rsync -av source/ user@remote_host:/path/to/destination/
rsync -av user@remote_host:/path/to/source/ destination/
rsync -av --delete source/ destination/
rsync -avz --progress source/ user@remote_host:/path/to/destination/
rsync -av --dry-run source/ destination/
rsync -av -e "ssh -p 2222" source/ user@remote_host:/path/to/destination/
```
