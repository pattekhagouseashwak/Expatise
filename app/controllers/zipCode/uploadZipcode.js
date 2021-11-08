const { handleError } = require('../../middleware/utils')

const zipCode = require('../../models/zipcodes')

const { response } = require('express')



/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const uploadZipcode = async (req, res) => {
  try {
       const data = req.body.data

       //console.log(data)

       if(data.length == 0){

        return res.status(400).send({ status: 400, message: "zipCode json data is empty!!"})

       }
                            await zipCode.insertMany(data)
                                        .then(()=>{
                                            res.status(200).send({ status: 200, message: "successfully uploaded zipcode data!!"})
                                        }).catch(Err => {
                                            res.status(500).send({
                                            status: 500,
                                            message:
                                                Err.message || "Some error occurred while uploading zipcode."
                                            });
                                        });
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { uploadZipcode }
