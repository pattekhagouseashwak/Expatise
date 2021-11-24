const { handleError } = require('../../middleware/utils')

const Auctioneer = require('../../models/Auctioneer')

const Bidder = require('../../models/Bidder')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const editProfile = async (req, res) => {
  try {
    
    const id = req.user._id
    
    console.log(id)

    const companyName = req.body.companyName
    const FirstName = req.body.firstName
    const LastName = req.body.lastName
    const Photo = req.body.Photo
    const StreetAddress =  req.body.StreetAddress
    const Phone = req.body.Phone
    const AlternateContact = req.body.AlternateContact
    const Email = req.body.Email
    const website = req.body.website
    const AuctioneerBio = req.body.AuctioneerBio
    const facebook =  req.body.facebook
    const youtube =  req.body.youtube
    const instagram = req.body.instagram
    const linkedin = req.body.linkedin
    
    await Auctioneer.findOneAndUpdate({_id:id},
                                      { companyName,
                                        FirstName,
                                        LastName,
                                        Photo,
                                        StreetAddress,
                                        Phone,
                                        AlternateContact,
                                        Email,
                                        website,
                                        AuctioneerBio,
                                        facebook,
                                        youtube,
                                        instagram,
                                        linkedin},{new:true})
              .select("-password -is_EmailVerified -otp -Expiry_time -is_PhoneVerified -createdAt -updatedAt -Email_Expiry_time -Email_otp")
              .then((data)=>{
                            res.status(200).send({ status: 200, message: "successfully Auctioneer profile Details has updated!!",data})
                            }
                                        ).catch(Err => {
                                            res.status(500).send({
                                            status: 500,
                                            message:
                                                Err.message || "Some error occurred while updated Auctioneer profile."
                                            });
                                        });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { editProfile }