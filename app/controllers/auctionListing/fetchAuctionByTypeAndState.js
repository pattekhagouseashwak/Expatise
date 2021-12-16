const { handleError } = require('../../middleware/utils')

const AuctionLisintg = require('../../models/auctionListing')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchAuctionByTypeAndState = async (req, res) => { console.log(req.body)
  try {
    
    const id = req.user._id

    let searchValue = [];

    if(req.body.length == 0 ){
      return res.status(400).send({ status: 400, message: "request body is empty!!"})
    }

    if(req.body.State.length !=0 ){
      searchValue.push({State:req.body.State});
      //console.log(searchValue)
    }
    if(req.body.AuctionType.length !=0 ){
      searchValue.push({AuctionType : req.body.AuctionType});
      //console.log(searchValue)
    }
    
    console.log("searchValue",searchValue)
    
    await AuctionLisintg.find({ $and: searchValue } )
              .then((data)=>{
                            res.status(200).send({ status: 200, message: "successfully fetch AuctionLisintg Details for "+req.body.State+" "+req.body.AuctionType, data})
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

module.exports = { fetchAuctionByTypeAndState }