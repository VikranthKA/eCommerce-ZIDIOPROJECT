const axios = require("axios")
const getCoByGeoApify = async (address) => {

    const searchString = encodeURIComponent(`${address.building}, ${address.locality}, ${address.city}, ${address.state}, ${address.pincode}, ${address.country}`);
    // console.log(searchString, "data");
    try {
        const mapResponse = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${searchString}&apiKey=${process.env.GEO_APIFY_KEY}`);

        if (mapResponse.data.features.length == 0) {
            return res.status(400).json({ errors: [{ msg: "Invalid address", path: 'invalid address' }] })
        }
        const location = [mapResponse.data.features[0].properties.lon, mapResponse.data.features[0].properties.lat]
        return {
            address:`${address.building}, ${address.locality}, ${address.city}, ${address.state}, ${address.pincode}, ${address.country}`,
            location:{
                type:"Point",
                coordinates:location
            }
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json(err)
    }
};

module.exports = {getCoByGeoApify}