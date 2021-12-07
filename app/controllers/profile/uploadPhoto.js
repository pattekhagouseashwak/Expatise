const { handleError } = require('../../middleware/utils')

const Auctioneer = require('../../models/Auctioneer')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const uploadAuctioneerProfile = async (req, res) => {
  try {
    
    const id = req.user._id
    
    //console.log(id)

    const Photo = req.body.Photo
    
    await Auctioneer.findOneAndUpdate({_id:id},
                                      { Photo,}
                                     ,{new:true})
              .select("-password -is_EmailVerified -otp -Expiry_time -is_PhoneVerified -createdAt -updatedAt -Email_Expiry_time -Email_otp")
              .then((data)=>{
                            res.status(200).send({ status: 200, message: "successfully Auctioneer profile Photo has updated!!",data})
                            }
                                        ).catch(Err => {
                                            res.status(500).send({
                                            status: 500,
                                            message:
                                                Err.message || "Some error occurred while updating Auctioneer Profile Photo."
                                            });
                                        });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { uploadAuctioneerProfile }