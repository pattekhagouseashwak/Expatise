const { handleError } = require('../../middleware/utils')
const priceplans = require('../../models/priceplans')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

// add priceplan.....
const addPricePlans = async (req, res) => {
  try {
    const duration = req.body.duration;
    const price = req.body.price;
    const isActive = req.body.isActive;

    const value_exist = await priceplans.find({ price: price });
    if (value_exist.length > 0) {
      return res.status(200).send({
        status: 200,
        message: "Already Exist."
      })
    }

    const duration_exist = await priceplans.find({ duration: duration });
    if (duration_exist.length > 0) {
      return res.status(200).send({
        status: 200,
        message: "Already Added duration."
      })
    }

    await priceplans.create({ duration, price, isActive })
      .then((data) => {
        res.status(200).send({
          status: 200,
          message: "succesfully Added PricePlan.",
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

// To update priceplan.....
const updatePricePlansById = async (req, res) => {
  try {
    const id = req.body.id;
    const duration = req.body.duration;
    const price = req.body.price;
    
    const price_exist = await priceplans.find({ price: price });
    if (price_exist.length > 0) {
      return res.status(200).send({
        status: 200,
        message: "Already Added price."
      })
    }

    const duration_exist = await priceplans.find({ duration: duration });
    if (duration_exist.length > 0) {
      return res.status(200).send({
        status: 200,
        message: "Already Added duration."
      })
    }

    await priceplans.findById({ _id: id }, { duration: duration, price: price},{upsert:true})
      .then((data) => {
        res.status(200).send({
          status: 200,
          message: "succesfully Updated PricePlans.",
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

// To fetch priceplan.....
const getPricePlans = async (req, res) => {
  try {
    await priceplans.find({})
      .then((data) => {
        res.status(200).send({
          status: 200,
          message: "get price plans.",
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

// To remove priceplan.....
const removePricePlans = async (req, res) => {
  try {
    const id = req.params.id;
    await priceplans.findByIdAndDelete({ _id: id })
      .then(() => {
        res.status(200).send({
          status: 200,
          message: "Removed PricePlans."
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

module.exports = { addPricePlans, updatePricePlansById, removePricePlans, getPricePlans }