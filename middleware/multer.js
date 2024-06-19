const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const model = req.params.model.toLowerCase();
        const uploadPath = path.join(__dirname, '../uploads', model);
        cb(null, uploadPath); 
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, 
    },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
}).fields([
    { name: "profileImage", maxCount: 1 },
    { name: "mainImg", maxCount: 1 },
    { name: "imgs", maxCount: 10 },
    { name: "logo", maxCount: 1 }
]);

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|svg/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Error: Only images (jpeg/jpg/png) are allowed!");
    }
}

module.exports = upload;
