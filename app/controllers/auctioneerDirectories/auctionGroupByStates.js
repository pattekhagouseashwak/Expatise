const { handleError } = require('../../middleware/utils')

const Auctioneer = require('../../models/Auctioneer')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const auctionGroupByStates = async (req, res) => {
  try {

    if (req.body.State.length == 0 && req.body.ZipCode.length == 0) {
      return res.status(200).send({ status: 400, message: "Either of State or Zipcode can't be empty!!" });
    }

    let searchValue =[];

    if (req.body.State.length != 0) {
      searchValue.push({ State: req.body.State });
      //console.log(searchValue)
    }
    if (req.body.ZipCode.length > 0) {
      searchValue.push({ ZipCode: req.body.ZipCode });
      //console.log(searchValue)
    }

    console.log(searchValue)

    await Auctioneer.aggregate(
      [

        { "$match": { $and: searchValue } },

        {
          "$lookup":
          {
            from: "auctionlisintgs",
            localField: "_id",
            foreignField: "Auctioneer",
            as: "data"
          }
        },

        {
          "$project": {
            "_id": 1,
            "State": 1,
            "CompanyName": 1,
            "City": 1,
            "FirstName": 1,
            "LastName": 1,
            "tickerSymbol": 1,
            "Listing": {
              $cond: {
                if: { $isArray: "$data" },
                then: {
                  $size: "$data"
                },
                else: "NA"
              }
            }
          }
        },
      ])
      .then((Auctioner_Data) => {
        res.status(200).send({ status: 200, message: "successfully fetch AuctionLisintg Details for State", Auctioner_Data })
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

module.exports = { auctionGroupByStates }