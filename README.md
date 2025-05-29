# 🕒 ForgeScheduler

**ForgeScheduler** is a simple but powerful scheduler built for [ForgeScript](https://github.com/tryforge/forgescript). It lets you create, pause, resume, and manage scheduled tasks directly inside your ForgeScript bot with native functions.

---

## 📦 Installation

```bash
npm install https://github.com/zack-911/forgescheduler/tree/dev
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

## 💻 Commands

Here’s the structure of all available native functions:

```markdown
📂 functions
├── 📂 control/
│   ├── pauseAllSchedules.ts
│   ├── pauseSchedule.ts
│   ├── resumeAllSchedules.ts
│   └── resumeSchedule.ts
├── 📂 manage/
│   ├── deleteSchedule.ts
│   ├── listSchedules.ts
│   └── startSchedule.ts
└── 📂 stats/
    ├── activeSchedules.ts
    ├── allScheduleDetails.ts
    ├── isSchedulePaused.ts
    ├── pausedSchedules.ts
    ├── scheduleDetails.ts
    ├── scheduleExists.ts
    ├── scheduleNextRun.ts
    └── scheduleRunCount.ts
```

Each one is a native ForgeScript function you can call directly in your scripts.

---

## 🧠 Example

```plaintext
$startSchedule[myJob; 1m; $sendMessage[general; Hello every 60s!]]
```

Then you can:

```plaintext
$scheduleRunCount[myJob]
$pauseSchedule[myJob]
$resumeSchedule[myJob]
$scheduleDetails[myJob]
```

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