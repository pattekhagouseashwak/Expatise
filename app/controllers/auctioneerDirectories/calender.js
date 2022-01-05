const { handleError } = require('../../middleware/utils')

const AuctionListing = require('../../models/auctionListing')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */



const calender = async (req, res) => {
  try {

    

    await AuctionListing.aggregate(
      [
        { $match: { AuctionMonthYear: req.body.year_month } },

        {
          "$group": {

            "_id": "$AuctionDate",

            Auctioneer_Data: { $push: "$$ROOT" },

            totalAuctionsForADay: { $sum: 1 },

          }
        },
        { "$project": { "Auctioneer_Data.AuctionType": 1, "totalAuctionsForADay": 1 } }
      ])
      .then((data) => {
        res.status(200).send({ status: 200, message: "successfully fetch AuctionLisintg Details for current month", data })
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

module.exports = { calender }