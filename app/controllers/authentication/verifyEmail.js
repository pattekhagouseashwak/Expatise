const { handleError } = require('../../middleware/utils')

const { decrypt } = require('./helpers/decrypt');

const {sendEmailToCustomer} = require('./helpers/sendEmailToCustomer')

const Auctioneer = require('../../models/Auctioneer')

const Bidder = require('../../models/Bidder')

const verifyEmailAuctioneer = async (req, res) => { console.log(req.query)
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
                                           await Auctioneer.findOneAndUpdate({Email:email},{is_EmailVerified:true},{new:true})
                                                            .then(async()=>{
                                                                      await sendEmailToCustomer(host,email,"NA",3);
                                                                      res.status(200).send({ status: 200, message: "Your E-mail has been succesfully verified. Please wait for 24-48 hours to get an update about account activiation"});
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
            // if((req.protocol+"://"+host)==("http://"+host))
            // {
            //     console.log("Domain is matched. Information is from Authentic email");
            //     if(req.query.id==111)
            //     {
            //         console.log("email is verified");
            //         res.end("Email "+"mailOptions.to"+" is been Successfully verified");
            //     }
            //     else
            //     {
            //         console.log("email is not verified");
            //         res.end("Bad Request");
            //     }
            // }
            // else
            // {
            //     res.end("Request is from unknown source");
            // }
         } catch (error) {
      handleError(res, error)
    }
  }

const verifyEmailBidder = async (req, res) => { console.log(req.query)
      try {
              var email = await decrypt(req.query.address);
              var emailOtp = req.query.id;

              var host="localhost:4000";
              console.log(req.protocol+"://"+host);
              await Bidder.findOne({Email:email})
                                      .then(async(data)=>{ 
                                          //console.log(Date.now(),data.Email_Expiry_time,data);
                                          if(data.Email_otp == emailOtp && data.Email_Expiry_time>= Date.now()){
                                             await Bidder.findOneAndUpdate({Email:email},{is_EmailVerified:true},{new:true})
                                                              .then((data)=>{
                                                                        res.status(200).send({ status: 200, message: "your E-mail has been successfully verified.Click here to got to your profile"});
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
              // if((req.protocol+"://"+host)==("http://"+host))
              // {
              //     console.log("Domain is matched. Information is from Authentic email");
              //     if(req.query.id==111)
              //     {
              //         console.log("email is verified");
              //         res.end("Email "+"mailOptions.to"+" is been Successfully verified");
              //     }
              //     else
              //     {
              //         console.log("email is not verified");
              //         res.end("Bad Request");
              //     }
              // }
              // else
              // {
              //     res.end("Request is from unknown source");
              // }
           } catch (error) {
        handleError(res, error)
      }
    }

  module.exports = { verifyEmailAuctioneer, verifyEmailBidder }
