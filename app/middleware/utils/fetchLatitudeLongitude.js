const NodeGeocoder = require('node-geocoder');

const fetchLatitudeLongitude = async (address) => {
    console.log(address)

    let status;

    let message;

    const options = {
        provider: 'google',

        // Optional depending on the providers

        //fetch: customFetchImplementation,
        apiKey: 'AIzaSyB82EP31CW8F5bIijUL2Harwpkh-K0Ay_Y', // for Mapquest, OpenCage, Google Premier
        formatter: null // 'gpx', 'string', ...
    };
    const geocoder = NodeGeocoder(options);

    await geocoder.geocode(address)
        .then((data) => {
            status = 200;
            message = data;
        }).catch(Err => {
            status = 500;
            message = "Some error occurred while fetching auction listing item location.";
        });

    if (status == 200) {
        return { status, message };
    }
    else if (status == 500) {

        return { status, message };

    }
}

module.exports = { fetchLatitudeLongitude }