const path = require("path");
const fs = require("fs/promises");
const { User } = require("../models/Users.model");

const UserController = {
    getAll: async (req, res) => {
        try {
            const items = await User.find();
            res.status(200).send(items);
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).send({ message: "Error fetching users" });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const item = await User.findById(id);
            if (!item) {
                return res.status(404).send({ message: "User not found" });
            }
            res.status(200).send(item);
        } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).send({ message: "Error fetching user" });
        }
    },
    add: async (req, res) => {
        try {
            const newUser = new User({ ...req.body });
            await newUser.save();
            const items = await User.find();
            res.status(201).send(items);
        } catch (error) {
            console.error("Error adding user:", error);
            res.status(400).send({ message: "Error adding user" });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }

            // Delete associated profile image
            if (user.profileImage) {
                const profileImagePath = path.join(__dirname, '../uploads/users', user.profileImage);
                try {
                    await fs.access(profileImagePath);
                    await fs.unlink(profileImagePath);
                } catch (err) {
                    if (err.code !== 'ENOENT') {
                        throw err;
                    }
                }
            }

            await User.findByIdAndDelete(id);
            const items = await User.find();
            res.status(200).send(items);
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).send({ message: "Error deleting user" });
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedUser = await User.findByIdAndUpdate(id, { ...req.body }, { new: true });
            if (!updatedUser) {
                return res.status(404).send({ message: "User not found" });
            }
            const items = await User.find();
            res.status(200).send(items);
        } catch (error) {
            console.error("Error editing user:", error);
            res.status(400).send({ message: "Error editing user" });
        }
    }
}

module.exports = { UserController };
