const { handleError } = require('../../middleware/utils')

const AuctionListing = require('../../models/auctionListing')

const Auctioneer = require('../../models/Auctioneer')

const appConstants = require('../../../config/aws.config');

const emailConstants = require("../../constant/email-template/email-content")

const {sendEmailToCustomer} = require('../authentication/helpers/sendEmailToCustomer')

const emailConfig = require('../../../config/email')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

//checkUser-ID
exports.fetchAuctionListing = async (obj_id) => {
 
    var cursor;
    await AuctionListing.findOne({ _id: obj_id }).then(data => {
      cursor = data;
    })
      .catch(err => {
        cursor = null;
      });
    return cursor;
  };
 

const editAuctionListing = async (req, res) => {//console.log(req.files )
  try {
    
    const files = req.files
    
    const resultSet = await this.fetchAuctionListing(req.body.id)

    let data =req.user;

    const Auctioneer = req.user.id;
    const AuctionType = req.body.AuctionType;
    const AuctionTitle = req.body.AuctionTitle;
    const AuctionDate = req.body.AuctionDate;
    const AuctionTime = req.body.AuctionTime;
    const Address1 = req.body.Address1;
    const Address2 = req.body.Address2;
    const City = req.body.city;
    const State = req.body.state;
    const Country = req.body.country;
    const Zip = req.body.zip;
    const AuctionCategory = req.body.AuctionCategory;
    const CategoryDetails = req.body.CategoryDetails;
    const NameOfProduct = req.body.NameOfProduct;
    const ProductDescription = req.body.ProductDescription;
    const BiddingNotice = req.body.BiddingNotice;
    const AuctionNotice= req.body.AuctionNotice;
    const TermsAndCondition = req.body.TermsAndCondition; 
    const uploadPhoto = req.body.uploadPhoto;
        
    
     await AuctionListing.findByIdAndUpdate({_id:req.body.id},{
        Auctioneer      ,
    
        AuctionType     ,
        
        AuctionTitle    ,
    
        AuctionDate     ,
    
        AuctionTime     ,
    
        Address1 ,
    
        Address2 ,
    
        City     ,
    
        State    ,
    
        Country ,
    
        Zip     ,
    
        AuctionCategory ,
        
        CategoryDetails ,
    
        NameOfProduct   ,
    
        uploadPhoto     ,
    
        ProductDescription ,
    
        BiddingNotice ,
    
        AuctionNotice,
    
        TermsAndCondition,
      })
              .then(async()=>{
                              let host = req.get('host');
                              console.log("host:", host);
                              await sendEmailToCustomer(host, data.Email, "NA",3,emailConstants.WehavemadesomeChanges, emailConstants.htmlCotent_WeHaveMadeSomeChanges, data.FirstName + data.LastName,emailConfig.username_listing);
                         res.status(200).send({ status: 200, message: "your iteam has been successfully updated"})
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

module.exports = { editAuctionListing }