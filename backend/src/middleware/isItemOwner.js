const Item = require('../Models/ItemModel.js')
const Claim = require('../Models/ClaimModel.js')

const isItemowner = async (req, res, next) => {
    const { claimId } = req.params

    const claim = await Claim.findById(claimId);
    if (!claim) {
        return res.status(404).send({ message: 'Claim not found' })
    }
    const item = await Item.findById(claim.itemId)
    if (!item) {
        return res.status(404).send({ message: 'Item not found' })
    }
    if (item.userId.toString() !== req.user._id.toString()) {
        return res.status(403).send({ message: 'You are not authorized to update this claim' })
    }
    next()
}

module.exports = {isItemowner}