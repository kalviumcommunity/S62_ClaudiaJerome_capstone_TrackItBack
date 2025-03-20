const Item = require('../Models/ItemModel.js')

const getAllItem = async (req, res) => {
    try {
        const item = await Item.find();
        return res.status(200).send(item)
    } catch (err) {
        return res.status(500).send({ Error: err.message })

    }
}

const getItembyID=async(req,res)=>{
    try{
        const {id}=req.params
        const item = await Item.findById(id)
        if (!item) {
            return res.status(404).send({ message: 'Item not found' })
        }
        return res.send(item)
    }catch(err){
        return res.status(500).send({ Error: err.message })

    }

}

const Lostitem = async (req, res) => {
    try {
        const { name, description, location, status } = req.body
        if (!req.files || req.files.length===0) {
            return res.status(400).send({ message: 'Image upload failed' });
        }
        const imageUrls = req.files.map(file=>file.path)
        if (!name || !description || !location || !status || !imageUrls.length===0) {
            return res.status(400).send({ message: 'All the fields are required' })
        }
        const checkifitemAlreadyExists = await Item.findOne({
            name,
            location,
            userId: req.user._id,
            status: "lost"
        })
        if (checkifitemAlreadyExists) {
            return res.status(400).send({ message: 'Item already registered' })
        }
        const item = await Item.create({ name, description, location, status, imagePath: imageUrls, userId: req.user._id })
        res.status(201).send({ message: 'Lost item reported successfully', item })

    } catch (err) {
        return res.status(500).send({ Error: err.message })

    }
}

const foundItem = async (req, res) => {
    try {
        const { name, description, location } = req.body
        if (!req.files || req.files.length===0) {
            return res.status(400).send({ message: 'Image upload failed' });
        }
        const imageUrls = req.files.map(file=>file.path)
        if (!name || !description || !location || !imageUrls.length===0) {
            return res.status(400).send({ message: 'All the fields are required' })
        }
        const checkifitemAlreadyExists = await Item.findOne({
            name,
            location,
            userId: req.user._id,
            status: "found"
        })
        if (checkifitemAlreadyExists) {
            return res.status(400).send({ message: 'Item already registered' })
        }
        const item = await Item.create({ name, description, location, status: 'found', imagePath: imageUrls, userId: req.user._id })
        return res.status(201).json({ message: 'Found Item reported successfully', item })

    } catch (err) {
        return res.status(500).send({ Error: err.message })
        
    }
}

const updateItem=async(req,res)=>{
    try{
        const {id}=req.params
        const updates=req.body

        if (req.files && req.files.length>0) {
            updates.imageUrl = req.file.path; 
        }

        const updatedItem=await Item.findByIdAndUpdate(id,updates,{new:true})
        if(!updatedItem){
            return res.status(404).send({message:'Item not found'})
        }
        return res.status(200).json(updatedItem)

        
    }catch(err){
        return res.status(500).send({ Error: err.message })

    }
}

module.exports = { getAllItem, getItembyID, Lostitem, foundItem,updateItem }