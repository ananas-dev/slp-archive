import fs from "fs";
const { default: SlippiGame } = require('@slippi/slippi-js');

export default async(req, res) => {
  return new Promise(resolve => {
    const uploadDir = process.env.uploadDir;

    if (!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir);
    }

    fs.readdir(uploadDir, function (err, files) {
      if (err) {
        res.status(500).json({
          message: "Unable to scan files!",
        });
        return resolve();
      }

      let fileInfos = [];

      files.forEach((file) => {
        const game = new SlippiGame(uploadDir + file);
        const metadata = game.getSettings();
        if (metadata != null)
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