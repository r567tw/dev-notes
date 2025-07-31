---
title: Intro
sidebar_position: 1
---

電腦的硬體資源有三種：CPU、記憶體和 I/O，程序為了獲得這些資源相互競爭，核心則負責分配資源。核心本身也是一種軟體資源，程序通過他建立新的程序並和其他程序通訊

> process: 電腦中執行的程式
> Process > Thread > Coroutines

1. user processes (user mode or kernel mode) / user space
2. linux kernel
3. hardware

## 設備管理

很多 I/O 介面都是以檔案的形式由核心呈現給使用者程序的 這些設備檔案存放在 `/dev` 目錄中

> **SCSI 是一種標準化的資料傳輸協定與設備介面，**用來讓主機與各種儲存裝置（硬碟、磁帶機、光碟機等）之間溝通。它是一種通訊協定（protocol），**不是某一種特定的接頭或硬體**

| 項目               | `/dev`                         | `/sys/devices`                              |
| ------------------ | ------------------------------ | ------------------------------------------- |
| **角色**           | 使用裝置的「介面」             | 查詢/控制裝置的「屬性」                     |
| **建立方式**       | `udev` 動態建立                | 核心在啟動時掛載 `sysfs`                    |
| **內容型態**       | 實體裝置節點（device file）    | 普通檔案與目錄，表示內核資料                |
| **作用層級**       | 應用層（User space）與裝置互動 | 提供核心裝置資訊給 user space               |
| **能不能讀寫資料** | ✅ 可以直接開啟進行資料存取    | ❌ 不可直接當裝置操作，只能查狀態或設定屬性 |
| **常見用途**       | 與硬體互動，如掛載、串列通訊等 | 查裝置型號、驅動、電源狀態等                |

- `udev` 當成整體功能、系統概念
- `udevd`（或新版的 `systemd-udevd`）當作真正執行這個功能的背景程式

> 硬體插入（如 USB） → 核心偵測 → 發出 uevent → udevd 接收 → 比對規則 → 建立 /dev/XXX 節點（並可觸發其他行為）

## 磁碟與檔案系統

- 分割表
- 分割區(FileSystem Data Structures & File Data)

### LVM（Logical Volume Manager）

LVM 是 Linux 的邏輯卷管理機制，可提供比傳統分割更彈性的磁碟管理方式。

#### LVM 的好處：

- 動態調整空間大小（例如線上擴充 /home）
- 整合多顆磁碟成為一個邏輯卷
- 建立快照（snapshot）作為備份用途

#### LVM 架構：

- Physical Volume（PV）：實體磁碟或分割區
- Volume Group（VG）：由多個 PV 組成的群組
- Logical Volume（LV）：從 VG 中切出的邏輯磁碟區

### swap 區（Swap Space）

swap 是一種虛擬記憶體，當系統的實體記憶體（RAM）用完時，系統會把一些資料暫時移到 swap 來釋放 RAM 空間。雖然速度遠慢於 RAM，但在記憶體不足時能避免系統直接當機。

使用形式：

- swap partition：一個專用的磁碟分割區。
- swap file：一個普通的檔案被設定為 swap。

## Linux 核心的啟動

- 簡化版啟動過程

1. BIOS 啟動及載入韌體執行開機載入程式(boot loader)
2. **開機載入程式(boot loader)找到核心的映像檔案，並載入記憶體並啟動**
3. **核心初始化設備及驅動程式**
4. **核心掛載 root 檔案系統 (rootfs)**
5. **核心使用 PID 1 執行 init 程式，使用者空間在此時啟動**
6. init 啟動其他的系統程序
7. init 在整個啟動過程尾聲啟動一個程序，負責允許使用者登入

### Boot loader

- **GRUB**: 只是「啟動」核心不是「使用」核心
- LILO
- SYSLINUX
- LOADLIN
- systemd-boot
- coreboot
- 等等諸多種

## 使用者空間的啟動

1. init (systemd、runit)
2. 基礎底層服務, 例如 udevd 和 syslogd
3. 網路設定
4. 中高層服務, 例如 cron 和列印服務
5. 登入提示字元、GUI 及其他高層的應用程式，像是網頁伺服器軟體

### Systemd

- 採 目標導向（target-based）與 單元化管理（unit-based）設計。
- PID 1 的 systemd 負責整個使用者空間的服務啟動與管理。
- `systemctl`

#### Unit 單元

- systemd 中的每個資源（服務、掛載點、定時任務等）都是一個 unit。
- 常見的 unit 類型
  | 類型 | 副檔名 | 說明 |
  | ------- | ---------- | ------------------- |
  | service | `.service` | 背景服務 |
  | socket | `.socket` | 套接字，與 `.service` 配對 |
  | target | `.target` | 狀態群組，類似舊 runlevel |
  | timer | `.timer` | 定時器，類似 cron |

#### systemctl

```
# 查看目前已啟動的單元（所有類型）
systemctl list-units

# 只列出已啟動的服務
systemctl list-units --type=service

# 查詢某個服務狀態
systemctl status sshd.service

# 啟動 / 停止 / 重啟 / 重載服務
systemctl start nginx.service
systemctl stop nginx.service
systemctl restart nginx.service
systemctl reload nginx.service    # Reload 設定檔（服務需支援）

# 設定是否開機自動啟動
systemctl enable nginx.service
systemctl disable nginx.service
```

