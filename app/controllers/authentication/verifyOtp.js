const { handleError } = require('../../middleware/utils')

const {generateOTP} = require('./helpers/generateOTP')

const {getForwardTime} = require('./helpers/getForwardTime')

const Auctioneer = require('../../models/Auctioneer')

const Bidder = require('../../models/Bidder')


/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const verifyOtp = async (req, res) => { console.log(req.body)
  try {
    // req = matchedData(req)
    const Phone = req.body.Phone;
    const otp = req.body.otp;
    const reqType = req.body.reqType;

    if(reqType == 1){
    await Auctioneer.findOne({Phone})
                    .then(async(data)=>{
                        console.log(Date.now(),data);
                        if(data.otp == otp && data.Expiry_time >= Date.now()){
                           await Auctioneer.findOneAndUpdate({Phone},{is_PhoneVerified:true},{new:true})
                                            .then(()=>{
                                                      res.status(200).send({ status: 200, message: "successfully otp has verified!!",data})
                                            }).catch(Err => {
                                                res.status(500).send({
                                                status: 500,
                                                message:
                                                    Err.message || "Some error occurred while verifing OTP, Please try after sometime."
                                                });
                                            });

                        }
                        else if(data.otp != otp){
                            res.status(400).send({ status: 400, message: "Incorrect otp!!"})
                        }
                        else if(data.Expiry_time != Date.now()){
                            res.status(400).send({ status: 400, message: "Otp has expired!!"})
                        }
                    }).catch(Err => {
                        res.status(500).send({
                        status: 500,
                        message:
                            Err.message || "Some error occurred while verifing OTP, Please try after sometime."
                        });
                    });
                }
    else if(reqType == 2){
                    await Bidder.findOne({Phone})
                                    .then(async(data)=>{
                                        console.log(Date.now(),data.Expiry_time); 
                                        if(data.otp == otp && data.Expiry_time >= Date.now()){
                                           await Bidder.findOneAndUpdate({Phone},{is_PhoneVerified:true},{new:true})
                                                            .then(()=>{
                                                                      const id = data._id;
                                                                      res.status(200).send({ status: 200, message: "successfully otp has verified!!",id})
                                                            }).catch(Err => {
                                                                res.status(500).send({
                                                                status: 500,
                                                                message:
                                                                    Err.message || "Some error occurred while verifing OTP, Please try after sometime."
                                                                });
                                                            });

                                        }
                                        else if(data.otp != otp){
                                            res.status(400).send({ status: 400, message: "Incorrect otp!!"})
                                        }
                                        else if(data.Expiry_time != Date.now()){
                                            res.status(400).send({ status: 400, message: "Otp has expired!!"})
                                        }
                                    }).catch(Err => {
                                        res.status(500).send({
                                        status: 500,
                                        message:
                                            Err.message || "Some error occurred while verifing OTP, Please try after sometime."
                                        });
                                    });

                         }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { verifyOtp }
