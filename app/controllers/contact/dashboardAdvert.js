const { handleError } = require('../../middleware/utils')
const AdvertInDashboard = require('../../models/advertInDashboard')
/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const dashboardAdvert = async (req, res) => {
    try {

        await AdvertInDashboard.find({})
            .then((data) => {
                res.status(200).send({ status: 200, message: "Successfully fetch all adverts of dashboard!!", data })
            }
            ).catch(Err => {
                console.log(Err)
                res.status(500).send({
                    status: 500,
                    message:
                        Err.message || "Some error occurred while fetching advertize of dashboard."
                });
            });


    } catch (error) {
        console.log(error)
        handleError(res, error)
    }
}
module.exports = { dashboardAdvert }