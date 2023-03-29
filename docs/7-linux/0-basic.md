---
sidebar_position: 1
---
# Basic
## 快速導覽
- root 系統管理員家目錄
- boot 核心映像檔
- etc 系統設定檔
- home 使用者家目錄
- mnt 一班裝置掛載點
- proc 核心程序
- sys 系統硬體相關資訊
- dev 特定裝置檔案
- bin , sbin 二進位
- lib 函式庫
- /usr => /usr/sbin, /usr/bin ,/usr/lib

## 基本指令
- whoami
- pwd
- cd
- locate
- whereis
- which
- find
- grep
- cat
- touch
- mkdir
- rmdir
- rm
- head less tail nl more

aircrack-ng 無線破解工具
## 套件
- apt-get install/upgrade/remove
- /etc/apt/source.list

## 授予權限
- chown
- chgrp
- chmod

## 程序管理
- ps -aux
- top
- nice
- kill
- & 和 fg


## 管理使用者環境變數
- `env` , `set |more`
- echo $PATH
- `export`



## 壓縮
- tar -cvf xx.tar a b c
- tar -tvf xx.tar
- tar -xvf xx.tar / tar -xf xx.tar

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
- shred <file> shred -f -n 10 /var/log/auth.log.*
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

好用的sed
參考： https://officeguide.cc/linux-sed-delete-first-last-specific-line-tutorial-examples/

好用的 Xargs 指令
參考： https://blog.gtwang.org/linux/xargs-command-examples-in-linux-unix/

time
https://www.runoob.com/linux/linux-comm-time.html

## ssh
https://codecharms.me/posts/security-ssh 
https://liedward.com/create-ssh-keys/ 

ssh-copy-id -i ~/.ssh/id_rsa.pub {USER}@{SERVER}

### 讓 SSH 變得更方便拉
Host             {{NAME}}
Hostname         x.x.x.x
Port             22
User             admin

alias enter-nas="sshpass -p password ssh -t {{NAME}}"