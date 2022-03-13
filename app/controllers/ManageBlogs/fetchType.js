const { handleError } = require('../../middleware/utils')
const TypeSection = require('../../models/typeSection')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchType = async (req, res) => {
  try {
      
    await TypeSection.find({})
                       .then((data) => {
                                       res.status(200).send({ status: 200, message: "succesfully fetched types ",data});
                                   })
                       .catch(Err => {
                                        res.status(500).send({status: 500,message:Err.message || "Some error occurred while fetching types."});
                                     });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { fetchType }