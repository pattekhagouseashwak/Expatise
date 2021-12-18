const { handleError } = require('../../middleware/utils')


const RecommendedVideo = require('../../models/recommendedVideo')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */


const recommendedVideo = async (req, res) => {
    try {

        // perform operation on auctioneer DB collection

        await RecommendedVideo.find({ display: true })
            .select("-activationDate -expireDate -display -createdAt -updatedAt")
            .then((data) => {
                res.status(200).send({ status: 200, message: "successfully created Recommend Video!!", data })
            }).catch(Err => {
                res.status(500).send({
                    status: 500,
                    message:
                        Err.message || "Some error occurred while fetching Recommend Video."
                });
            });

    } catch (error) {
        console.log(error)
        handleError(res, error)
    }
}

module.exports = { recommendedVideo }
