const { handleError } = require('../../middleware/utils')

const Auctioneer = require('../../models/Auctioneer')

const Bidder = require('../../models/Bidder')

const { generateToken } = require('../authentication/helpers/generateToken')

const bcrypt = require('bcryptjs')

const appInfo = require('../../../settings.json')


/**
 * Reset password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

//check registered Email Id or username
exports.checkEmail = async (emailId,reqType) => {
    var cursorData;
    if(reqType == 1)
    {await Auctioneer.findOne({Email:emailId})
        .select("Email")
        .then((result) => {
            cursorData = result;
        }).catch(err => {
            cursorData=null;
        });
    }
    else if(reqType == 2)
      {await Bidder.findOne({Email:emailId})
        .select("Email")
        .then((result) => {
            cursorData = result;
        }).catch(err => {
            cursorData=null;
        });
    }
    return cursorData;
  }

const setNewPassword = async (req, res) => { console.log(req.body)
    // Validate request
   if (!req.body.password || !req.body.Email || !req.body.reqType) {
    res.status(400).send({ message: "details must not be empty!" });
    return;
    }
    
    const resultSet = await this.checkEmail(req.body.Email,req.body.reqType);

    const reqType = req.body.reqType;
    
    //updated password hashing before stroing in Database
    const saltRounds = appInfo.rounds;

    var password = req.body.password;

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
          let accessToken = await generateToken(resultSet._id);
          res.status(200).send(
            {
              status:200,
              message:"Your password has been updated successfully!!",
              resultSet,
              accessToken
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

module.exports = { setNewPassword }
