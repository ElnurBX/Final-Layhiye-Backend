
const { Citys } = require("../models/Citys.model")

const CitysController = {
    getAll: async (req, res) => {
        try {
            const items = await Citys.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const item = await Citys.findById(id)
            res.send(item)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    add: async (req, res) => {
        try {
            const newBlog = new Citys({ ...req.body })
            await newBlog.save()
            const items = await Citys.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            await Citys.findByIdAndDelete(id)
            const items = await Citys.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params
            await Citys.findByIdAndUpdate(id, { ...req.body })
            const items = await Citys.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    }
}
module.exports = { CitysController }
