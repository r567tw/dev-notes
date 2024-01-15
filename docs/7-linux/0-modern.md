---
sidebar_position: 1
---

## 簡介
### 何謂現代化環境
- 行動裝置
- 雲端運算
- 物聯網
- 處理器架構多樣化

### 作業系統為何重要
- 如果沒有作業系統，那麼可能一切靠自己：不論是記憶體裝置、中斷處理、與I/O交談、管理檔案...
- 將各種硬體抽象化、為我們提供 API
- system calls (syscalls)
```
id --user
cat /proc/version
cat /proc/cpuinfo
```

### 高空鳥瞰 Linux
- 核心
- Shells
- 存取控制
- 檔案系統
- 應用程式
- 網路功能
- 可觀測性
- 進階題材

## 核心
- 架構：硬體、核心、使用者空間

- CPU 架構: x86架構、arm 架構、risc-v 架構
```
lscpu  # 顯示 CPU 架構的詳細信息，如核心數、每個核心的速度、CPU 家族等。
ps -j  # 顯示當前系統進程的資訊，並以工作群組形式呈現。
grep MemTotal /proc/meminfo  # 從 `/proc/meminfo` 提取總記憶體（RAM）信息。
grep VmallocTotal /proc/meminfo  # 從 `/proc/meminfo` 中提取虛擬記憶體的總量信息。
grep Huge /proc/meminfo  # 從 `/proc/meminfo` 提取大頁面（HugePages）信息。
ip link  # 列出所有網絡接口信息，包括狀態、MAC 地址等。
ip route  # 顯示路由表，了解數據包的路由方式。
ls -al /sys/devices/  # 列出 `/sys/devices/` 下的檔案和子目錄及其詳細信息。
mount  # 顯示當前掛載的檔案系統列表，包括裝置名、掛載點、檔案系統類型等。
strace ls  # 追踪 `ls` 指令的系統呼叫和訊號，用於除錯或分析程式行為。
uname -srm  # 顯示核心名稱、釋出和硬體名稱，獲取系統基本信息。
```
- 核心元件：程序管理、記憶體管理、網路功能、檔案系統、管理字元裝置與其驅動程式
- 使用者領域 和核心元件之介面: `syscall`

## Shells 與 Scripting
- 對自動化的諷刺(https://oreil.ly/GSKUb)

### Basic
#### Terminal
#### Shells
```
file -h /bin/sh
echo $0
echo $SHELL
```
#### I/O
- stdin
- stdout
- stderr
```
curl https://example.com &> /dev/null
curl https://example.com > /tmp/content.txt 2>/tmp/curl-status
```

- 特殊字元：`&` 放在背景端執行、`\` 延續下一行命令、`|` 管線，把一個程序的stdout 串接道下一個程序的stdin
```
curl https://example.com 2> /dev/null | \
wc -l 
```
- 變數：環境變數、Shell變數
```
set MY_VAR=42
set
env
```

### Scripting
- 良好的實務習慣：盡快清楚地回報故障、敏感資訊、糾正輸入、檢查相依性、錯誤處理、文件、版本控管、測試
