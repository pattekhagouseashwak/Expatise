const { handleError } = require('../../middleware/utils')

const AuctionListing = require('../../models/auctionListing')

const UnPublished = require('../../models/unPublished')

const { fetchLatitudeLongitude } = require('../../middleware/utils')

const emailConstants = require("../../constant/email-template/email-content")

const {sendEmailToCustomer} = require('../authentication/helpers/sendEmailToCustomer')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const removeUnPublishedAndAddListing = async (req, res) => {//console.log(req.files )
  try {

    let data =req.user;
    console.log(data)

    const Auctioneer = req.user.id;
    const AuctionType = req.body.AuctionType;
    const AuctionTitle = req.body.AuctionTitle;
    const AuctionDate = req.body.AuctionDate;
    const AuctionTime = req.body.AuctionTime;
    const Address1 = req.body.Address1;
    const Address2 = req.body.Address2;
    const City = req.body.City;
    const State = req.body.State;
    const Country = req.body.Country;
    const Zip = req.body.Zip;
    const resultSet = await fetchLatitudeLongitude(Address1 + " " + City + " " + State + " " + Country + " " + Zip)
    let location;

    if (resultSet.status == 200) {
      const geoData = resultSet.message;
      location = { type: "Point", coordinates: [geoData[0].longitude, geoData[0].latitude] };
      console.log(location)
    }
    else if (resultSet.status == 500) {
      return res.status(500).send({ status: 500, message: "currently facing technical issue please try again" });
    }
    const AuctionCategory = req.body.AuctionCategory;
    const CategoryDetails = req.body.CategoryDetails;
    const NameOfProduct = req.body.NameOfProduct;
    const ProductDescription = req.body.ProductDescription;
    const BiddingNotice = req.body.BiddingNotice;
    const AuctionNotice = req.body.AuctionNotice;
    const TermsAndCondition = req.body.TermsAndCondition;
    const uploadPhoto = req.body.uploadPhoto;
    const AuctionMonthYear = req.body.AuctionDate.slice(0, 7);

    await UnPublished.findByIdAndDelete({_id:req.body.id})

     await AuctionListing.create({
      
       _id : req.body.id,

       Auctioneer,

       AuctionType,

       AuctionTitle,

       AuctionMonthYear,

      AuctionDate,

      AuctionTime,

      Address1,

      Address2,

      City,

      State,

      Country,

      Zip,

      location,

      AuctionCategory,

      CategoryDetails,

      NameOfProduct,

      uploadPhoto,

      ProductDescription,

      BiddingNotice,

      AuctionNotice,

      TermsAndCondition,
    })
      .then(async() => {
        let host = req.get('host');
                              console.log("host:", host);
                              await sendEmailToCustomer(host, data.Email, "NA",3,emailConstants.YourAuctionListingIsLIVE, emailConstants.htmlContent_YourAuctionListingIsLIVE, data.FirstName + data.LastName);
        res.status(200).send({ status: 200, message: "your iteam has been successfully listed" })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message:
            Err.message || "Some error occurred while listing item."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { removeUnPublishedAndAddListing }