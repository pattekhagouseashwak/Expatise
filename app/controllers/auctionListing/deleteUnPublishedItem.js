const { handleError } = require('../../middleware/utils')

const UnPublished = require('../../models/unPublished')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

 //checkUser-ID
// exports.fetchAuctionListing = async (obj_id) => {
 
//     var cursor;
//     await AuctionListing.findOne({ _id: obj_id }).then(data => {
//       cursor = data;
//     })
//       .catch(err => {
//         cursor = null;
//       });
//     return cursor;
//   };
 

const deleteUnPublishedItem = async (req, res) => {//console.log(req.files )
  try {
        
    // const resultSet = await this.fetchAuctionListing(req.body.id)

     await UnPublished.findByIdAndDelete({_id:req.body.id})
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

module.exports = { deleteUnPublishedItem }