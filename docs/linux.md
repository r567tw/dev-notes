---
title: Linux
sidebar_position: 5
---

## Process

> 一個在執行中的程式：a program in execution

> Process > Thread > Coroutines

### Concurrency

- Process: 作業系統結構的基礎、是系統進行資源設定和排程的基本單位
- Thread: 程式執行流的最小單位、一般由作業系統控制、由執行緒 id、指令指標、暫存器集合與堆疊組成。有初始化、可執行、執行中、阻塞、銷毀等狀態
- Coroutines: 一種比執行序更小的函數，由程式控制

- process life cycle

```
- new
- ready
- running
- waiting
- terminated
```

## 作業系統為何重要

- 作為作業系統，如何管理硬體資源並為應用程式提供必要的接口。
- 系統呼叫（syscalls）的重要性，以及它們如何使開發人員能夠有效地與底層硬體交互。

## 核心模組

- `uname -a`
- cat /proc/version
- sysctl -a|less
- /etc/sysctl.conf
- modinfo
- lsmod
- modprobe -a / -r

## 工作排程

- cron /crontab / `/etc/crontab`
- crontab -e
- rc /etc/init.d/rc
- apt-get install rcconf
- rcconf

## 系統呼叫範例

```
id --user                   # 獲取當前用戶的用戶ID。
cat /proc/version           # 顯示Linux核心的版本信息。
cat /proc/cpuinfo           # 提供CPU的詳細信息。
```

## 核心

- 架構：硬體、核心、使用者空間

- CPU 架構: x86 架構、arm 架構、risc-v 架構

```

lscpu # 顯示 CPU 架構的詳細信息，如核心數、每個核心的速度、CPU 家族等。
ps -j # 顯示當前系統進程的資訊，並以工作群組形式呈現。
grep MemTotal /proc/meminfo # 從 `/proc/meminfo` 提取總記憶體（RAM）信息。
grep VmallocTotal /proc/meminfo # 從 `/proc/meminfo` 中提取虛擬記憶體的總量信息。
grep Huge /proc/meminfo # 從 `/proc/meminfo` 提取大頁面（HugePages）信息。
ip link # 列出所有網絡接口信息，包括狀態、MAC 地址等。
ip route # 顯示路由表，了解數據包的路由方式。
ls -al /sys/devices/ # 列出 `/sys/devices/` 下的檔案和子目錄及其詳細信息。
mount # 顯示當前掛載的檔案系統列表，包括裝置名、掛載點、檔案系統類型等。
strace ls # 追踪 `ls` 指令的系統呼叫和訊號，用於除錯或分析程式行為。
uname -srm # 顯示核心名稱、釋出和硬體名稱，獲取系統基本信息。

```

- 核心元件：程序管理、記憶體管理、網路功能、檔案系統、管理字元裝置與其驅動程式
- 使用者領域 和核心元件之介面: `syscall`

## Shells 與 Scripting

- 對自動化的諷刺(https://oreil.ly/GSKUb)
- https://xkcd.com/1319/

## 快速導覽

```

📁 root: 系統管理員家目錄
📁 boot: 核心映像檔
📁 etc: 系統設定檔
📁 home: 使用者家目錄
📁 mnt: 裝置掛載點
📁 proc: 核心程序
📁 sys: 系統硬體相關資訊
📁 dev: 特定裝置檔案
📁 bin、sbin : 二進位檔案
📁 lib: 函式庫
📁 usr: 使用者相關設定檔 `/usr/sbin`,`/usr/bin`,`/usr/lib`

```

<!-- aircrack-ng 無線破解工具 -->

## 命令

### sed

參考： https://officeguide.cc/linux-sed-delete-first-last-specific-line-tutorial-examples/

### Xargs

參考： https://blog.gtwang.org/linux/xargs-command-examples-in-linux-unix/

### time

https://www.runoob.com/linux/linux-comm-time.html

### whoami

### pwd

### cd

### locate

### whereis

### which

### find

### grep

### cat

### touch

### mkdir

### rmdir

### rm

### head less tail nl more

### patch

撰寫 patch 檔案以修改原檔

### ip addr

> 通常會有 lo 和 ens5 兩種網卡，lo 是給本地端使用

### ping

```

用來檢測某一台主機是否可抵達 (reachable)，也可以計算往返時間 (Round Trip Time RTT) 和網路封包雕師率

實際運作原理：發送 ICMP 回應請求到目標主機，目標主機會回傳 ICMP 回應封包

```

> 通常有回應就是 reachable , 不過沒有結果不一定表示主機完全不可達，可能只是防火墻擋掉了 ICMP 封包

### nc

一個用於讀寫通過網絡連接的數據的工具，它通常用於建立 TCP/UDP 連接。要使用 nc 成功地建立連接，你需要知道目標主機的 IP 地址或主機名以及開放的端口號。這與 .pid 文件中的信息不相關。

### tee

### rsync

### ps

```

process status 的縮寫。

- a all
- u user
- x 列出沒有控制終端機的 process

```

### 概念：pipe

- 例如：`ps aux|grep ash`
- 通常用 `|` 表示
- jobs
- fg
- bg

<!-- ps -aux thread 測底搞懂 program , process ,thread https://www.796t.com/content/1527709011.html
https://totoroliu.medium.com/program-process-thread-%E5%B7%AE%E7%95%B0-4a360c7345e5 -->
<!-- - top
- nice
- kill
- & 和 fg -->

## Memo

:::info
這裡記錄幾個我工作中會常用的指令 Memo 用，畢竟...我就不喜歡背...
:::

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
