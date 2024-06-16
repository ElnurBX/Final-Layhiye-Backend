
const { Rooms } = require("../models/Rooms.model")

const RoomsController = {
    getAll: async (req, res) => {
        try {
            const items = await Rooms.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const item = await Rooms.findById(id)
            res.send(item)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    add: async (req, res) => {
        try {
            const newBlog = new Rooms({ ...req.body })
            await newBlog.save()
            const items = await Rooms.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            await Rooms.findByIdAndDelete(id)
            const items = await Rooms.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params
            await Rooms.findByIdAndUpdate(id, { ...req.body })
            const items = await Rooms.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    }
}
module.exports = { RoomsController }
