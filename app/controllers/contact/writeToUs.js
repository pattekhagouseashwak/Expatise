const { handleError } = require('../../middleware/utils')

const WriteToUs = require('../../models/writeToUs')

const emailConstants = require("../../constant/email-template/email-content")

const {sendEmailToCustomer} = require('../authentication/helpers/sendEmailToCustomer')

var AWS = require("aws-sdk");
/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

//unique random number---
function uuidv4() {
  return 'xxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(9);
  });
}


const writeToUs = async (req, res) => {
  try {

    const userID = req.user.id;
    const entityType = req.body.entityType;
    const name = req.body.name;
    const email = req.body.email;
    const description = req.body.description;
    const priority = req.body.priority;
    const message = req.body.message;
    const attachment = req.body.attachment;

    const random = uuidv4();
    const TicketID = "WTUS_" + random;

    await WriteToUs.create({ TicketID, userID, entityType, name, email, description, priority, message, attachment })
      .then(async(data) => {
        let host=req.get('host');
        console.log("host:",host);
        await sendEmailToCustomer(host, data.email, "NA",8, emailConstants.Support, emailConstants.htmlcontent_TicketGeneratedViaEmail, data);
        res.status(200).send({ status: 200, message: "message succesfully added" })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message:
            Err.message || "Some error occurred while adding."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

const getWriteToUsDetails = async (req, res) => {
  try {

    const userID = req.user.id;

    await WriteToUs.find({ userID: userID })

      .then((data) => {
        if (data != null) {
          res.status(200).send({ status: 200, message: "successfully  email ticket history Details has fetched!!", data })
        }
        else if (data == null) {
          res.status(200).send({ status: 200, message: "No  email ticket History Found!!" })
        }
      }
      ).catch(Err => {
        res.status(500).send({
          status: 500,
          message:
            Err.message || "Some err or occurred while fetching  email ticket history."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { writeToUs, getWriteToUsDetails }