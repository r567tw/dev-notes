---
title: Linux
sidebar_position: 5
---

## intro

> process: 電腦中執行的程式
> Process > Thread > Coroutines

1. user processes (user mode or kernel mode) / user space
2. linux kernel
3. hardware

## shell

## command

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
