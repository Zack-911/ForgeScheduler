# ForgeScheduler Native Functions

## Control

### $pauseAllSchedules (v1.0.0)
Pauses all active schedules.

**Returns:** `Boolean`
**Brackets:** `false`
**Unwrap:** `false`

### $pauseSchedule (v1.0.0)
Pauses an active schedule.

**Arguments:**

- `jobID` (String, required) - The jobID of the schedule to pause.

**Returns:** `Boolean`
**Brackets:** `true`
**Unwrap:** `true`

### $resumeAllSchedules (v1.0.0)
Resumes all paused schedules.

**Returns:** `Boolean`
**Brackets:** `false`
**Unwrap:** `false`

### $resumeSchedule (v1.0.0)
Resumes a paused schedule.

**Arguments:**

- `jobID` (String, required) - The jobID of the schedule to resume.

**Returns:** `Boolean`
**Brackets:** `true`
**Unwrap:** `true`

## Manage

### $deleteAllSchedules (v1.1.0)
Deletes all schedules

**Returns:** `Boolean`
**Brackets:** `false`
**Unwrap:** `false`

### $deleteSchedule (v1.0.0)
Deletes a schedule and clears its interval.

**Arguments:**

- `jobID` (String, required) - The jobID of the schedule to delete.

**Returns:** `Boolean`
**Brackets:** `true`
**Unwrap:** `true`

### $deleteScheduleIn (v1.1.0)
Deletes a schedule after a delay

**Arguments:**

- `jobID` (String, required) - Schedule ID to delete
- `delay` (Time, required) - Delay time before deletion

**Returns:** `Boolean`
**Brackets:** `true`
**Unwrap:** `true`

### $editSchedule (v1.1.0)
Edits an existing interval schedule's code and/or time unless marked uneditable.

**Arguments:**

- `jobID` (String, required) - The ID of the schedule to edit
- `time` (Time, optional) - New time interval (optional)
- `code` (String, optional) - New code to run (optional)

**Returns:** `Boolean`
**Brackets:** `true`
**Unwrap:** `false`

### $listSchedules (v1.0.0)
Returns a JSON array of all active schedule jobIDs.

**Returns:** `String`
**Brackets:** `false`
**Unwrap:** `false`

### $startSchedule (v1.0.0)
Executes code after a given duration until canceled.

**Arguments:**

- `code` (String, required) - The code to execute.
- `time` (Time, required) - How long to wait before running this code.
- `jobID` (String, required) - The jobID for this interval.

**Returns:** `Boolean`
**Brackets:** `true`
**Unwrap:** `false`

### $startScheduleAtTime (v1.1.0)
Starts a schedule that runs every day at a specific time in a given timezone and optional days.

**Arguments:**

- `code` (String, required) - The code to execute
- `time` (String, required) - Time in 24-hour format (e.g., 14:30)
- `timezone` (String, required) - Timezone like UTC+2 or GMT-5
- `jobID` (String, required) - The job ID

**Returns:** `Boolean`
**Brackets:** `false`
**Unwrap:** `false`

## Stats

### $activeSchedules (v1.0.0)
Returns an array of active (not paused) schedule IDs.

**Returns:** `String`
**Brackets:** `false`
**Unwrap:** `false`

### $allScheduleDetails (v1.0.0)
Returns an array of JSON objects representing all schedule details.

**Returns:** `String`
**Brackets:** `false`
**Unwrap:** `false`

### $findSchedules (v1.1.0)
Returns a list of schedule IDs containing a keyword

**Arguments:**

- `keyword` (String, required) - Keyword to search for
- `max` (Number, optional) - Maximum results

**Returns:** `String`
**Brackets:** `true`
**Unwrap:** `true`

### $isSchedulePaused (v1.0.0)
Returns true if the schedule is paused.

**Arguments:**

- `jobID` (String, required) - The schedule ID to check.

**Returns:** `Boolean`
**Brackets:** `true`
**Unwrap:** `true`

### $pausedSchedules (v1.0.0)
Returns an array of paused schedule IDs.

**Returns:** `String`
**Brackets:** `false`
**Unwrap:** `false`

### $scheduleDetails (v1.0.1)
Returns the details of a schedule with the given jobID as a JSON string.

**Arguments:**

- `jobID` (String, required) - The ID of the schedule

**Returns:** `String`
**Brackets:** `true`
**Unwrap:** `true`

### $scheduleExists (v1.0.0)
Checks if a schedule with the given ID exists.

**Arguments:**

- `jobID` (String, required) - The job ID to check.

**Returns:** `Boolean`
**Brackets:** `true`
**Unwrap:** `true`

### $scheduleNextRun (v1.0.0)
Returns the ms remaining until the next run of a schedule.

**Arguments:**

- `jobID` (String, required) - The jobID of the schedule.

**Returns:** `Number`
**Brackets:** `true`
**Unwrap:** `true`

### $scheduleRunCount (v1.0.0)
Returns how many times a schedule has run.

**Arguments:**

- `jobID` (String, required) - The ID of the schedule

**Returns:** `Number`
**Brackets:** `true`
**Unwrap:** `true`