import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async(req, res) => {
  return new Promise(resolve => {
    if (req.method === "POST") {
      const form = new formidable.IncomingForm({
        multiples: true,
        keepExtensions: true,
        uploadDir: "./public/upload"
      });
      form.on("fileBegin", (name, file) => {
        file.path = `./public/upload/${file.name}`;
      })

      form.parse(req, (err, fields, files) => {
        if (err) {
          res.status(500).json({ "message": err })
          return resolve();
        }
        res.status(200).json({ "message": "Uploaded the file successfully." })
        resolve();
      })
    } else {
      res.status(405).json({ "message": "Only post requests are allowed !" });
      resolve();
    }
  });
}