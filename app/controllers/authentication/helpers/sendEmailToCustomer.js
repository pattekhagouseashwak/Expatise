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
const sendEmailToCustomer = async(host,toEmailId,rand,type,mailSubject,content,Name,fromEmailId) => { //console.log(toEmailId,rand,type,mailSubject,content,Name,fromEmailId)

  sgMail.setApiKey(appInfo.SENDGRID_API_KEY)

  var email = await encrypt(toEmailId);

  console.log(toEmailId,Name,fromEmailId)

    if(type == 1)
    {
      link="http://"+host+"/api/verifyAuctioneer?id="+rand+"&address="+email;
      content = content.replace("$Link",link)
      var emailTemplate = content;
      var mailOptions =  {
        to: toEmailId, 
        from: fromEmailId,
        subject: mailSubject,
        html: emailTemplate
     }
     console.log(mailOptions)
    }//verification content for Auctioner and Bidder
    else if(type == 2){

      content = content.replace("$s1", Name);
      var emailTemplate = content
       
      var mailOptions =  {
                            to: toEmailId, 
                            from: fromEmailId,
                            subject: mailSubject,
                            html: emailTemplate
                         }
  
    }
    else if(type == 2.1)
    {
      link="http://"+host+"/api/verifyBidder?id="+rand+"&address="+email;
      content = content.replace("$s1", Name);
      content = content.replace("$Link",link)
      var emailTemplate = content
      console.log("2.1",emailTemplate)
      var mailOptions =  {
        to: toEmailId, 
        from: fromEmailId,
        subject: mailSubject,
        html: emailTemplate
     }
    }// Thanks for completion the singup process for Auctioner
    else if(type == 3){  
      content = content.replace("$s1", Name);
      var emailTemplate = content
       
      var mailOptions =  {
                            to: toEmailId, 
                            from: fromEmailId,
                            subject: mailSubject,
                            html: emailTemplate
                         }
      console.log("3",emailTemplate)
    }
    else if(type == 4)
    {link="http://"+host+"/api/verifyForgetPasswordAuctioneer?id="+rand+"&address="+email;
     content = content.replace("$s1", Name);
     content = content.replace("$s2", Name);
     content = content.replace("$Link",link);
     var emailTemplate = content
     console.log("4",emailTemplate)
     var mailOptions =  {
                          to: toEmailId, 
                          from: fromEmailId,
                          subject: mailSubject,
                          html: emailTemplate
                        }
    }
    else if(type == 5)
    {link="http://"+host+"/api/verifyForgetPasswordBidder?id="+rand+"&address="+email;
    content = content.replace("$s1", Name);
    content = content.replace("$s2", Name);
    content = content.replace("$Link",link);
    var emailTemplate = content
    console.log("4",emailTemplate)
    var mailOptions =  {
                         to: toEmailId, 
                         from: fromEmailId,
                         subject: mailSubject,
                         html: emailTemplate
                       }
    }
    else if(type == 6)
    {
    var emailTemplate = content;
    var mailOptions =  {
                         to: toEmailId, 
                         from: fromEmailId,
                         subject: mailSubject,
                         html: emailTemplate
                       }
    }
    else if(type == 7)
    {
     let data = Name
     content = content.replace("$s1", data.firstName);
     content = content.replace("$ticket_id", data.TicketID);
     content = content.replace("$concern",data.desc);
     var emailTemplate = content
     console.log("7",emailTemplate)
     var mailOptions =  {
                          to: toEmailId, 
                          from: fromEmailId,
                          subject: mailSubject,
                          html: emailTemplate
                        }
    }
    else if(type == 8)
    {
     let data = Name
     content = content.replace("$s1", data.name);
     content = content.replace("$ticket_id", data.TicketID);
     content = content.replace("$concern",data.description);
     var emailTemplate = content
     console.log("8",emailTemplate)
     var mailOptions =  {
                          to: toEmailId, 
                          from: fromEmailId,
                          subject: mailSubject,
                          html: emailTemplate
                        }
    }
    else if(type == 9)
    {
     let data = Name
     content = content.replace("$s1", data[2]+data[3]);
     content = content.replace("$s2", data[0]);
     content = content.replace("$s3",data[1]);
     var emailTemplate = content
     console.log("9",emailTemplate)
     var mailOptions =  {
                          to: toEmailId, 
                          from: fromEmailId,
                          subject: mailSubject,
                          html: emailTemplate
                        }
    }

  //console.log(mailOptions);
  //sending mail to users
   await sgMail
    .send(mailOptions)
    .then((response) => {
      console.log("Done",response[0].statusCode)
    })
    .catch((error) => {
      console.error(error.response.body)
    })
  }
  
  module.exports ={sendEmailToCustomer}