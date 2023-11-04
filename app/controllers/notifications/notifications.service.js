const { handleError } = require('../../middleware/utils')
const profile = require('../../models/profile')
const appInfo = require('../../../settings.json')
const notifications = require('../../models/notifications')
const notificationResponse = require('../../models/notificationResponse')
const mongoose = require('mongoose');

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const createNotificationBanner = async (req, res) => {
  try {

    let flag = 0;
     
    if (!req.body.userIds || req.body.userIds.length <=0) {
      flag = flag+1;
    }

    if (!req.body.deliveryTo || req.body.deliveryTo.length <=0) {
      flag = flag+1;
    }
    console.log('-------------',!req.body.userIds,!req.body.deliveryTo,flag);
    console.log('-------------',req.body.userIds.length,req.body.deliveryTo.length,flag);

    if (flag == 2) {
      return res.status(400).send({ status: 400, message: "Both userIds,deliveryTo can't be empty" });
    }
    else if (flag == 0) {
      return res.status(400).send({ status: 400, message: "Either userIds or deliveryTo any one of key should exist with value." });
    }
    const title = req.body.title;
    const description = req.body.description;
    const userIds = req.body.userIds;
    const deliveryTo = req.body.deliveryTo;

    await notifications.create({
      title,
      description,
      userIds,
      deliveryTo
    }).then((data) => {
      res.status(200).send({ status: 200, message: "successfully created notification banner!!", data })
    }
    ).catch(Err => {
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

const getNotifications = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || appInfo.DEFAULTPAGE;
    const itemsPerPage = appInfo.PROFILE_LISTING_ITEMSPERPAGE;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalItems = await profile.find().countDocuments();
    const totalpages = Math.ceil(totalItems / itemsPerPage);

    await notifications.find({})
                      .skip(startIndex).limit(itemsPerPage)
                      .select('title description').sort({createdAt:-1})
      .then((data) => {
        res.status(200)
          .send({
            status: 200,
            message: "successfully fetched notifications details!!",
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

const storeNotificationResponse = async (req, res) => {
  try {
    const notificationId = req.body.notificationId;
    const userId = req.body.userId;
    await notificationResponse.create({ notificationId, userId })
      .then(() => {
        res.status(200)
          .send({
            status: 200,
            message: "successfully stored notification response!!"
          })
      }
      ).catch(Err => {
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

const getNotificationsByUserid = async (req, res) => {
  try {

    if (!req.query.userId || req.query.length <= 0) {
      return res.status(400).send({ status: 400, message: "userId can't be empty" });
    }

    if (!req.query.usertype || req.query.usertype.length <= 0) {
      return res.status(400).send({ status: 400, message: "usertype can't be empty" });
    }

    let userIdsToSearch;
    if (mongoose.Types.ObjectId.isValid(req.query.userId)) {
      userIdsToSearch = req.query.userId;
    }
    else{
      return res.status(400).send({ status: 400, message: "userId is not objectId" });
    }

    const page = parseInt(req.query.page) || appInfo.DEFAULTPAGE;
    const itemsPerPage = appInfo.PROFILE_LISTING_ITEMSPERPAGE;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalItems = await profile.find().countDocuments();
    const totalpages = Math.ceil(totalItems / itemsPerPage);

    const usertypeToSearch = req.query.usertype;

    const filteredArray =  [];
    let object = new Object();
    await notifications.find({
      $or: [
        {
          userId: {
            $in: userIdsToSearch
          }
        },
        {
          $or: [
            {
              deliveryTo: 'all'
            },
            {
              deliveryTo: usertypeToSearch
            }
          ]
        }
      ]
    })
      .skip(startIndex).limit(itemsPerPage)
      .select('title description')
      .sort({ createdAt: -1 })
      .then(async(data) => {

        for (const notification of data) {
          const response = await notificationResponse.find({
            notificationId: notification._id,
            userId: userIdsToSearch
          });
          //console.log('--------------180',notification,response);
          if (response.length>0) {
            object = {
              _id: notification._id,
              title: notification.title,
              description: notification.description,
              status: 'seen'
            };
            //console.log('----------1', object);
          } else {
            object = {
              _id: notification._id,
              title: notification.title,
              description: notification.description,
              status: 'unseen'
            };
            //console.log('----------2', object);
          }
         filteredArray.push(object);
        }
        data = filteredArray;
        res.status(200)
          .send({
            status: 200,
            message: "successfully fetched notifications details!!",
            response: data,
            page: page,
            totalpages: totalpages
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

module.exports = {getNotifications,createNotificationBanner,
                 storeNotificationResponse,getNotificationsByUserid}