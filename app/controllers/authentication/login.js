const { matchedData } = require('express-validator')
const Auctioneer = require('../../models/Auctioneer')
const Bidder = require('../../models/Bidder')
const bcrypt = require('bcryptjs')
const { generateToken } = require('./helpers/generateToken')
const { handleError } = require('../../middleware/utils')

/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

//check registered Email Id or username
exports.checkEmail = async (emailId) => {
  var cursorData;
  await Auctioneer.findOne({Email:emailId})
      .select("_id Email password AuctioneerLicensceNo FirstName LastName Photo")
      .then((result) => {
          cursorData = result;
      }).catch(err => {
          cursorData=null;
      });
  return cursorData;
}

const login = async (req, res) => {

  try {
    const data = matchedData(req)
     
    const user = await this.checkEmail(req.body.Email)

    //console.log(user)
    
    if(user !=null ){

    const password = req.body.password;

    const validPassword = await bcrypt.compare(password,user.password);

    //console.log(validPassword,password,user.password)

    //compare password

    if (validPassword == false) {
      res.status(400).send({status:"400",message:"The creditials entered here do not match"})
    } else {
      // all ok then return token,AuctioneerLicensceNo, Name and Photo
      console.log(user._id)
      let accessToken = await generateToken(user._id)
      let _id = user._id;
      let AuctioneerLicensceNo = user.AuctioneerLicensceNo;
      let Email = user.Email;
      let FristName = user.FristName;
      let LastName = user.LastName;
      let Photo = user.Photo;
      res 
    .cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .send({status:200,message:"Successfully Login!!",_id,AuctioneerLicensceNo,Email,LastName,Photo});
    }
  }
  else{
    res.status(400).send({status:400,message:"The E-mail entered is not registered."})
  }
  } catch (error) {
    handleError(res, error)
  }
}
module.exports = { login }