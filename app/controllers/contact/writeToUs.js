const { handleError } = require('../../middleware/utils')

const WriteToUs = require('../../models/writeToUs')

var AWS = require("aws-sdk");
/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */


 const appConstants = require('../../../config/aws.config');

 
 // AWS S3 configuration
 var s3bucket = new AWS.S3({
     accessKeyId: appConstants.AWS_ACCESS_KEY_ID,
     secretAccessKey: appConstants.AWS_SECRET_ACCESS_KEY,
     region: appConstants.AWS_REGION
   });

 
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

 

const writeToUs = async (req, res) => {
    try {

        const resultSet = req.body.userID;
        const file = req.file;
        const userID = req.body.userID;
        const entityType = req.body.entityType;

        const name = req.body.name;
        const email = req.body.email;
        const description = req.body.description;
        const priority = req.body.priority;

        // const attachment = req.body.attachment;
        const message = req.body.message;

        
      
            //console.log("with media")
            
            const s3FileURL = appConstants.AWS_Uploaded_File_URL_LINK;
        
            var photo;
        
           
              
               //Where you want to store your file
        
              //  var params = {
              //   Bucket: appConstants.AWS_BUCKET_NAME,
              //   Key: resultSet.FirstName+'/'+file.originalname,
              //   Body: file.buffer,
              //   ContentType: file.mimetype,
              //   ACL: "public-read"
              //  };
               
              //  await this.uploadDocToS3(s3bucket,params,s3FileURL,file);
            
              //  photo = (s3FileURL + params.Key);
        
        
    
    
    
        const uploadPhoto = photo;

        await WriteToUs.create({userID,entityType,email,description,uploadPhoto,message,name, priority})
                               .then(()=>{
                                          res.status(200).send({ status: 200, message: "message succesfully added"})
                                                          }).catch(Err => {
                                                              res.status(500).send({
                                                              status: 500,
                                                              message:
                                                                  Err.message || "Some error occurred while adding."
                                                              });
                                                          });
      } catch (error) {
        console.log(error)
        handleError(res, error)
      }
}


const getWriteToUsDetails = async (req, res) => {
    try {

      const userID = req.body.userID;


      await WriteToUs.find({userID: userID})

           .then((data)=>{
                         if(data != null){
                         res.status(200).send({ status: 200, message: "successfully  email ticket history Details has fetched!!",data})
                         }
                         else if(data == null){
                           res.status(200).send({ status: 200, message: "No  email ticket History Found!!"})
                           }
                       }
                                     ).catch(Err => {
                                         res.status(500).send({
                                         status: 500,
                                         message:
                                             Err.message || "Some err or occurred while fetching  email ticket history."
                                         });
                                     }); 
      } catch (error) {
        console.log(error)
        handleError(res, error)
      }
}

module.exports = { writeToUs, getWriteToUsDetails }