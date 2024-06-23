const path = require("path");
const fs = require("fs/promises");
const { Facilities } = require("../models/Facilities.model");

const FacilitiesController = {
    getAll: async (req, res) => {
        try {
            const items = await Facilities.find();
            res.status(200).send(items);
        } catch (error) {
            console.error("Error fetching facilities:", error);
            res.status(500).send({ message: "Error fetching facilities" });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const item = await Facilities.findById(id);
            if (!item) {
                return res.status(404).send({ message: "Facility not found" });
            }
            res.status(200).send(item);
        } catch (error) {
            console.error("Error fetching facility:", error);
            res.status(500).send({ message: "Error fetching facility" });
        }
    },
    add: async (req, res) => {
        try {
            const newFacility = new Facilities({ ...req.body });
            await newFacility.save();
            const items = await Facilities.find();
            res.status(201).send(items);
        } catch (error) {
            console.error("Error adding facility:", error);
            res.status(400).send({ message: "Error adding facility" });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const facility = await Facilities.findById(id);
            if (!facility) {
                return res.status(404).send({ message: "Facility not found" });
            }

            // Delete associated images
            if (facility.mainImg) {
                const mainImgPath = path.join(__dirname, '../uploads/facilities', facility.mainImg);
                try {
                    await fs.access(mainImgPath);
                    await fs.unlink(mainImgPath);
                } catch (err) {
                    if (err.code !== 'ENOENT') {
                        throw err;
                    }
                }
            }
            if (facility.logo) {
                const logoPath = path.join(__dirname, '../uploads/facilities', facility.logo);
                try {
                    await fs.access(logoPath);
                    await fs.unlink(logoPath);
                } catch (err) {
                    if (err.code !== 'ENOENT') {
                        throw err;
                    }
                }
            }
            if (facility.imgs && facility.imgs.length > 0) {
                for (const img of facility.imgs) {
                    const imgPath = path.join(__dirname, '../uploads/facilities', img);
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

            await Facilities.findByIdAndDelete(id);
            const items = await Facilities.find();
            res.status(200).send(items);
        } catch (error) {
            console.error("Error deleting facility:", error);
            res.status(500).send({ message: "Error deleting facility" });
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedFacility = await Facilities.findByIdAndUpdate(id, { ...req.body }, { new: true });
            if (!updatedFacility) {
                return res.status(404).send({ message: "Facility not found" });
            }
            const items = await Facilities.find();
            res.status(200).send(items);
        } catch (error) {
            console.error("Error editing facility:", error);
            res.status(400).send({ message: "Error editing facility" });
        }
    }
};

module.exports = { FacilitiesController };
