const { handleError } = require('../../middleware/utils')

const {generateOTP} = require('./helpers/generateOTP')

const {getForwardTime} = require('./helpers/getForwardTime')

const {twilioService} = require('./helpers/twilioService')

const Auctioneer = require('../../models/Auctioneer')

const Bidder = require('../../models/Bidder')

const appInfo = require('../../../settings.json')

const { response } = require('express')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

//mobileNumberExists
exports.mobileNumberExists = async (mobleNumber, reqType) => {

  var cursor;

  if(reqType == 1){
                    await Auctioneer.findOne({ Phone: mobleNumber }).then((data) => {
                      if(data!=null){
                          cursor = data}
                      else if(data == null){
                        cursor = false
                      }
                    })
                      .catch(err => {
                        cursor = false;
                      });
                    return cursor;
                  }
  else if(reqType == 2){
                    await Bidder.findOne({ Phone: mobleNumber }).then((data) => {
                      if(data!=null){
                          cursor = data}
                      else if(data == null){
                        cursor = false
                      }
                    })
                      .catch(err => {
                        cursor = false;
                      });
                    return cursor;
                  }
};

const mobileOTP = async (req, res) => { console.log(req.body)
  try {
    // req = matchedData(req)
    const Phone = req.body.Phone;

    const reqType = req.body.reqType;

    const CountryCode = Phone.slice(0,2)

    // if(CountryCode != "+1"){
    //   return res.status(400).send({status:400,message:"Please use USA Country code +1"})
    // }

    const doesMobileExists = await this.mobileNumberExists(Phone,reqType);

    console.log(doesMobileExists)

    if(doesMobileExists.is_PhoneVerified == true){
      return  res.status(400).send({ status: 400, message: "phone number has already registered!!"})
    }
    // perform operation on auctioneer DB collection
    if(reqType == 1){

        if (!doesMobileExists) {
          const Expiry_time = await getForwardTime(2.00);
          const otp = await generateOTP(appInfo.otpLength);
          const status = await twilioService(Phone,otp);
          console.log(status,reqType)
          if(status == "200"){
          await Auctioneer.create({Phone,otp,Expiry_time})
                          .then(()=>{
                              res.status(200).send({ status: 200, message: "successfully sent otp to your mobile number!!"})
                          }).catch(Err => {
                              res.status(500).send({
                              status: 500,
                              message:
                                  Err.message || "Some error occurred while saving mobileNmber."
                              });
                          });

                  }

          else if(status.statuscode == "500"){
              res.status(500).send({status: 500,message:Err.message || "Some error occurred while sending OTP to mobile number."});
          }
        }
        else if(doesMobileExists.Phone == Phone && doesMobileExists.is_PhoneVerified == false  ) {
                const Expiry_time = await getForwardTime(2.00);
                const otp = await generateOTP(appInfo.otpLength);
                const status = await twilioService(Phone,otp);
                console.log(status)
                if(status == "200"){
                await Auctioneer.findOneAndUpdate({Phone},{otp, Expiry_time},{new:true})
                .then((data)=>{ console.log(data.otp,otp)

                    res.status(200).send({ status: 200, message: "successfully sent otp to your mobile number!!"})
                }).catch(Err => {
                    res.status(500).send({
                    status: 500,
                    message:
                        Err.message || "Some error occurred while saving mobileNmber."
                    });
                });
        }

        else if(status.statuscode == "500"){
        res.status(500).send({status: 500,message:Err.message || "Some error occurred while sending OTP to mobile number."});
        }
        }

    }// Bidder DB operations
     else if(reqType == 2){ console.log(req.body)

      if (!doesMobileExists) {
        const Expiry_time = await getForwardTime(2.00);
        const otp = await generateOTP(appInfo.otpLength);
        const status = await twilioService(Phone,otp);
        console.log(status)
        if(status == "200"){
        await Bidder.create({Phone,otp,Expiry_time})
                        .then(()=>{
                            res.status(200).send({ status: 200, message: "successfully sent otp to your mobile number!!"})
                        }).catch(Err => {
                            res.status(500).send({
                            status: 500,
                            message:
                                Err.message || "Some error occurred while saving mobileNmber."
                            });
                        });

                }

        else if(status.statuscode == "500"){
            res.status(500).send({status: 500,message:Err.message || "Some error occurred while sending OTP to mobile number."});
        }
      }
      else if(doesMobileExists && doesMobileExists.is_PhoneVerified == false  ) {
              const Expiry_time = await getForwardTime(2.00);
              const otp = await generateOTP(appInfo.otpLength);
              const status = await twilioService(Phone,otp);
              console.log(status)
              if(status == "200"){
              await Bidder.findOneAndUpdate({Phone},{otp, Expiry_time})
              .then(()=>{

                  res.status(200).send({ status: 200, message: "successfully sent otp to your mobile number!!"})
              }).catch(Err => {
                  res.status(500).send({
                  status: 500,
                  message:
                      Err.message || "Some error occurred while saving mobileNmber."
                  });
              });
      }

      else if(status.statuscode == "500"){
      res.status(500).send({status: 500,message:Err.message || "Some error occurred while sending OTP to mobile number."});
      }
      }

      }
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { mobileOTP }
