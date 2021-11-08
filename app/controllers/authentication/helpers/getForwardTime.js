// Get the time for next few minutes
const getForwardTime = async(timeInMints) => {

    var forwardTime = new Date(Date.now() + (timeInMints * 60 * 1000));
    return forwardTime;
  }

  module.exports ={getForwardTime}