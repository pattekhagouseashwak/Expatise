const { handleError } = require('../../middleware/utils')

const Auctioneer = require('../../models/Auctioneer')

const Bidder = require('../../models/Bidder')

const bcrypt = require('bcryptjs')

const {generateOTP} = require('./helpers/generateOTP')

const {getForwardTime} = require('./helpers/getForwardTime')

const appInfo = require('../../../settings.json')

const {sendEmailToCustomer} = require('./helpers/sendEmailToCustomer')

const emailConstants = require("../../constant/email-template/email-content")

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

//check registered Email Id or username
exports.checkEmail = async (emailId,reqType) => {
  var cursorData;
  if(reqType == 1)
  {await Auctioneer.findOne({Email:emailId})
      .select("Email")
      .then((result) => {
          cursorData = result;
      }).catch(err => {
          cursorData=null;
      });
  }
  else if(reqType == 2)
    {await Bidder.findOne({Email:emailId})
      .select("Email")
      .then((result) => {
          cursorData = result;
      }).catch(err => {
          cursorData=null;
      });
  }
  return cursorData;
}

const forgotPasswordAuctioneer = async (req, res) => {
  try {

    const user = await this.checkEmail(req.body.Email,1);

    if(user!=null){
      if(user.Email != req.body.Email){
        return res.status(400).send({status:400,message:"Email has not registered"});
      }
    }
    const Email = req.body.Email;
    const rounds = appInfo.rounds;
    const Email_Expiry_time = await getForwardTime(240.00);
    const Emailotp = await generateOTP(appInfo.emailOtpLength);
    const Email_otp = await bcrypt.hash(Emailotp, rounds);
    
    await Auctioneer.findByIdAndUpdate({_id:user._id},
                                      {
                                        Email,
                                        Email_otp,
                                        Email_Expiry_time,
                                      },{new:true})
                    .then(async(data)=>{console.log(data)
                        if(data.Email == Email)
                       {
                         let host=req.get('host');
	                     console.log("host:",host);
                         await sendEmailToCustomer(host,Email,Email_otp,4,emailConstants.ResetPassword,emailConstants.htmlContent_ResetPassword,data.FirstName);
                         res.status(200).send({ status: 200, message: "Kindly check your mail to verify your Email ID!!"})
                       }
                                        }).catch(Err => {
                                            res.status(500).send({
                                            status: 500,
                                            message:Err.message || "Some error occurred while sending verfication mail."
                                            });
                                        });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

const forgotPasswordBidder = async (req, res) => {
  try {
    const user = await this.checkEmail(req.body.Email,2);

    console.log(req.body.Email)
    
    if(user!=null){
      if(user.Email != req.body.Email){
        return res.status(400).send({status:400,message:"Email has not registered"});
      }
    }

    const Email = req.body.Email;
    const rounds = appInfo.rounds;
    const Email_Expiry_time = await getForwardTime(240.00);
    const Emailotp = await generateOTP(appInfo.emailOtpLength);
    const Email_otp = await bcrypt.hash(Emailotp, rounds);
    
    await Bidder.findByIdAndUpdate({_id:user._id},
                        {
                        Email:Email,
                        Email_otp,
                        Email_Expiry_time,
                        })
              .then(async(data)=>{
                        if(data.Email == Email)
                       { 
                         let host=req.get('host');
	                     console.log("host:",host);
                         await sendEmailToCustomer(host,Email,Email_otp,5,emailConstants.ResetPassword,emailConstants.htmlContent_ResetPassword,data.FirstName);
                         res.status(200).send({ status: 200, message: "Kindly check your mail to verify your Email ID!!"})
                       }
                                        }).catch(Err => {
                                            res.status(500).send({
                                            status: 500,
                                            message:
                                                Err.message || "Some error occurred while sending verfication mail."
                                            });
                                        });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { forgotPasswordBidder, forgotPasswordAuctioneer }