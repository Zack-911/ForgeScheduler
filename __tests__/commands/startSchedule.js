module.exports = {
  name: "test1",
  type: "messageCreate",
  code: `
    $let[thingy;1]
    $startSchedule[
      $let[thingy;$math[$get[thingy]+1]]
      $log[$get[thingy]];1s;TestIntervalStart
    ]
  `
};
