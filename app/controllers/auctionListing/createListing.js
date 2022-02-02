const { handleError } = require('../../middleware/utils')

const AuctionListing = require('../../models/auctionListing')

const { fetchLatitudeLongitude } = require('../../middleware/utils')

const emailConstants = require("../../constant/email-template/email-content")

const {sendEmailToCustomer} = require('../authentication/helpers/sendEmailToCustomer')

const emailConfig = require('../../../config/email')


//var AWS = require("aws-sdk");

//const appConstants = require('../../../config/aws.config');

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

// // AWS S3 configuration
// var s3bucket = new AWS.S3({
//     accessKeyId: appConstants.AWS_ACCESS_KEY_ID,
//     secretAccessKey: appConstants.AWS_SECRET_ACCESS_KEY,
//     region: appConstants.AWS_REGION
//   });

// //checkUser-ID
// exports.fetchUser_ID = async (obj_id) => {

//     var cursor;
//     await Auctioneer.findOne({ _id: obj_id }).then(data => {
//       cursor = data;
//     })
//       .catch(err => {
//         cursor = null;
//       });
//     return cursor;
//   };

//   //upload document to S3
//   exports.uploadDocToS3 = async (s3bucket,params,s3FileURL,file) =>{

//     var isUploaded;
//     await s3bucket.upload(params, function(err, data) {
//      if (err) {
//        console.log(err);
//        isUploaded = null;
//        return isUploaded;
//      } else {
//        //res.send({ data });
//        isUploaded = s3FileURL + params.Key+ file.originalname;
//        //console.log(isUploaded)
//        return isUploaded;
//      }
//    });

//  };

const createListing = async (req, res) => {//console.log(req.files )
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

    //     if(files.length != 0)
    //{ 

    //         //console.log("with media")

    //         const s3FileURL = appConstants.AWS_Uploaded_File_URL_LINK;

    //         var photos = [];

    //         for(var i=0;i<files.length;i++){

    //            var file = files[i];

    //            //Where you want to store your file

    //            var params = {
    //             Bucket: appConstants.AWS_BUCKET_NAME,
    //             Key: resultSet.FirstName+'/'+file.originalname,
    //             Body: file.buffer,
    //             ContentType: file.mimetype,
    //             ACL: "public-read"
    //            };

    //            await this.uploadDocToS3(s3bucket,params,s3FileURL,file);

    //            photos.push(s3FileURL + params.Key);

    //     }

    // }
     await AuctionListing.create({
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
                              await sendEmailToCustomer(host, data.Email, "NA",3,emailConstants.YourAuctionListingIsLIVE, emailConstants.htmlContent_YourAuctionListingIsLIVE, data.FirstName + data.LastName,emailConfig.username_listing);
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

module.exports = { createListing }