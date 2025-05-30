# 🕒 ForgeScheduler

**ForgeScheduler** is a simple but powerful scheduler built for [ForgeScript](https://github.com/tryforge/forgescript). It lets you create, pause, resume, and manage scheduled tasks directly inside your ForgeScript bot with native functions.

---

## 📦 Installation

```bash
npm install https://github.com/zack-911/forgescheduler
```

---

## 🚀 Usage

In your `index.js` or wherever you initialize the ForgeScript client:

```js
import { ForgeScheduler } from "forgescheduler"

// Your other imports...

const client = new ForgeClient({
  extensions: [
    new ForgeScheduler()
  ]
})
```

And you're good to go! 💥

---

## ✅ Features

* Fully in-memory schedule storage
* Pause/resume individual or all schedules
* Track schedule uptime, run counts, and next run times
* Easy to extend and manage

---

## 🙋 Support

Need help? Have ideas? Open an issue or reach out to me on discord in the official forgescript discord server.

---