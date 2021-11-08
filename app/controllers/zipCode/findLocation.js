const { handleError } = require('../../middleware/utils')

const zipCode = require('../../models/zipcodes')

const { response } = require('express')



/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const findLocation = async (req, res) => {
  try {
       const zip_code = req.body.zip_code

       //console.log(zip_code)

       if(zip_code.length == 0){

        return res.status(400).send({ status: 400, message: "zip_code is empty!!"})

       }

       //    const count = await zipCode.countDocuments();
      // console.log(count)
                            await zipCode.findOne({zip_code})
                                        .then((data)=>{
                                            if(data != null)
                                            {res.status(200).send({ status: 200, message: "successfully fetch zipcode!!",data});}
                                            else{
                                            res.status(200).send({ status: 400, message: "The Zip code entered is invalid"}); 
                                            }
                                        }).catch(Err => {
                                            res.status(500).send({
                                            status: 500,
                                            message:
                                                Err.message || "Some error occurred while fetching location details."
                                            });
                                        });
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { findLocation }
