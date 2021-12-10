const { handleError } = require('../../middleware/utils')

const contact_Us = require('../../models/contactUs')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const contactUs = async (req, res) => {
   
        try {      
          const name = req.body.name;
          const phoneNumber = req.body.phoneNumber;
          const email = req.body.email;
          const message = req.body.message;
          
          await contact_Us.create({name,phoneNumber,email,message})
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

module.exports = { contactUs }