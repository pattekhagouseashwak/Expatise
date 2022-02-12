const { handleError } = require('../../middleware/utils')

const BiddeerFAQ = require('../../models/biddeerFAQ')

const AuctioneerFAQ = require('../../models/auctioneerFAQ')


/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const createAuctioneerAndBidderFAQ = async (req, res) => {
  try {console.log(" s s")


    const question = req.body.question;
    const answer = req.body.answer;

    if(req.body.reqType == 1){
    console.log(" s s")
    await AuctioneerFAQ.create({question,answer})
                       .then(() => {
                                       res.status(200).send({ status: 200, AuctioneerFAQ: "AuctioneerFAQ succesfully added" })
                                       })
                       .catch(Err => {
                                        res.status(500).send({
                                        status: 500,
                                        AuctioneerFAQ:Err.AuctioneerFAQ || "Some error occurred while adding item."
                                        });
                                    });

    }
    else if(req.body.reqType == 2){

        await BiddeerFAQ.create({question,answer})
                           .then(() => {
                                           res.status(200).send({ status: 200, AuctioneerFAQ: "BiddeerFAQ succesfully added" })
                                           })
                           .catch(Err => {
                                            res.status(500).send({
                                            status: 500,
                                            AuctioneerFAQ:Err.AuctioneerFAQ || "Some error occurred while adding item."
                                            });
                                        });
    
   }

  } catch (error) {
    console.log(error)
    handleError(res, error)
  }

// const getRequestACallbackDetails = async (req, res) => {
//   try {

//     const userID = req.user.id;

//     await RequestACallBack.find({ userID: userID })

//       .then((data) => {
//         if (data != null) {
//           res.status(200).send({ status: 200, AuctioneerFAQ: "successfully req callback ticket history Details has fetched!!", data })
//         }
//         else if (data == null) {
//           res.status(200).send({ status: 200, AuctioneerFAQ: "No req callback ticket History Found!!" })
//         }
//       }
//       ).catch(Err => {
//         res.status(500).send({
//           status: 500,
//           AuctioneerFAQ:
//             Err.AuctioneerFAQ || "Some err or occurred while fetching req callback ticket history."
//         });
//       });
//   } catch (error) {
//     console.log(error)
//     handleError(res, error)
//   }
}

module.exports = { createAuctioneerAndBidderFAQ }