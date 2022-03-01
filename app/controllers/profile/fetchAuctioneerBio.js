const { handleError } = require('../../middleware/utils')
var mongoose = require('mongoose');
const Auctioneer = require('../../models/Auctioneer')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchAuctioneerBio = async (req, res) => {
    try {

        var id = mongoose.Types.ObjectId(req.body.Auctioneer);

        if (Auctioneer.length == 0) {
            return res.status(400).send({ status: 400, message: "Auctioneer Id is empty!!" })
        }

        await Auctioneer.aggregate([
            { $match: { _id: id } },
            {
                "$lookup":
                {
                    from: "auctionlisintgs",
                    localField: "_id",
                    foreignField: "Auctioneer",
                    as: "Auction_List"
                }
            },
            {
                "$project": {
                    "_id": 1,
                    "State": 1,
                    "StreetAddress": 1,
                    "Country": 1,
                    "CompanyName": 1,
                    "City": 1,
                    "FirstName": 1,
                    "LastName": 1,
                    "Photo":1,
                    "AuctioneerBio":1,
                    "tickerSymbol": 1,
                    "ZipCode": 1,
                    "Phone": 1,
                    "Email": 1,
                    "Website":1,
                    "instagram":1,
                    "linkedin":1,
                    "youtube":1,
                    "facebook":1,
                    "Auction_List._id":1,
                    "Auction_List.Auctioneer": 1,
                    "Auction_List.AuctionCategory": 1,
                    "Auction_List.NameOfProduct": 1,
                    "Auction_List.AuctionTime": 1,
                    "Auction_List.AuctionDate": 1,
                    "Auction_List.uploadPhoto": 1,
                    "Auction_List.AuctionCategory": 1,
                    "Auction_List.ProductDescription": 1,
                    "Auction_List.BiddingNotice": 1,
                    "Auction_List.TermsAndCondition": 1
                }
            },
        ])
            .then((allObjects) => {

                if(allObjects == null) {
                    return res.status(400).send({ status: 400, message: "no auction has found!!" })
                }
                
                let _id = allObjects[0]._id;
                let State = allObjects[0].State;
                let StreetAddress= allObjects[0].StreetAddress;
                let Country = allObjects[0].Country;
                let CompanyName = allObjects[0].CompanyName;
                let City = allObjects[0].City;
                let FirstName = allObjects[0].FirstName;
                let LastName = allObjects[0].LastName;
                let Photo = allObjects[0].Photo;
                let AuctioneerBio = allObjects[0].AuctioneerBio;
                let Website = allObjects[0].Website;
                let instagram = allObjects[0].instagram;
                let linkedin = allObjects[0].linkedin;
                let youtube = allObjects[0].youtube;
                let facebook = allObjects[0].facebook;                    
                let tickerSymbol = allObjects[0].tickerSymbol;
                let ZipCode = allObjects[0].ZipCode;
                let Phone = allObjects[0].Phone;
                let Email =allObjects[0].Email;
                let upcomingAuctionListings = [];
                let currentAuctionListings =[];
                let pastAuctionListings = [];


                if(allObjects[0].Auction_List.length != 0){
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                var currentDate = (yyyy+"-"+mm+"-"+dd);

                console.log(currentDate)
            
                allObjects.filter((objects) => {
                    objects.Auction_List.filter((object) => {
                        //console.log(object.AuctionDate)
                        if (object.AuctionDate > currentDate) {
                            //console.log(object.AuctionDate)
                            return upcomingAuctionListings.push(object);
                        }
                        else if (object.AuctionDate == currentDate) {
                            // console.log(object)
                            return currentAuctionListings.push(object);
                        }
                        else if (object.AuctionDate < currentDate) {
                            //console.log(object)
                            return pastAuctionListings.push(object);
                        }
                    });
                });
            }

                res.status(200).send({
                    status: 200,
                    message: "successfully fetch AuctionLisintg Details!!",
                    _id,
                    State,
                    StreetAddress,
                    Country,
                    CompanyName,
                    City,
                    FirstName,
                    LastName,
                    AuctioneerBio,
                    Website,
                    instagram,
                    linkedin,
                    youtube,
                    facebook,
                    tickerSymbol,
                    Photo,
                    ZipCode,
                    Phone,
                    Email,
                    upcomingAuctionListings,
                    currentAuctionListings,
                    pastAuctionListings
                })
            })
            .catch(Err => {
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

module.exports = { fetchAuctioneerBio }