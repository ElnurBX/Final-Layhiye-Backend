const { Partners } = require("../models/Patniors.model");

const PartnersController = {
    getAll: async (req, res) => {
        try {
            const items = await Partners.find();
            res.send(items);
        } catch (error) {
            res.status(404).send(error);
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const item = await Partners.findById(id);
            res.send(item);
        } catch (error) {
            res.status(404).send(error);
        }
    },
    add: async (req, res) => {
        try {
            const newPartner = new Partners({ ...req.body });
            await newPartner.save();
            const items = await Partners.find();
            res.send(items);
        } catch (error) {
            res.status(404).send(error);
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await Partners.findByIdAndDelete(id);
            const items = await Partners.find();
            res.send(items);
        } catch (error) {
            res.status(404).send(error);
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            await Partners.findByIdAndUpdate(id, { ...req.body });
            const items = await Partners.find();
            res.send(items);
        } catch (error) {
            res.status(404).send(error);
        }
    }
}
module.exports = { PartnersController };
