const { handleError } = require('../../middleware/utils')
const CategorySection = require('../../models/categorySection')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchCategory = async (req, res) => {
  try {
      
    await CategorySection.find({})
                         .select("categoryName")
                         .then((data) => {
                                       res.status(200).send({ status: 200, message: "succesfully fetched categorys ",data});
                                       })
                       .catch(Err => {
                                        res.status(500).send({status: 500,message:Err.message || "Some error occurred while fetching categorys."});
                                     });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { fetchCategory }