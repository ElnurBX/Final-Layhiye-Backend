
const { Facilities } = require("../models/Facilities.model")
const FacilitiesController = {
    getAll: async (req, res) => {
        try {
            const items = await Facilities.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const item = await Facilities.findById(id)
            res.send(item)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    add: async (req, res) => {
        try {
            const newBlog = new Facilities({ ...req.body })
            await newBlog.save()
            const items = await Facilities.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            await Facilities.findByIdAndDelete(id)
            const items = await Facilities.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params
            await Facilities.findByIdAndUpdate(id, { ...req.body })
            const items = await Facilities.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    }
}
module.exports = { FacilitiesController }
