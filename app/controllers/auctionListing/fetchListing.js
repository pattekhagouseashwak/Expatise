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
    
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth()+1;     // 10 (Month is 0-based, so 10 means 11th Month)
    const year = today.getFullYear();
    const currentDate = (day+"/"+month+"/"+year);

    console.log(currentDate)
    
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