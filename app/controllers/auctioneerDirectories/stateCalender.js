const { handleError } = require('../../middleware/utils')

const AuctionListing = require('../../models/auctionListing')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */



const stateCalender = async (req, res) => {
  try { 

    if(!req.body.year_month || req.body.year_month.length == 0){
    return res.status(400).send({ status: 400, message: "Please check year_month key value is empty or missing"})
    }
    if(!req.body.State || req.body.State.length == 0){
    return res.status(400).send({ status: 400, message: "Please check State key value is empty or missing" })
    }

    await AuctionListing.aggregate(
      [
        {$match:{"$and":[ { AuctionMonthYear: req.body.year_month },{ State: req.body.State }]}},
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

module.exports = { stateCalender }