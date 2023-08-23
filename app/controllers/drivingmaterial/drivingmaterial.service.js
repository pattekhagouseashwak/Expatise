const { handleError } = require('../../middleware/utils')
const drivingmaterial = require('../../models/drivingMaterial')
const appInfo = require('./../../../settings.json')


/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

// To add question into drivingmaterial database.....
const postQuestions = async (req, res) => {
  try {
    const type = req.body.type;
    const category = req.body.category;
    const question = req.body.question;
    const image = req.body.image;
    const options = req.body.options;
    const correctanswers = req.body.correctanswers;
    await drivingmaterial.create({ type,category,question,image,options,correctanswers})
      .then(() => {
        res.status(200).send({
          status: 200,
          message: "succesfully posted Questions."
        })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message: Err.message || "Internal Error."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

// To fetch drivingmaterial names.....
const getDrivingMaterial = async (req, res) => {
  try {
    let searchValue = [];
    let search = {};
    if(req.query.category){
      searchValue.push({ category : req.query.category});
      search = { $and: searchValue };
    }

    const page = parseInt(req.query.page) || appInfo.DrivingMaterial_DefaultPage;
    const itemsPerPage = appInfo.DrivingMaterial_itemsPerPage;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalItems = await drivingmaterial.countDocuments();
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    await drivingmaterial.find(search).skip(startIndex).limit(itemsPerPage)
      .populate('category','name')
      .then((data) => {
        res.status(200).send({
          status:200,
          message:"Driving Material details.",
          response:data,
          page,
          totalPages
        })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message: Err.message || "Internal Error."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

// To remove drivingmaterial names.....
const removeQuestions = async (req, res) => {
  try {
    const id = req.params.id;
    await drivingmaterial.findByIdAndDelete({_id:id})
      .then(() => {
        res.status(200).send({
          status:200,
          message:"drivingmaterial name removed."
        })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message: Err.message || "Internal Error."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { postQuestions, getDrivingMaterial, removeQuestions}