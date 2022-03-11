const { handleError } = require('../../middleware/utils')

const AuctionLisintg = require('../../models/auctionListing')

var requestIp = require('request-ip');

var geoip = require('geoip-lite');

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const searchAuction = async (req, res) => { //console.log(req.body)
  try {

    //const id = req.user._id

    let searchValue = [];

    if (req.body.length == 0) {
      return res.status(400).send({ status: 400, message: "request body is empty!!" })
    }
    if (req.body.State.length != 0) {
      searchValue.push({ State: req.body.State });
      //console.log(searchValue)
    }
    if (req.body.City.length != 0) {
      searchValue.push({ City: req.body.City });
      //console.log(searchValue)
    }
    if (req.body.Zip.length != 0) {
      searchValue.push({ Zip: req.body.Zip });
      //console.log(searchValue)
    }
    if (req.body.Miles.length != 0) {
      var ipAddress = requestIp.getClientIp(req);
      var longitude;
      var latitude;
      var ip = ipAddress;
      var geo = geoip.lookup(ip);
      //console.log("geo",geo)

      if (geo == null) {
        res.status(400).send({ status: 400, message: "latitude longitude has not found...!!!" });
        return;
      }

      longitude = geo.ll[0]

      latitude = geo.ll[1]

      let Distance = req.body.Miles * 1609.34

      searchValue.push({
        $and: [{
          location: {
            $near: {
              $maxDistance: Distance,
              $minDistance: 0,
              $geometry: { type: "Point", coordinates: [longitude, latitude] }
            }
          }
        }]
      });
      // console.log(searchValue)
    }
    if (req.body.Category.length != 0 && req.body.Category != 'ALL') {
      searchValue.push({ AuctionCategory: req.body.Category });
      //console.log(searchValue)
    }
    if (req.body.Keywords.length != 0) {
      const Keywords = req.body.Keywords;
      searchValue.push({
        $or: [{ AuctionType: { $regex: Keywords, '$options': 'i' } }, { AuctionTitle: { $regex: Keywords, '$options': 'i' } },
        { NameOfProduct: { $regex: Keywords, '$options': 'i' } }, { ProductDescription: { $regex: Keywords, '$options': 'i' } },
        { BiddingNotice: { $regex: Keywords, '$options': 'i' } }, { AuctionNotice: { $regex: Keywords, '$options': 'i' } },
        { TermsAndCondition: { $regex: Keywords, '$options': 'i' } }]
      });
      //console.log(searchValue)
    }
    if (req.body.AuctionType.length != 0) {
      searchValue.push({ AuctionType: req.body.AuctionType });
      //console.log(searchValue)
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var currentDate = (yyyy + "-" + mm + "-" + dd);
    searchValue.push({ AuctionDate: { $gte: currentDate } });

    console.log("searchValue", searchValue)

    await AuctionLisintg.find({ $and: searchValue })
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
    handleError(res, error)
  }
}

module.exports = { searchAuction }