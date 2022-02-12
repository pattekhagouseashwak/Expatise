const { handleError } = require('../../middleware/utils')

const UnPublished = require('../../models/unPublished')

const Auctioneer = require('../../models/Auctioneer')

const { fetchLatitudeLongitude } = require('../../middleware/utils')

//fetch-Auctioneer
exports.fetchAuctioneer = async (obj_id) => {

  var cursor;
  await Auctioneer.findById({ _id: obj_id }).then(data => {
    cursor = data;
  })
    .catch(err => {
      cursor = null;
    });
  return cursor;
}; 

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const editUnpublishedListing = async (req, res) => {//console.log(req.files )
  try {

    const files = req.files

    //const resultSet = await this.fetchUser_ID(req.user.id)

    //console.log(resultSet)

    let data = await this.fetchAuctioneer(resultSet.Auctioneer);
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

    await UnPublished.findByIdAndUpdate({ _id: req.body.id }, {
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
        res.status(200).send({ status: 200, message: "your iteam has been successfully edited" })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message:
            Err.message || "Some error occurred while editing item."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = {editUnpublishedListing}