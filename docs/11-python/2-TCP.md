---
sidebar_position: 2
---

# TCP
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
