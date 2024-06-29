const path = require("path");
const fs = require("fs/promises");
const { Hotels } = require("../models/Hotels.model");

const HotelsController = {
    getAll: async (req, res) => {
        try {
            const items = await Hotels.find().populate(['reviews', 'rooms', 'partners', 'facilities', 'city','reviews']);
            res.status(200).send(items);
        } catch (error) {
            console.error("Error fetching hotels:", error);
            res.status(500).send({ message: "Error fetching hotels" });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const item = await Hotels.findById(id).populate(['reviews', 'rooms', 'partners', 'facilities', 'city','reviews']);
            if (!item) {
                return res.status(404).send({ message: "Hotel not found" });
            }
            res.status(200).send(item);
        } catch (error) {
            console.error("Error fetching hotel:", error);
            res.status(500).send({ message: "Error fetching hotel" });
        }
    },
    add: async (req, res) => {
        try {
            const newHotel = new Hotels({ ...req.body });
            await newHotel.save();
            const items = await Hotels.find().populate(['reviews', 'rooms', 'partners', 'facilities', 'city','reviews']);
            res.status(201).send(items);
        } catch (error) {
            console.error("Error adding hotel:", error);
            res.status(400).send({ message: "Error adding hotel" });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const hotel = await Hotels.findById(id);
            if (!hotel) {
                return res.status(404).send({ message: "Hotel not found" });
            }

            // Delete associated images
            if (hotel.mainImg) {
                const mainImgPath = path.join(__dirname, '../uploads/hotels', hotel.mainImg);
                try {
                    await fs.access(mainImgPath);
                    await fs.unlink(mainImgPath);
                } catch (err) {
                    if (err.code !== 'ENOENT') {
                        throw err;
                    }
                }
            }
            if (hotel.logo) {
                const logoPath = path.join(__dirname, '../uploads/hotels', hotel.logo);
                try {
                    await fs.access(logoPath);
                    await fs.unlink(logoPath);
                } catch (err) {
                    if (err.code !== 'ENOENT') {
                        throw err;
                    }
                }
            }
            if (hotel.imgs && hotel.imgs.length > 0) {
                for (const img of hotel.imgs) {
                    const imgPath = path.join(__dirname, '../uploads/hotels', img);
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

            await Hotels.findByIdAndDelete(id);
            const items = await Hotels.find().populate(['reviews', 'rooms', 'partners', 'facilities', 'city','reviews']);
            res.status(200).send(items);
        } catch (error) {
            console.error("Error deleting hotel:", error);
            res.status(500).send({ message: "Error deleting hotel" });
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedHotel = await Hotels.findByIdAndUpdate(id, { ...req.body }, { new: true }).populate(['reviews', 'rooms', 'partners', 'facilities', 'city','reviews']);
            if (!updatedHotel) {
                return res.status(404).send({ message: "Hotel not found" });
            }
            res.status(200).send(updatedHotel);
        } catch (error) {
            console.error("Error editing hotel:", error);
            res.status(400).send({ message: "Error editing hotel" });
        }
    }
}

module.exports = { HotelsController };
