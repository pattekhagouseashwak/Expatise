const { handleError } = require('../../middleware/utils')
const AdsBanner_db = require('../../models/adsBanner_Db')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const deleteBanner = async (req, res) => {
  try {
      
    //console.log(" s s",req.body)

    const id = req.body.id;
    
    if(req.body.id.length == 0){
        return  res.status(400).send({ status: 400, message: "BannerID can't be empty!!"});
    }
    
    await AdsBanner_db.findByIdAndDelete({_id:id})
                       .then(() => {
                                       res.status(200).send({ status: 200, message: "succesfully deleted Banners "});
                                   })
                       .catch(Err => {
                                        res.status(500).send({status: 500,message:Err.message || "Some error occurred while deleteing Banners."});
                                     });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { deleteBanner }