const { handleError } = require('../../middleware/utils')

const Auctioneer = require('../../models/Auctioneer')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const auctionGroupByStates = async (req, res) => {
  try {

    if (req.body.State.length == 0) {
      return res.status(200).send({ status: 400, message: "State can't be empty!!" });
  }
    await Auctioneer.aggregate(
      [

        // { "$group": {

        //          "_id": "$State",

        //          Auctioneer_Data:{

        //                 $push:"$$ROOT"

        //               }

        //            }
        // },
        // { "$project" : {"Auctioneer_Data._id":1,
        //                 "Auctioneer_Data.State" :1, 
        //                 "Auctioneer_Data.AuctioneerID" : 1 , 
        //                 "Auctioneer_Data.CompanyName" : 1,
        //                 "Auctioneer_Data.Photo":1,
        //                 "Auctioneer_Data.City":1,
        //                 "Auctioneer_Data.Country":1,
        //                 "Auctioneer_Data.Email":1,
        //                 "Auctioneer_Data.Phone":1,
        //                 "Auctioneer_Data.LastName":1,
        //                 "Auctioneer_Data.Website":1,
        //                 "Auctioneer_Data.ZipCode":1,
        //                 "Auctioneer_Data.State":1,
        //                 "Auctioneer_Data.StreetAddress":1
        //               } }

        //---------------------------------------------------------------
        { "$match": { State: req.body.State } },

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