const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "../../../client/public/images"));
  },
  filename(req, file, cb) {
    // Utiliser le nom original du fichier
    const originalName = file.originalname;
    cb(null, originalName);
  },
});

const upload = multer({ storage });

module.exports = upload;
