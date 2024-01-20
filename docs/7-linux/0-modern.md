---
sidebar_position: 1
---

## 簡介
> 本章節將介紹Linux在現代化環境中的角色，包括它如何適應行動裝置、雲端運算和物聯網的需求，以及其在處理器架構多樣化中的重要性。

### 何謂現代化環境
- 行動裝置
- 雲端運算
- 物聯網
- 處理器架構多樣化

### 作業系統為何重要
- 作為作業系統，如何管理硬體資源並為應用程式提供必要的接口。
- 系統呼叫（syscalls）的重要性，以及它們如何使開發人員能夠有效地與底層硬體交互。

### 系統呼叫範例
```
id --user                   # 獲取當前用戶的用戶ID。
cat /proc/version           # 顯示Linux核心的版本信息。
cat /proc/cpuinfo           # 提供CPU的詳細信息。
```

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
- https://xkcd.com/1319/

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

## 存取控制
> ownership 所有權

### 基礎
- 資源和所有權
```
使用者->啟動->程序->使用->檔案 使用者->擁有->檔案
```
- 系統使用者/系統帳號(程式提供的服務也是這種,像是mysql、sshd) 和 一般使用者
```
UID 0 root
UID 1 to 999 系統使用者
UID 65534 nobody
UID 1000 ~ 65533 , 65533 到 4294967294 一般使用者

$ id -u
```

### 在本地端管理使用者
- /etc/passwd 使用者資料庫
- /etc/group 群組資料庫
- /etc/shadow 使用者密碼
- /etc/gshadow 群組密碼
```
sudo adduser mh9
```

### 權限
- 使用者、群組、其他
- 讀取、寫入、執行
```
chmod +x /tmp/masktest
```

## 檔案系統
- 一切皆檔案
```
lsblk --exclude 7
findmnt -D -t nosquashfs
stat myfile
ln myfile somealias
ln -s myfile somealias
```

- VFS 虛擬檔案系統
- LVM 邏輯卷冊管理工具

## 應用程式、套件管理與容器
- 開機流程
- systemd、systemctl
- Linux 應用程式供應鏈
- 套件與套件管理工具
- namespaces、cgroups

## 網路功能
### 基礎
- 使用者空間：瀏覽器、ip、ssh、dig、ping、arp、email
- 核心空間：sockets、TCP/UDP、IP、ICMP、驅動程式
- 硬體：網路卡、無線

### TCP/IP
- 封包：header 加 header
- 連結層、網際網路層、傳輸層、應用層
```
ifconfig
ip link show
ip addr show
ping mhausenblas.info
sudo route -n
traceroute mhausenblas.info
```
- CIDR 表示法、ipv4、ipv6

- 保留位址
```
127.0.0.0
169.254.0.0/16 (169.254.0.0~169.254.255.255)
224.0.0.0/24 (224.0.0.0 ~ 239.255.255.255)
```

- 私有位址
```
10/8 (10.0.0.0 ~ 10.255.255.255)
172.16/12 (172.16.0.0 ~ 172.31.255.255)
192.168/16 (192.168.0.0.0 ~ 192.168.255.255)
```

- DNS

## 可觀測性
- 找出程序消耗多少記憶體
- 磁碟空間多快耗盡
- 基於安全事件、對某個自訂事件示警

### 策略
- OODA 觀察、定向、決策、行動
```
ls -al /var/log
uptime
free -h
vmstat 1
```



## 其他
- Lima: https://github.com/lima-vm/lima