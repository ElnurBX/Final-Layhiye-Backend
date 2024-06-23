const path = require("path");
const fs = require("fs/promises");
const { Country } = require("../models/Country.model");

const CountryController = {
    getAll: async (req, res) => {
        try {
            const items = await Country.find()
                .populate({
                    path: 'city',
                    populate: {
                        path: 'hotels',
                        model: 'Hotels'
                    }
                });
            res.status(200).send(items);
        } catch (error) {
            console.error("Error fetching countries:", error);
            res.status(500).send({ message: "Error fetching countries" });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const item = await Country.findById(id)
                .populate({
                    path: 'city',
                    populate: {
                        path: 'hotels',
                        model: 'Hotels'
                    }
                });
            if (!item) {
                return res.status(404).send({ message: "Country not found" });
            }
            res.status(200).send(item);
        } catch (error) {
            console.error("Error fetching country:", error);
            res.status(500).send({ message: "Error fetching country" });
        }
    },
    add: async (req, res) => {
        try {
            const newCountry = new Country({ ...req.body });
            await newCountry.save();
            const items = await Country.find()
                .populate({
                    path: 'city',
                    populate: {
                        path: 'hotels',
                        model: 'Hotels'
                    }
                });
            res.status(201).send(items);
        } catch (error) {
            console.error("Error adding country:", error);
            res.status(400).send({ message: "Error adding country" });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const country = await Country.findById(id);
            if (!country) {
                return res.status(404).send({ message: "Country not found" });
            }

            // Delete associated images
            if (country.mainImg) {
                const mainImgPath = path.join(__dirname, '../uploads/countries', country.mainImg);
                try {
                    await fs.access(mainImgPath);
                    await fs.unlink(mainImgPath);
                } catch (err) {
                    if (err.code !== 'ENOENT') {
                        throw err;
                    }
                }
            }
            if (country.logo) {
                const logoPath = path.join(__dirname, '../uploads/countries', country.logo);
                try {
                    await fs.access(logoPath);
                    await fs.unlink(logoPath);
                } catch (err) {
                    if (err.code !== 'ENOENT') {
                        throw err;
                    }
                }
            }
            if (country.imgs && country.imgs.length > 0) {
                for (const img of country.imgs) {
                    const imgPath = path.join(__dirname, '../uploads/countries', img);
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

            await Country.findByIdAndDelete(id);
            const items = await Country.find()
                .populate({
                    path: 'city',
                    populate: {
                        path: 'hotels',
                        model: 'Hotels'
                    }
                });
            res.status(200).send(items);
        } catch (error) {
            console.error("Error deleting country:", error);
            res.status(500).send({ message: "Error deleting country" });
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedCountry = await Country.findByIdAndUpdate(id, { ...req.body }, { new: true });
            if (!updatedCountry) {
                return res.status(404).send({ message: "Country not found" });
            }
            const items = await Country.find()
                .populate({
                    path: 'city',
                    populate: {
                        path: 'hotels',
                        model: 'Hotels'
                    }
                });
            res.status(200).send(items);
        } catch (error) {
            console.error("Error editing country:", error);
            res.status(400).send({ message: "Error editing country" });
        }
    }
};

module.exports = { CountryController };
