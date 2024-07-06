---
title: Linux
sidebar_position: 4
---
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

## 套件
- apt-get install/upgrade/remove
- /etc/apt/source.list

## 授予權限
- chown
- chgrp
- chmod

## 管理使用者環境變數
- `env` , `set |more`
- echo $PATH
- `export`



## 壓縮
- tar -cvf xx.tar a b c
- tar -tvf xx.tar
- tar -xvf xx.tar / tar -xf xx.tar
```
打包壓縮與解壓縮
//tar 指令
tar -cvf data.tar * // 將目錄下所有檔案包蟲 data.tar
tar -cvzf data.tar.gz *
tar -tvf data.tar// 檢視 data.tar 有哪些檔案
tar -xvf data.tar// 解壓縮

//zip 指令
zip myfiles *.txt
zip myfiles *.txt  *.jpg
zip -g myfiles data2/*.log
unzip myfiles.zip
unzip myfiles.zip -dmydir

//gzip,gunzip 指令
```

## 管理檔案系統
- fdisk -l
- lsblk
- mount : mount /dev/sdb1 /mnt
- umount
- fsck

## 日誌
- locate rsyslog
- logrotate
- /etc/rsyslog.conf /etc/logrotate.conf
- shred {{file}} shred -f -n 10 /var/log/auth.log.*
- service rsyslog stop

## 服務
- service servicename start|stop|restart

### apache
- apt-get install apache2
- services apache2 start

### openssh
- service ssh start

### mysql
- service mysql start

### postgresql
- apt-get postgres install
- service postgresql start

### 核心模組
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

## RootFS
- root file system

## Process
> 一個在執行中的程式：a program in execution

- process life cycle
```
- new
- ready
- running
- waiting
- terminated
```

## Host a static page on Ubuntu
```sh
sudo apt update
sudo apt install nginx
# 啟動 Nginx 服務
sudo systemctl start nginx

# 設定 Nginx 隨系統啟動
sudo systemctl enable nginx 
sudo ufw allow 'Nginx Full'

# 以上指令就有 Nginx 基本 設定

# 以下指令客製資料夾
mkdir -p /var/www/mywebsite
vim /etc/nginx/sites-available/mywebsite
ln -s /etc/nginx/sites-available/mywebsite /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

- 在 nginx.conf 裡
```
server {
    listen 80;
    server_name example.com;

    root /var/www/mywebsite;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}

```

## 其他

好用的 sed
參考： https://officeguide.cc/linux-sed-delete-first-last-specific-line-tutorial-examples/

好用的 Xargs 指令
參考： https://blog.gtwang.org/linux/xargs-command-examples-in-linux-unix/

time
https://www.runoob.com/linux/linux-comm-time.html

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


# Job
```bash
$ jobs -l
$ fg
$ bg
$ {command} & # 將命令放在背景執行
$ fg %1 # 將背景第一個命令放回前景執行
```




Ref:
- [https://dinos80152.wordpress.com/2015/03/04/linux-切換-process-至背景或前景作業-ctrl-z/](https://dinos80152.wordpress.com/2015/03/04/linux-%E5%88%87%E6%8F%9B-process-%E8%87%B3%E8%83%8C%E6%99%AF%E6%88%96%E5%89%8D%E6%99%AF%E4%BD%9C%E6%A5%AD-ctrl-z/)
- [https://ehlxr.me/2017/01/18/Linux-中-fg、bg、jobs、-指令/](https://ehlxr.me/2017/01/18/Linux-%E4%B8%AD-fg%E3%80%81bg%E3%80%81jobs%E3%80%81-%E6%8C%87%E4%BB%A4/)

# Network
## Basic
- ifconfig / ifconfig eth0 192.168.181.115
- iwconfig
- dhclient
- dig

## Linux 網路安全與匿名
- traceroute google.com
- tor 路由器：匿名IP
- proxy
- proxychains
    - /etc/proxychains.conf
- VPN
- ProtonMail

## Linux 無線網路
- AP 無線存取點、ESSID 擴充服務設定識別馬、BSSID 基本服務設定識別馬、SSID 服務設定識別馬
- 頻道
- 功率：越靠近越大但也越容易被破解
- 安全協定： 安全程度 WPA2-PSK > WPA > WEP
- ifconfig / wlan0
- iwconfig / iwlist
- nmcli

# 藍芽
- apt-get install bluez
- hciconfig , hcitool
- l2ping

# Commands

## 基本指令
### pwd
print working directory

### ls
- a: all 列出所有檔案，包含隱藏檔，在 linux 通常以 `.` 開頭
- l: 以長格式列出檔案資訊，可搭配 -h 讓檔案大小易讀
- S: 按大小排序
- t: 按照檔案修改時間排序

### mount
掛載儲存設備或者檔案系統到這棵樹上的某一個目錄
```
mount -t type device dir
```

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


## 網路相關
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


## 程序管理類
### 概念：pipe
- 例如：`ps aux|grep ash`
- 通常用 `|` 表示
- jobs
- fg
- bg

### ps 
```
process status 的縮寫。
- a all
- u user
- x 列出沒有控制終端機的 process
```
<!-- ps -aux thread 測底搞懂 program , process ,thread https://www.796t.com/content/1527709011.html
https://totoroliu.medium.com/program-process-thread-%E5%B7%AE%E7%95%B0-4a360c7345e5 -->
<!-- - top
- nice
- kill
- & 和 fg -->

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