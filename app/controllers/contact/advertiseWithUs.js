const { handleError } = require('../../middleware/utils')

const advertise_With_Us = require('../../models/advertiseWithUs')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const advertiseWithUs = async (req, res) => {
    try {
    
      
        const name = req.body.name;
        const phoneNumber = req.body.phoneNumber;
        const email = req.body.email;
        const message = req.body.message;
        const company = req.body.company;
        const country = req.body.country;
        const state = req.body.state;

        await advertise_With_Us.create({name,phoneNumber,email,message,company,country,state})
                               .then(()=>{
                                          res.status(200).send({ status: 200, message: "message succesfully added"})
                                                          }).catch(Err => {
                                                              res.status(500).send({
                                                              status: 500,
                                                              message:
                                                                  Err.message || "Some error occurred while listing item."
                                                              });
                                                          });
      } catch (error) {
        console.log(error)
        handleError(res, error)
      }
}

module.exports = { advertiseWithUs }