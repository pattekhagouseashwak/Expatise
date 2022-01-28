const { handleError } = require('../../middleware/utils')

const UnPublished = require('../../models/unPublished')

const { fetchLatitudeLongitude } = require('../../middleware/utils')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const unPublished = async (req, res) => {//console.log(req.files )
  try {

    const files = req.files

    //const resultSet = await this.fetchUser_ID(req.user.id)

    //console.log(resultSet)

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

     await UnPublished.create({
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
      .then(() => {
        res.status(200).send({ status: 200, message: "your iteam has been successfully Drated" })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message:
            Err.message || "Some error occurred while Drafting item."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { unPublished }