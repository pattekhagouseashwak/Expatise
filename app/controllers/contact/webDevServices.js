const WebDevServices = require('../../models/webDevServices')

const emailConstants = require("../../constant/email-template/email-content")

const { sendEmailToCustomer } = require('../authentication/helpers/sendEmailToCustomer')

const emailConfig = require('../../../config/email')

const { generateId } = require('./validator/generateId')
/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const webDevServices = async (req, res) => {
   
        try {      
          const First_Name = req.body.First_Name;
          const Last_Name = req.body.Last_Name;
          const Phone_Number = req.body.Phone_Number;
          const Email = req.body.Email;
          const InqueryNo = await generateId();
          
          await WebDevServices.create({InqueryNo,First_Name,Last_Name,Phone_Number,Email})
                          .then(async (data) => {
                                                 let host = req.get('host');
                                                 console.log("host:", host);
                                                 await sendEmailToCustomer(host, data.Email, "NA",3, emailConstants.RequestForWebsiteDevelopment, emailConstants.htmlcontent_WEBSITEDEVELOPMENTSERVICES, data.First_Name,emailConfig.username_bussiness);
                                                 res.status(200).send({ status: 200, message: "succesfully added details in DB"})
                                                      }).catch(Err => {
                                                          res.status(500).send({
                                                          status: 500,
                                                          message:
                                                              Err.message || "Some error occurred while adding details in DB."
                                                          });
                                                      });
        } catch (error) {
          console.log(error)
          res.status(500).send({status: 500,message:error || "Some error occurred over the services."});
        }
}

module.exports = { webDevServices }