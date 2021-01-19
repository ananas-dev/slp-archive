import fs from "fs";
const { default: SlippiGame } = require('@slippi/slippi-js');

export default async(req, res) => {
  return new Promise(resolve => {
    const directoryPath = "./public/upload/";

    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        res.status(500).json({
          message: "Unable to scan files!",
        });
        return resolve();
      }

      let fileInfos = [];

      files.forEach((file) => {
        const game = new SlippiGame(directoryPath + file);
        fileInfos.push({
          name: file,
          url: "upload/" + file,
          settings: game.getSettings(),
          metadata: game.getMetadata()
        });
      });

      res.status(200).json(fileInfos);
      resolve();
    });
  });
};