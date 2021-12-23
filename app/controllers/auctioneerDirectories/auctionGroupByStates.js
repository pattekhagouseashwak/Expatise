const { handleError } = require('../../middleware/utils')

const Auctioneer = require('../../models/Auctioneer')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const auctionGroupByStates = async (req, res) => {
  try {
     
    await Auctioneer.aggregate(
      [

        
          { "$group": { 
            
                   "_id": "$State",
           
                   Auctioneer_Data:{
                     
                          $push:"$$ROOT"
                        
                        }
        
                     }
          },
          { "$project" : {"Auctioneer_Data._id":1,
                          "Auctioneer_Data.State" :1, 
                          "Auctioneer_Data.AuctioneerID" : 1 , 
                          "Auctioneer_Data.CompanyName" : 1,
                          "Auctioneer_Data.Photo":1,
                          "Auctioneer_Data.City":1,
                          "Auctioneer_Data.Country":1,
                          "Auctioneer_Data.Email":1,
                          "Auctioneer_Data.Phone":1,
                          "Auctioneer_Data.LastName":1,
                          "Auctioneer_Data.Website":1,
                          "Auctioneer_Data.ZipCode":1,
                          "Auctioneer_Data.State":1,
                          "Auctioneer_Data.StreetAddress":1
                        } }
      ])
              .then((data)=>{
                            res.status(200).send({ status: 200, message: "successfully fetch AuctionLisintg Details for State",data})
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