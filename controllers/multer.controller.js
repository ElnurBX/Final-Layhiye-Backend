const path = require("path");
const fs = require("fs/promises");
const { User } = require("../models/Users.model");
const { Citys } = require("../models/Citys.model");
const { Rooms } = require("../models/Rooms.model");
const { Hotels } = require("../models/Hotels.model");
const { Facilities } = require("../models/Facilities.model");
const { Reviews } = require("../models/Reviews.model");
const { Partners } = require("../models/Patniors.model");
const models = { Users: User, Citys, Rooms, Hotels, Facilities, Reviews ,Partners};

async function uploadImage(req, res) {
    const { model, id } = req.params;
    const files = req.files;

    if (!files || Object.keys(files).length === 0) {
        return res.status(400).json({ message: "Lütfen bir fotoğraf seçin." });
    }

    const Model = models[model];

    if (!Model) {
        return res.status(400).json({ message: "Geçersiz model adı." });
    }

    try {
        const doc = await Model.findById(id);
        if (!doc) {
            return res.status(404).json({ message: `${model} bulunamadı.` });
        }

        // Profil fotoğrafı yükleme
        if (model === 'Users' && files.profileImage || model === 'Partners' && files.profileImage) {
            if (doc.profileImage) {
                const profileImagePath = path.join(__dirname, '../uploads/users', doc.profileImage);
                try {
                    await fs.access(profileImagePath);
                    await fs.unlink(profileImagePath);
                } catch (err) {
                    if (err.code !== 'ENOENT') {
                        throw err;
                    }
                }
            }
            doc.profileImage = files.profileImage[0].filename;
        }

        // Diğer fotoğrafları yükleme
        if (files.mainImg) {
            if (doc.mainImg) {
                const mainImgPath = path.join(__dirname, '../uploads', model.toLowerCase(), doc.mainImg);
                try {
                    await fs.access(mainImgPath);
                    await fs.unlink(mainImgPath);
                } catch (err) {
                    if (err.code !== 'ENOENT') {
                        throw err;
                    }
                }
            }
            doc.mainImg = files.mainImg[0].filename;
        }

        if (files.logo) {
            if (doc.logo) {
                const logoPath = path.join(__dirname, '../uploads', model.toLowerCase(), doc.logo);
                try {
                    await fs.access(logoPath);
                    await fs.unlink(logoPath);
                } catch (err) {
                    if (err.code !== 'ENOENT') {
                        throw err;
                    }
                }
            }
            doc.logo = files.logo[0].filename;
        }

        // Eski imgs resimlerini sil ve yenilerini ekle
        if (files.imgs) {
            if (doc.imgs && doc.imgs.length > 0) {
                for (const img of doc.imgs) {
                    const imgPath = path.join(__dirname, '../uploads', model.toLowerCase(), img);
                    try {
                        await fs.access(imgPath);
                        await fs.unlink(imgPath);
                    } catch (err) {
                        if (err.code !== 'ENOENT') {
                            throw err;
                        }
                    }
                }
            }
            doc.imgs = files.imgs.map(file => file.filename);
        }

        await doc.save();
        res.json({ message: `${model} fotoğrafı başarıyla yüklendi`, files: files });
    } catch (error) {
        console.error(`${model} fotoğrafı yükleme hatası:`, error);
        res.status(500).json({ message: `${model} fotoğrafı yüklenirken bir hata oluştu.` });
    }
}

async function deleteImage(req, res) {
    const { model, id, imageType, imageName } = req.params;

    const Model = models[model];

    if (!Model) {
        return res.status(400).json({ message: "Geçersiz model adı." });
    }

    try {
        const doc = await Model.findById(id);
        if (!doc) {
            return res.status(404).json({ message: `${model} bulunamadı.` });
        }

        let imagePath;

        switch (imageType) {
            case 'profileImage':
                if (doc.profileImage !== imageName) {
                    return res.status(400).json({ message: "Profil fotoğrafı eşleşmedi." });
                }
                imagePath = path.join(__dirname, '../uploads/users', doc.profileImage);
                doc.profileImage = undefined;
                break;

            case 'mainImg':
                if (doc.mainImg !== imageName) {
                    return res.status(400).json({ message: "Ana resim eşleşmedi." });
                }
                imagePath = path.join(__dirname, '../uploads', model.toLowerCase(), doc.mainImg);
                doc.mainImg = undefined;
                break;

            case 'logo':
                if (doc.logo !== imageName) {
                    return res.status(400).json({ message: "Logo eşleşmedi." });
                }
                imagePath = path.join(__dirname, '../uploads', model.toLowerCase(), doc.logo);
                doc.logo = undefined;
                break;

            case 'imgs':
                if (!doc.imgs.includes(imageName)) {
                    return res.status(400).json({ message: "Resim eşleşmedi." });
                }
                imagePath = path.join(__dirname, '../uploads', model.toLowerCase(), imageName);
                doc.imgs = doc.imgs.filter(img => img !== imageName);
                break;

            default:
                return res.status(400).json({ message: "Geçersiz resim türü." });
        }

        try {
            await fs.access(imagePath);
            await fs.unlink(imagePath);
        } catch (err) {
            if (err.code !== 'ENOENT') {
                throw err;
            }
        }

        await doc.save();
        res.json({ message: `${model} ${imageType} başarıyla silindi` });
    } catch (error) {
        console.error(`${model} ${imageType} silme hatası:`, error);
        res.status(500).json({ message: `${model} ${imageType} silinirken bir hata oluştu.` });
    }
}

module.exports = { uploadImage, deleteImage };
