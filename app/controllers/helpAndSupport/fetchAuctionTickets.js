const { handleError } = require('../../middleware/utils')

const RequestACallBack = require('../../models/requestACallBack')

const WriteToUs = require('../../models/writeToUs')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchAuctionTickets = async (req, res) => {
    try {

        let searchValue = [];

        if(req.body.length == 0 ){
        return res.status(400).send({ status: 400, message: "request body is empty!!"})
        }

        if(req.body.status_Ticket != "all" ){
            searchValue.push({Status : req.body.status_Ticket});
          }
        
        searchValue.push({entityType : "Auctioneer"});
        
        if(req.body.reqType == 1){
        await RequestACallBack.find({ $and: searchValue })
                              //.find({ $and: [{ Status: req.body.status_Ticket }, { entityType: "Auctioneer" }] })
                              .sort({createdAt: -1})
                              .then((data) => {
                                                if (data.length != 0) {
                                                    res.status(200).send({ status: 200, message: "successfully req callback ticket history Details has fetched!!", data })
                                                }
                                                else{
                                                    res.status(200).send({ status: 200, message: "No req callback ticket History Found!!" })
                                                }
                                            })
                              .catch(Err => {
                                                res.status(500).send({
                                                    status: 500,
                                                    message:Err.message || "Some err or occurred while fetching req callback ticket history."
                                                });
                                            });
                                 }
        else if(req.body.reqType == 2){
                                        await WriteToUs.find({ $and: searchValue })
                                                       //.find({ $and: [{ Status: req.body.status_Ticket }, { entityType: "Auctioneer" }] })
                                                       .sort({createdAt: -1})
                                                                  .then((data) => {
                                                                                    if (data.length != 0){
                                                                                        res.status(200).send({ status: 200, message: "successfully req Email ticket history Details has fetched!!", data })
                                                                                    }
                                                                                    else {
                                                                                        res.status(200).send({ status: 200, message: "No req Email ticket History Found!!" })
                                                                                    }
                                                                                })
                                                                  .catch(Err => {
                                                                                    res.status(500).send({
                                                                                        status: 500,
                                                                                        message:Err.message || "Some err or occurred while fetching req Email ticket history."
                                                                                    });
                                                                                });
                                      }
    } catch (error) {
        console.log(error)
        handleError(res, error)
    }
}

module.exports = {fetchAuctionTickets }