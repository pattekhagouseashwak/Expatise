const Bid = require('../../models/bid')
/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getPasses = async (req, res) => {
    try {
        console.log(req.user._id)
        await Bid.find({$and: [{auctionType:"Passes",userId:req.user._id}]})
                    //.populate("userId","FirstName LastName Phone")
                   .populate({path:"auctionId",select:"name User_id NameOfProduct uploadPhoto AuctionTitle AuctionDate AuctionTime Auctioneer",populate:{path:'Auctioneer',model:'Auctioneer', select:'CompanyName'}})
                   .then((data)=>{
                                let qrCodeString = "";
                                // qrCodeString = data[0];
                                // console.log(data[0].userId._id + data[0].auctionId.NameOfProduct + data[0].userId.Phone +  data[0].auctionId.AuctionDate +  data[0].auctionId.AuctionTime);

                                qrCodeString = data[0].userId._id + data[0].auctionId.NameOfProduct + data[0].userId.Phone +  data[0].auctionId.AuctionDate +  data[0].auctionId.AuctionTime
                                
                                data.push({"qrCodeString": qrCodeString});

                                data.qrCodeString = "qrCodeString";


                                res.status(200).send({ status: 200, message: "Successfully fetch all bid passes!!",data})

                                }
                                            ).catch(Err => {
                                                res.status(500).send({
                                                status: 500,
                                                message:
                                                    Err.message || "Some error occurred while fetching bid passes."
                                                });
                                            });
    
      
      } catch (error) {
        console.log(error)
        handleError(res, error)
      }
}

 module.exports = { getPasses }