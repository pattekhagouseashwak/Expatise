const { handleError } = require('../../middleware/utils')
const coupons = require('../../models/coupons')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

// add coupons.....
const addCoupons = async (req, res) => {
  try {
    const couponName = req.body.couponName;
    const couponValue = req.body.couponValue;
    const months = req.body.months;
    const couponValue_exist = await coupons.find({ couponValue: couponValue });
    if (couponValue_exist.length > 0) {
      return res.status(200).send({
        status: 200,
        message: "Already Exist."
      })
    }

    await coupons.create({ couponName, couponValue, months })
      .then(() => {
        res.status(200).send({
          status: 200,
          message: "succesfully Added Coupons."
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

// To update coupons.....
const updateCoupons = async (req, res) => {
  try {
    const id = req.body.id;
    const couponName = req.body.couponname;
    const couponValue = req.body.couponvalue;
    const months = req.body.months;
    const couponValue_exist = await coupons.find({ couponValue: couponValue });
    if (couponValue_exist.length > 0) {
      return res.status(200).send({
        status: 200,
        message: "Already Added To coupons."
      })
    }

    await coupons.findById({ _id: id }, { couponName: couponName, couponValue: couponValue, months: months })
      .then(() => {
        res.status(200).send({
          status: 200,
          message: "succesfully Update Coupons."
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

// To fetch coupons.....
const getCoupons = async (req, res) => {
  try {
    await coupons.find({})
      .then((data) => {
        res.status(200).send({
          status: 200,
          message: "Please Find List Of Coupons",
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

// To remove coupons.....
const removeCoupons = async (req, res) => {
  try {
    const id = req.params.id;
    await coupons.findByIdAndDelete({ _id: id })
      .then(() => {
        res.status(200).send({
          status: 200,
          message: "Removed Coupons."
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

// To fetch by id coupons.....
const getCouponsById = async (req, res) => {
  try {
    const id = req.params.id;
    await coupons.findById({ _id: id })
      .then((data) => {
        res.status(200).send({
          status: 200,
          message: "Please Find Coupon.",
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

module.exports = { addCoupons, updateCoupons, removeCoupons, getCoupons, getCouponsById }