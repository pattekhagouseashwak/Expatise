const { handleError } = require('../../middleware/utils')

const BiddeerFAQ = require('../../models/biddeerFAQ')

const AuctioneerFAQ = require('../../models/auctioneerFAQ')


/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const editAuctioneerAndBidderFAQ = async (req, res) => {
  try {

    if(req.body.reqType == 1){
    await AuctioneerFAQ.findByIdAndUpdate({_id:req.body.id},{question:req.body.question, answer:req.body.answer},{new:true})
                       .then((FAQ) => {
                                    res.status(200).send({ status: 200, message: "AuctioneerFAQ succesfully updated",FAQ })
                                    })
                       .catch(Err => {
                                        res.status(500).send({
                                        status: 500,
                                        message:Err.message || "Some error occurred while updating item."
                                        });
                                    });

    }
    else if(req.body.reqType == 2){

        await BiddeerFAQ.findByIdAndUpdate({_id:req.body.id},{question:req.body.question, answer:req.body.answer},{new:true})
                        .then((FAQ) => {
                                         res.status(200).send({ status: 200, message: "BidderFAQ succesfully updated",FAQ })
                                       })
                           .catch(Err => {
                                            res.status(500).send({
                                            status: 500,
                                            message:Err.message || "Some error occurred while updating item."
                                            });
                                        });
    
   }

  } catch (error) {
    console.log(error)
    handleError(res, error)
  }

}

module.exports = { editAuctioneerAndBidderFAQ }