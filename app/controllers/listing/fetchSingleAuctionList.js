const AuctionLisintg = require('../../models/auctionListing')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchSingleAuctionList = async (req, res) => {
    try {

        if (req.body.AuctionListingID.length == 0) {
            return res.status(400).send({ status: 400, message: "AuctionListingID is missing!!" })
        }
        const id = req.body.AuctionListingID

        await AuctionLisintg.find({ _id: id })
            .then((data) => {
                res.status(200).send({ status: 200, message: "successfully fetch AuctionLisintg Details!!", data })
            }
            ).catch(Err => {
                res.status(500).send({
                    status: 500,
                    message:
                        Err.message || "Some error occurred while fetching AuctionLisintg."
                });
            });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 500,
            message: error || "Some error occurred while fetching AuctionLisintg."
        });
    }
}

module.exports = { fetchSingleAuctionList }