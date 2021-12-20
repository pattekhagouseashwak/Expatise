const { handleError } = require('../../middleware/utils')

const AuctionLisintg = require('../../models/auctionListing')
const Auctioneer = require('../../models/Auctioneer')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchAuctioneerBio = async (req, res) => {
    try {

        const Auctioneer = req.body.Auctioneer;

        if(Auctioneer.length ==0){
            return res.status(400).send({ status: 400, message: "Auctioneer Id is empty!!" })
        }

        await AuctionLisintg.find({ Auctioneer: Auctioneer })
            .select("Auctioneer AuctionTitle AuctionCategory NameOfProduct AuctionTime AuctionDate uploadPhoto")
            .sort({_id:-1}).limit(4)
            .populate("Auctioneer","Email Photo State StreetAddress City CompanyName Country City ZipCode Phone")
            .then((data) => {
            
                res.status(200).send({ status: 200, message: "successfully fetch AuctionLisintg Details!!",data })
            })
            .catch(Err => {
                res.status(500).send({
                    status: 500,
                    message:
                        Err.message || "Some error occurred while fetching AuctionLisintg."
                });
            });

    } catch (error) {
        console.log(error)
        handleError(res, error)
    }
}

module.exports = { fetchAuctioneerBio }