const { handleError } = require('../../middleware/utils')

const got_A_Tip = require('../../models/gotATip')

const emailConstants = require("../../constant/email-template/email-content")

const { sendEmailToCustomer } = require('../authentication/helpers/sendEmailToCustomer')

const emailConfig = require('../../../config/email')


/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const gotATip = async (req, res) => {
    try {     
        const name = req.body.name;
        const phoneNumber = req.body.phoneNumber;
        const email = req.body.email;
        const message = req.body.message;
  
        await got_A_Tip.create({name,phoneNumber,email,message})
                  .then(async (data) => {
                                         let host = req.get('host');
                                         console.log("host:", host);
                                         await sendEmailToCustomer(host, data.email, "NA",6, emailConstants.ThankYouForYourValuableFeedback, emailConstants.htmlcontent_GOTATIPFORUS, data.name,emailConfig.username_suggestions);        
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