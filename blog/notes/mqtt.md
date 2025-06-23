---
title: MQTT筆記
date: '2023-01-01 20:47:20+08:00'
tags:
- mqtt
- python
---
# 什麼是 MQTT ？
一種在應用層的比HTTP還輕量之通訊協議，常常被物聯網所使用。至於他的核心在於有一個名詞名為`Broker`，負責讓大家`subscribe`和`publish`。

作為 Client 端一旦與這個`Broker`連結之後，他可以`sub`也可以`pub`。


# 使用 Dockerfile 起 MQTT Broker
其實網路上有很多教學再告訴你怎麼架設一個 MQTT Broker, 目前市面上分佈最廣的的是開源專案：`Mosquitto`, 不過我這裡為了方便示例與教學，就使用`Dockerfile`來快速啟動，而他也是`Mosquitto` 提供的image。
```bash
$ docker run -it -p 1883:1883 -p 9001:9001 -v mosquitto.conf:/mosquitto/config/mosquitto.conf -v /mosquitto/data -v /mosquitto/log eclipse-mosquitto
```

# Let's Try MQTT, 以 Python 為例
我們這邊就需要有人去訂閱以及發布它，建立兩個`python`檔案分別做`subscribe`和`publish`
建立`subscribe.py`
```python
# encoding: utf-8
import paho.mqtt.client as mqtt

# 當地端程式連線伺服器得到回應時，要做的動作
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

def on_message(client, userdata, msg):
    print(msg.topic+" " + str(msg.payload))


client = mqtt.Client()

client.on_connect = on_connect
client.on_message = on_message


client.connect("localhost", 1883)

client.subscribe('ack')
client.loop_forever()
```

建立`publish.py`
```python
import paho.mqtt.client as mqtt

# 建立 MQTT Client 物件
client = mqtt.Client()

# 設定登入帳號密碼（若無則可省略）
# client.username_pw_set("myuser","mypassword")

# 連線至 MQTT 伺服器（伺服器位址,連接埠）
client.connect("localhost", 1883)

client.publish("ack","Hello World")
```

然後讓我們先在終端機上面執行`subscribe.py` : `python subscribe.py`
之後再開一個新終端機或者另一個tab執行`publish.py`: `python publish.py`
之後你會在`subscribe.py`那個畫面看到`publish`的訊息喔

啊`publish`不只是可以傳送文字、也可以傳送`bytearray`，當`sub`端接收到這些`bytearray`時就可以實現建立檔案，這樣 MQTT 也可以傳送檔案了。

# 關於 MQTT & Security 
至於 MQTT 肯定是要考慮一些安全的部分。老實講我在`MQTT`是個初心者。。。

但有上網找到這一篇文章，值得大家參考
[[物聯網協定與資安的距離] MQTT 通訊協定淺談](https://medium.com/h1dra-security-team/%E7%89%A9%E8%81%AF%E7%B6%B2%E5%8D%94%E5%AE%9A%E8%88%87%E8%B3%87%E5%AE%89%E7%9A%84%E8%B7%9D%E9%9B%A2-mqtt-%E9%80%9A%E8%A8%8A%E5%8D%94%E5%AE%9A%E6%B7%BA%E8%AB%87-52d76ddc6ce6)

:::success
第一次碰 MQTT 耶
:::
