const { handleError } = require('../../middleware/utils')

const Auctioneer = require('../../models/Auctioneer')

const Bidder = require('../../models/Bidder')

const bcrypt = require('bcryptjs')

const {generateOTP} = require('./helpers/generateOTP')

const {getForwardTime} = require('./helpers/getForwardTime')

const appInfo = require('../../../settings.json')

const emailConstants = require("../../constant/email-template/email-content")

const emailConfig = require('../../../config/email')

const {sendEmailToCustomer} = require('./helpers/sendEmailToCustomer')

const {generateTickerSymbol} = require('./helpers/generateTickerSymbol')

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

const registerAuctioneer = async (req, res) => {
  try {

    const user = await this.checkEmail(req.body.Email,1);

    if(user!=null){
      if(user.Email == req.body.Email){
        return res.status(400).send({status:400,message:"Email is already registered"});
      }
    }
    const id = req.body.id;
    const companyName = req.body.companyName;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const streetAddress = req.body.streetAddress;
    const zip = req.body.zip;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;
    const Email = req.body.Email;
    const photo = req.body.photo;
    const auctioneerID = "AUC"+req.body.auctioneerLicensceNo;
    const auctioneerLicensceNo = req.body.auctioneerLicensceNo;
    const auctioneerLicenscePhoto = req.body.auctioneerLicenscePhoto;
    const website = req.body.website;
    const rounds = appInfo.rounds;
    const password = await bcrypt.hash(req.body.password, rounds);
    const Email_Expiry_time = await getForwardTime(240.00);
    const Emailotp = await generateOTP(appInfo.emailOtpLength);
    const Email_otp = await bcrypt.hash(Emailotp, rounds);
    const tickerSymbol = await generateTickerSymbol(req.body.companyName, req.body.city);

    if(await Auctioneer.findOne({id,is_PhoneVerified:true}) == null){
      return res.status(400).send({status:400,message:"please verify mobile number"});
    }
    
    await Auctioneer.findByIdAndUpdate({_id:id,is_PhoneVerified:true},
                                      {
                                        CompanyName:companyName,
                                        FirstName:firstName,
                                        LastName:lastName,
                                        StreetAddress:streetAddress,
                                        City:city,
                                        State:state,
                                        Country:country,
                                        ZipCode:zip,
                                        Email:Email,
                                        Photo:photo,
                                        AuctioneerID:auctioneerID,
                                        AuctioneerLicensceNo:auctioneerLicensceNo,
                                        AuctioneerLicenscePhoto:auctioneerLicenscePhoto,
                                        Website:website,
                                        password:password,
                                        Email_otp,
                                        Email_Expiry_time,
                                        tickerSymbol
                                      },{new:true})
              .then(async(data)=>{console.log(data)
                        if(data.Email == Email)
                       {
                         //await mailchimpService(Email,fristName,lastName);
                         let host=req.get('host');
	                       console.log("host:",host);
                         await sendEmailToCustomer(host,Email,Email_otp,1,emailConstants.MailVerificationAuctioneer,emailConstants.htmlContent_SignUpAuctioneer,data.FirstName,emailConfig.username_notify);
                         res.status(200).send({ status: 200, message: "successfully User Details has uploaded and verification mail has been sent to the respested email !!"})
                       }
                                        }).catch(Err => {
                                            res.status(500).send({
                                            status: 500,
                                            message:
                                                Err.message || "Some error occurred while adding User Details."
                                            });
                                        });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

const registerBidder = async (req, res) => {
  try {
    const user = await this.checkEmail(req.body.Email,2);

    console.log(req.body.Phone)
    
    if(user!=null){
      if(user.Email == req.body.Email){
        return res.status(400).send({status:400,message:"Email is already registered"});
      }
    }

    if(await Bidder.findOne({Phone:req.body.Phone}) != null){
      return res.status(400).send({status:400,message:"Phone Nmber is already registered"});
    }

    //const id = req.body.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const streetAddress = req.body.streetAddress;
    const Phone = req.body.Phone;
    const zip = req.body.zip;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;
    const Email = req.body.Email;
    const rounds = appInfo.rounds;
    const password = await bcrypt.hash(req.body.password, rounds);
    const Email_Expiry_time = await getForwardTime(240.00);
    const Emailotp = await generateOTP(appInfo.emailOtpLength);
    const Email_otp = await bcrypt.hash(Emailotp, rounds);
    const DrivingLicenseNo = req.body.DrivingLicenseNo;
    const DrivingLicensePhoto = req.body.DrivingLicensePhoto;
    const bidderID = "BID"+await generateOTP(appInfo.otpLength);

    // if(await Bidder.findOne({id,is_PhoneVerified:true}) == null){
    //   return res.status(400).send({status:400,message:"please verify mobile number"});
    // }
    
    await Bidder.create({
                                        FirstName:firstName,
                                        LastName:lastName,
                                        StreetAddress:streetAddress,
                                        City:city,
                                        Phone:Phone,
                                        State:state,
                                        Country:country,
                                        ZipCode:zip,
                                        Email:Email,
                                        password:password,
                                        Email_otp,
                                        Email_Expiry_time,
                                        DrivingLicenseNo,
                                        DrivingLicensePhoto,
                                        BidderID:bidderID
                                      })
              .then(async(data)=>{
                        if(data.Email == Email)
                       { //console.log(data)
                         //await mailchimpService(Email,fristName,lastName);
                         let host=req.get('host');
	                       console.log("host:",host);
                         await sendEmailToCustomer(host,Email,Email_otp,2,emailConstants.SignUpBidder,emailConstants.htmlContent_SignUpBidder,data.FirstName,emailConfig.username_notify);
                         await sendEmailToCustomer(host,Email,Email_otp,2.1,emailConstants.VerificationEmailBidder,emailConstants.htmlContent_VerificationEmailBidder,data.FirstName,emailConfig.username_notify);
                         res.status(200).send({ status: 200, message: "Thank you for Signing Up. Kindly check your mail to verify your Email ID!!"})
                       }
                                        }).catch(Err => {
                                            res.status(500).send({
                                            status: 500,
                                            message:
                                                Err.message || "Some error occurred while adding User Details."
                                            });
                                        });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { registerBidder, registerAuctioneer }