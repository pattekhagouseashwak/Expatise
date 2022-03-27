const { handleError } = require('../../middleware/utils')

const Faq = require('../../models/Faq')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const getFaq = async (req, res) => {
  try {
    await Faq.find()
    .then((data)=>{
                  if(data != null){
                  res.status(200).send({ status: 200, message: "successfully fetched!!",data})
                  }
                  else if(data == null){
                    res.status(200).send({ status: 200, message: "No data Found!!"})
                    }
                }
                              ).catch(Err => {
                                  res.status(500).send({
                                  status: 500,
                                  message:
                                      Err.message || "Some err occurred while fetching."
                                  });
                              });    
    
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { getFaq}