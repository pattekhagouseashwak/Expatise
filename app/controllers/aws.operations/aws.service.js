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
                   message: "Successfully deleted.",
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

module.exports = { uploadFile, removeFile }