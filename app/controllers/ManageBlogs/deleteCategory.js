const { handleError } = require('../../middleware/utils')
const CategorySection = require('../../models/categorySection')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const deleteCategory = async (req, res) => {
  try {
      
    console.log(" s s",req.body)

    const id = req.body.id;
    
    if(req.body.id.length == 0){
        return  res.status(400).send({ status: 400, message: "categoryId can't be empty!!"});
    }

    //console.log(categoryID,categoryImage)

    await CategorySection.findByIdAndDelete({_id:id})
                       .then(() => {
                                       res.status(200).send({ status: 200, message: "succesfully deleted category "});
                                   })
                       .catch(Err => {
                                        res.status(500).send({status: 500,message:Err.message || "Some error occurred while deleting category."});
                                     });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { deleteCategory }