const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { uploadProfilePicture } = require("../controllers/multer.controller");
const { User } = require("../models/Users.model");
// Profil fotoğrafı yükleme rotası
router.post("/:userId", upload, uploadProfilePicture);

router.get("/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı." });
        }
        res.json(user);
    } catch (error) {
        console.error('Kullanıcı bilgileri getirilirken hata oluştu:', error);
        res.status(500).json({ message: "Kullanıcı bilgileri getirilirken bir hata oluştu." });
    }
});

module.exports = router;
