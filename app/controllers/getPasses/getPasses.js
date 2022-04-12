const Bid = require('../../models/bid')
/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getPasses = async (req, res) => {
    try {
        console.log("req", req.user._id)
        await Bid.find({ $and: [{ userId: String(req.user._id) },{ auctionType: "Passes" }] })
            .populate({ path: "auctionId", select: "name User_id NameOfProduct uploadPhoto AuctionTitle AuctionDate AuctionTime Auctioneer", populate: { path: 'Auctioneer', model: 'Auctioneer', select: 'CompanyName' } })
            .then((data) => {
                res.status(200).send({ status: 200, message: "Successfully fetch all bid passes!!", data })
            }
            ).catch(Err => {
                console.log(Err)
                res.status(500).send({
                    status: 500,
                    message:
                        Err.message || "Some error occurred while fetching bid passes."
                });
            });


    } catch (error) {
        console.log(error)
        handleError(res, error)
    }
}

module.exports = { getPasses }