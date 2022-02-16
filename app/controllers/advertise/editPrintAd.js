const { handleError } = require('../../middleware/utils')

const AdsPrint_Db = require('../../models/adsPrint_Db')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const editPrintAd = async (req, res) => {
  try {console.log(" s s")

    const AdvertisementID = req.body.AdvertisementID;
    const CustomBanner = req.body.CustomBanner;
    const TypeOfAuction = req.body.TypeOfAuction;
    const State = req.body.State;
    const Date = req.body.Date;
    const Time = req.body.Time;
    const StartsFrom = req.body.StartsFrom;
    const EndOn = req.body.EndOn;
    const PrintAdTitle = req.body.PrintAdTitle;
    const ActionLink = req.body.ActionLink;
    const LogoOfTheCompany = req.body.LogoOfTheCompany;
    const PrintImage = req.body.PrintImage;

    await AdsPrint_Db.findByIdAndUpdate({_id:req.body.id},
                                        {AdvertisementID,CustomBanner,
                                          TypeOfAuction,State,Date,
                                          Time,StartsFrom,EndOn,
                                          PrintAdTitle,ActionLink,
                                          LogoOfTheCompany,PrintImage})
                       .then(() => {
                                       res.status(200).send({ status: 200, message: "succesfully edited editPrintAd" })
                                   })
                       .catch(Err => {
                                        res.status(500).send({
                                        status: 500,
                                        message:Err.message || "Some error occurred while editing PrintAd item."
                                        });
                                    }); 
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}
module.exports = { editPrintAd }