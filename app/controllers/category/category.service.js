const { handleError } = require('../../middleware/utils')
const category = require('../../models/category')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

// To add category names into database.....
const addCategoryNames = async (req, res) => {
  try {
    const name = req.body.categoryname
    await category.create({ name: name })
      .then(() => {
        res.status(200).send({
          status: 200,
          message: "Added Category Name."
        })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message: Err.message || "Internal Error."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

// To fetch category names.....
const getCategoryNames = async (req, res) => {
  try {
    await category.find({})
      .select('name')
      .then((data) => {
        res.status(200).send({
          status:200,
          message:"get category details.",
          response:data
        })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message: Err.message || "Internal Error."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

// To remove category names.....
const removeCategoryNames = async (req, res) => {
  try {
    const id = req.params.id;
    await category.findByIdAndDelete({_id:id})
      .then(() => {
        res.status(200).send({
          status:200,
          message:"category name removed."
        })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message: Err.message || "Internal Error."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { addCategoryNames, getCategoryNames, removeCategoryNames}