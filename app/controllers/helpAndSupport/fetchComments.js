const { handleError } = require('../../middleware/utils')

const RequestACallBack = require('../../models/requestACallBack')

const WriteToUs = require('../../models/writeToUs')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchComments = async (req, res) => {
    try {
        
        if(req.body.reqType == 1){
        await RequestACallBack.findById({_id:req.body.id})
                              .select("comments")
                              .then((data) => {
                                                if (data.length != 0){
                                                    res.status(200).send({ status: 200, message: "successfully req callback ticket status has updated!!",data })
                                                }
                                                else {
                                                    res.status(200).send({ status: 200, message: "No Comments found for requested callback ticket History!!" })
                                                }
                                            })
                              .catch(Err => {
                                                res.status(500).send({
                                                    status: 500,
                                                    message:Err.message || "Some error occurred while fetching Comments of callback ticket."
                                                });
                                            });
                                 }
        else if(req.body.reqType == 2){
                                        await WriteToUs.findById({_id:req.body.id})
                                                       .select("comments")
                                                       .then((data) => {
                                                                                    if (data.length != 0) {
                                                                                        res.status(200).send({ status: 200, message: "successfully fetched comments for requested Email ticket history",data })
                                                                                    }
                                                                                    else {
                                                                                        res.status(200).send({ status: 200, message: "No comments for req Email ticket History!!" })
                                                                                    }
                                                                                })
                                                                  .catch(Err => {
                                                                                    res.status(500).send({
                                                                                        status: 500,
                                                                                        message:Err.message || "Some err or occurred while fetching status Email ticket history."
                                                                                    });
                                                                                });
                                      }
        } catch (error) { 
        console.log(error)
        handleError(res, error)
    }
}

module.exports = {fetchComments}