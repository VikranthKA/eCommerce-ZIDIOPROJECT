const axios = require("axios");

const getCoByGeoApify = async (address) => {
    const searchString = encodeURIComponent(`${address.building}, ${address.locality}, ${address.city}, ${address.state}, ${address.pincode}, ${address.country}`);
    try {
        const mapResponse = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${searchString}&apiKey=${process.env.GEO_APIFY_KEY}`);

        if (mapResponse.data.features.length == 0) {
            throw new Error("Invalid address");
        }

        const location = [mapResponse.data.features[0].properties.lon, mapResponse.data.features[0].properties.lat];
        return {
            ...address,
            location: {
                type: "Point",
                coordinates: location
            }
        };
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = { getCoByGeoApify };

