
const { Hotels } = require("../models/Hotels.model")

const HotelsController = {
    getAll: async (req, res) => {
        try {
            const items = await Hotels.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const item = await Hotels.findById(id)
            res.send(item)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    add: async (req, res) => {
        try {
            const newBlog = new Hotels({ ...req.body })
            await newBlog.save()
            const items = await Hotels.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            await Hotels.findByIdAndDelete(id)
            const items = await Hotels.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params
            await Hotels.findByIdAndUpdate(id, { ...req.body })
            const items = await Hotels.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    }
}
module.exports = { HotelsController }
