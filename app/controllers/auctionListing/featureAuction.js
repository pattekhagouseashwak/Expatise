const { handleError } = require('../../middleware/utils')

const AuctionLisintg = require('../../models/auctionListing')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const featureAuction = async (req, res) => {
  try {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var currentDate = (yyyy+"-"+mm+"-"+dd);

    
    if(req.body.AuctionType == "ALL"){
              await AuctionLisintg.find({AuctionDate :{$gte:currentDate} })
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
    else if(req.body.AuctionType != "ALL"){
      await AuctionLisintg.find({$and: [{AuctionType:req.body.AuctionType},{AuctionDate :{$gte:currentDate} } ] } )
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