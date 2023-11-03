const {getProfile, editProfile, 
       createProfile,getProfileList,getProfileCountByDate,
       getProfileGraph,deleteProfileById,adminDashboardApi} = require('./profile.service')

module.exports = {getProfile, editProfile, createProfile, getProfileList,
                 getProfileCountByDate,getProfileGraph,deleteProfileById,adminDashboardApi};