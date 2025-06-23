---
title: Python Paramiko 筆記
date: '2021-02-06 11:05:00+00:00'
tags:
- python
- paramiko
---
在以前公司工作的時候，有點忘了是遇到什麼情境，總之我就看到Python 有這樣的一個套件庫：`Paramiko`

話不多說，我們就給大家來看文件吧：http://www.paramiko.org/

然後就結束這一回合（阿不是！

他是一個和SSH 有關的套件庫，是可以使用Python 直接在遠端給他執行程式起來... 啊寫文章的同時我就想到了！之前我們好像是要做那個資料庫備份什麼的, 然後有發現說有時server 會不夠空間backup , 所以後來我就用這個套件透過本機去連結遠端執行  `df -h` 的指令，以方便告訴我到底有沒有足夠的空間這樣.... 不然每次連線打指令實在很麻煩...

然後 , 我最喜歡的是： show you the code !
```python
import paramiko

paramiko.util.log_to_file('paramilo.log')
key = paramiko.RSAKey.from_private_key_file("pem path...")

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(hostname='......',username='user',pkey=key)

stdin, stdout, stderr = ssh.exec_command('df -h')

result = open('log.txt','wb')
result.write(stdout.read())
result.close()

ssh.close()
```
> 小君曰：我到底寫了什麼...?