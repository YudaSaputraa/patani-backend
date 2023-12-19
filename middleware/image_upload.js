const Multer = require("multer");

const upload = Multer({
    storage: Multer.diskStorage({}),
    destination: function (req, file, cb) {
        cb(null, 'files');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
    limits: {
        fileSize: 2 * 1024 * 1024, //dibawah 2MB
    }
});

module.exports = upload;
