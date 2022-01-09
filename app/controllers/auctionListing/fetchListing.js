const { handleError } = require('../../middleware/utils')

const AuctionLisintg = require('../../models/auctionListing')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchListing = async (req, res) => {
  try {
    
    const id = req.user._id

    let upcomingAuctionListings =[];

    let pastAuctionListings =[];
    
    var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                var currentDate = (yyyy+"-"+mm+"-"+dd);
    
    await AuctionLisintg.find({Auctioneer:id})
              .then((allObjects)=>{
                upcomingAuctionListings = allObjects.filter( (object)  =>{
                                                           if(object.AuctionDate >= currentDate){
                                                               return object;
                                                           }
                                                        });

                pastAuctionListings = allObjects.filter( (object)  =>{
                                                            if(object.AuctionDate < currentDate){
                                                                return object;
                                                            }
                                                         });
                            res.status(200).send({ status: 200, message: "successfully fetch AuctionLisintg Details!!",upcomingAuctionListings,pastAuctionListings})
                            }
                                        ).catch(Err => {
                                            res.status(500).send({
                                            status: 500,    
                                            message:
                                                Err.message || "Some error occurred while fetching AuctionLisintg."
                                            });
                                        });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { fetchListing }