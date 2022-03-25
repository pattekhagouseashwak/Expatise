const Bid = require('../../models/bid')

const AuctionListing = require('../../models/auctionListing')

const emailConstants = require("../../constant/email-template/email-content")

const { sendEmailToCustomer } = require('../authentication/helpers/sendEmailToCustomer')

const emailConfig = require('../../../config/email')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

//check registered Email Id or username
exports.checkUserhasPass = async (userId, auctionId) => {
    var cursorData;
    await Bid.find({ $and: [{ auctionId: auctionId }, { userId: userId }, { auctionType: "Passes" }] })
        .then((result) => {
            cursorData = result;
        }).catch(err => {
            cursorData = "NA";
        });

    return cursorData;
}


const generateMypass = async (req, res) => {
    ///console.log(req.body)
    try {

        const userId = req.user._id;

        const auctionId = req.body.auctionId;
        const category = req.body.category;
        const auctioneerCompanyName = req.body.auctioneerCompanyName;
        const productName = req.body.productName;
        const address = req.body.address;
        const date = req.body.date;
        const time = req.body.time;
        const BidderName = req.body.BidderName;
        const BidderEmail = req.body.BidderEmail;
        const BidderContact = req.body.BidderContact;

        const resultSet = await this.checkUserhasPass(userId, auctionId)

        //console.log(req.body)

        if (resultSet == "NA" || resultSet.length != 0) {
            return res.status(400).send({ status: 400, message: "Pass has generated already, Please check in Profile DashBoard!!" })
        }

        const Auctioneer_data = await AuctionListing.findById({_id:auctionId})
                                                 .select("Auctioneer")
                                                 .populate("Auctioneer","FirstName LastName Email")

        if (Auctioneer_data == null || Auctioneer_data.length == 0) {
           return res.status(400).send({ status: 400, message: "AuctionID Doesn't exist!!" })
          }

        const Bidder_ID = req.user.BidderID;

        let obj = [Bidder_ID,BidderName,Auctioneer_data.Auctioneer.FirstName,Auctioneer_data.Auctioneer.LastName];

        await Bid.create({ userId, auctionId, auctionType: "Passes", category, auctioneerCompanyName, productName, address, date, time, BidderName, BidderEmail, BidderContact })
            .then(async (data) => {
                let host = req.get('host');
                console.log("host:", host);
                await sendEmailToCustomer(host, data.BidderEmail, "NA", 3, emailConstants.BiddingRequestSubmittedSuccessfully, emailConstants.htmlcontent_onceBidderRequestBid, data.BidderName,emailConfig.username_listing);
                await sendEmailToCustomer(host, Auctioneer_data.Auctioneer.Email, "NA",9, emailConstants.IncomingBidderAlert, emailConstants.htmlContent_Incoming_Bidder_Alert, obj,emailConfig.username_listing);
                res.status(200).send({ status: 200, message: "Successfully bid passes has generated!!" })
            }
            ).catch(Err => {
                res.status(500).send({
                    status:500,
                    message:Err.message || "Some error occurred while generating bid passes."
                });
            });


    } catch (error) {
        console.log(error)
        handleError(res, error)
    }
}

module.exports = { generateMypass }