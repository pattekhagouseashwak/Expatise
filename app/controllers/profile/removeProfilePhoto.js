const { handleError } = require('../../middleware/utils')

const Auctioneer = require('../../models/Auctioneer')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const removeProfilePhoto = async (req, res) => {
  try {
    
    const id = req.user._id
    
    //console.log(id)

    const Photo = req.body.Photo

    if(Photo != null){
        return res.status(400).send({ status: 400, message: "Photo value is not null!!"})
    }
    
    await Auctioneer.findOneAndUpdate({_id:id},
                                      { Photo,}
                                     ,{new:true})
              .select("-password -is_EmailVerified -otp -Expiry_time -is_PhoneVerified -createdAt -updatedAt -Email_Expiry_time -Email_otp")
              .then((data)=>{
                            res.status(200).send({ status: 200, message: "successfully Auctioneer profile Photo has removed!!",data})
                            }
                                        ).catch(Err => {
                                            res.status(500).send({
                                            status: 500,
                                            message:
                                                Err.message || "Some error occurred while removing Auctioneer Profile Photo."
                                            });
                                        });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { removeProfilePhoto }