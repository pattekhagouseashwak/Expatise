const { handleError } = require('../../middleware/utils')

const Auctioneer = require('../../models/Auctioneer')

const Bidder = require('../../models/Bidder')

const { generateToken } = require('../authentication/helpers/generateToken')

const bcrypt = require('bcryptjs')

const appInfo = require('../../../settings.json')

const {sendEmailToCustomer} = require('./helpers/sendEmailToCustomer')

const emailConstants = require("../../constant/email-template/email-content")

const emailConfig = require('../../../config/email')


/**
 * Reset password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const changePassword = async (req, res) => { console.log(req.body)
    // Validate request
   if (!req.body.password || !req.body.confiromPassword || !req.body.reqType) {
    res.status(400).send({ message: "details must not be empty!" });
    return;
    }
    
     // Validate request
   if (req.body.password != req.body.confiromPassword) {
    res.status(400).send({ message: "Password is not matching with confirmPassword!" });
    return;
    }

    const resultSet = req.user;

    console.log(resultSet);

    const reqType = req.body.reqType;
    
    //updated password hashing before stroing in Database
    const saltRounds = appInfo.rounds;

    var password = req.body.confiromPassword;

    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
                        
          if(resultSet){
            let modelName;
            if(reqType == 1){
            console.log(resultSet,hash)
            modelName = Auctioneer
            }
            else if(reqType == 2){
                console.log(resultSet,hash)
                modelName = Bidder
                }
                modelName.findOneAndUpdate({_id:resultSet._id},{$set:{password:hash}},{new:true}).exec()
          .then(async(resultSet) => {
            let host=req.get('host');
	          console.log("host:",host);
            await sendEmailToCustomer(host,resultSet.Email,"NA",6,emailConstants.PasswordSuccessfullyUpdated,emailConstants.htmlContent_PasswordSuccessfullyUpdated,"NA",emailConfig.username_notify);
          let accessToken = await generateToken(resultSet._id);
          res.status(200).send(
            {
              status:200,
              message:"Your password has been updated successfully!!"
            });
          })
          .catch(Err => {
          res.status(500).send({
          status:500,
          message:
          Err.message || "Some error occurred while setting a new password."
          });
          });
          }else{
          res.status(500).send({
          status:500,
          message:
          "Invalid Request not yet registered with BrokkerSpot"
          });
          }
          });
          });
    }

module.exports = { changePassword }
