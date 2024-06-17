const path = require("path");
const fs = require("fs/promises");
const { User } = require("../models/Users.model");

// Profil fotoğrafı yükleme işlemi
async function uploadProfilePicture(req, res) {
    const userId = req.params.userId;
    const profileImage = req.file;

    if (!profileImage) {
        return res.status(400).json({ message: "Lütfen bir profil fotoğrafı seçin." });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı." });
        }
        if (user.profileImage) {
            const imagePath = path.join(__dirname, '../uploads/profiles', user.profileImage);
            try {
                await fs.access(imagePath);
                await fs.unlink(imagePath);
            } catch (err) {
                if (err.code !== 'ENOENT') { // Dosya yoksa hata atmaz
                    throw err;
                }
            }
        }
        user.profileImage = profileImage.filename;
        await user.save();
        res.json({ message: "Profil fotoğrafı başarıyla yüklendi", file: profileImage });
    } catch (error) {
        console.error('Profil fotoğrafı yükleme hatası:', error);
        res.status(500).json({ message: "Profil fotoğrafı yüklenirken bir hata oluştu." });
    }
}

module.exports = { uploadProfilePicture };
