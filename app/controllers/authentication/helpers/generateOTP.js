
// Here generating OTP
const generateOTP = async (otpLength) => {
    var text = "";
    var possible = "0123456789";
    for (var i = 0; i < otpLength; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  module.exports ={generateOTP}