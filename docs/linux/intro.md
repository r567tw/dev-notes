---
title: Intro
sidebar_position: 1
---

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
