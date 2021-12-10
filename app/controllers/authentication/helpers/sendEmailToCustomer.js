const emailConfig = require('../../../../config/email')
var express=require('express');
var app=express();
const { encrypt } = require('../helpers/encrypt ')
const appInfo = require('../../../../settings.json')
const sgMail = require('@sendgrid/mail')


/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

// Sending Emails
const sendEmailToCustomer = async(host,toEmailId,rand,type) => { //console.log(toEmailId,rand)

  sgMail.setApiKey(appInfo.SENDGRID_API_KEY)

    /*var mail = nodemailer.createTransport({
      //host: emailConfig.host,
      //port: emailConfig.port,
      secure: true, // true for 465, false for other ports
      service: emailConfig.service, //Gmail service
      auth: {
        user: emailConfig.username, // your domain email address
        pass: emailConfig.password // your password
      }
    });*/

    var email = await encrypt(toEmailId);
	  
    if(type == 1)
    {link="http://"+host+"/api/verifyAuctioneer?id="+rand+"&address="+email;}
    else if(type == 2)
    {link="http://"+host+"/api/verifyBidder?id="+rand+"&address="+email;}
   
    //verification content for Auctioner and Bidder
    if(type == 1 || type == 2){
     
      var mailOptions = {
        to: toEmailId, // Change to your recipient
        from: emailConfig.username,//'no-reply@auctionjournal.com', // Change to your verified sender
        subject: "Verify Email with Auction Journal",
        html: "Hi there!<br>Thank you for signing up.<br>To get you started, please click on the button below to confirm your email address. It will only take a couple of seconds.<br><a href="+link+">Click here to verify</a><br>Regards,<br>Auction Journal<br>Support Team.<br>"
      }

    }// Thanks for completion the singup process for Auctioner
    else if(type == 3){    
     var mailOptions = {
        to: toEmailId, // Change to your recipient
        from: emailConfig.username, // Change to your verified sender
        subject : "Thanks for completion the singup process",
        html: "Hello there!<br><br>Thanks for completing the sign-up process! Your auctioneer account will be active soon with Auction Journal. Grab your mug of coffee, and stay tuned for auction updates.<br><br>Kind Regards,<br><br>Auction Journal<br>"
     }
    }

  //console.log(mailOptions);
  //sending mail to users
   await sgMail
    .send(mailOptions)
    .then((response) => {
      console.log(response[0].statusCode)
    })
    .catch((error) => {
      console.error(error)
    })
  }
  
  module.exports ={sendEmailToCustomer}