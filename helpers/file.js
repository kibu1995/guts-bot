module.exports = {
  "loadCommands": function (folderPath) {
    let commandList = {};

    require("fs").readdirSync(folderPath).forEach(function (file) {
      let fileName = file.substring(0, file.indexOf('.'));
      commandList[fileName] = require(folderPath + "/" + file);
    });

    return commandList;
  }
}