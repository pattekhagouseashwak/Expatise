const { handleError } = require('../../middleware/utils')

const BiddeerFAQ = require('../../models/biddeerFAQ')

const AuctioneerFAQ = require('../../models/auctioneerFAQ')


/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchAuctioneerAndBidderFAQ = async (req, res) => {
  try {
    console.log(req.body)
    if(req.body.reqType == 1){
    await AuctioneerFAQ.find({})
                       .then((FAQ) => {
                                    res.status(200).send({ status: 200, message: "AuctioneerFAQ succesfully fetched",FAQ })
                                    })
                       .catch(Err => {
                                        res.status(500).send({
                                        status: 500,
                                        message:Err.message || "Some error occurred while adding item."
                                        });
                                    });

    }
    else if(req.body.reqType == 2){

        await BiddeerFAQ.find({})
                        .then((FAQ) => {
                                         res.status(200).send({ status: 200, message: "BidderFAQ succesfully fetched",FAQ })
                                       })
                           .catch(Err => {
                                            res.status(500).send({
                                            status: 500,
                                            message:Err.message || "Some error occurred while adding item."
                                            });
                                        });
    
   }

  } catch (error) {
    console.log(error)
    handleError(res, error)
  }

}

module.exports = { fetchAuctioneerAndBidderFAQ }