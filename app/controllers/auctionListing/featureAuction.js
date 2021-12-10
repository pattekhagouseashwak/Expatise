const { handleError } = require('../../middleware/utils')

const AuctionLisintg = require('../../models/auctionListing')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const featureAuction = async (req, res) => {
  try {
    
    if(req.body.AuctionType.length == 0){
      return res.status(400).send({ status: 400, message: "auction Type can't be empty!!",data})
    }
    else if(req.body.AuctionType == "ALL"){
              await AuctionLisintg.find()
                      .then((data)=>{
                                    res.status(200).send({ status: 200, message: "successfully fetch AuctionLisintg Details!!",data})
                                    }
                                                ).catch(Err => {
                                                    res.status(500).send({
                                                    status: 500,    
                                                    message:
                                                        Err.message || "Some error occurred while fetching AuctionLisintg."
                                                    });
                                                });
    }
    else if(req.body.AuctionType != "all"){
      await AuctionLisintg.find({AuctionType:req.body.AuctionType})
      .then((data)=>{
                    res.status(200).send({ status: 200, message: "successfully fetch AuctionLisintg Details!!",data})
                    }
                                ).catch(Err => {
                                    res.status(500).send({
                                    status: 500,    
                                    message:
                                        Err.message || "Some error occurred while fetching AuctionLisintg."
                                    });
                                });
    }

    
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { featureAuction }