const { handleError } = require('../../middleware/utils')

const AuctionLisintg = require('../../models/auctionListing')

var requestIp = require('request-ip');

var geoip = require('geoip-lite');

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const displayListingOverMap = async (req, res) => {
    console.log(req.body)
    try {
        var ipAddress = requestIp.getClientIp(req);
        //console.log(ipAddress);
        var longitude;
        var latitude;

        //validate req parameters
        if (!req.body.latitude || !req.body.longitude) {
            //var ip = "157.48.167.229";
            var ip = ipAddress;
            var geo = geoip.lookup(ip);
            //console.log("geo",geo)

            if(geo == null){
            res.status(400).send({status:400, message: "latitude longitude has not found...!!!" });
            return;
            }

            longitude = geo.ll[0]

            latitude = geo.ll[1]

            // res.status(400).send({ message: "data validation has been failed required latitude or longitude!!!" });
            // return;
        }
        else{
            longitude = req.body.longitude

            latitude = req.body.latitude
        }
        let Distance = 90 * 1609.34 // 1 Meter equals to 1609.34 so we need 90 miles listing data 

        //console.log(Distance,longitude,latitude)

        //db operations
        await AuctionLisintg.find({
            $and: [{
                location: {
                    $near: {
                        $maxDistance: Distance,
                        $minDistance: 0,
                        $geometry: { type: "Point", coordinates: [longitude,latitude]}
                    }
                }
            }]
        }).populate("Auctioneer","CompanyName")
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