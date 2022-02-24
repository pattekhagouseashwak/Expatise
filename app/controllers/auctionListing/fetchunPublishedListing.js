const { handleError } = require('../../middleware/utils')

const UnPublished = require('../../models/unPublished')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchunPublishedListing = async (req, res) => {
  try {
    
    const id = req.user._id

    console.log(id)

    // let upcomingAuctionListings =[];

    // let pastAuctionListings =[];
    
    // var today = new Date();
    //             var dd = String(today.getDate()).padStart(2, '0');
    //             var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    //             var yyyy = today.getFullYear();
    //             var currentDate = (yyyy+"-"+mm+"-"+dd);
    
    await UnPublished.find({Auctioneer:id})
              .then((listing)=>{
                // upcomingAuctionListings = allObjects.filter( (object)  =>{
                //                                            if(object.AuctionDate >= currentDate){
                //                                                return object;
                //                                            }
                //                                         });

                // pastAuctionListings = allObjects.filter( (object)  =>{
                //                                             if(object.AuctionDate < currentDate){
                //                                                 return object;
                //                                             }
                //                                          });
                            res.status(200).send({ status: 200, message: "successfully fetch UnpublishedLisintg Details!!",listing})
                            }
                                        ).catch(Err => {
                                            res.status(500).send({
                                            status: 500,    
                                            message:
                                                Err.message || "Some error occurred while fetching UnpublishedLisintg."
                                            });
                                        });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { fetchunPublishedListing }