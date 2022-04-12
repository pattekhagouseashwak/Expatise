const { handleError } = require('../../middleware/utils')

const AdsBlog_Db = require('../../models/adsBlog_Db')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchBlog = async (req, res) => {
  try {


    if(req.body.Type == undefined && req.body.Category == undefined){
      return  res.status(400).send({ status: 400, message: "Type or  Category key's missing"});
    }

    // if(req.body.Type.length ==0 && req.body.Category.length == 0){
    //   return  res.status(400).send({ status: 400, message: "Type or  Category cannot be empty"});
    // }
    let searchValue = [];

    if(req.body.Type.length !=0 ){
      searchValue.push({Type:req.body.Type});
      //console.log(searchValue)
    }
    if(req.body.Category.length !=0){
      searchValue.push({Category : req.body.Category});
      //console.log(searchValue)
    }
   
   //console.log(searchValue)

   let modelName;

   if(searchValue.length == 0){
    modelName = AdsBlog_Db.find({ })
   }
   else{
   modelName = AdsBlog_Db.find({ $and: searchValue })
   }
   
      await modelName
                   .select('-is_published')
                   .then((Blogs) => {
                                       res.status(200).send({ status: 200, message: "succesfully fetched fetchBlog",Blogs })
                                    })
                       .catch(Err => {
                                        res.status(500).send({
                                        status: 500,
                                        message:Err.message || "Some error occurred while fetching Blogs item."
                                        });
                                    }); 
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}
module.exports = { fetchBlog }