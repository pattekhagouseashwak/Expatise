const Bid = require('../../models/bid')
/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getRequests = async (req, res) => {
    try {
        await Bid.find({$and: [{auctionType:"getRequest",userId:req.user._id}]})
                  .select("-RequestNo")
                  .populate({path:"auctionId",select:"name User_id NameOfProduct uploadPhoto AuctionTitle AuctionDate AuctionTime Auctioneer",populate:{path:'Auctioneer',model:'Auctioneer', select:'CompanyName'}})
                  .then((data)=>{
                                res.status(200).send({ status: 200, message: "successfully fetched all auction requests!!",data})
                                }
                                            ).catch(Err => {
                                                res.status(500).send({
                                                status: 500,
                                                message:
                                                    Err.message || "Some error occurred while fetching auction requests."
                                                });
                                            });
    
      
      } catch (error) {
        console.log(error)
        handleError(res, error)
      }
}

module.exports = {getRequests}