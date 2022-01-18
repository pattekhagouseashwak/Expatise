const HostingServices = require('../../models/hostingServices')
const {sendEmailToCustomer} = require('../../controllers/authentication/helpers/sendEmailToCustomer')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const hostingServices = async (req, res) => {
   
        try {      
          const First_Name = req.body.First_Name;
          const Last_Name = req.body.Last_Name;
          const Phone_Number = req.body.Phone_Number;
          const Email = req.body.Email;
          
          await HostingServices.create({First_Name,Last_Name,Phone_Number,Email})
                          .then(()=>{
                                      res.status(200).send({ status: 200, message: "succesfully added details in DB"})
                                                      }).catch(Err => {
                                                          res.status(500).send({
                                                          status: 500,
                                                          message:
                                                              Err.message || "Some error occurred while adding details in DB."
                                                          });
                                                      });
        } catch (error) {
          console.log(error)
          res.status(500).send({status: 500,message:error || "Some error occurred over the services."});
        }
}

module.exports = { hostingServices }