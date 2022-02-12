const { handleError } = require('../../middleware/utils')

const RequestACallBack = require('../../models/requestACallBack')

const WriteToUs = require('../../models/writeToUs')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const statusUpdate = async (req, res) => {
    try {
        
        if(req.body.reqType == 1){
        await RequestACallBack.findByIdAndUpdate({_id:req.body.id},
                                        { Status: req.body.Status })
                              .then((data) => {
                                                if (data.length != 0) {
                                                    res.status(200).send({ status: 200, message: "successfully req callback ticket status has updated!!" })
                                                }
                                                else {
                                                    res.status(200).send({ status: 200, message: "No req callback ticket History Found!!" })
                                                }
                                            })
                              .catch(Err => {
                                                res.status(500).send({
                                                    status: 500,
                                                    message:Err.message || "Some error occurred while updaating status of callback ticket."
                                                });
                                            });
                                 }
        else if(req.body.reqType == 2){
                                        await WriteToUs.findByIdAndUpdate({_id:req.body.id},{ Status: req.body.Status })
                                                        .then((data) => {
                                                                                    if (data.length != 0){
                                                                                        res.status(200).send({ status: 200, message: "successfully updated status of req Email ticket history" })
                                                                                    }
                                                                                    else{
                                                                                        res.status(200).send({ status: 200, message: "No req Email ticket History Found!!" })
                                                                                    }
                                                                                })
                                                                  .catch(Err => {
                                                                                    res.status(500).send({
                                                                                        status: 500,
                                                                                        message:Err.message || "Some err or occurred while updating status Email ticket history."
                                                                                    });
                                                                                });
                                      }
        } catch (error) { 
        console.log(error)
        handleError(res, error)
    }
}

module.exports = {statusUpdate}