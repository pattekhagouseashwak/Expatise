const { handleError } = require('../../middleware/utils')

const UnPublished = require('../../models/unPublished')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchUnPublishedListing = async (req, res) => { //console.log(req.body)
  try {

    let searchValue = [];

    if (req.body.length == 0) {
      return res.status(400).send({ status: 400, message: "request body is empty!!" })
    }
    if (req.body.ListingID.length != 0) {
      searchValue.push({ ListingID: req.body.ListingID });
      //console.log(searchValue)
    }
    if (req.body.AuctioneerID.length != 0) {
      searchValue.push({ AuctioneerID: req.body.AuctioneerID });
      //console.log(searchValue)
    }
    if (req.body.tickerSymbol.length != 0) {
      searchValue.push({ tickerSymbol: req.body.tickerSymbol });
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

    await UnPublished.find({ $and: searchValue })
                        .populate("Auctioneer","AuctioneerID tickerSymbol")
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

module.exports = { fetchUnPublishedListing }