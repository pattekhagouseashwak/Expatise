const { handleError } = require('../../middleware/utils')

const UnPublished = require('../../models/unPublished')

const AuctionListing = require('../../models/auctionListing')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const deleteListedItem = async (req, res) => {//console.log(req.files )
  try {
        
    let modelName;

    if(req.body.reqType == 1){
      modelName = AuctionListing;
    }
    else if(req.body.reqType == 2){
    modelName = UnPublished;
    }
    
    await modelName.findByIdAndDelete({_id:req.body.id})
                      .then(async()=>{
                                      res.status(200).send({ status: 200, message: "your iteam has been successfully Deleted"})
                                     })
                      .catch(Err => {
                                      res.status(500)
                                      .send({
                                            status: 500,message:Err.message || "Some error occurred while deleting item."
                                             });
                                        });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { deleteListedItem }