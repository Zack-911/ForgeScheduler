module.exports = {
  name: "ev",
  type: "messageCreate",
  code: `
  $onlyIf[$authorID==$botOwnerID;]
    $eval[$message]
  `
};
