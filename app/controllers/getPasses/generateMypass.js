const Bid = require('../../models/bid')
/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

//check registered Email Id or username
exports.checkUserhasPass = async (userId,auctionId) => {
    var cursorData;
       await Bid.find({$and: [{auctionId:auctionId},{userId:userId},{auctionType:"Passes"}]})
        .then((result) => {
            cursorData = result;
        }).catch(err => {
            cursorData="NA";
        });
    
    return cursorData;
  }


const generateMypass = async (req, res) => {
    try {

        const userId = req.user._id;

        const auctionId = req.body.auctionId;

        const resultSet = await this.checkUserhasPass(userId,auctionId)

            if(resultSet == "NA" || resultSet.length !=0){
            return res.status(400).send({ status: 400, message: "Pass has generated already, Please check in Profile DashBoard!!"})
        }
        await Bid.create({userId,auctionId,auctionType:"Passes"})
                 .then(()=>{
                            res.status(200).send({ status: 200, message: "Successfully bid passes has generated!!"})
                           }
                                            ).catch(Err => {
                                                res.status(500).send({
                                                status: 500,
                                                message:
                                                    Err.message || "Some error occurred while generating bid passes."
                                                });
                                            });
    
      
      } catch (error) {
        console.log(error)
        handleError(res, error)
      }
}

 module.exports = { generateMypass }