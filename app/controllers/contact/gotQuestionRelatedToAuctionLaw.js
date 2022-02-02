const GotQuestionRelatedToAuctionLaw = require('../../models/gotQuestionRelatedToAuctionLaw')

const emailConstants = require("../../constant/email-template/email-content")

const { sendEmailToCustomer } = require('../authentication/helpers/sendEmailToCustomer')

const emailConfig = require('../../../config/email')


/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const gotQuestionRelatedToAuctionLaw = async (req, res) => {
   
        try {      
          const Your_Question = req.body.Your_Question;
          const Email = req.body.Email;
          
          await GotQuestionRelatedToAuctionLaw.create({Email,Your_Question})
                          .then(async (data) => {
                                                  let host = req.get('host');
                                                  console.log("host:", host);
                                                  await sendEmailToCustomer(host, Email, "NA",6, emailConstants.YouAreAtTheRightPlace, emailConstants.htmlContent_YouAreAtTheRightPlace, "NA",emailConfig.username_auctionLaws); 
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

module.exports = { gotQuestionRelatedToAuctionLaw }