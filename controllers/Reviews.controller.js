const { Reviews } = require("../models/Reviews.model");

const ReviewsController = {
    getAll: async (req, res) => {
        try {
            const items = await Reviews.find().populate('user').populate('likes');
            res.send(items);
        } catch (error) {
            res.status(404).send(error);
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const item = await Reviews.findById(id).populate('user').populate('likes');
            res.send(item);
        } catch (error) {
            res.status(404).send(error);
        }
    },
    add: async (req, res) => {
        try {
            const newReview = new Reviews({ ...req.body });
            await newReview.save();
            const items = await Reviews.find().populate('user').populate('likes');
            res.send(items);
        } catch (error) {
            res.status(404).send(error);
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await Reviews.findByIdAndDelete(id);
            const items = await Reviews.find().populate('user').populate('likes');
            res.send(items);
        } catch (error) {
            res.status(404).send(error);
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            await Reviews.findByIdAndUpdate(id, { ...req.body });
            const items = await Reviews.find().populate('user').populate('likes');
            res.send(items);
        } catch (error) {
            res.status(404).send(error);
        }
    }
}
module.exports = { ReviewsController };
