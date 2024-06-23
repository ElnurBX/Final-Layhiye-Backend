const path = require("path");
const fs = require("fs/promises");
const { Rooms } = require("../models/Rooms.model");

const RoomsController = {
    getAll: async (req, res) => {
        try {
            const items = await Rooms.find().populate('facilities').populate('city').populate('hotel');
            res.status(200).send(items);
        } catch (error) {
            console.error("Error fetching rooms:", error);
            res.status(500).send({ message: "Error fetching rooms" });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const item = await Rooms.findById(id).populate('facilities').populate('city').populate('hotel');
            if (!item) {
                return res.status(404).send({ message: "Room not found" });
            }
            res.status(200).send(item);
        } catch (error) {
            console.error("Error fetching room:", error);
            res.status(500).send({ message: "Error fetching room" });
        }
    },
    add: async (req, res) => {
        try {
            const newRoom = new Rooms({ ...req.body });
            await newRoom.save();
            const items = await Rooms.find().populate('facilities').populate('city').populate('hotel');
            res.status(201).send(items);
        } catch (error) {
            console.error("Error adding room:", error);
            res.status(400).send({ message: "Error adding room" });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const room = await Rooms.findById(id);
            if (!room) {
                return res.status(404).send({ message: "Room not found" });
            }

            // Delete associated images
            if (room.mainImg) {
                const mainImgPath = path.join(__dirname, '../uploads/rooms', room.mainImg);
                try {
                    await fs.access(mainImgPath);
                    await fs.unlink(mainImgPath);
                } catch (err) {
                    if (err.code !== 'ENOENT') {
                        throw err;
                    }
                }
            }
            if (room.imgs && room.imgs.length > 0) {
                for (const img of room.imgs) {
                    const imgPath = path.join(__dirname, '../uploads/rooms', img);
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

            await Rooms.findByIdAndDelete(id);
            const items = await Rooms.find().populate('facilities').populate('city').populate('hotel');
            res.status(200).send(items);
        } catch (error) {
            console.error("Error deleting room:", error);
            res.status(500).send({ message: "Error deleting room" });
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedRoom = await Rooms.findByIdAndUpdate(id, { ...req.body }, { new: true });
            if (!updatedRoom) {
                return res.status(404).send({ message: "Room not found" });
            }
            const items = await Rooms.find().populate('facilities').populate('city').populate('hotel');
            res.status(200).send(items);
        } catch (error) {
            console.error("Error editing room:", error);
            res.status(400).send({ message: "Error editing room" });
        }
    }
}

module.exports = { RoomsController };
