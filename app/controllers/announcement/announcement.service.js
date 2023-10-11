const { handleError } = require('../../middleware/utils')
const announcements = require('../../models/announcement')
const appInfo = require('../../../settings.json')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const getAnnouncement = async (req, res) => {
  try { console.log('----------',req.query.id);
    const id = req.query.id;
    if (!id || id.length < 0) {
      res.status(400).send({ status: 400, message: "id is missing" });
    }
    await announcements.find({_id:id})
      .then((data) => {
        res.status(200)
          .send({
            status: 200,
            message: "successfully fetched profile details!!",
            response: data
          })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message:
            Err.message || "Internal Error."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

const editAnnouncement = async (req, res) => {
  try {
    const id = req.body.id
    const heading = req.body.heading;
    const subject = req.body.subject;

    await announcements.findOneAndUpdate({ _id: id },
      {
        heading,
        subject
      }, { new: true })
      .select("-createdAt -updatedAt")
      .then((data) => {
        res.status(200)
          .send({
            status: 200,
            message: "successfully updated announcement", response: data
          })
      })
      .catch(Err => {
        res.status(500)
          .send({
            status: 500,
            message: Err.message || "Internal Error."
          });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

const createAnnouncement = async (req, res) => {
  try {
    const heading = req.body.heading;
    const subject = req.body.subject;

    await announcements.create({ heading, subject })
      .then((data) => {
        res.
          status(200)
          .send({
            status: 200,
            message: "successfully created announcement details", data
          })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message:
            Err.message || "Internal Error."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

const getAnnouncementList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || appInfo.DEFAULTPAGE;
    const itemsPerPage = appInfo.DEFAULT_LISTING_ITEMSPERPAGE;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalItems = await announcements.find().countDocuments();
    const totalpages = Math.ceil(totalItems / itemsPerPage);

    await announcements.find({}).skip(startIndex).limit(itemsPerPage)
      .then((data) => {
        res.status(200)
          .send({
            status: 200,
            message: "successfully fetched announcement details!!",
            response: data,
            page:page,
            totalpages:totalpages
          })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message:
            Err.message || "Internal Error."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

const deleteAnnouncement = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id || id.length < 0) {
      res.status(400).send({ status: 400, message: "id is missing" });
    }
    await announcements.findByIdAndDelete({ _id: id })
      .then((data) => {
        res.status(200)
          .send({
            status: 200,
            message: "successfully deleted announcement detail",
            response: data
          })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message:
            Err.message || "Internal Error."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { getAnnouncement, editAnnouncement, 
                 createAnnouncement, getAnnouncementList, deleteAnnouncement}