const { handleError } = require('../../middleware/utils')

const Bidder = require('../../models/Bidder')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

 const bidHistory = async (req, res) => {
  try {
    // const id = "619f7a269fb10f9474ac0842"

    const id = req.user._id
    
    console.log(id)
    
    await Bidder.findOne({_id:id})
              .then((data)=>{console.log("data",data)
                            if(data != null){
                            const BidData = data.AllBids;
                            res.status(200).send({ status: 200, message: "successfully Bidder history Details has fetched!!",BidData})
                            }
                            else if(data == null){
                              res.status(200).send({ status: 200, message: "No Bidder History Found!!"})
                              }
                          }
                                        ).catch(Err => {
                                            res.status(500).send({
                                            status: 500,
                                            message:
                                                Err.message || "Some err or occurred while fetching Bidder history."
                                            });
                                        });

  
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { bidHistory }