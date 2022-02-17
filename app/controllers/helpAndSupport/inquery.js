const { handleError } = require('../../middleware/utils')

const contact_Us = require('../../models/contactUs')

const got_A_Tip = require('../../models/gotATip')

const HostingServices = require('../../models/hostingServices')

const WebDevServices = require('../../models/webDevServices')

const advertise_With_Us = require('../../models/advertiseWithUs')

const GotQuestionRelatedToAuctionLaw = require('../../models/gotQuestionRelatedToAuctionLaw')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const inquery = async (req, res) => {
  try {

    let modelName;
    if(req.body.reqType == 1){modelName = contact_Us;}
    else if(req.body.reqType == 2){modelName = got_A_Tip;}
    else if(req.body.reqType == 3){modelName = HostingServices;}
    else if(req.body.reqType == 4){modelName = WebDevServices;}
    else if(req.body.reqType == 5){modelName = advertise_With_Us;}
    else if(req.body.reqType == 6){modelName = GotQuestionRelatedToAuctionLaw;}
    else {
      return res.status(400).send({ status: 400, message: "No Data found" })
      }

    await modelName.find({})
                       .sort("createdAt")
                       .then((inquery_details) => {
                                                   res.status(200).send({ status: 200, message: "succesfully fetched inquery",inquery_details })
                                                   })
                       .catch(Err => {
                                        res.status(500).send({
                                        status: 500,
                                        message:Err.message || "Some error occurred while fetching inquery_details."
                                        });
                                    });


  } catch (error) {
    console.log(error)
    handleError(res, error)
  }

}

module.exports = { inquery }