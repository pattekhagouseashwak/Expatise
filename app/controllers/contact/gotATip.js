const { handleError } = require('../../middleware/utils')

const got_A_Tip = require('../../models/gotATip')

const Auctioneer = require('../../models/Auctioneer')

const Bidder = require('../../models/Bidder')

const emailConstants = require("../../constant/email-template/email-content")

const { sendEmailToCustomer } = require('../authentication/helpers/sendEmailToCustomer')

const emailConfig = require('../../../config/email')

const { generateId } = require('./validator/generateId')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

//check registered Email Id or username
exports.checkEmail = async (emailId,reqType) => {
  var cursorData;
  if(reqType == 1)
  {
  await Auctioneer.findOne({Email:emailId})
      .select("Email")
      .then((result) => {
          if(result != null){cursorData = true}
          else(cursorData = false)
      }).catch(err => {
          cursorData=false;
      });
  }
  else if(reqType == 2)
  {
    await Bidder.findOne({Email:emailId})
      .select("Email")
      .then((result) => {
        if(result != null){cursorData = true}
        else(cursorData = false)
      }).catch(err => {
          cursorData=false;
      });
  }
  return cursorData;
}

const gotATip = async (req, res) => {
    try {     
        const InqueryNo = await generateId();
        const InqurierType = 'WebSite Development';
        const InqurierName=  req.body.InqurierName;
        const email = req.body.email;
        const phoneNumber = req.body.phoneNumber;
        const comment = req.body.comment;
        const newLetter_status = true;
        let customer;
        let emailStatusInBidder;
        let emailStatusInAuctioneer = await this.checkEmail(email,1);
        if( emailStatusInAuctioneer == true)
        {
          customer = 'Auctioneer';
        }
        else{
          emailStatusInBidder = await this.checkEmail(email,2);
          if( emailStatusInBidder == true){customer = 'Bidder';}
          else{customer = 'non customer';}
        }

        //console.log(InqueryNo,InqurierType,InqurierName,comment,phoneNumber,email,newLetter_status)
        await got_A_Tip.create({InqueryNo,InqurierType,InqurierName,comment,phoneNumber,email,newLetter_status})
                  .then(async (data) => {
                                         let host = req.get('host');
                                         console.log("host:", host);
                                         await sendEmailToCustomer(host, data.email, "NA",6, emailConstants.ThankYouForYourValuableFeedback, emailConstants.htmlcontent_GOTATIPFORUS, data.InqurierName,emailConfig.username_suggestions);        
                                         res.status(200).send({ status: 200, message: "message succesfully added"})
                                        })
                  .catch(Err => {
                                 res.status(500).send({status: 500,message:Err.message || "Some error occurred while listing item."});
                                });
      } catch (error) {
        console.log(error)
        handleError(res, error)
      }
    
}

module.exports = { gotATip }