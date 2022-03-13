const { handleError } = require('../../middleware/utils')
const TypeSection = require('../../models/typeSection')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const createType = async (req, res) => {
  try {
      
    //console.log(" s s",req.body)
    
    if(req.body.typeName.length == 0){
        return  res.status(400).send({ status: 400, message: "typeName can't be empty!!"});
    }

    const data = await TypeSection.findOne({typeName:req.body.typeName});
   
    if(data != null){
        return  res.status(400).send({ status: 400, message: "typeName already exist already!!"});
    }
    
    const typeID = 'type_' + (new Date()).getTime();
    const typeName = req.body.typeName;

    await TypeSection.create({typeID,typeName})
                       .then(() => {
                                       res.status(200).send({ status: 200, message: "succesfully created type "});
                                   })
                       .catch(Err => {
                                        res.status(500).send({status: 500,message:Err.message || "Some error occurred while creating type."});
                                     });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { createType }