## 系統設定日誌、系統時間、批次處理任務和使用者

### 系統日誌（System Logs）

#### syslog

是傳統的日誌系統，支援多種 daemon（如 cron, auth, mail 等）。
設定檔位置：/etc/rsyslog.conf（或 /etc/syslog.conf，依發行版不同）。
預設日誌目錄：/var/log/

常見檔案：

- /var/log/syslog（Ubuntu）
- /var/log/messages（CentOS）
- /var/log/auth.log：登入、sudo 等認證資訊
- /var/log/cron：排程任務執行紀錄

#### journald（systemd 的日誌系統）

使用 systemd-journald 收集所有服務與核心的日誌。

```bash
journalctl             # 查看全部日誌
journalctl -u nginx    # 查看指定單元的日誌
journalctl -b          # 查看本次開機後的日誌
```

### 系統時間與時區設定

1. 檢查時間與時區

```
timedatectl
```

2. 設定時區（以台灣為例）

```
timedatectl set-timezone Asia/Taipei
```

3. 同步 NTP
   啟用自動同步：

```
timedatectl set-ntp true
```

### 批次處理任務（Crontab）

1. 編輯個人 crontab

```
crontab -e
```

2. 查看所有任務

```
crontab -l
```

3. 格式說明

```
- - - - - 指令
│ │ │ │ │
│ │ │ │ └─ 星期幾 (0-7，0 和 7 都是星期日)
│ │ │ └─── 月份 (1-12)
│ │ └───── 日期 (1-31)
│ └─────── 小時 (0-23)
└───────── 分鐘 (0-59)
```

### 使用者與帳號管理

#### 使用者資料位置

- /etc/passwd：使用者帳號資訊（帳號名、UID、GID、shell 路徑等）
- /etc/shadow：使用者密碼資訊（加密儲存）
- /etc/group：群組資料
- /home/USERNAME/：使用者家目錄

2. 基本指令

```
adduser myuser # 新增使用者（含互動式步驟）
userdel myuser # 刪除使用者
usermod -aG sudo myuser # 把使用者加入群組（如 sudo）
id myuser # 查看使用者 UID/GID
```

## 程序與資源利用詳解

### 單執行緒 v.s 多執行緒

- 單執行緒：一個程序只有一條執行路徑，無法同時處理多任務。
- 多執行緒：一個程序內可同時執行多條執行路徑（threads），共享記憶體與資源。
  > 應用場景：I/O 密集適合多執行緒，CPU 密集可能考慮多進程。

注意事項：多執行緒共享資源，需處理同步與鎖的問題。

### 記憶體頁面錯誤（Page Fault）

當程序存取尚未映射到記憶體的頁面時，會觸發 Page Fault。

- Minor Fault：頁面已在記憶體中，只是還未對應給程序。
- Major Fault：頁面不在記憶體中，需從磁碟讀入，耗時較高。

### cgroup（Control Group）

- cgroup 是 Linux 提供的資源限制與隔離機制，可限制 CPU、記憶體、I/O 等資源使用。常用於容器、系統服務資源控管。
- 透過 /sys/fs/cgroup/ 可查看目前的資源分配狀況。

## Shell Script

1. 開頭宣告（Shebang）

```bash
#!/bin/bash
```

告訴系統此腳本使用 /bin/bash 解譯執行。

2. 註解寫法

```bash
# 這是一行註解，用來說明程式邏輯
```

3. 變數宣告與使用

```bash
name="world"
echo "Hello, $name"
```

變數前不用加 $，使用時才加 $。

4. 條件判斷（if）

```bash
if [ "$name" = "world" ]; then
  echo "Hello, world!"
else
  echo "Who are you?"
fi
```

注意中括號要有空格。

5. 判斷式的範例（檔案、數值）

```bash
if [ -f "file.txt" ]; then
  echo "檔案存在"
fi

if [ "$age" -gt 18 ]; then
  echo "成年人"
fi
```

> -f：檢查檔案是否存在
> -gt：greater than，大於

6. 迴圈（for）

```bash
for i in 1 2 3; do
  echo "第 $i 次"
done
```

也可以讀取資料夾內所有檔案：

```bash
for file in *.txt; do
  echo "找到檔案：$file"
done
```

7. 迴圈（while）

```bash
count=1
while [ $count -le 5 ]; do
  echo "第 $count 次"
  count=$((count + 1))
done
```

8. 函式（function）

```bash
say_hello() {
  echo "Hello, $1"
}

say_hello "r567tw"
```

9. 腳本執行方法

```bash
chmod +x script.sh    # 賦予執行權限
./script.sh           # 執行腳本
```

10. case 條件判斷（適合選單或多選項）

```bash
#!/bin/bash

read -p "請輸入選項 (start/stop/restart): " action

case "$action" in
  start)
    echo "服務啟動中..."
    ;;
  stop)
    echo "服務停止中..."
    ;;
  restart)
    echo "服務重新啟動中..."
    ;;
  *)
    echo "未知指令，請輸入 start/stop/restart"
    ;;
esac
```

11. 解析腳本參數（$1, $2, ...）

```bash
#!/bin/bash

echo "第一個參數是：$1"
echo "第二個參數是：$2"
```

```bash
./myscript.sh hello world
# 輸出：
# 第一個參數是：hello
# 第二個參數是：world
```
