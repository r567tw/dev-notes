---
sidebar_position: 3
---
# Network
# 入門篇
什麼是網路：簡單有「網」與「路」，其實網路在早期台灣政府組織的規劃中，是被規劃在「交通部」的業務範圍呢...（不知道現在還是不是）

簡單來說兩個電腦要溝通，就形成路。很多的電腦要一起溝通，就形成網。所以這就是「網路」

通訊協定：裡面採用各式各樣的「階層」，是為了能將複雜的東西簡單化、越下層是越簡單、越共同的，越上層的則是越複雜、越個別功能

LAN(區域網路,自行架設) vs WAN(廣域網路,業者)
網際網路不等於WAN, 但網際網路用到WAN

封包Packet：把資料切割成固定的單位並加上header
# OSI 七層篇
介面層(實體層：路由,switch)->網路層(IP)->傳輸層(TCP/UDP)->應用層(HTTP)

1.實體層 乙太網路硬體
2.資料鏈結層 乙太網路控制模組
3.網路層 IP
4.傳送層 TCP/UDP
5.會談層
6.表現層
7.應用層
應用程式：會談、表現、應用

# TCP/IP 篇
- 網路介面層：乙太網路 ARP RARP MAC位址 WIFI PPP PPPoE=> 實體＋資料鏈結
為直接連結的電腦互相建立連線
- 網路層：IP ICMP 路由
及所謂的網路架構。也就是多個網路連結起來、以便進行封包處理作業
- 傳輸層: TCP 高可靠性,三向交握/UDP 迅速性
根據網路層為任意兩個端點提供的通訊功能，建立一個特別性符合網路使用之目的通訊作業
- 應用層: HTTP /RTP(影音串流) / POP3 / IMAP / FTP /DNS=>會談、表現、應用


TCP: 
->SYN
<-SYN+ACK
-> ACK

-> FIN
<- FIN+ACK
-> ACK
https://ithelp.ithome.com.tw/articles/10280652

概念較為簡單、普及率高

各階層處理作業＆封包之間關係

IP位址：網路透過IP協定識別每一台電腦的一列編號，由ICANN管理
由4個數字組合

連結埠號

公用IP vs 私有IP(內部網路)
    Class A 10.0.0.0 ~ 10.255.255.255
    Class B 172.16.0.0 ~172.31.255.255
    Class C 192.168.0.0 ~ 192.168.255.255

IPV4 v.s IPV6 ：32位二進制數所組成，「左半部」識別網路、「右半部」識別主機
NAPT 位址轉換技術

子網路遮罩： 可根據IP位址與他做AND運算來查詢網路位址

集線器、交換器
路由器
路由：路由器傳送封包的過程稱之為路由，分為靜態路由與動態路由
路由協定 IGP內部 , EGP外部
DHCP
NAT /NAPT: 轉換位址,使用公用IP表明身份

# 深入淺出 DNS
A
MX
TEXT
CNAME

# 第三章TCP/IP架構
VLSM 可變長度子網路遮罩
CIDR 無類別網域間路由, CIDR表示法
MAC位址
ARP:Address Resolution Protocol:位址解析通訊協議,將IP位址分析出MAC位址

網域名稱

# 好用指令
Windows
ping, nslookup Name, tracert Name, ipconfig /all ,Route print
MAC
ping dig/dig-x IP/nslookup Name,traceroute NAme,ip a , ifconfig -a, ip r route

# 第四章 網路設備及虛擬化
SDN
OpenFlow

# 第六章 
資安三要素：機密性、可用性、完整性
DMZ: 隔離區
IDS: 入侵偵測系統
IPS：入侵防禦系統
UTM: 整合式威脅管理的設備



# Socket 篇
Socket 是一種處理程序呼叫的機制，一種抽象層實作。
Socket 為應用程式隱藏TCP/IP網路傳輸層及以下的網路細節
## TCP
```python
# client.py 
import socket

host = '127.0.0.1'
port = 3434

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((host, port))

data = s.recv(1024)
print(f'Received: {data}')
s.close()
```

```python
# server.py 
import socket
import datetime

host = '0.0.0.0'
port = 3434

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((host, port))
s.listen(1)

while True:
    conn, addr = s.accept()
    print(f'Client {str(addr)} connect')
    dt = datetime.datetime.now()
    message = f'Now: {str(dt)}'
    conn.send(message.encode('utf-8'))
    # print(f'sent : {message}')
    conn.close()
```

## UDP
```python
# client.py
import socket

host = '127.0.0.1'
port = 3434

s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

data = 'Hello World'
s.sendto(data.encode('utf-8'), (host, port))
s.close()

```

```python
# server.py
import socket
import datetime

host = '0.0.0.0'
port = 3434

s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.bind((host, port))

while True:
    data, addr = s.recvfrom(1024)
    print(f'Received {data} from {str(addr)}')

s.close()

```


# OpenSSL

# Web 伺服器實現呼叫介面標準
## CGI
允許WEB伺服器執行外部程式，將他們輸出發送給瀏覽器
## ISAGI
微軟提供的網路服務器標準介面
## WSGI
為Python 語言制定的網路服務器標準介面
## ASGI

# Linux 基本網路
- ifconfig / ifconfig eth0 192.168.181.115
- iwconfig
- dhclient
- dig

# Linux 網路安全與匿名
- traceroute google.com
- tor 路由器：匿名IP
- proxy
- proxychains
    - /etc/proxychains.conf
- VPN
- ProtonMail

# Linux 無線網路
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

# Docker Container Network篇
```sh
docker network create {{name}}
```

container 模式：
Ref： 
- https://ithelp.ithome.com.tw/articles/10193457
- https://www.hwchiu.com/docker-network-model.html
- https://www.hwchiu.com/docker-network-model-lab.html
- https://www.hwchiu.com/docker-network-model-snat.html
- https://www.hwchiu.com/docker-network-model-lab-dnat.html

<!-- 
最好能照上面, 實作操作過
按照順序看這 1~4篇

特別是第 2 篇
要有能力按照步驟做完且完全理解
=>
建出 bridge
建出 virtual 網卡 vethx
把 vethx 黏到 container 端
把 vethx 綁定到剛建立的 bridge
設定 container IP

另外,第 3 篇一樣重要

要了解封包 從 container -> host ethx -> 外部網路 的原因
也要了解封包 從外部網路 -> host ethx -> 轉進 container 內 的原因 -->