---
sidebar_position: 1
---
# Basic

## Module
### Subprocess
- run

```python
import subprocess

result = subprocess.run(["ls", "-l"], capture_output=True, text=True)
print(result.stdout)
```
- Popen

```python
import subprocess

process = subprocess.Popen(["ls", "-l"], stdout=subprocess.PIPE, text=True)
output, _ = process.communicate()
print(output)
```
- check_output

```python
import subprocess

output = subprocess.check_output(["ls", "-l"], text=True)
print(output)
```

:::info
golang 類似 subprocess 的模組："os/exec"
- Ref: https://stackoverflow.com/questions/54269243/golang-equivalent-of-creating-a-subprocess-in-python
:::

## Poetry
poetry 套件管理器 教學 https://blog.kyomind.tw/python-poetry/