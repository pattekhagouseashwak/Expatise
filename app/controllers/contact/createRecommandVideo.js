const { handleError } = require('../../middleware/utils')


const RecommendedVideo = require('../../models/recommendedVideo')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */


const createRecommandVideo = async (req, res) => { console.log(req.body)
  try {
   
        const name =req.body.name
        const title =req.body.title
        const youtubeVideoURL =req.body.youtubeVideoURL
        const activationDate=req.body.activationDate;
        const expireDate=req.body.expireDate
        const display=req.body.display
   
    // perform operation on auctioneer DB collection
 
          await RecommendedVideo.create({name,title,youtubeVideoURL,activationDate,expireDate,display})
                          .then(()=>{
                              res.status(200).send({ status: 200, message: "successfully created Recommend Video!!"})
                          }).catch(Err => {
                              res.status(500).send({
                              status: 500,
                              message:
                                  Err.message || "Some error occurred while creating Recommend Video."
                              });
                          });    

  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { createRecommandVideo }
