const { handleError } = require('../../middleware/utils')

const AdsBlog_Db = require('../../models/adsBlog_Db')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchBlogRequest = async (req, res) => {
  try {
    let searchValue = [];
   
    if(req.body.AuctioneerID.length !=0 ){
      searchValue.push({AuctioneerID:req.body.AuctioneerID});
      //console.log(searchValue)
    }
    if(req.body.AuthorName.length !=0){
      searchValue.push({AuthorName : req.body.AuthorName});
      //console.log(searchValue)
    }

    if(req.body.Type.length !=0 ){
      searchValue.push({Type:req.body.Type});
      //console.log(searchValue)
    }
    if(req.body.Category.length !=0){
      searchValue.push({Category : req.body.Category});
      //console.log(searchValue)
    }
   
    searchValue.push({is_published:false});
    console.log(searchValue)
 
    
await AdsBlog_Db.find({ $and: searchValue })
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
module.exports = { fetchBlogRequest }