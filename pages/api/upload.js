import multer from "multer";
import util from "util";
import fs from "fs";
const { default: SlippiGame } = require('@slippi/slippi-js');

const maxSize = 10 * 1024 * 1024;
const uploadDir = process.env.uploadDir;

export const config = {
  api: {
    bodyParser: false,
  },
}

const storage = multer.memoryStorage();

const upload = util.promisify(multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/octet-stream") {
      cb(null, true);
    } else {
      req.fileValidationError = true;
      return cb(null, false);
    }
  }
}).single("file"))

export default async function handler(req, res) {
  try {
    await upload(req, res);
    const game = new SlippiGame(req.file.buffer);

    if (req.fileValidationError) {
      return res.status(500).json({ message: "File type is not application/octet-stream!"})
    }

    else if (game.getMetadata === null) {
      return res.status(500).json({ message: "File is not slp!"})
    }

    else if (req.file == undefined) {
      return res.status(400).json({ message: "Please upload a file!" });
    }

    else {
      if (!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir);
      }
      // Write the file
      fs.writeFile(uploadDir + "/" + req.file.originalname, req.file.buffer, (err) => {
        if (err)
          return res.status(500).json({ message: "File could not be written to: " + uploadDir});
      });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "FILE_TYPE") {
      return res.status(500).json({
        message: "File size cannot be larger than 5MB!",
      });
    }

    res.status(500).json({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};