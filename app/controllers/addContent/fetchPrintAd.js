const { handleError } = require('../../middleware/utils')

const AdsPrint_Db = require('../../models/adsPrint_Db')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchPrintAd = async (req, res) => {
  try {console.log(" s s")

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      var currentDate = (yyyy + "-" + mm + "-" + dd);

      await AdsPrint_Db.find({ StartsFrom: {$gte: currentDate} })
                                          .then((data) => {
                                       res.status(200).send({ status: 200, message: "succesfully fetched PrintAd",data })
                                   })
                       .catch(Err => {
                                        res.status(500).send({
                                        status: 500,
                                        message:Err.message || "Some error occurred while fetching PrintAd item."
                                        });
                                    }); 
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}
module.exports = { fetchPrintAd }