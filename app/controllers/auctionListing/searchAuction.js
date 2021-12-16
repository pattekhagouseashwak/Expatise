const { handleError } = require('../../middleware/utils')

const AuctionLisintg = require('../../models/auctionListing')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const searchAuction = async (req, res) => { //console.log(req.body)
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
    if(req.body.City.length !=0 ){
      searchValue.push({City : req.body.City});
      //console.log(searchValue)
    }
    if(req.body.Zip.length !=0 ){
      searchValue.push({Zip : req.body.Zip});
      //console.log(searchValue)
    }
    if(req.body.Miles.length !=0){
      searchValue.push({Miles : req.body.Miles});
      //console.log(searchValue)
    }
    if(req.body.Category.length !=0 ){
      searchValue.push({Category  : req.body.Category});
      //console.log(searchValue)
    }
    if(req.body.Keywords.length !=0){ 
      searchValue.push({Keywords : req.body.Keywords});
      //console.log(searchValue)
    }
    
    console.log("searchValue",searchValue)
    
    await AuctionLisintg.find({ $or: searchValue } )
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
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { searchAuction }