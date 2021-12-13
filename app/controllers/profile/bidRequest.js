const Bid = require('../../models/bid')
/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const bidRequest = async (req, res) => {
    try {
        
        if(req.body.auctionId.length==0){
            return res.status(400).send({ status: 400, message: "auctionId can't be empty!!"})
        }
        const  auctionId = req.body.auctionId;
        await Bid.find({auctionId:"61a21e49db7e3b2a479fa80d"})
                  .populate("userId","FirstName LastName Phone")
                  .then((data)=>{
                                res.status(200).send({ status: 200, message: "Successfully fetch Bid Request for respective auction List!!",data})
                                })
                  .catch(Err => {
                                res.status(500).send({
                                status: 500,
                                message:
                                Err.message || "Some error occurred while fetch Bid Request for respective auction List."
                                });
                                });
    
      
      } catch (error) {
        console.log(error)
        handleError(res, error)
      }
}

 module.exports = { bidRequest }