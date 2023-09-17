const bcrypt = require('bcryptjs')
const { generateToken } = require('./helpers/generateToken')
const { handleError } = require('../../middleware/utils')
const adminlogins = require('../../models/adminlogins')
const appInfo = require('./../../../settings.json')

/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const loginService = async (req, res) => {
  try {
    if (!req.body.email) {
      res.status(400).send({ status: "400", message: "email is empty" })
    }
    if (!req.body.password) {
      res.status(400).send({ status: "400", message: "password is empty" })
    }

    const Email = req.body.email;
    const password = req.body.password;

    let response = await adminlogins.find({ email: Email }).select("email password");
    if (response.length == 0) {
      res.status(400).send({ status: "400", message: "email do not match" });
    }
    
    //compare password...
    const admin = response[0];
    const validPassword = await bcrypt.compare(password, admin?.password);

    if (validPassword == false) {
      return res.status(400).send({ status: "400", message: "password do not match" });
    }

    let accessToken = await generateToken(admin._id, appInfo.ADMINROLE);

    await adminlogins.findByIdAndUpdate({ _id: admin._id},{token:accessToken});

    res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .send({ status: 200, message: "Successfully Login!!", accessToken });

  } catch (error) {
    handleError(res, error)
  }
}

const storeLoginInfo = async (req, res) => {
  try {
    if (!req.headers['token'] || req.headers['token'] != appInfo.ADMINTOKEN) {
    res.status(400).send({ status: "400", message: "unathorized access" });
    }

    if (!req.body.email) {
      res.status(400).send({ status: "400", message: "email is empty" });
    }
    if (!req.body.email) {
      res.status(400).send({ status: "400", message: "email is empty" });
    }
    if (!req.body.password) {
      res.status(400).send({ status: "400", message: "password is empty" });
    }

    const Email = req.body.email;
    let response = await adminlogins.find({ email:Email })

    if (response && response[0]?.email == Email) {
      return res.status(400).send({ status: 400, message: "Already Email Exist" });
    }

    const rounds = appInfo.rounds;
    const encryptpassword = await bcrypt.hash(req.body.password, rounds);

    await adminlogins.create({ email:Email, password:encryptpassword })
      .then(async () => {
        let response = { email:Email, password:req.body.password };
        res.status(200).send({
          status: 200,
          message: "Successfully Stored Login Detail",
          response
        })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message:
            Err.message || "Internal Error"
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = {loginService,storeLoginInfo}