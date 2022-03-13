const { handleError } = require('../../middleware/utils')
const AdsBanner_db = require('../../models/adsBanner_Db')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const createBanner = async (req, res) => {
  try {
      
    //console.log(" s s",req.body)

    const BannerID = 'Banner_' + (new Date()).getTime();
    const BannerImage = req.body.BannerImage;
    
    if(req.body.BannerImage.length == 0){
        return  res.status(400).send({ status: 400, message: "BannerImage can't be empty!!"});
    }

    //console.log(BannerID,BannerImage)

    await AdsBanner_db.create({BannerID,BannerImage})
                       .then(() => {
                                       res.status(200).send({ status: 200, message: "succesfully created Banner "});
                                   })
                       .catch(Err => {
                                        res.status(500).send({status: 500,message:Err.message || "Some error occurred while creating Banner."});
                                     });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { createBanner }