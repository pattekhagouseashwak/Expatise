const {getProfile, editProfile,createProfile,
       getProfileList,getProfileCountByDate,getProfileGraph,deleteProfileById,adminDashboardApi,lastseenUpdate,userDashboard} = require('./profile.service')

module.exports = {getProfile, editProfile, createProfile, getProfileList, lastseenUpdate,
                 getProfileCountByDate,getProfileGraph,deleteProfileById,adminDashboardApi,userDashboard};