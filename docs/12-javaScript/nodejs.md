---
sidebar_position: 1
---

# NodeJS
## First App

```javascript title="app.js"
console.log("Hello World")
```
- 使用`fs`
```javascript title="app.js"
const fs = require("fs")
fs.writeFileSync("sample.txt", "Hello World!")
```