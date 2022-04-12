const Bid = require('../../models/bid')

const AuctionListing = require('../../models/auctionListing')
/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

//check registered Email Id or username
exports.checkUserhasPass = async (userId,auctionId) => {
    var cursorData;
       await Bid.find({$and: [{auctionId:auctionId},{userId:userId},{auctionType:"getRequest"}]})
        .then((result) => {
            cursorData = result;
        }).catch(err => {
            cursorData="NA";
        });
    
    return cursorData;
  }


const createGetRequest = async (req, res) => {
    try {
        const userId = req.user._id;

        const auctionId = req.body.auctionId;

        const category = req.body.category;
        const auctioneerCompanyName = req.body.auctioneerCompanyName;
        const productName= req.body.productName;
        const address=req.body.address;
        const date=req.body.date;
        const time=req.body.time;
        const BidderName=req.body.BidderName;
        const BidderEmail=req.body.BidderEmail;
        const BidderContact=req.body.BidderContact;
        const BidderID= req.body.BidderID;
        const RequestNo= (new Date()).getTime();

        const Auctioneer_data = await AuctionListing.findById({ _id: auctionId })
            .select("Auctioneer AuctionDate  AuctionTime AuctionType")
            .populate("Auctioneer", "FirstName LastName Email")

        if (Auctioneer_data == null || Auctioneer_data.length == 0) {
            return res.status(400).send({ status: 400, message: "AuctionID Doesn't exist!!" })
        }

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var currentDate = (yyyy + "-" + mm + "-" + dd);

        if (Auctioneer_data.AuctionDate < currentDate && Auctioneer_data.AuctionTime < currentDate) {
            return res.status(400).send({ status: 400, message: "Auctions has closed!!" })
        }
       
        const resultSet = await this.checkUserhasPass(userId,auctionId)

        if (resultSet == "NA" || resultSet.length != 0) {
            return res.status(400).send({ status: 400, message: "Request has created already, Please check in Profile DashBoard!!" })
        }


        await Bid.create({userId,auctionId,auctionType:"getRequest",category,auctioneerCompanyName,productName,address,date,time,BidderName,BidderEmail,BidderContact,RequestNo,BidderID})
                 .then(()=>{
                            res.status(200).send({ status: 200, message: "Successfully bid request has created!!"})
                           }
                                            ).catch(Err => {
                                                res.status(500).send({
                                                status: 500,
                                                message:
                                                    Err.message || "Some error occurred while creating bid request."
                                                });
                                            });
    
      
      } catch (error) {
        console.log(error)
        handleError(res, error)
      }
}

 module.exports = { createGetRequest }