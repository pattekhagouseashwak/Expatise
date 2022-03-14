const { handleError } = require('../../middleware/utils')

const AdsVideo_Db = require('../../models/adsVideo_Db')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const deleteVideo = async (req, res) => {//console.log(req.files )
  try {
    
    if(req.body.id.lenght == 0){
      res.status(400).send({ status: 400, message: "id can't be empty !!"})
     }

    await AdsVideo_Db.findByIdAndDelete({_id:req.body.id})
                      .then(()=>{
                                      res.status(200).send({ status: 200, message: "your iteam has been successfully Deleted"})
                                })
                      .catch(Err => {
                                      res.status(500)
                                      .send({status: 500,message:Err.message || "Some error occurred while deleting item."});
                                        });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { deleteVideo }