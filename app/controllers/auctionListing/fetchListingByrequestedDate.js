const { handleError } = require('../../middleware/utils')

const AuctionLisintg = require('../../models/auctionListing')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchListingByrequestedDate = async (req, res) => {
  try {

  if( req.body.RequestedDate == undefined || req.body.RequestedDate.length == 0){
    return res.status(400).send({ status: 400, message: "RequestedDate can't be empty"})
  }
    
    await AuctionLisintg.find({AuctionDate:req.body.RequestedDate})
              .then((Auctions)=>{
                            
                            if(Auctions.length ==0){
                              return res.status(200).send({ status: 200, message: "No auction found for requested Date!!"})
                            }
                            else{
                            return res.status(200).send({ status: 200, message: "successfully fetch AuctionLisintg Details!!",Auctions})
                            }
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

module.exports = { fetchListingByrequestedDate }