const { handleError } = require('../../middleware/utils')
const TypeSection = require('../../models/typeSection')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const deleteType = async (req, res) => {
  try {
      
    console.log(" s s",req.body)

    const id = req.body.id;
    
    if(req.body.id.length == 0){
        return  res.status(400).send({ status: 400, message: "typeId can't be empty!!"});
    }

    //console.log(typeID,typeImage)

    await TypeSection.findByIdAndDelete({_id:id})
                       .then(() => {
                                       res.status(200).send({ status: 200, message: "succesfully deleted type "});
                                   })
                       .catch(Err => {
                                        res.status(500).send({status: 500,message:Err.message || "Some error occurred while deleting type."});
                                     });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { deleteType }