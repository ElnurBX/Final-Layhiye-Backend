const { User } = require("../models/Users.model");

const UsersController = {
    getAll: async (req, res) => {
        try {
            const items = await User.find();
            res.status(200).send(items);
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).send({ message: "Error fetching users", error: error.message });
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
            console.error("Error fetching user by ID:", error);
            res.status(500).send({ message: "Error fetching user by ID", error: error.message });
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
            res.status(500).send({ message: "Error adding user", error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) {
                return res.status(404).send({ message: "User not found" });
            }
            const items = await User.find();
            res.status(200).send(items);
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).send({ message: "Error deleting user", error: error.message });
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
            console.error("Error updating user:", error);
            res.status(500).send({ message: "Error updating user", error: error.message });
        }
    }
};

module.exports = { UsersController };
