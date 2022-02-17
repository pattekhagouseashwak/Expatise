const { handleError } = require('../../middleware/utils')

const AdsPrint_Db = require('../../models/adsPrint_Db')

const AdsBlog_Db = require('../../models/adsBlog_Db')

const AdsVideo_Db = require('../../models/adsVideo_Db')

const AdsFeature_db = require('../../models/adFeature_Db')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const deleteAd = async (req, res) => {//console.log(req.files )
  try {
    let modelName;

    if(req.body.reqType == "1"){
        modelName = AdsPrint_Db;
    }
    else if(req.body.reqType == "2"){
        modelName = AdsBlog_Db;
    }
    else if(req.body.reqType == "3"){
        modelName = AdsVideo_Db;
    }
    else if( req.body.reqType == "4"){
      modelName = AdsFeature_db;
    }
    else{
      res.status(400).send({ status: 400, message: "no operations found!!"})
     }

    await modelName.findByIdAndDelete({_id:req.body.id})
                      .then(async()=>{
                                      res.status(200).send({ status: 200, message: "your iteam has been successfully Deleted"})
                                     })
                      .catch(Err => {
                                      res.status(500)
                                      .send({
                                            status: 500,message:Err.message || "Some error occurred while deleting item."
                                             });
                                        });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { deleteAd }