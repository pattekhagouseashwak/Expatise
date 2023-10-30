const { handleError } = require('../../middleware/utils')
const transaction = require('../../models/transaction')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

// add transaction details.....
const postTransaction = async (req, res) => {
  try {
    const user = req.body.user;
    const priceplan = req.body.priceplan;
    const amount = req.body.amount;
    const status = req.body.status;
    const log = req.body.log;
    await transaction.create({ user, priceplan, amount, status, log })
      .then(() => {
        res.status(200).send({
          status: 200,
          message: "succesfully Added Transaction."
        })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message: Err.message || "Internal Error."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

// To fetch transaction details.....
const getTransaction = async (req, res) => {
  try {
    await transaction.find({})
      .then((data) => {
        res.status(200).send({
          status: 200,
          message: "Please Find List Of transaction details",
          response: data
        })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message: Err.message || "Internal Error."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

// To fetch by user id transaction.....
const getTransactionByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    await transaction.find({ user: id }).sort({ createdAt: -1 })
      .then((data) => {
        res.status(200).send({
          status: 200,
          message: "Please Find transaction details by uswer Id.",
          response:data
        })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message: Err.message || "Internal Error."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

// to fetch transaction count by date ...
const getTransactionCountByDate = async (req, res) => {
  try {
    if (req.body.startDate.length == 0) {
      return res.status(400).send({
        status: 400,
        message: "startDate is missing"
      })
    }

    if (req.body.endDate.length == 0) {
      return res.status(400).send({
        status: 400,
        message: "endDate is missing."
      })
    }

    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    
    await transaction.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate), // Start date
            $lt: new Date(endDate) // End date
          }
        }
      },
      {
        $group: {
          _id: "$priceplan",
          count: { $sum: 1 }
        }
      }
    ])
      .then((data) => {
        res.status(200)
          .send({
            status: 200,
            message: "successfully fetched profile details!!",
            response: data
          })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message:
            Err.message || "Internal Error."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { postTransaction, getTransaction, getTransactionByUserId, getTransactionCountByDate }