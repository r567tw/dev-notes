---
title: RabbitMQ筆記
date: '2022-11-02 20:47:20+08:00'
tags:
- rabbitmq
- python
---

# Dockerfile

```
Send.py

#!/usr/bin/env python
import pika

connection = pika.BlockingConnection(pika.ConnectionParameters('10.10.80.234'))
channel = connection.channel()

channel.queue_declare(queue='epd_handler')

result = channel.basic_publish(exchange='',
                               routing_key='epd_handler',
                               body='{"hello": "world"}')
print(result)
# print(" [x] Sent 'Hello World!'")


connection.close()
```

```
Receive.py
import pika

connection = pika.BlockingConnection(pika.ConnectionParameters('10.10.80.234'))
channel = connection.channel()

channel.queue_declare(queue='hello')


def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)


channel.basic_consume(queue='hello',
                      auto_ack=True,
                      on_message_callback=callback)

print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()


```
