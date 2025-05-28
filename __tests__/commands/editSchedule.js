module.exports = {
  name: "test4",
  type: "messageCreate",
  code: `
    $editSchedule[
      $log[I was edited!];5s;TestIntervalStart
    ]
  `
};
