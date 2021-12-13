const { handleError } = require('../../middleware/utils')

const AddContent = require('../../models/addContent')

const Auctioneer = require('../../models/Auctioneer')

var AWS = require("aws-sdk");

const appConstants = require('../../../config/aws.config');

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

// AWS S3 configuration
var s3bucket = new AWS.S3({
    accessKeyId: appConstants.AWS_ACCESS_KEY_ID,
    secretAccessKey: appConstants.AWS_SECRET_ACCESS_KEY,
    region: appConstants.AWS_REGION
  });

//checkUser-ID
exports.fetchUser_ID = async (obj_id) => {
 
    var cursor;
    await Auctioneer.findOne({ _id: obj_id }).then(data => {
      cursor = data;
    })
      .catch(err => {
        cursor = null;
      });
    return cursor;
  };
 
  //upload document to S3
  exports.uploadDocToS3 = async (s3bucket,params,s3FileURL,file) =>{
 
    var isUploaded;
    await s3bucket.upload(params, function(err, data) {
     if (err) {
       console.log(err);
       isUploaded = null;
       return isUploaded;
     } else {
       //res.send({ data });
       isUploaded = s3FileURL + params.Key+ file.originalname;
       //console.log(isUploaded)
       return isUploaded;
     }
   });
 
 };

const postContent = async (req, res) => {
    try {
    
        const files = req.files
        
        //console.log(resultSet)
        
        const Auctioneer = req.user.id;
        const Title = req.body.Title;
        const videoUrl = req.body.videoUrl;
        const AddDescribtion = req.body.AddDescribtion;
        const BlogContent = req.body.BlogContent;
        const reqType = req.body.reqType;
        let UploadPhoto;
         
        //Blog content.........
        if(reqType == 1){

        if(Array.isArray(files) && files.length != 0){

            const resultSet = await this.fetchUser_ID(req.user.id)
          
            //console.log("with media")
            
            const s3FileURL = appConstants.AWS_Uploaded_File_URL_LINK;
        
            var photos = [];
        
            for(var i=0;i<files.length;i++){
        
               var file = files[i];
              
               //Where you want to store your file
        
               var params = {
                Bucket: appConstants.AWS_BUCKET_NAME,
                Key: resultSet.FirstName+'/'+file.originalname,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: "public-read"
               };
               
               await this.uploadDocToS3(s3bucket,params,s3FileURL,file);
            
               photos.push(s3FileURL + params.Key);
        
            }

            UploadPhoto = photos;
    }
            
        
        await AddContent.create({
            Auctioneer,
            Title,
            BlogContent,
            UploadPhoto
            }).then(()=>{res.status(200).send({ status: 200, message: "your content has been successfully submitted. we will notify you once it is reviewed and published."})
                        }).catch(Err => {
                                                res.status(500).send({
                                                status: 500,
                                                message:
                                                    Err.message || "Some error occurred while submitting content."
                                                });
                                        });
        }
        //video content...........
        else if(reqType == 2){
            await AddContent.create({
                Auctioneer,
                Title,
                videoUrl,
                AddDescribtion
                }).then(()=>{res.status(200).send({ status: 200, message: "your content has been successfully submitted. we will notify you once it is reviewed and published."})
                            }).catch(Err => {
                                                    res.status(500).send({
                                                    status: 500,
                                                    message:
                                                        Err.message || "Some error occurred while submitting content."
                                                    });
                                            });

        }

      } catch (error) {
        console.log(error)
        handleError(res, error)
      }
}


module.exports = { postContent }