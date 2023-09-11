const { handleError } = require('../../middleware/utils')
const bookmark = require('../../models/bookmark')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

// To add question into bookmark.....
const postbookmarkQuestions = async (req, res) => {
  try {
    const profileId = req.body.profileId;
    const questionId = req.body.questionId;
    const questionId_exist = await bookmark.find({ profileId: profileId, questionId: questionId });
    if (questionId_exist.length > 0) {
      return res.status(200).send({
        status: 200,
        message: "Already Added To Bookmark."
      })
    }
    const profileIdToCount = await bookmark.countDocuments({ profileId: req.body.profileId });

    if (profileIdToCount && profileIdToCount >= 200) {
      return res.status(200).send({
        status: 200,
        message: "Bookmark limt has reached 200"
      })
    }

    await bookmark.create({ profileId, questionId })
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

// To fetch bookmark question.....
const getbookmarkQuestions = async (req, res) => {
  try {
    await bookmark.find({profileId:req.query.profileId})
      //.populate('questionId','type category question image options correctanswers')
      .populate({
        path:'questionId',
        populate:{
          path:'category'
        },
        select:'type category question image options correctanswers'
      })
      .select('-createdAt -updatedAt')
      .then((data) => {
        res.status(200).send({
          status: 200,
          message: "Get Bookmark Questions Details.",
          response: data
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

// To remove bookmark question.....
const removebookmarkQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    await bookmark.findByIdAndDelete({ _id: id })
      .then(() => {
        res.status(200).send({
          status: 200,
          message: "Removed Questions From Bookmark."
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

module.exports = { postbookmarkQuestions, getbookmarkQuestions, removebookmarkQuestion }