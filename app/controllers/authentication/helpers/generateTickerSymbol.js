const generateTickerSymbol = async (companyName, city) => {
    var nameInitials = companyName.match(/(\b\S)?/g).join("").toUpperCase();
    var cityInitials = city.match(/(\b\S)?/g).join("").toUpperCase();
    var tickerSymbol = nameInitials + "_" + cityInitials;
    return tickerSymbol;
  }

  module.exports = {generateTickerSymbol}

  