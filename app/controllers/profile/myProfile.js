const { handleError } = require('../../middleware/utils')

const Auctioneer = require('../../models/Auctioneer')

const Bidder = require('../../models/Bidder')

const appInfo = require('../../../settings.json')
const { password } = require('../../../config/email')


/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const myProfile = async (req, res) => {
  try {
    //const id = "618c214244de586170b4b8d2"
    
    const id = req.user._id
    
    console.log(id)
    
    await Auctioneer.findOne({_id:id})
              .select("-password -is_EmailVerified -otp -Expiry_time -is_PhoneVerified -createdAt -updatedAt -Email_Expiry_time -Email_otp")
              .then((data)=>{
                            res.status(200).send({ status: 200, message: "successfully Auctioneer profile Details has fetched!!",data})
                            }
                                        ).catch(Err => {
                                            res.status(500).send({
                                            status: 500,
                                            message:
                                                Err.message || "Some error occurred while fetching Auctioneer profile."
                                            });
                                        });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { myProfile }