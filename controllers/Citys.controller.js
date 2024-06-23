const path = require("path");
const fs = require("fs/promises");
const { Citys } = require("../models/Citys.model");

const CitysController = {
    getAll: async (req, res) => {
        try {
            const items = await Citys.find().populate('hotels');
            res.status(200).send(items);
        } catch (error) {
            console.error("Error fetching cities:", error);
            res.status(500).send({ message: "Error fetching cities" });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const item = await Citys.findById(id).populate('hotels');
            if (!item) {
                return res.status(404).send({ message: "City not found" });
            }
            res.status(200).send(item);
        } catch (error) {
            console.error("Error fetching city:", error);
            res.status(500).send({ message: "Error fetching city" });
        }
    },
    add: async (req, res) => {
        try {
            const newCity = new Citys({ ...req.body });
            await newCity.save();
            const items = await Citys.find().populate('hotels');
            res.status(201).send(items);
        } catch (error) {
            console.error("Error adding city:", error);
            res.status(400).send({ message: "Error adding city" });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const city = await Citys.findById(id);
            if (!city) {
                return res.status(404).send({ message: "City not found" });
            }

            // Delete associated images
            if (city.mainImg) {
                const mainImgPath = path.join(__dirname, '../uploads/citys', city.mainImg);
                try {
                    await fs.access(mainImgPath);
                    await fs.unlink(mainImgPath);
                } catch (err) {
                    if (err.code !== 'ENOENT') {
                        throw err;
                    }
                }
            }
            if (city.imgs && city.imgs.length > 0) {
                for (const img of city.imgs) {
                    const imgPath = path.join(__dirname, '../uploads/citys', img);
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

            await Citys.findByIdAndDelete(id);
            const items = await Citys.find().populate('hotels');
            res.status(200).send(items);
        } catch (error) {
            console.error("Error deleting city:", error);
            res.status(500).send({ message: "Error deleting city" });
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedCity = await Citys.findByIdAndUpdate(id, { ...req.body }, { new: true });
            if (!updatedCity) {
                return res.status(404).send({ message: "City not found" });
            }
            const items = await Citys.find().populate('hotels');
            res.status(200).send(items);
        } catch (error) {
            console.error("Error editing city:", error);
            res.status(400).send({ message: "Error editing city" });
        }
    }
};

module.exports = { CitysController };
