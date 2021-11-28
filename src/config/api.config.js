require('dotenv').config();

module.exports = {
    PRIVATEKEYTOKENAPI: process.env.PRIVATEKEYTOKENAPI || 'secret2',
    URlMAPSAPI:  process.env.URlMAPSAPI || 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
};