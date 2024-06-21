const { handleError } = require('../../middleware/utils')
const appConstants = require('../../../settings.json');
let AWS = require("aws-sdk");

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

const uploadFile = async (req, res) => {
  try {
    if(!req.body.type || req.body.type.length <0){
      return res.status(400)
      .send({ status: 400, 
              message: "format type is missing.",
            });
    }
    const fileRequest = req.files
    let file = fileRequest[0];
    var folder = req.body.type == 'Profile' ?
      appConstants.AWS_PROFILE_FOLDER_NAME :
      appConstants.AWS_TEST_DRIVING_IMAGE_FOLDER_NAME;

    //Where you want to store your file
    var params = {
      Bucket: appConstants.AWS_BUCKET_NAME,
      Key: folder + '/' + file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read"
    };

    s3bucket.upload(params, (err, data) => {
      if (err) {
        console.error('Error deleting file:', err);
        res.status(500).send({ status: 500, message: "Internal Error."})
      } else {
        res.status(200)
           .send({ status: 200, 
                   message: "Successfully added.",
                   file:data?.Location
                 });
        }
    });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}
// To remove file from s3 bucket.....
const removeFile = async (req, res) => {
  try {
    const bucketName = appConstants.AWS_BUCKET_NAME;
    const folder = appConstants.AWS_PROFILE_FOLDER_NAME;
    const file = req.query.file;
    const params = {
      Bucket: bucketName,
      Key: folder+'/'+file
    };
    console.log('-----',params);
    s3bucket.deleteObject(params, (err, data) => {
      if (err) {
        console.error('Error deleting file:', err);
        res.status(500).send({ status: 500, message: "Internal Error."})
      } else {
        res.status(200)
           .send({ status: 200, 
                   message: "Successfully deleted.",
                 });
        }
    });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

// To get files from s3 bucket.....
const getUrlsFromFolderInS3 = async (req, res) => {
  try {
    console.log('-------folder',req.params.folder)
    if(!req.params.folder || req.params.folder.length <0){
      return res.status(400)
      .send({ status: 400, 
              message: "folder type is missing.",
            });
    }

    if(req.params.folder !== 'testdrivingimages'){
      return res.status(400)
      .send({ status: 400, 
              message: "folder value doesn't match.",
            });
    }

    const bucketName = appConstants.AWS_BUCKET_NAME;
    const folder = appConstants.AWS_TEST_DRIVING_IMAGE_FOLDER_NAME;
   
    const params = {
      Bucket: bucketName,
      Prefix: folder+"/"
    };
    console.log('-----',params);
    s3bucket.listObjectsV2(params, (err, data) => {
      if (err) {
        console.error('Error while getting files:', err);
        res.status(500).send({ status: 500, message: "Internal Error."})
      } else {
        const urls = data.Contents.map(obj => `https://${params.Bucket}.s3.amazonaws.com/${obj.Key}`);

        // Now 'urls' is an array containing all the URLs
        console.log(urls); // log all URLs

        res.status(200)
           .send({ status: 200, 
                   message: "Successfully get all files.",
                   urlObject : urls,
                 });
        }
    });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { uploadFile, removeFile, getUrlsFromFolderInS3 }