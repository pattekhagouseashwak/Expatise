const { handleError } = require('../../middleware/utils')

const AuctionLisintg = require('../../models/auctionListing')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const displayListingOverMap = async (req, res) => {
    console.log(req.body)
    try {

        //validate req parameters
        if (!req.body.latitude || !req.body.longitude) {
            res.status(400).send({ message: "data validation has been failed required latitude or longitude!!!" });
            return;
        }
        let Distance = 90 * 1609.34 // 1 Meter equals to 1609.34 so we need 90 miles listing data 

        console.log(Distance)

        //db operations
        await AuctionLisintg.find({
            $and: [{
                location: {
                    $near: {
                        $maxDistance: Distance,
                        $minDistance: 0,
                        $geometry: { type: "Point", coordinates: [req.body.longitude, req.body.latitude]}
                    }
                }
            }]
        })
            .then((data) => {
                res.status(200).send({ status: 200, message: "successfully fetch AuctionLisintg Details", data })
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
        handleError(res, error)
    }
}

module.exports = { displayListingOverMap }