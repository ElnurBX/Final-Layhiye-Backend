
const { Patniors } = require("../models/Patniors.model")

const PatniorsController = {
    getAll: async (req, res) => {
        try {
            const items = await Patniors.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const item = await Patniors.findById(id)
            res.send(item)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    add: async (req, res) => {
        try {
            const newBlog = new Patniors({ ...req.body })
            await newBlog.save()
            const items = await Patniors.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            await Patniors.findByIdAndDelete(id)
            const items = await Patniors.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params
            await Patniors.findByIdAndUpdate(id, { ...req.body })
            const items = await Patniors.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    }
}
module.exports = { PatniorsController }
