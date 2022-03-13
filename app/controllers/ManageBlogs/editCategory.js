const { handleError } = require('../../middleware/utils')
const CategorySection = require('../../models/categorySection')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const editCategory = async (req, res) => {
  try {
      
    console.log(" s s",req.body)

       
    if(req.body.id.length == 0){
        return  res.status(400).send({ status: 400, message: "categoryId can't be empty!!"});
    }
    
    const data = await CategorySection.findOne({categoryName:req.body.categoryName});
   
    if(data != null){
        return  res.status(400).send({ status: 400, message: "categoryName already exist already!!"});
    }

    const id = req.body.id;
    const categoryName = req.body.categoryName;

    await CategorySection.findByIdAndUpdate({_id:id},{categoryName},{new:true})
                       .then((categoryData) => {
                                       res.status(200).send({ status: 200, message: "succesfully editd category ",categoryData});
                                   })
                       .catch(Err => {
                                        res.status(500).send({status: 500,message:Err.message || "Some error occurred while deleting category."});
                                     });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { editCategory }