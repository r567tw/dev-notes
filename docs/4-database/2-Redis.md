---
sidebar_position: 2
---
# Redis
## Basic
### Key-Value

```bash
keys *
set name "jimmy"
set name "jimmy" NX
get name 
append name "hello"
incr key
decr key
incrby key n
decrby key n
del key
```

### Hash
```bash
hset key field value
hmset key field value [field2 value2]
hget key field
hmget key field1 [field2]
hgetall key
HEXISTS key field
hlen key
```

### List
```
lpush key value
rpush key value
llen key
lrange key [begin] [end]
lpop key
rpop key
```
