const { handleError } = require('../../middleware/utils')

const contact_Us = require('../../models/contactUs')

const Auctioneer = require('../../models/Auctioneer')

const Bidder = require('../../models/Bidder')

const emailConstants = require("../../constant/email-template/email-content")

const { sendEmailToCustomer } = require('../authentication/helpers/sendEmailToCustomer')

const emailConfig = require('../../../config/email')

const {generateId} = require('./validator/generateId')

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

const contactUs = async (req, res) => {
   
        try {      
          const InqurierName = req.body.InqurierName;
          const InqurierType = 'contact Us';
          const phoneNumber = req.body.phoneNumber;
          const email = req.body.email;
          const comment = req.body.comment;
          const InqueryNo = await generateId();
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
          
          await contact_Us.create({InqueryNo,InqurierName,InqurierType,phoneNumber,email,comment,newLetter_status,customer})
                          .then(async(data)=>{
                                    let host = req.get('host');
                                    console.log("host:", host);
                                    await sendEmailToCustomer(host, data.email, "NA",3, emailConstants.ThankYouForContactingUs, emailConstants.htmlContent_ContactUs, data.InqurierName,emailConfig.username_support);
                                      res.status(200).send({ status: 200, message: "message succesfully added"})
                                                      }).catch(Err => {
                                                          res.status(500).send({
                                                          status: 500,
                                                          message:
                                                              Err.message || "Some error occurred while listing item."
                                                          });
                                                      });
        } catch (error) {
          console.log(error)
          handleError(res, error)
        }  
}

module.exports = { contactUs }