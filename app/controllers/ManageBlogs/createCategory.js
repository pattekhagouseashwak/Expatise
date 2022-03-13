const { handleError } = require('../../middleware/utils')
const CategorySection = require('../../models/categorySection')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const createCategory = async (req, res) => {
  try {
      
    //console.log(" s s",req.body)
    
    if(req.body.categoryName.length == 0){
        return  res.status(400).send({ status: 400, message: "categoryName can't be empty!!"});
    }

    const data = await CategorySection.findOne({categoryName:req.body.categoryName});
   
    if(data != null){
        return  res.status(400).send({ status: 400, message: "categoryName already exist already!!"});
    }
    
    const categoryID = 'category_' + (new Date()).getTime();
    const categoryName = req.body.categoryName;

    await CategorySection.create({categoryID,categoryName})
                       .then(() => {
                                       res.status(200).send({ status: 200, message: "succesfully created category "});
                                   })
                       .catch(Err => {
                                        res.status(500).send({status: 500,message:Err.message || "Some error occurred while creating category."});
                                     });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { createCategory }