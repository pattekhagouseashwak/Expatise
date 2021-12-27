const { handleError } = require('../../middleware/utils')

const RequestACallBack = require('../../models/requestACallBack')


/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

//unique random number---
 function uuidv4() {
    return 'xxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(9);
    });
  }

const requestACallback = async (req, res) => {
    try {
        
        
        const userID = req.user.id;
        const entityType = req.body.entityType;
        const reqName = req.body.reqName;
        const desc = req.body.desc;
        const time = req.body.time;
        const date = req.body.date;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const phoneNumber = req.body.phoneNumber;
        const email = req.body.email;

        const random = uuidv4();
        const TicketID = "RAC_"+random;

        await RequestACallBack.create({TicketID,
                                       userID,
                                       entityType,
                                       reqName,
                                       phoneNumber,
                                       desc,
                                       email,
                                       time,
                                       date,
                                       firstName,
                                       lastName})
                               .then(()=>{
                                          res.status(200).send({ status: 200, message: "message succesfully added"})
                                                          }).catch(Err => {
                                                              res.status(500).send({
                                                              status: 500,
                                                              message:
                                                                  Err.message || "Some error occurred while adding item."
                                                              });
                                                          });
      } catch (error) {
        console.log(error)
        handleError(res, error)
      }
}

const getRequestACallbackDetails = async (req, res) => {
    try {
        
        const userID = req.user.id;

        await RequestACallBack.find({userID:userID})

              .then((data)=>{
                            if(data != null){
                            res.status(200).send({ status: 200, message: "successfully req callback ticket history Details has fetched!!",data})
                            }
                            else if(data == null){
                              res.status(200).send({ status: 200, message: "No req callback ticket History Found!!"})
                              }
                          }
                                        ).catch(Err => {
                                            res.status(500).send({
                                            status: 500,
                                            message:
                                                Err.message || "Some err or occurred while fetching req callback ticket history."
                                            });
                                        });                                                 
      } catch (error) {
        console.log(error)
        handleError(res, error)
      }
}

module.exports = { requestACallback, getRequestACallbackDetails }