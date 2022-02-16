const { handleError } = require('../../middleware/utils')

const { decrypt } = require('./helpers/decrypt');

const {sendEmailToCustomer} = require('./helpers/sendEmailToCustomer')

const Auctioneer = require('../../models/Auctioneer')

const Bidder = require('../../models/Bidder')

const { generateToken } = require('../authentication/helpers/generateToken')

const verifyForgetPasswordAuctioneer = async (req, res) => { console.log(req.query)
    try {
            var email = await decrypt(req.query.address);
            var emailOtp = req.query.id;

            let host=req.get('host');
	        console.log("host:",host);
            console.log(req.protocol+"://"+host);
            await Auctioneer.findOne({Email:email})
                                    .then(async(data)=>{
                                        //console.log(Date.now(),data.Email_Expiry_time,data);
                                        if(data.Email_otp == emailOtp && data.Email_Expiry_time>= Date.now()){
                                            let reqType = 1; //console.log("accesstoken",user._id,reqType)
                                            let accessToken = await generateToken(data._id,reqType)
                                           await Auctioneer.findOneAndUpdate({Email:email},{is_EmailVerified:true},{new:true})
                                                            .then(async()=>{
                                                                    //   await sendEmailToCustomer(host,email,"NA",3,);
                                                                      res
                                                                      .status(200)
                                                                      .redirect('https://auctionjournal.com/request/?role=resetpassword&token='+accessToken+'&email='+email+"&reqType=1")
                                                                      //.send({ status: 200, message: accessToken});
                                                            }).catch(Err => {
                                                                res.status(500).send({
                                                                status: 500,
                                                                message:
                                                                    Err.message || "Some error occurred while verifing email, Please try after sometime."
                                                                });
                                                            });

                                        }
                                        else if(data.Email_otp != emailOtp){
                                            res.status(400).send({ status: 400, message: "Invalid email!!"});
                                        }
                                        else if(data.Expiry_time != Date.now()){
                                            res.status(400).send({ status: 400, message: "verifivation link has expired!!"});
                                        }
                                    }).catch(Err => {
                                        res.status(500).send({
                                        status: 500,
                                        message:
                                            Err.message || "Some error occurred while verifing email, Please try after sometime."
                                        });
                                    });
             } catch (error) {
      handleError(res, error)
    }
  }

const verifyForgetPasswordBidder = async (req, res) => { console.log(req.query)
      try {
              var email = await decrypt(req.query.address);
              var emailOtp = req.query.id;

              let host=req.get('host');
	          console.log("host:",host);
              console.log(req.protocol+"://"+host);
              await Bidder.findOne({Email:email})
                                      .then(async(data)=>{ 
                                          //console.log(Date.now(),data.Email_Expiry_time,data);
                                          if(data.Email_otp == emailOtp && data.Email_Expiry_time>= Date.now()){
                                            let reqType = 2; //console.log("accesstoken",user._id,reqType)
                                            let accessToken = await generateToken(data._id,reqType)
                                            await Bidder.findOneAndUpdate({Email:email},{is_EmailVerified:true},{new:true})
                                                              .then((data)=>{
                                                                res
                                                                .status(200)
                                                                .redirect('https://auctionjournal.com/request/?role=resetpassword&token='+accessToken+'&email='+email+"&reqType=2")   
                                                               //.send({ status: 200, message: "your E-mail has been successfully verified.Click here to got to your profile"});
                                                              }).catch(Err => {
                                                                  res.status(500).send({
                                                                  status: 500,
                                                                  message:Err.message || "Some error occurred while verifing email, Please try after sometime."
                                                                  });
                                                              });

                                          }
                                          else if(data.Email_otp != emailOtp){
                                              res.status(400).send({ status: 400, message: "Invalid email!!"});
                                          }
                                          else if(data.Expiry_time != Date.now()){
                                              res.status(400).send({ status: 400, message: "verifivation link has expired!!"});
                                          }
                                      }).catch(Err => {
                                          res.status(500).send({
                                          status: 500,
                                          message:
                                              Err.message || "Some error occurred while verifing email, Please try after sometime."
                                          });
                                      });
           } catch (error) {
        handleError(res, error)
      }
 }

  module.exports = { verifyForgetPasswordAuctioneer, verifyForgetPasswordBidder }
