---
sidebar_position: 1
---
# Basic
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


## 其他

好用的 sed
參考： https://officeguide.cc/linux-sed-delete-first-last-specific-line-tutorial-examples/

好用的 Xargs 指令
參考： https://blog.gtwang.org/linux/xargs-command-examples-in-linux-unix/

time
https://www.runoob.com/linux/linux-comm-time.html